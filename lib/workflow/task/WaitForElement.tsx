import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { EyeIcon, MousePointerClickIcon } from "lucide-react";
export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: "Wait for element",
  icon: (props) => <EyeIcon className="stroke-amber-400" {...props} />,
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
    {
      name: "Visibility",
      type: TaskParamType.SELECT,
      hideHandle: true,
      helperText:
        "This determines if you are waiting for this element to become visible or to go hidden.",
      required: true,
      options: [
        { label: "Visible", value: "visible" },
        { label: "Hidden", value: "hidden" },
      ],
    },
  ] as const,
  outputs: [{ name: "Webpage", type: TaskParamType.BROWSER_INSTANCE }] as const,
} satisfies WorkflowTask;
