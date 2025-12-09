import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { MailboxIcon } from "lucide-react";
export const DeliverViaWebhookTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: "Deliver Using Webhook",
  icon: (props) => <MailboxIcon className="stroke-blue-400" {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Body",
      type: TaskParamType.STRING,
      required: true,
      helperText:
        "This is what you want to send during the delivery(i.e: a sentence). \n This can connect to outputs like Extracted text",
    },
  ] as const,
  outputs: [] as const,
} satisfies WorkflowTask;
