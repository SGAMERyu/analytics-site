import createHeadlessService from "~/server/service/headless";

export default defineLazyEventHandler(async () => {
  const headlessService = await createHeadlessService();

  return defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { url } = body;
    return await headlessService.analysisFromUrl(url);
  });
});
