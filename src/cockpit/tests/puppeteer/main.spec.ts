import test from "ava";
import withPage from "./_withPage";

const url = "http://localhost:1234";

test.skip("home page", withPage, async (t, page) => {
  await page.goto(url);
  t.true((await page.title()).includes("GlobeTrotte"));
});
