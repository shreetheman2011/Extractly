import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  credits: 6,
  inputs: [
    {
      name: "Website URL",
      type: TaskParamType.STRING,
      helperText:
        "i.e: https://www.youtube.com. \nThis MUST be MANUALLY filled and MUST start with https://.",
      required: true,
      hideHandle: true,
    },
  ] as const,

  outputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
