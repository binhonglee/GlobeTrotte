import puppeteer from "puppeteer";
import pti from "puppeteer-to-istanbul";
import { ExecutionContext } from "ava";

export default async function (
  t: ExecutionContext,
  run: (
    t: ExecutionContext,
    page: pupppeteer.Page,
  ) => Promise<void>,
): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ]);
  try {
    await run(t, page);
  } finally {
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);
    pti.write([...jsCoverage, ...cssCoverage], {
      includeHostname: true,
      storagePath: "./.nyc_output",
    });
    await page.close();
    await browser.close();
  }
};
