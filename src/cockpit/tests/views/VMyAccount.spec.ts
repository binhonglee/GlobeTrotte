import VMyAccount from "@/views/VMyAccount.vue";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import UserObj from "@/wings/UserObj";
import {
  alertSpy,
  messageSpy,
  newLocalVueAndRouter,
  notifySpy,
  routerSpy,
  wait,
} from "../helper";

import { mount } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
import sinon from "sinon";
import test from "ava";

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

test.serial.before(() => {
  genCurrentUser = sinon
    .stub(General, "genCurrentUserV2")
    .resolves(currentUser);
});

test.serial.after((t) => {
  t.true(genCurrentUser.called);
  genCurrentUser.restore();
});

test.serial("My Account - Delete Account (success)", async (t) => {
  const genDELETE = sinon.stub(HTTPReq, "genDELETE").resolves(true);
  const wrapper = mount(VMyAccount, newLocalVueAndRouter());
  wrapper.vm.$router.push("/myaccount");
  const notify = new notifySpy(wrapper);
  const routerPush = new routerSpy(wrapper, "push");

  wrapper.find(".myAccountEdit").trigger("click");
  t.true(wrapper.vm.$data.edit);
  await wait(100);
  wrapper.find(".myAccountDelete").trigger("click");
  await wait(500);
  t.true(genDELETE.calledOnce);
  t.true(notify.item.calledOnce);
  t.is(notify.getTitle(), "Deleted");
  t.is(notify.getMessage(), "Your account is now deleted.");
  t.is(notify.getType(), "info");
  await wait(500);
  t.true(routerPush.item.calledOnce);
  t.is(routerPush.getArg(), "/");
  await genDELETE.restore();
  await notify.restore();
  await routerPush.restore();
});

test.serial("My Account - Delete Account (failure)", async (t) => {
  const genDELETE = sinon.stub(HTTPReq, "genDELETE").resolves(false);
  const wrapper = mount(VMyAccount, newLocalVueAndRouter());
  const message = new messageSpy(wrapper);
  wrapper.find(".myAccountEdit").trigger("click");
  t.true(wrapper.vm.$data.edit);
  await wait(100);
  wrapper.find(".myAccountDelete").trigger("click");
  await wait(500);
  t.true(genDELETE.calledOnce);
  t.true(message.item.calledOnce);
  t.is(message.getMessage(), "Account deletion attempt failed.");
  t.is(message.getType(), "error");
  await genDELETE.restore();
  await message.restore();
});

test.serial("My Account - Logout", async (t) => {
  const genGET = sinon.stub(HTTPReq, "genGET").resolves();
  const wrapper = mount(VMyAccount, newLocalVueAndRouter());
  wrapper.vm.$router.push("/myaccount");
  const routerPush = new routerSpy(wrapper, "push");
  wrapper.find(".myAccountLogout").trigger("click");
  await wait(500);
  t.true(genGET.calledOnce);
  t.true(routerPush.item.calledOnce);
  t.is(routerPush.getArg(), "/");
  await genGET.restore();
  await routerPush.restore();
});

test.serial("My Account - Save Edit (success)", async (t) => {
  const genPOST = sinon.stub(HTTPReq, "genPOST").resolves(true);
  const wrapper = mount(VMyAccount, newLocalVueAndRouter());
  const message = new messageSpy(wrapper);

  wrapper.find(".myAccountEdit").trigger("click");
  t.true(wrapper.vm.$data.edit);
  await wait(100);
  wrapper.find(".myAccountSave").trigger("click");
  await wait(500);
  t.true(genPOST.calledOnce);
  t.is(genPOST.args[0][1], "v2/user/10");
  t.is(genPOST.args[0][2], WingsStructUtil.stringify(currentUser.details));
  t.true(message.item.calledOnce);
  t.is(message.getMessage(), "Profile updated successfully!");
  t.is(message.getType(), "success");
  t.false(wrapper.vm.$data.edit);
  await genPOST.restore();
  await message.restore();
});

test.serial("My Account - Save Edit (failure)", async (t) => {
  const genPOST = sinon.stub(HTTPReq, "genPOST").resolves(false);
  const wrapper = mount(VMyAccount, newLocalVueAndRouter());
  const alert = new alertSpy(wrapper);

  wrapper.find(".myAccountEdit").trigger("click");
  t.true(wrapper.vm.$data.edit);
  await wait(100);
  wrapper.find(".myAccountSave").trigger("click");
  await wait(500);
  t.true(genPOST.calledOnce);
  t.is(genPOST.args[0][1], "v2/user/10");
  t.is(genPOST.args[0][2], WingsStructUtil.stringify(currentUser.details));
  t.true(alert.item.calledOnce);
  t.is(alert.getTitle(), "Fail");
  t.is(alert.getMessage(), "Save was unsuccessful. Please try again later.");
  t.is(alert.getOptions("confirmButtonText"), "OK");
  await genPOST.restore();
  await alert.restore();
});
