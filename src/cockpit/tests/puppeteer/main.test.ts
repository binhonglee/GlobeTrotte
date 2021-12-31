import { it, expect } from "@jest/globals";
import withPage from "./_withPage";

const url = "http://localhost:3000";

it("home page", withPage, async (t, page) => {
  await page.goto(url);
  expect((await page.title()).includes("GlobeTrotte")).toBeTruthy();
});
