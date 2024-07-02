import createHeadlessService from "~/server/service/headless";

const headlessService = await createHeadlessService();

export default defineLazyEventHandler(() => {
  return defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { url } = body;
    await headlessService.initBrowserContext(url);
    return url;
  });
});
