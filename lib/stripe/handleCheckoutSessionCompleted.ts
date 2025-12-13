import "server-only";
import { getCreditsPack, PackId } from "@/types/billing";
import Stripe from "stripe";
import prisma from "../prisma";

export async function HandleCheckoutSessionCompleted(
  event: Stripe.Checkout.Session
) {
  // --- Validation Checks (Same as yours) ---
  if (!event.metadata || !event.metadata.userId || !event.metadata.packId) {
    throw new Error("Missing required event metadata (userId or packId)");
  }
  const { userId, packId } = event.metadata;
  const purchasedPack = getCreditsPack(packId as PackId);
  if (!purchasedPack) {
    throw new Error("Purchased pack not found");
  }
  // --- End Validation Checks ---

  // *** NEW: Wrap logic in a Prisma Transaction ***
  // This ensures atomicity: both credit update AND purchase record must succeed.
  try {
    await prisma.$transaction(async (tx) => {
      // 1. ATTEMPT to record the purchase (Idempotency Check)
      // If a record with this stripeId already exists, this transaction will throw
      // a UniqueConstraintViolationError and the entire transaction will be rolled back.
      await tx.userPurchase.create({
        data: {
          userId,
          stripeId: event.id, // This is now a unique field
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
    // If the error is a UniqueConstraintViolation (meaning stripeId already exists),
    // we assume the payment was already fulfilled and swallow the error.
    if (error.code === 'P2002' && error.meta?.target.includes('stripeId')) {
        console.log(`Purchase already fulfilled for Stripe ID: ${event.id}. Skipping.`);
        // Return without throwing to tell Stripe the event was successfully processed
        return; 
    }
    
    // For any other error, re-throw it so the main webhook handler returns a 400 status.
    // This tells Stripe to retry the event later.
    throw error;
  }
}
