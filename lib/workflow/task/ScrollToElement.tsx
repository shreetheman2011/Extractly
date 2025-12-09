import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { ArrowDownIcon } from "lucide-react";
export const ScrollToElementTask = {
  type: TaskType.SCROLL_TO_ELEMENT,
  label: "Scroll to Element",
  icon: (props) => <ArrowDownIcon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Webpage",
      type: TaskParamType.BROWSER_INSTANCE,
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
  ] as const,
  outputs: [{ name: "Webpage", type: TaskParamType.BROWSER_INSTANCE }] as const,
} satisfies WorkflowTask;
