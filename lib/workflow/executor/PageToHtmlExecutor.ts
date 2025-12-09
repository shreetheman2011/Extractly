import { ExecutionEnvironment } from "@/types/executor";
import { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
  environment: ExecutionEnvironment<typeof PageToHtmlTask>
): Promise<boolean> {
  try {
    environment.log.info("Scraping for HTML");
    const html = await environment.getPage()!.content();
    environment.setOutput("Html", html);
    environment.log.info("HTML found");
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
