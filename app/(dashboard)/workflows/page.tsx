import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, PackageIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import WorkflowCard from "./_components/WorkflowCard";
import { Workflow } from "@prisma/client";

export default function Page() {
  return (
    <div className="relative h-full w-full">
      {/* Glowing background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-emerald-500/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-500/20 blur-[130px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.08] bg-[url('/grid.svg')] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-16 px-8 flex flex-col gap-12">
        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <h1 className="text-primary text-5xl font-bold tracking-tight dark:text-white  drop-shadow-[0_0_15px_rgba(0,255,200,0.25)]">
            Workflows
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/70">
            Your automation hub — edit, deploy, and automate workflows.
          </p>
        </div>

        <CreateWorkflowDialog />

        {/* Workflows */}
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}
function UserWorkflowsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-32 w-full rounded-2xl bg-white/5 animate-pulse border border-white/10 backdrop-blur-xl"
        />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert variant={"destructive"} className="mt-8">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error Loading Workflows</AlertTitle>
        <AlertDescription>
          Something went wrong while fetching your workflows. Please try
          refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className=" flex flex-col gap-6 h-full items-center justify-center min-h-[50vh] rounded-xl p-10 border border-white/10 dark:bg-white/5 backdrop-blur-sm text-center">
        <div className="rounded-full dark:bg-primary/10 w-24 h-24 flex items-center justify-center">
          <PackageIcon size={48} className="text-primary" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-3xl">No Workflows Yet</p>
          <p className="text-primary dark:text-white/70 max-w-md">
            Create your first workflow to get started with automating tasks.
          </p>
        </div>

        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  const workflowsWithDates: (Workflow & {
    updatedAt: Date;
    createdAt: Date;
  })[] = workflows.map((workflow) => ({
    ...workflow,
    createdAt: new Date(workflow.createdAt),
    updatedAt: new Date(workflow.updatedAt),
  }));

  return (
    <div className="space-y-4">
      {workflowsWithDates.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
