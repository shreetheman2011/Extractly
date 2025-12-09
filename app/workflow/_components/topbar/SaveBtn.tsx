// In SaveBtn.tsx
"use client";

import { UpdateWorkflow } from "@/actions/workflows/updateWorkflow";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { CheckIcon } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

type UpdateWorkflowPayload = {
  id: string;
  definition: string;
};

function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: async (payload: UpdateWorkflowPayload) => {
      return UpdateWorkflow(payload);
    },
    onSuccess: () => {
      toast.success("Saved successfully", { id: "save-workflow" });
    },
    onError: (error: Error) => {
      const cause = error?.cause;

      if (cause === "not_draft") {
        toast.error(
          "This workflow is no longer a draft and cannot be edited.",
          {
            id: "save-workflow",
          }
        );
        return;
      }

      toast.error("Something went wrong while saving.", {
        id: "save-workflow",
      });
      console.error(error);
    },
  });

  const save = React.useCallback(() => {
    const workflowDefinition = JSON.stringify(toObject());
    toast.loading("Saving...", { id: "save-workflow" });

    const payload: UpdateWorkflowPayload = {
      id: workflowId,
      definition: workflowDefinition,
    };

    saveMutation.mutate(payload);
  }, [toObject, workflowId, saveMutation]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!saveMutation.isPending) {
          save();
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [save, saveMutation.isPending]);

  return (
    <TooltipWrapper content="Or use Cmd+S / Ctrl+S">
      <Button
        disabled={saveMutation.isPending}
        variant={"outline"}
        className="flex items-center gap-2"
        onClick={save}
      >
        <CheckIcon size={16} className="stroke-green-400" />
        Save My Flow
      </Button>
    </TooltipWrapper>
  );
}

export default SaveBtn;
