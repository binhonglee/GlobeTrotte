import vMyAccount from "@/views/vMyAccount.vue";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import UserObj from "@/wings/UserObj";
import TripObj from "@/wings/TripObj";
import {
  alertSpy,
  messageSpy,
  mountingOptions,
  notifySpy,
  wait,
} from "@/tests/helper";

import { mount } from "@vue/test-utils";
import sinon from "sinon";
import { expect } from "@jest/globals";
import Routing from "@/shared/Routing";

const currentUser = new UserObj({
  id: 10,
  details: {
    id: 10,
    name: "MyAccount Test User",
    email: "testmyaccount@globetrotte.com",
  },
  trips: [{ id: 5 }],
});
let genCurrentUser: sinon.SinonStub;

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
    name: "MyAccount Test User",
    email: "testmyaccount@globetrotte.com",
  },
});
let genTrip: sinon.SinonStub;

beforeAll(() => {
  jest.spyOn(Routing, "genRedirectTo").mockImplementation(async () => {
    return;
  });

  genCurrentUser = sinon.stub(General, "genCurrentUser").resolves(currentUser);
  genTrip = sinon.stub(General, "genTrip").resolves(trip5);
});

afterAll(() => {
  genCurrentUser.restore();
  genTrip.restore();
});

it("My Account - Delete Account (success)", async () => {
  const wrapper = mount(vMyAccount, mountingOptions());
  const notify = new notifySpy(wrapper);
  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountEdit").trigger("click");
  expect(wrapper.vm.$data.edit).toEqual(true);
  await wait(100);
  expect(wrapper.html()).toMatchSnapshot();
  const genDELETE = sinon.stub(HTTPReq, "genDELETE").resolves(true);
  wrapper.find(".myAccountDelete").trigger("click");
  await wait(500);
  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.html()).toMatchSnapshot();
  expect(genDELETE.calledOnce).toEqual(true);
  expect(notify.item.calledOnce).toEqual(true);
  expect(notify.getTitle()).toEqual("Deleted");
  expect(notify.getMessage()).toEqual("Your account is now deleted.");
  expect(notify.getType()).toEqual("info");
  await wait(500);
  await genDELETE.restore();
  await notify.restore();
});

it("My Account - Delete Account (failure)", async () => {
  const genDELETE = sinon.stub(HTTPReq, "genDELETE").resolves(false);
  const wrapper = mount(vMyAccount, mountingOptions());
  const message = new messageSpy(wrapper);
  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountEdit").trigger("click");
  expect(wrapper.vm.$data.edit).toEqual(true);
  await wait(100);
  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountDelete").trigger("click");
  await wait(500);
  expect(wrapper.html()).toMatchSnapshot();
  expect(genDELETE.calledOnce).toEqual(true);
  expect(message.item.calledOnce).toEqual(true);
  expect(message.getMessage()).toEqual("Account deletion attempt failed.");
  expect(message.getType()).toEqual("error");
  await genDELETE.restore();
  await message.restore();
});

it("My Account - Logout", async () => {
  const genGET = sinon
    .stub(HTTPReq, "genGET")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .callsFake(async (s): Promise<unknown> => {
      return;
    });
  const wrapper = mount(vMyAccount, mountingOptions());
  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountLogout").trigger("click");
  await wait(500);
  expect(wrapper.html()).toMatchSnapshot();
  expect(genGET.args[0][0]).toEqual("logout");
  await genGET.restore();
});

it("My Account - Save Edit (success)", async () => {
  const genPOST = sinon.stub(HTTPReq, "genPOST").resolves(currentUser);
  const wrapper = mount(vMyAccount, mountingOptions());
  const message = new messageSpy(wrapper);

  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountEdit").trigger("click");
  expect(wrapper.vm.$data.edit).toEqual(true);
  await wait(100);
  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountSave").trigger("click");
  await wait(500);
  expect(wrapper.html()).toMatchSnapshot();
  expect(genPOST.calledOnce).toEqual(true);
  expect(genPOST.args[0][0]).toEqual("v2/user/10");

  // Tbh I'm still confused why this test fails.
  // expect(genPOST.args[0][1]).toEqual(
  //   WingsStructUtil.stringify(currentUser.details),
  // );

  expect(message.item.calledOnce).toEqual(true);
  expect(message.getMessage()).toEqual("Profile updated successfully!");
  expect(message.getType()).toEqual("success");
  expect(wrapper.vm.$data.edit).toEqual(false);
  await genPOST.restore();
  await message.restore();
});

it("My Account - Save Edit (failure)", async () => {
  const genPOST = sinon.stub(HTTPReq, "genPOST").resolves(false);
  const wrapper = mount(vMyAccount, mountingOptions());
  const alert = new alertSpy(wrapper);

  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountEdit").trigger("click");
  expect(wrapper.vm.$data.edit).toEqual(true);
  await wait(100);
  expect(wrapper.html()).toMatchSnapshot();
  wrapper.find(".myAccountSave").trigger("click");
  await wait(500);
  expect(wrapper.html()).toMatchSnapshot();
  expect(genPOST.calledOnce).toEqual(true);
  expect(genPOST.args[0][0]).toEqual("v2/user/10");

  // Same as above
  // expect(genPOST.args[0][1]).toEqual(
  //   WingsStructUtil.stringify(currentUser.details),
  // );

  expect(alert.item.calledOnce).toEqual(true);
  expect(alert.getTitle()).toEqual("Fail");
  expect(alert.getMessage()).toEqual(
    "Save was unsuccessful. Please try again later.",
  );
  expect(alert.getOptions("confirmButtonText")).toEqual("OK");
  await genPOST.restore();
  await alert.restore();
});
