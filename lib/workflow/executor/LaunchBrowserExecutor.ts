import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import chromium from "@sparticuz/chromium-min";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");
  
const chromiumPackUrl = 'https://078h7zk6ohgtft0m.public.blob.vercel-storage.com/chromium-v143.0.0-pack.x64.tar'; 
    console.log("Got chromium pack URL");

const browser = await puppeteer.launch({devtools: true, headless: true,    executablePath: await chromium.executablePath(chromiumPackUrl),    args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],

});

    console.log("Launched chromium");


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
