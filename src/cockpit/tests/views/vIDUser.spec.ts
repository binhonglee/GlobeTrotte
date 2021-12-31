import vIDUser from "@/views/vIDUser.vue";
import General from "@/shared/General";
import { alertSpy, mountingOptions, routerSpy, wait } from "../helper";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import sinon from "sinon";
import UserObj from "@/wings/UserObj";
import Routing from "@/shared/Routing";
import Routes from "@/routes";

const currentUser = new UserObj({
  id: 10,
  details: {
    id: 10,
    name: "MyAccount Test User",
    email: "testmyaccount@globetrotte.com",
  },
  trips: [
    {
      id: 5,
    },
  ],
});

describe("vIDUser", () => {
  it("Get User - Has user (self)", async () => {
    const genUser = sinon.stub(General, "genUser").resolves(currentUser);
    const isSelf = sinon.stub(General, "getIsCurrentUser").returns(true);
    const paramID = sinon.stub(General, "paramID").returns("10");
    const redirection = sinon.stub(Routing, "genRedirectTo").resolves();
    const wrapper = mount(vIDUser, mountingOptions());
    await wait(500);
    expect(wrapper.find(".title").text()).toEqual(currentUser.details.name);
    expect(paramID.called).toBeTruthy();
    expect(isSelf.calledOnce).toBeTruthy;
    expect(isSelf.args[0][0]).toEqual(10);
    expect(redirection.calledOnce).toBeTruthy();
    expect(redirection.args[0][0]).toEqual(Routes.MyAccount);
    expect(genUser.calledOnce).toBeTruthy();
    await genUser.restore();
    await isSelf.restore();
    await redirection.restore();
    await paramID.restore();
  });

  it("Get User - Has user (not self)", async () => {
    const genUser = sinon.stub(General, "genUser").resolves(currentUser);
    const isSelf = sinon.stub(General, "getIsCurrentUser").returns(false);
    const paramID = sinon.stub(General, "paramID").returns("10");
    const wrapper = mount(vIDUser, mountingOptions());
    await wait(500);
    expect(wrapper.find(".title").text()).toEqual(currentUser.details.name);
    expect(paramID.called).toBeTruthy();
    expect(isSelf.calledOnce).toBeTruthy();
    expect(isSelf.args[0][0]).toEqual(10);
    expect(genUser.calledOnce).toBeTruthy();
    await genUser.restore();
    await isSelf.restore();
    await paramID.restore();
  });

  it("Get User - Not found", async () => {
    const genUser = sinon.stub(General, "genUser").callsFake(async () => {
      // This is so there is enough time for alertSpy to be
      // created before it reaches the alert code
      await wait(500);
      return new UserObj({
        id: -1,
      });
    });
    const paramID = sinon.stub(General, "paramID").returns("10");
    const wrapper = mount(vIDUser, mountingOptions());
    const alert = new alertSpy(wrapper);
    await wait(500);
    expect(paramID.called).toBeTruthy();
    expect(genUser.calledOnce).toBeTruthy();
    expect(alert.item.calledOnce).toBeTruthy();
    expect(alert.getTitle()).toEqual("Error");
    expect(alert.getMessage()).toEqual("User not found.");
    expect(alert.getOptions("confirmButtonText")).toEqual("OK");
    await genUser.restore();
    await paramID.restore();
    await alert.restore();
  });

  // Somehow this doesn't work. Not sure why.
  // it("Get User - No Param", async () => {
  //   const paramID = sinon.stub(General, "paramID").returns(undefined);
  //   mount(vIDUser, mountingOptions());
  //   await wait(500);
  //   expect(paramID.calledOnce).toBeTruthy();
  //   await paramID.restore();
  // });
});
