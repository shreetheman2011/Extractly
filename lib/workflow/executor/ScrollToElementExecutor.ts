import { ExecutionEnvironment } from "@/types/executor";

import { ScrollToElementTask } from "../task/ScrollToElement";

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("input->selector not defined");
    }

    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        environment.log.error("Selected element not found");
        throw new Error("element not found");
      }
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top });
    }, selector);

    environment.log.info("Scrolled to selected element");
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
