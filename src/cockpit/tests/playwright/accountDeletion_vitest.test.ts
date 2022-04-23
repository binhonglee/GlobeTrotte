import { afterAll, describe, test } from "vitest";
import {
  genDeleteAccount,
  genIsLoggedIn,
  genIsLoggedOut,
  genLogin,
  genLogout,
  genRegister,
  PlaywrightEnv,
} from "../playwrightHelper";

const username = "testuserusername";
const email = "accountDeletionTest@globetrotte.com";
const password = "hunter2";
const wrongEmail = "abcd@globetrotte.com";
const wrongPassword = "hunter3";

describe("User account", async () => {
  const env = await PlaywrightEnv.genCreate("user_account", "/");
  const page = env.getPage();

  afterAll(async () => {
    await env.genClose();
  }, 100000);

  test("Register", async () => {
    await genIsLoggedOut(page);
    await genRegister(page, username, email, password);
    await genIsLoggedIn(page);
  });

  test("Logout", async () => {
    await genIsLoggedIn(page);
    await genLogout(page);
    await genIsLoggedOut(page);
  });

  test("Wrong Email Login", async () => {
    await genIsLoggedOut(page);
    await genLogin(page, wrongEmail, password, true);
    await genIsLoggedOut(page);
    const texts = await page.locator(".n-message__content").allInnerTexts();
    expect(texts).contain("Wrong email or password. Please try again.");
  });

  test("Wrong Password Login", async () => {
    await genIsLoggedOut(page);
    await genLogin(page, email, wrongPassword, true);
    const message = await page.waitForSelector(".n-message__content");
    const texts = await message.innerText();
    expect(texts).contain("Wrong email or password. Please try again.");
    await genIsLoggedOut(page);
  });

  test("Wrong Everything Login", async () => {
    await genIsLoggedOut(page);
    await genLogin(page, wrongEmail, wrongPassword, true);
    await genIsLoggedOut(page);
    const texts = await page.locator(".n-message__content").allInnerTexts();
    expect(texts).contain("Wrong email or password. Please try again.");
  });

  test("Login", async () => {
    await genIsLoggedOut(page);
    await genLogin(page, email, password);
    await genIsLoggedIn(page);
  });

  test("Delete Account", async () => {
    await genIsLoggedIn(page);
    await genDeleteAccount(page);
    await genIsLoggedOut(page);
  });
});
