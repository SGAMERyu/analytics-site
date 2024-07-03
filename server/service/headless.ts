import {
  chromium,
  Browser,
  BrowserContext,
  devices,
  Page,
} from "playwright-chromium";

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
    const screenshot = await this.screenshotFromUrl(page);

    return { info, screenshot };
  }

  async screenshotFromUrl(page: Page) {
    await page.waitForLoadState("networkidle", { timeout: 5000 });
    await page.setViewportSize({
      width: 1440,
      height: 960,
    });
    const BigScreenshotBuffer = await page.screenshot();
    const bigBase64Image = BigScreenshotBuffer.toString("base64");
    await page.setViewportSize({
      width: 430,
      height: 932,
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
}

export default async function createHeadlessService() {
  const headlessService = new HeadlessService();
  await headlessService.initContext();
  return headlessService;
}
