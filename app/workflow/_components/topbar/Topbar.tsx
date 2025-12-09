"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import SaveBtn from "./SaveBtn";
import ExecuteBtn from "./ExecuteBtn";
import NavigationTabs from "./NavigationTabs";
import PublishBtn from "./PublishBtn";
import UnpublishBtn from "./UnpublishBtn";

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  executionPage?: boolean;
  goBack?: boolean;
  showNavigation?: boolean;
  isPublished?: boolean;
}

function Topbar({
  title,
  subtitle,
  workflowId,
  hideButtons,
  executionPage,
  goBack,
  showNavigation,
  isPublished = false,
}: Props) {
  const router = useRouter();
  return (
    <header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={
              goBack
                ? () => {
                    router.back();
                  }
                : () => {
                    router.push("/workflows");
                  }
            }
          >
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="text-primary text-xs flex gap-2 text-center items-center px-9">
        {executionPage === false && showNavigation === false && (
          <>
            <InfoIcon size={16} />

            <p>Cmd+S / Ctrl+S also saves!</p>
          </>
        )}
      </div>
      {showNavigation && <NavigationTabs workflowId={workflowId} />}
      <div className="flex gap-1 flex-1 justify-end">
        {hideButtons === false && (
          <>
            {isPublished && (
              <div className="text-primary text-xs flex gap-2 text-center items-center px-9">
                <InfoIcon size={16} />
                <p className="text-xs whitespace-nowrap">
                  This workflow will run the published plan <b>only</b>. No new
                  changes will be saved.
                </p>
              </div>
            )}

            <ExecuteBtn workflowId={workflowId} />
            {isPublished && <UnpublishBtn workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveBtn workflowId={workflowId} />
                <PublishBtn workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Topbar;
