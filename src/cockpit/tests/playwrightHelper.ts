/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Browser, BrowserContext, chromium, Page } from "playwright-core";
import { expect } from "vitest";

const BASE_URL = "http://localhost:3000/";
const PLAYWRIGHT_DIR = "playwright/";
const VIDEOS_DIR = "videos/";
const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;
export const LONG_DELAY = 2000;
export const SHORT_DELAY = 300;

class Chromium {
  // @ts-ignore: Initialized on genContext()
  private static browser: Browser;
  private static launched = false;

  private constructor() {
    // Do nothing 🤷‍♀️
  }

  public static async genContext(name: string): Promise<BrowserContext> {
    if (!this.launched) {
      this.browser = await chromium.launch();
      this.launched = true;
    }

    return await this.browser.newContext({
      baseURL: BASE_URL,
      recordVideo: {
        dir: PLAYWRIGHT_DIR + VIDEOS_DIR + name + "/",
        size: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
      },
      screen: { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
    });
  }
}

export class PlaywrightEnv {
  // @ts-ignore: Initialized on genCreate()
  private context: BrowserContext;
  // @ts-ignore: Initialized on genCreate()
  private page: Page;

  private constructor() {
    // Do nothing 🤷‍♀️
  }

  public static async genCreate(
    name: string,
    goto: string | null = null,
  ): Promise<PlaywrightEnv> {
    const env = new PlaywrightEnv();
    env.context = await Chromium.genContext(name);
    env.page = await env.context.newPage();
    if (goto !== null) {
      await env.page.goto(goto);
      await env.page.waitForLoadState("networkidle");
    }
    return env;
  }

  public getPage(): Page {
    return this.page;
  }

  public async genClose(): Promise<void> {
    await this.context.close();
  }
}

export async function type(page: Page, selector: string, content: string) {
  await page.click(selector);
  await page.type(selector, content);
}

export async function genRegister(
  page: Page,
  username: string,
  email: string,
  password: string,
  confirmed = true,
) {
  await page.goto("/register");
  await type(page, ".registrationName", "Test User (should not exist in prod)");
  await type(page, ".registrationUsername", username);
  await type(page, ".registrationEmail", email);
  await type(page, ".registrationPassword", password);
  await type(page, ".registrationConfPassword", password);
  await page.locator(".registrationSave").click();
  await page.waitForURL("**/unconfirmed/email/**");
  if (confirmed) {
    await page.goto("/confirm/email/force-confirm");
    await page.waitForURL(BASE_URL);
  }
}

function checkURL(page: Page, path: string): boolean {
  const urls = page.url().split("/");
  const paths = path.split("/");

  for (let i = 0; i < paths.length; i++) {
    if (i === paths.length - 1 && paths[0] === "") {
      continue;
    }

    if (urls[urls.length - i] !== paths[paths.length - i]) {
      return false;
    }
  }
  return true;
}

export async function genLogin(
  page: Page,
  email: string,
  password: string,
  skipCheck = false,
) {
  if (checkURL(page, "/login")) {
    await page.goto("/login");
  }

  await type(page, ".loginUsername", email);
  await type(page, ".loginPassword", password);
  await page.locator(".loginConfirm").click();
  await page.waitForLoadState("networkidle");
  if (!skipCheck) {
    await page.waitForURL(BASE_URL);
    expect(page.url()).not.toContain("/login");
  }
}

export async function genLogout(page: Page) {
  await page.goto("/myaccount");
  await page.locator(".myAccountLogout").click();
  await page.waitForURL(BASE_URL);
}

export async function genDeleteAccount(page: Page) {
  await page.goto("/myaccount");
  await page.locator(".myAccountEdit").click();
  await page.locator(".myAccountDelete").click();
  await page.locator(".n-button--warning-type").click();
  await page.waitForURL(BASE_URL);
}

export async function genIsLoggedOut(page: Page) {
  const menubar = await page
    .locator(".main_menu")
    .locator(".n-menu-item")
    .allInnerTexts();
  expect(menubar).toContain("Register");
  expect(menubar).toContain("Login");
  expect(menubar).not.toContain("My Account");
}

export async function genIsLoggedIn(page: Page) {
  const menubar = await page
    .locator(".main_menu")
    .locator(".n-menu-item")
    .allInnerTexts();
  expect(menubar).not.toContain("Register");
  expect(menubar).not.toContain("Login");
  expect(menubar).toContain("My Account");
}