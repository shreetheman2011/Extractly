"use client";

import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import useExecutionPlan from "@/components/hooks/useExecutionPlan";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type RunWorkflowPayload = {
  workflowId: string;
  flowDefintion?: string;
};

function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: async (payload: RunWorkflowPayload) => {
      return RunWorkflow(payload);
    },
    onSuccess: () => {
      toast.success("Execution started", { id: "flow-execution" });
    },
    onError: (error) => {
      toast.error("Execution failed to start", { id: "flow-execution" });
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

        mutation.mutate({
          workflowId: workflowId,
          flowDefintion: JSON.stringify(toObject()),
        });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
}

export default ExecuteBtn;
