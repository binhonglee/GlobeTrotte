import VGetUser from "@/views/VGetUser.vue";
import General from "@/shared/General";
import Trip from "@/wings/Trip";
import User from "@/wings/User";
import { alertSpy, newLocalVueAndRouter, routerSpy, wait } from "../helper";
import { mount } from "@vue/test-utils";
import sinon from "sinon";
import test from "ava";

const currentUser = new User({
  id: 10,
  name: "MyAccount Test User",
  email: "testmyaccount@globetrotte.com",
  trips: [5],
});
const someTrip = new Trip({
  id: 5,
});

test.serial("Get User - Has user (self)", async (t) => {
  const genUser = sinon.stub(General, "genUser").resolves(currentUser);
  const genTrip = sinon.stub(General, "genTrip").resolves(someTrip);
  const isSelf = sinon.stub(General, "getIsCurrentUser").returns(true);
  const paramID = sinon.stub(General, "paramID").returns("10");
  const wrapper = mount(VGetUser, newLocalVueAndRouter());
  const routerPush = new routerSpy(wrapper, "push");
  await wait(500);
  t.true(paramID.called);
  t.true(isSelf.calledOnce);
  t.is(isSelf.args[0][0], 10);
  t.true(routerPush.item.calledOnce);
  t.is(routerPush.getArg(), "/myaccount");
  t.true(genUser.calledOnce);
  t.true(genTrip.calledOnce);
  await genUser.restore();
  await genTrip.restore();
  await isSelf.restore();
  await routerPush.restore();
  await paramID.restore();
});

test.serial("Get User - Has user (not self)", async (t) => {
  const genUser = sinon.stub(General, "genUser").resolves(currentUser);
  const genTrip = sinon.stub(General, "genTrip").resolves(someTrip);
  const isSelf = sinon.stub(General, "getIsCurrentUser").returns(false);
  const paramID = sinon.stub(General, "paramID").returns("10");
  mount(VGetUser, newLocalVueAndRouter());
  await wait(500);
  t.true(paramID.called);
  t.true(isSelf.calledOnce);
  t.is(isSelf.args[0][0], 10);
  t.true(genUser.calledOnce);
  t.true(genTrip.calledOnce);
  await genUser.restore();
  await genTrip.restore();
  await isSelf.restore();
  await paramID.restore();
});

test.serial("Get User - Not found", async (t) => {
  const genUser = sinon.stub(General, "genUser").callsFake(async () => {
    // This is so there is enough time for alertSpy to be
    // created before it reaches the alert code
    await wait(500);
    return new User({
      id: -1,
    });
  });
  const paramID = sinon.stub(General, "paramID").returns("10");
  const wrapper = mount(VGetUser, newLocalVueAndRouter());
  const alert = new alertSpy(wrapper);
  await wait(500);
  t.true(paramID.called);
  t.true(genUser.calledOnce);
  t.true(alert.item.calledOnce);
  t.is(alert.getTitle(), "Error");
  t.is(alert.getMessage(), "User not found.");
  t.is(alert.getOptions("confirmButtonText"), "OK");
  await genUser.restore();
  await paramID.restore();
  await alert.restore();
});

test.serial("Get User - No Param", async (t) => {
  const paramID = sinon.stub(General, "paramID").returns(undefined);
  const wrapper = mount(VGetUser, newLocalVueAndRouter());
  await wait(500);
  t.true(paramID.calledOnce);
  t.is(wrapper.vm.$data.user.name, "");
  await paramID.restore();
});
