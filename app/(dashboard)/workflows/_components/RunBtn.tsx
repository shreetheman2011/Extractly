"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type RunWorkflowPayload = {
  workflowId: string;
  flowDefintion?: string;
};

export default function RunBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: async (payload: RunWorkflowPayload) => {
      return RunWorkflow(payload);
    },
    onSuccess: () => {
      toast.success("Execution started", { id: workflowId });
    },
    onError: () => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      className="flex items-center gap-2 text-primary"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Scheduling run...", { id: workflowId });
        mutation.mutate({
          workflowId,
        });
      }}
    >
      <PlayIcon size={16} />
      Run
    </Button>
  );
}
