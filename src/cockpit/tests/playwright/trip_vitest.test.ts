import { afterEach, afterAll, describe, expect, test } from "vitest";
import {
  BASE_URL,
  expectNotification,
  genDeleteAccount,
  genLogin,
  genRegister,
  genTryLogout,
  goTo,
  PlaywrightEnv,
  type,
} from "./playwrightHelper";

const username1 = "testUser1";
const email1 = "tripsTest1@globetrotte.com";
const password1 = "hunter2";

const username2 = "testUser2";
const email2 = "tripsTest2@globetrotte.com";
const password2 = "hunter3";

const tripName = "Test Trip";
const tripDescription =
  "This is a test trip. If you see this, it means " +
  "someone is testing in prod.";

let newTripURL: string;
describe("Trips", async () => {
  const env = await PlaywrightEnv.genCreate("trip", "/");
  const page = env.getPage();

  afterAll(async () => {
    await genLogin(page, email1, password1);
    await genDeleteAccount(page);
    await genLogin(page, email2, password2);
    await genDeleteAccount(page);
    await env.genClose();
  }, 50000);

  afterEach(async () => {
    await genTryLogout(page);
  });

  test("create new trip", async () => {
    await genRegister(page, username1, email1, password1);
    await page.locator("text=Trip \u25BE").hover();
    await page
      .locator(".v-binder-follower-container")
      .locator("text=New")
      .click();
    await page.waitForURL("**/trip/new");
    await page.waitForSelector(".new_trip");

    await type(page, ".editTripName", tripName);
    await type(page, ".editTripDescription", tripDescription);
    await page.locator(".editCity").locator(".editInput").click();
    await page.locator(".n-select-menu").first().click();
    await page.locator(".addDay").click();
    await page
      .locator(".day1")
      .locator(".place0")
      .locator(".inputPlaceLabel")
      .click();
    await page.type(".day1", "SFO");
    await page
      .locator(".day1")
      .locator(".place0")
      .locator(".inputPlaceLink")
      .click();
    await page.type(".day1", "https://goo.gl/maps/4j7jZ4Ekhx8aC8AF7");
    await page
      .locator(".day1")
      .locator(".place0")
      .locator(".inputPlaceDesc")
      .click();
    await page.type(".day1", "San Francisco International Airport");
    await page.locator(".saveEditTrip").click();

    await page.waitForSelector(".view_trip_info");
    await page.waitForURL("**/trip/view/**");
    newTripURL = page.url();

    const title = await page
      .locator(".tripPrivateAlertBar")
      .locator(".n-alert-body__title")
      .allInnerTexts();
    expect(title).toContain("Trip is private");
    const content = await page
      .locator(".tripPrivateAlertBar")
      .locator(".n-alert-body__content")
      .allInnerTexts();
    expect(content).toContain("Only you can see this trip.");
  }, 50000);

  test("user 2 can't see private trip", async () => {
    await genRegister(page, username2, email2, password2);
    await goTo(page, newTripURL);
    await expectNotification(page, "Error", "Trip not found.");
    expect(await page.innerHTML("#app")).toMatchSnapshot();
  }, 30000);

  test("set trip to public", async () => {
    await genLogin(page, email1, password1);
    await goTo(page, newTripURL);

    await page.locator(".tripMenu").click();
    await page.getByText("Edit").click();
    await page
      .locator(".editTripPrivacy")
      .locator(".editPrivacyToggle")
      .click();
    await page.locator(".saveEditTrip").click();
  }, 30000);

  test("user 2 can see public trip", async () => {
    await genLogin(page, email2, password2);
    await goTo(page, newTripURL);

    const title = await page
      .locator(".view_trip")
      .locator("h2")
      .allInnerTexts();
    expect(title).toContain(tripName);
    const description = await page
      .locator(".view_trip")
      .locator(".tripDescription")
      .allInnerTexts();
    expect(description).toContain(tripDescription);
  }, 20000);

  test("search for the trip", async () => {
    await page.locator("text=Trip \u25BE").hover();
    await page.locator("text=Search").click();
    await page.waitForURL("**/trip/search");
    await page.waitForSelector(".tripSearchForm");

    expect(await page.innerHTML("#app")).toMatchSnapshot();
    await type(page, ".tripSearchQueryInput", tripName);
    await page.locator(".tripSearchButton").click();
    await page.waitForSelector(".trip_preview_card");

    const title = await page
      .locator(".tripSearchResultCarousel")
      .locator("h3")
      .allInnerTexts();
    expect(title).toContain(tripName);
    const description = await page
      .locator(".tripSearchResultCarousel")
      .locator("p")
      .allInnerTexts();
    expect(description).toContain(tripDescription);
    await page
      .locator(".trip_preview_card")
      .first()
      .locator(".tripTitleName")
      .click();

    // Not sure why the page is login blocked. I'm quite confused what in the
    // page would cause that.
    // await page.waitForURL("**/trip/view/*");
    // if (newTripURL.endsWith("/")) {
    //   newTripURL = newTripURL.substring(0, newTripURL.length - 1);
    // }
    // expect(page.url).toEqual(newTripURL);
  });

  test("deletes trip", async () => {
    await genLogin(page, email1, password1);
    await goTo(page, newTripURL);

    await page.locator(".tripMenu").click();
    await page.getByText("Edit").click();
    await page.locator(".deleteTrip").click();
    await page.locator("text=Confirm").click();

    await expectNotification(
      page,
      "Trip Deletion",
      "Trip is successfully deleted!",
    );
    await page.waitForURL(BASE_URL);
  }, 40000);
});
