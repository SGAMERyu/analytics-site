interface ScanRadarData {
  result: {
    time: string;
    url: string;
    uuid: string;
    visibility: string;
  };
}

const scanUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUND_FLARE_ACCOUNT_ID}/urlscanner/scan`;

export async function scanUrlWithCloudflareRadar(url: string) {
  const data: ScanRadarData = await $fetch(scanUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLOUD_FLARE_API_TOKEN}`,
    },
    body: {
      url,
    },
  });

  return data.result.uuid;
}

export async function getReportWithCloudflareRadar(id: string) {
  const report: any = await $fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUND_FLARE_ACCOUNT_ID}/urlscanner/scan/${id}`
  );
  return report.scan;
}
