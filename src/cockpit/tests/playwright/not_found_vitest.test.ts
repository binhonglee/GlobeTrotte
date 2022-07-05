import { describe, expect, test } from "vitest";
import { wait } from "../helper";
import { PlaywrightEnv } from "./playwrightHelper";

describe("404", async () => {
  const env = await PlaywrightEnv.genCreate("not_found", "/sdoighado");

  test("page_not_found", async () => {
    await wait(300);
    const page = env.getPage();
    const text = await page.locator("h3").allInnerTexts();
    expect(text[0]).toEqual("Uhh, there's nothing to see here...");
    await env.genClose();
  });
});
