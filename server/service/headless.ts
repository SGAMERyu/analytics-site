import { chromium, Browser, BrowserContext } from "playwright-chromium";

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
  }

  async initBrowserContext(url: string) {
    if (this.browser) {
      this.browserContext = await this.browser?.newContext();
      const page = await this.browserContext.newPage();
      page.goto(url);
    }
  }
}

export default async function createHeadlessService() {
  const headlessService = new HeadlessService();
  await headlessService.initContext();
  return headlessService;
}
