import "server-only";
import { getCreditsPack, PackId } from "@/types/billing";
import Stripe from "stripe";
import prisma from "../prisma";
// Import the specific Prisma error type
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function HandleCheckoutSessionCompleted(
  event: Stripe.Checkout.Session
) {
  if (!event.metadata || !event.metadata.userId || !event.metadata.packId) {
    throw new Error("Missing required event metadata (userId or packId)");
  }
  const { userId, packId } = event.metadata;
  const purchasedPack = getCreditsPack(packId as PackId);
  if (!purchasedPack) {
    throw new Error("Purchased pack not found");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. ATTEMPT to record the purchase (Idempotency Check)
      await tx.userPurchase.create({
        data: {
          userId,
          stripeId: event.id,
          description: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
          amount: event.amount_total!,
          currency: event.currency!,
        },
      });

      // 2. Update the user's credits (Only runs if step 1 succeeds)
      await tx.userBalance.upsert({
        where: { userId },
        create: {
          userId,
          credits: purchasedPack.credits,
        },
        update: {
          credits: {
            increment: purchasedPack.credits,
          },
        },
      });
    });
    
  } catch (error) {
    // --- FIX IS HERE ---
    // Check if the error is a Prisma Unique Constraint Violation
    if (error instanceof PrismaClientKnownRequestError) {
      // P2002 is the code for Unique Constraint Violation
      if (error.code === 'P2002' && error.meta?.target.includes('stripeId')) {
          console.log(`Purchase already fulfilled for Stripe ID: ${event.id}. Skipping.`);
          // Success: The error means it was already processed. Return to avoid Stripe retries.
          return; 
      }
    }
    
    // For any other error, log it and re-throw, which causes the webhook to return 400.
    console.error(`Error fulfilling purchase for Stripe ID: ${event.id}`, error);
    throw error;
  }
}
