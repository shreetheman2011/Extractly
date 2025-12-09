import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, Edit3Icon, GlobeIcon, LucideProps } from "lucide-react";

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill Input",
  icon: (props) => <Edit3Icon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
      helperText:
        "This is the webpage that is returned by the webcrawler when the launch browser task is completeted.",
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      helperText:
        "This is the string that identifies an element in the DOM. i.e.: body > div > div > div.col-md-8 > h1 > a. You can also find this with our AI tools.",
      required: true,
      linkText: "How to find a selector",
      linkHref: "/tutorials/selector",
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      helperText: "Value that you want to fill the input with",
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
