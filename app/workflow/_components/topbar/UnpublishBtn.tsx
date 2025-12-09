"use client";

import { UnpublishWorkflow } from "@/actions/workflows/unpublishWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadCloudIcon, UploadCloudIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function UnpublishBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return UnpublishWorkflow(id);
    },
    onSuccess: () => {
      toast.success("Workflow unpublished!", { id: workflowId });
    },
    onError: (error) => {
      toast.error("Something went wrong", { id: workflowId });

      console.error(error);
    },
  });
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Unpublishing....", { id: workflowId });

        mutation.mutate(workflowId);
      }}
    >
      <DownloadCloudIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  );
}

export default UnpublishBtn;
