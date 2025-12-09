import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import {
  DatabaseIcon,
  FileJson2Icon,
  MousePointerClickIcon,
} from "lucide-react";
export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: "Add Property to JSON",
  icon: (props) => <DatabaseIcon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "JSON",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Property Name",
      type: TaskParamType.STRING,
      helperText: "i.e: username",
    },
    {
      name: "Property Value",
      type: TaskParamType.STRING,
      helperText: "i.e: Tom",
    },
  ] as const,
  outputs: [
    { name: "Updated JSON Value", type: TaskParamType.STRING },
  ] as const,
} satisfies WorkflowTask;
