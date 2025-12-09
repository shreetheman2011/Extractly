import { ExecutionEnvironment } from "@/types/executor";

import { ClickElementTask } from "../task/ClickElement";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>
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
    const propertyValue = environment.getInput("Property Value");
    if (!propertyValue) {
      environment.log.error("input->propertyValue not defined");
    }

    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput("Updated JSON Value", JSON.stringify(json));

    environment.log.info("Element has been clicked succesfully");
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
