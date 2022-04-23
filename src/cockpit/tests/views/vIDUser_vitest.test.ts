import vIDUser from "@/views/vIDUser.vue";
import General from "@/shared/General";
import { getFetchedUserObj, mountingOptions, wait } from "../helper";
import { stub } from "../vitestSpy";
import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import UserObj from "@/wings/UserObj";
import TripObj from "@/wings/TripObj";
import NaiveUtils from "@/shared/NaiveUtils";
import { UserCache } from "@/cache/UserCache";

const rawTrip5 = {
  id: 5,
  details: {
    id: 5,
    name: "some title",
    description: "",
    private: false,
  },
  time_created: "2020-12-31T00:00:00.888-08:00",
  last_updated: "2020-12-31T00:00:00.888-08:00",
  user: {
    id: 10,
    username: "testmockuseraccount",
    name: "MyAccount Test User",
    email: "testmyaccount@globetrotte.com",
  },
};

const unconfirmedUser = new UserObj({
  id: 10,
  details: {
    id: 10,
    username: "testmockuseraccount",
    name: "MyAccount Test User",
    email: "testmyaccount@globetrotte.com",
    confirmed: false,
  },
  trips: [rawTrip5],
});

const currentUser = new UserObj({
  id: 10,
  details: {
    id: 10,
    username: "testmockuseraccount",
    name: "MyAccount Test User",
    email: "testmyaccount@globetrotte.com",
    confirmed: true,
  },
  trips: [rawTrip5],
});

describe("vIDUser", () => {
  test("Get User - Has user (self, confirmed)", async () => {
    const genUser = stub(vi.spyOn(UserCache, "genUserFromUsername")).resolves(
      getFetchedUserObj(unconfirmedUser),
    );
    const isSelf = stub(vi.spyOn(General, "getIsCurrentUser")).returns(true);
    const paramID = stub(vi.spyOn(General, "paramID")).returns(
      unconfirmedUser.details.username,
    );
    const wrapper = mount(vIDUser, mountingOptions());
    await wait(0);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toEqual(unconfirmedUser.details.name);
    expect(paramID.called()).toBeTruthy();
    expect(isSelf.calledOnce()).toBeTruthy;
    expect(isSelf.args()[0][0]).toEqual(10);
    expect(genUser.calledOnce()).toBeTruthy();
    await genUser.restore();
    await isSelf.restore();
    await paramID.restore();
  });

  test("Get User - Has user (self, unconfirmed)", async () => {
    const genUser = stub(vi.spyOn(UserCache, "genUserFromUsername")).resolves(
      getFetchedUserObj(currentUser),
    );
    const isSelf = stub(vi.spyOn(General, "getIsCurrentUser")).returns(true);
    const paramID = stub(vi.spyOn(General, "paramID")).returns(
      currentUser.details.username,
    );
    const wrapper = mount(vIDUser, mountingOptions());
    await wait(0);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toEqual(currentUser.details.name);
    expect(paramID.called()).toBeTruthy();
    expect(isSelf.calledOnce()).toBeTruthy;
    expect(isSelf.args()[0][0]).toEqual(10);
    expect(genUser.calledOnce()).toBeTruthy();
    await genUser.restore();
    await isSelf.restore();
    await paramID.restore();
  });

  test("Get User - Has user (not self)", async () => {
    const genUser = stub(vi.spyOn(UserCache, "genUserFromUsername")).resolves(
      getFetchedUserObj(currentUser),
    );
    const isSelf = stub(vi.spyOn(General, "getIsCurrentUser")).returns(false);
    const paramID = stub(vi.spyOn(General, "paramID")).returns(
      currentUser.details.username,
    );
    const wrapper = mount(vIDUser, mountingOptions());
    await wait(10);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toEqual(currentUser.details.name);
    expect(paramID.called()).toBeTruthy();
    expect(isSelf.calledOnce()).toBeTruthy();
    expect(isSelf.args()[0][0]).toEqual(10);
    expect(genUser.calledOnce()).toBeTruthy();
    await genUser.restore();
    await isSelf.restore();
    await paramID.restore();
  });

  test("Get User - Not found", async () => {
    const genUser = stub(vi.spyOn(UserCache, "genUserFromUsername")).callsFake(
      async () => {
        // This is so there is enough time for alertSpy to be
        // created before it reaches the alert code
        await wait(0);
        return getFetchedUserObj(
          new UserObj({
            id: -1,
          }),
        );
      },
    );
    const paramID = stub(vi.spyOn(General, "paramID")).returns(
      currentUser.details.username,
    );
    const wrapper = mount(vIDUser, mountingOptions());
    const alert = stub(vi.spyOn(NaiveUtils, "dialogError"));
    await wait(0);
    expect(wrapper.html()).toMatchSnapshot();
    expect(paramID.called()).toBeTruthy();
    expect(genUser.calledOnce()).toBeTruthy();
    expect(alert.calledOnce()).toBeTruthy();
    const alertArgs = alert.args()[0][0] as Record<string, unknown>;
    expect(alertArgs["title"]).toEqual("User not found");
    expect(alertArgs["content"]).toEqual(
      "The user you are looking for does not exist.",
    );
    expect(alertArgs["positiveText"]).toEqual("OK");
    await genUser.restore();
    await paramID.restore();
    await alert.restore();
  });

  test("Get User - No Param", async () => {
    const paramID = stub(vi.spyOn(General, "paramID")).returns(undefined);
    const wrapper = mount(vIDUser, mountingOptions());
    await wait(0);
    expect(wrapper.html()).toMatchSnapshot();
    expect(paramID.calledOnce()).toBeTruthy();
    await paramID.restore();
  });
});
