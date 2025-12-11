// /api/workflows/cron (or similar file)
import { getAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";

export async function GET(req: Request) {
  // 1. Get the current time
  const now = new Date();

  // 2. 🚨 ADDED: Create a buffer by looking back 5 seconds (5000 milliseconds)
  // This accounts for time drift, precision issues, and network latency on Vercel.
  const pastBuffer = new Date(now.getTime() - 5000); 

  const workflows = await prisma.workflow.findMany({
    select: { id: true },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      // 3. 🚨 CHANGED: Use the buffered time for the check
      nextRunAt: { lte: pastBuffer }, 
    },
  });

  console.log(`[CRON] Found ${workflows.length} workflows to run.`);

  for (const workflow of workflows) {
    // Note: Since you are using fetch, you should ensure triggerWorkflow 
    // is not blocking the loop and is handled correctly. 
    // The current implementation is fine, as 'fetch' is non-blocking.
    triggerWorkflow(workflow.id);
  }

  return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
}

function triggerWorkflow(workflowId: string) {
  const triggerApiUrl = getAppUrl(
    `api/workflows/execute?workflowId=${workflowId}`
  );

  fetch(triggerApiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET!}`,
    },
    // The Vercel function can complete before these fetches finish.
    // This is generally acceptable for fire-and-forget background jobs.
    cache: "no-store", 
  }).catch((error) =>
    console.error(
      "Error triggering workflow with id",
      workflowId,
      ":error->",
      error.message
    )
  );
}
