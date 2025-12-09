"use client";

import { PublishWorkflow } from "@/actions/workflows/publishWorkflow";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadCloudIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type PublishWorkflowPayload = {
  id: string;
  flowDefinition: string;
};

function PublishBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: async (payload: PublishWorkflowPayload) => {
      return PublishWorkflow(payload);
    },
    onSuccess: () => {
      toast.success("Workflow published!", { id: workflowId });
    },
    onError: (error) => {
      toast.error("Something went wrong", { id: workflowId });
      if (error.cause === "workflow_not_draft") {
        toast.error("This workflow is not a draft and is already published.");
      }
      console.log(error);
    },
  });
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }
        toast.loading("Publishing....", { id: workflowId });

        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        });
      }}
    >
      <UploadCloudIcon size={16} className="stroke-green-500" />
      Publish
    </Button>
  );
}

export default PublishBtn;
