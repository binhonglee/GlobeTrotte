import Routes from "@/routes";
import { describe, expect, test } from "vitest";
import { wait } from "../helper";
import { PlaywrightEnv } from "./playwrightHelper";

describe("Menubar", async () => {
  Object.values(Routes).forEach((url) => {
    test("menubar:" + url, async () => {
      const env = await PlaywrightEnv.genCreate("menubar", url);
      await wait(300);
      const page = env.getPage();
      const menubar = await page
        .locator(".main_menu")
        .locator(".n-menu-item")
        .allInnerTexts();
      expect(menubar[0]).toEqual("Home");
      expect(menubar[1]).toEqual("Dark mode\nLight mode");
      expect(menubar[2]).toEqual("Login");
      expect(menubar[3]).toEqual("Register");
      const tripMenu = await page
        .locator(".main_menu")
        .locator(".n-submenu")
        .locator(".n-menu-item-content")
        .allInnerTexts();
      expect(tripMenu[0]).toEqual("Trip \u25BE");
      await page
        .locator(".main_menu")
        .locator(".n-submenu")
        .locator(".n-menu-item-content")
        .hover();
      await wait(300);
      const dropdown = await page.locator("a").allInnerTexts();
      expect(dropdown).contain("Search");
      await env.genClose();
    });
  });
});

describe("Landing", async () => {
  test("title", async () => {
    const env = await PlaywrightEnv.genCreate("landing", "/");
    const page = env.getPage();
    const title = await page.waitForSelector("h1");
    expect(await title.innerText()).toEqual("GlobeTrotte");
    const description = await page.locator("h3").allInnerTexts();
    expect(description[0]).toEqual("Look for your next travel plan here!");
  });
});
