import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import chromium from "@sparticuz/chromium";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
        const executablePath = await chromium.executablePath(); 

const browser = await puppeteer.launch({devtools: true, headless: true,executablePath: executablePath});
    


    environment.log.info("Browser started up successfully");

    environment.setBrowser(browser);
    const page = await browser.newPage();

    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened webpage at ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
