"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import parser from "cron-parser";
import { revalidatePath } from "next/cache";

// Define a clear return type for the server action
type UpdateResult = {
  success: boolean;
  error?: string;
};

export async function UpdateWorkflowCron({
  id,
  cron,
}: {
  cron: string;
  id: string;
}): Promise<UpdateResult> {
  const { userId } = auth();
  if (!userId) {
    // For security, just returning an error is better than throwing 
    // an exception that might expose system details.
    return { success: false, error: "User not authenticated." }; 
  }

  try {
    // 1. Validate the cron expression and calculate the next run time
    const interval = parser.parseExpression(cron, { utc: true });
    const nextRunTime = interval.next().toDate();

    // 2. Use a transaction to ensure both fields are updated atomically
    await prisma.$transaction([
      prisma.workflow.update({
        where: { id, userId },
        data: {
          cron,
          nextRunAt: nextRunTime,
        },
      }),
    ]);
    
    // 3. Revalidate path on success
    revalidatePath("/workflows");

    return { success: true };

  } catch (error) {
    console.error("Workflow update error: ", error);

    // Check if the error is from the cron parser
    if (error instanceof Error && error.message.includes('Invalid cron expression')) {
      return { success: false, error: "The provided cron expression is invalid." };
    }

    // Default error for other issues (e.g., database connection, ID not found)
    return { success: false, error: "Failed to update workflow. Please try again." };
  }
}
