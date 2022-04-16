import vIDUser from "@/views/vIDUser.vue";
import General from "@/shared/General";
import { mountingOptions, wait } from "../helper";
import { alertSpy, stub } from "../vitestSpy";
import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import UserObj from "@/wings/UserObj";
import TripObj from "@/wings/TripObj";

const unconfirmedUser = new UserObj({
  id: 10,
  details: {
    id: 10,
    username: "testmockuseraccount",
    name: "MyAccount Test User",
    email: "testmyaccount@globetrotte.com",
    confirmed: false,
  },
  trips: [
    {
      id: 5,
    },
  ],
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
  trips: [
    {
      id: 5,
    },
  ],
});

const trip5 = new TripObj({
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
});

describe("vIDUser", () => {
  test("Get User - Has user (self, confirmed)", async () => {
    const genUser = stub(vi.spyOn(General, "genFromUsername")).resolves(
      unconfirmedUser,
    );
    const genTrip = stub(vi.spyOn(General, "genTrip")).resolves(trip5);
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
    expect(genTrip.calledOnce()).toBeTruthy();
    await genUser.restore();
    await genTrip.restore();
    await isSelf.restore();
    await paramID.restore();
  });

  test("Get User - Has user (self, unconfirmed)", async () => {
    const genUser = stub(vi.spyOn(General, "genFromUsername")).resolves(
      currentUser,
    );
    const genTrip = stub(vi.spyOn(General, "genTrip")).resolves(trip5);
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
    expect(genTrip.calledOnce()).toBeTruthy();
    await genUser.restore();
    await genTrip.restore();
    await isSelf.restore();
    await paramID.restore();
  });

  test("Get User - Has user (not self)", async () => {
    const genUser = stub(vi.spyOn(General, "genFromUsername")).resolves(
      currentUser,
    );
    const genTrip = stub(vi.spyOn(General, "genTrip")).resolves(trip5);
    const isSelf = stub(vi.spyOn(General, "getIsCurrentUser")).returns(false);
    const paramID = stub(vi.spyOn(General, "paramID")).returns(
      currentUser.details.username,
    );
    const wrapper = mount(vIDUser, mountingOptions());
    await wait(0);
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toEqual(currentUser.details.name);
    expect(paramID.called()).toBeTruthy();
    expect(isSelf.calledOnce()).toBeTruthy();
    expect(isSelf.args()[0][0]).toEqual(10);
    expect(genUser.calledOnce()).toBeTruthy();
    expect(genTrip.calledOnce()).toBeTruthy();
    await genUser.restore();
    await genTrip.restore();
    await isSelf.restore();
    await paramID.restore();
  });

  test("Get User - Not found", async () => {
    const genUser = stub(vi.spyOn(General, "genFromUsername")).callsFake(
      async () => {
        // This is so there is enough time for alertSpy to be
        // created before it reaches the alert code
        await wait(0);
        return new UserObj({
          id: -1,
        });
      },
    );
    const paramID = stub(vi.spyOn(General, "paramID")).returns(
      currentUser.details.username,
    );
    const wrapper = mount(vIDUser, mountingOptions());
    const alert = new alertSpy(wrapper);
    await wait(0);
    expect(wrapper.html()).toMatchSnapshot();
    expect(paramID.called()).toBeTruthy();
    expect(genUser.calledOnce()).toBeTruthy();
    expect(alert.calledOnce()).toBeTruthy();
    expect(alert.getTitle()).toEqual("Error");
    expect(alert.getMessage()).toEqual("User not found.");
    expect(alert.getOptions("confirmButtonText")).toEqual("OK");
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
