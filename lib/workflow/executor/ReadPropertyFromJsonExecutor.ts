import { ExecutionEnvironment } from "@/types/executor";

import { ClickElementTask } from "../task/ClickElement";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJsonExecutor(
  environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("input->JSON not defined");
    }
    const propertyName = environment.getInput("Property Name");
    if (!propertyName) {
      environment.log.error("input->propertyName not defined");
    }

    const json = JSON.parse(jsonData);
    const propertyValue = json[propertyName];
    if (propertyValue === undefined) {
      environment.log.error("Property not found");
      return false;
    }

    environment.setOutput("Property Value", propertyValue);

    environment.log.info("Element has been clicked succesfully");
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
