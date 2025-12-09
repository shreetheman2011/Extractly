// In GetWorkflowsForUser.ts
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowsForUser() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const workflows = await prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // ✅ CRITICAL FIX: Explicitly serialize Date objects to ISO strings.
  // This ensures the object returned across the Server Action boundary is 100% plain.
  return workflows.map((workflow) => ({
    ...workflow,
    createdAt: workflow.createdAt.toISOString(),
    updatedAt: workflow.updatedAt.toISOString(),
  }));
}
