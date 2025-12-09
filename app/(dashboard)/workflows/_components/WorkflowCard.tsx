"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  WorkflowExecutionStatus,
  WorkflowStatus,
  WorkflowStatusType,
} from "@/types/workflow";
import { Workflow } from "@prisma/client";
import {
  ChevronRightIcon,
  ClockIcon,
  CoinsIcon,
  CornerDownRightIcon,
  FileTextIcon,
  MoreVerticalIcon,
  MoveRightIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";
import RunBtn from "./RunBtn";
import SchedulerDialog from "./SchedulerDialog";
import { Badge } from "@/components/ui/badge";
import ExecutionStatusIndicator, {
  ExecutionStatusLabel,
} from "@/app/workflow/runs/[workflowId]/_components/ExecutionStatusIndicator";
import { format, formatDistanceToNow } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import DuplicateWorkflowDialog from "./DuplicateWorkflowDialog";

// Utility function to format dates
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const statusStyles: any = {
  [WorkflowStatus.DRAFT]:
    "text-yellow-800 dark:text-yellow-300 border-yellow-300 bg-yellow-100 dark:border-yellow-400/20 dark:bg-yellow-400/5",
  [WorkflowStatus.PUBLISHED]:
    "text-emerald-800 dark:text-emerald-300 border-emerald-300 bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/5",
};

function WorkflowCard({
  workflow,
}: {
  workflow: Workflow & { updatedAt: Date; createdAt: Date };
}) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  const router = useRouter();

  const formattedUpdateDate = formatDate(workflow.updatedAt);

  return (
    <div
      className="
    relative w-full 
    backdrop-blur-xl 
    bg-white 
    dark:bg-black/20
    border border-gray-200 
    dark:border-white/10 
    rounded-2xl p-6 
    shadow-xl shadow-gray-200/50
    dark:shadow-[0_0_40px_-10px_rgba(0,255,180,0.25)]
    hover:shadow-2xl hover:shadow-gray-300/60
    dark:hover:shadow-[0_0_55px_-5px_rgba(0,255,200,0.35)]
    hover:border-emerald-500/50
    dark:hover:border-emerald-400/20
    transition-all
    overflow-hidden
    group/card
  "
    >
      {/* Glow bar on left */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-all",
          workflow.status === WorkflowStatus.PUBLISHED
            ? "bg-emerald-400/70 group-hover:bg-emerald-300"
            : "bg-yellow-400/70 group-hover:bg-yellow-300"
        )}
      />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 max-w-[70%]">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
            <Link href={`/workflow/editor/${workflow.id}`}>
              {workflow.name}
            </Link>

            <DuplicateWorkflowDialog workflowId={workflow.id} />
          </h3>

          <ScheduleSection
            cron={workflow.cron}
            isDraft={isDraft}
            creditsCost={workflow.creditsCost}
            workflowId={workflow.id}
          />

          <span
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full border w-fit backdrop-blur-sm",
              statusStyles[workflow.status]
            )}
          >
            {isDraft ? "Draft" : "Published"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isDraft && <RunBtn workflowId={workflow.id} />}

          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex gap-2 items-center"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>

          <WorkflowActions
            workflowId={workflow.id}
            workflowName={workflow.name}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-white/70 text-sm mt-4 leading-relaxed line-clamp-3 mb-2">
        {" "}
        {workflow.description || "No description provided."}
      </p>
      <LastRunDetails workflow={workflow} />

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 flex justify-between text-xs text-gray-500 dark:text-white/60">
        {" "}
        <span>Updated: {workflow.updatedAt.toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function WorkflowActions({
  workflowName,
  workflowId,
}: {
  workflowId: string;
  workflowName: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size="sm">
            <TooltipWrapper content={"More actions"}>
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Re-added "Run Workflow" action */}

          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ScheduleSection({
  isDraft,
  creditsCost,
  workflowId,
  cron,
}: {
  isDraft: boolean;
  creditsCost: number;
  workflowId: string;
  cron: string | null;
}) {
  if (isDraft) return null;
  return (
    <div className="flex items-center gap-2">
      <CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
      <SchedulerDialog
        cron={cron}
        workflowId={workflowId}
        key={`${cron}-${workflowId}`}
      />
      <MoveRightIcon className="h-4 w-4 text-muted-foreground" />
      <TooltipWrapper content="Credit cost for a full run">
        <div className="flex items-center gap-3">
          <Badge
            variant={"outline"}
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <CoinsIcon className="h-4 w-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
}

function LastRunDetails({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  if (isDraft) return null;
  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
  const formattedStartedAt =
    lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });

  const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");
  const nextScheduleUTC =
    nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");
  return (
    <div className="bg-primary/5 rounded-md px-4 py-1 flex justify-between items-center text-muted-foreground">
      <div className="flex items-center text-sm gap-2">
        {lastRunAt && (
          <Link
            className="flex items-center text-sm gap-2"
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
          >
            <span>Last Run:</span>
            <ExecutionStatusIndicator
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel
              status={lastRunStatus as WorkflowExecutionStatus}
            />{" "}
            <span>{formattedStartedAt}</span>
            <ChevronRightIcon
              size={14}
              className="-translate-x-[2px] group-hover:translate-x-0 transition"
            />
          </Link>
        )}
        {!lastRunAt && <p>No runs yet</p>}
      </div>
      {nextRunAt && (
        <div className="flex items-center text-sm gap-2">
          <ClockIcon size={14} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>

          <span className="text-xs font-bold">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  );
}

export default WorkflowCard;
