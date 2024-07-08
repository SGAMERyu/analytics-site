import {
  chromium,
  Browser,
  BrowserContext,
  devices,
  Page,
} from "playwright-chromium";
import { resolve } from "node:dns/promises";
import { parseURL } from "ufo";

class HeadlessService {
  browser!: Browser | null;
  browserContext!: BrowserContext;
  constructor() {
    this.initContext();
  }

  async initContext() {
    this.browser = await chromium.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.browserContext = await this.browser?.newContext({
      ...devices["Desktop Chrome"],
      deviceScaleFactor: 2,
    });
  }

  async analysisFromUrl(url: string) {
    const page = await this.browserContext.newPage();
    await page.goto(url);
    const info = await this.getPageInfo(page);
    const screenshot = await this.screenshotFromUrl(page, url);
    const ip = await this.getWebsiteIp(url);
    return { info: { ...info, ip }, screenshot };
  }

  async screenshotFromUrl(page: Page, url: string) {
    await page.waitForLoadState("load", { timeout: 5000 });
    await page.setViewportSize({
      width: 1280,
      height: 720,
    });
    const BigScreenshotBuffer = await page.screenshot();
    const bigBase64Image = BigScreenshotBuffer.toString("base64");
    await page.setViewportSize({
      width: 438,
      height: 891,
    });
    const smallScreenshotBuffer = await page.screenshot();
    const smallBase64Image = smallScreenshotBuffer.toString("base64");
    // 将Base64字符串转换为Data URL
    const smallDataUrl = `data:image/png;base64,${smallBase64Image}`;

    // 将Base64字符串转换为Data URL
    const bigDataUrl = `data:image/png;base64,${bigBase64Image}`;

    return {
      smallDataUrl,
      bigDataUrl,
    };
  }

  async getPageInfo(page: Page) {
    const title = await page.title();
    // 获取页面描述
    const description = await page.$eval("meta[name='description']", (el) =>
      el.getAttribute("content")
    );
    return {
      title,
      description,
    };
  }

  async getWebsiteIp(url: string) {
    const { host } = parseURL(url);
    const ips = await resolve(host!, "A");
    const ip = ips[0];
    return ip;
  }
}

export default async function createHeadlessService() {
  const headlessService = new HeadlessService();
  await headlessService.initContext();
  return headlessService;
}
