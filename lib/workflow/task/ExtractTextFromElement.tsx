import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from an element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      helperText:
        "This is the HTML code that is returned by the webcrawler when the Extract HTML task is completeted.",
      required: true,
      variant: "textarea",
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
  outputs: [{ name: "Extracted Text", type: TaskParamType.STRING }] as const,
} satisfies WorkflowTask;
