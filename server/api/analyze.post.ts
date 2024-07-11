import createHeadlessService from "~/server/service/headless";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const headlessService = await createHeadlessService();
  const { url } = body;
  return await headlessService.analysisFromUrl(url);
});
