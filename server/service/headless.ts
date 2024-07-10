import {
  chromium,
  Browser,
  BrowserContext,
  devices,
  Page,
} from "playwright-chromium";
import { resolve } from "node:dns/promises";
import { parseURL } from "ufo";
import Groq from "groq-sdk";
import { createSummaryPrompt } from "./prompt";
import sanitizeHtml from "sanitize-html";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import markdownit from "markdown-it";

const md = markdownit();

class HeadlessService {
  browser!: Browser | null;
  browserContext!: BrowserContext;
  groq!: Groq;
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
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async summaryContent(content: string) {
    const prompt = createSummaryPrompt(content);
    const text = await this.GenAdapterWithGroq(prompt);
    return text;
  }

  async GenAdapterWithGroq(prompt: string) {
    const completion = await this.groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "mixtral-8x7b-32768",
    });
    return completion.choices[0]?.message?.content || "";
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
    // 将Base64字符串转换为Data URL
    const bigDataUrl = `data:image/png;base64,${bigBase64Image}`;

    return bigDataUrl;
  }

  async genCleanPageContent(page: Page) {
    const dirtyHtml = await page.content();
    const cleanHtml = sanitizeHtml(dirtyHtml, {
      allowedTags: [],
      nonTextTags: ["script", "style", "button", "iframe"],
      exclusiveFilter(frame) {
        return frame.tag === "div" && frame.attribs?.role === "dialog";
      },
    });
    const dom = new JSDOM(cleanHtml);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    return article?.textContent || cleanHtml;
  }

  async getPageInfo(page: Page) {
    const title = await page.title();
    // 获取页面描述
    const description = await page.$eval("meta[name='description']", (el) =>
      el.getAttribute("content")
    );
    const content = await this.genCleanPageContent(page);
    const text = await this.summaryContent(content!);
    return {
      title,
      description,
      summary: md.render(text),
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
