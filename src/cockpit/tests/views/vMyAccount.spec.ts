import vMyAccount from "@/views/vMyAccount.vue";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import UserObj from "@/wings/UserObj";
import {
  alertSpy,
  messageSpy,
  mountingOptions,
  notifySpy,
  wait,
} from "@/tests/helper";

import { mount } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
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

describe("My Account", () => {
  beforeAll(() => {
    jest.spyOn(Routing, "genRedirectTo").mockImplementation(async () => {
      return;
    });

    genCurrentUser = sinon
      .stub(General, "genCurrentUser")
      .resolves(currentUser);
  });

  afterAll(() => {
    genCurrentUser.restore();
  });

  it("Delete Account (success)", async () => {
    const wrapper = mount(vMyAccount, mountingOptions());
    const notify = new notifySpy(wrapper);
    wrapper.find(".myAccountEdit").trigger("click");
    expect(wrapper.vm.$data.edit).toEqual(true);
    await wait(100);
    const genDELETE = sinon.stub(HTTPReq, "genDELETE").resolves(true);
    wrapper.find(".myAccountDelete").trigger("click");
    await wait(500);
    expect(genDELETE.calledOnce).toEqual(true);
    expect(notify.item.calledOnce).toEqual(true);
    expect(notify.getTitle()).toEqual("Deleted");
    expect(notify.getMessage()).toEqual("Your account is now deleted.");
    expect(notify.getType()).toEqual("info");
    await wait(500);
    await genDELETE.restore();
    await notify.restore();
  });

  it("Delete Account (failure)", async () => {
    const genDELETE = sinon.stub(HTTPReq, "genDELETE").resolves(false);
    const wrapper = mount(vMyAccount, mountingOptions());
    const message = new messageSpy(wrapper);
    wrapper.find(".myAccountEdit").trigger("click");
    expect(wrapper.vm.$data.edit).toEqual(true);
    await wait(100);
    wrapper.find(".myAccountDelete").trigger("click");
    await wait(500);
    expect(genDELETE.calledOnce).toEqual(true);
    expect(message.item.calledOnce).toEqual(true);
    expect(message.getMessage()).toEqual("Account deletion attempt failed.");
    expect(message.getType()).toEqual("error");
    await genDELETE.restore();
    await message.restore();
  });

  it("My Account - Logout", async () => {
    const genGET = sinon.stub(HTTPReq, "genGET").resolves();
    const wrapper = mount(vMyAccount, mountingOptions());
    wrapper.find(".myAccountLogout").trigger("click");
    await wait(500);
    expect(genGET.calledOnce).toEqual(true);
    await genGET.restore();
  });

  it("Save Edit (success)", async () => {
    const genPOST = sinon.stub(HTTPReq, "genPOST").resolves(true);
    const wrapper = mount(vMyAccount, mountingOptions());
    const message = new messageSpy(wrapper);

    wrapper.find(".myAccountEdit").trigger("click");
    expect(wrapper.vm.$data.edit).toEqual(true);
    await wait(100);
    wrapper.find(".myAccountSave").trigger("click");
    await wait(500);
    expect(genPOST.calledOnce).toEqual(true);
    expect(genPOST.args[0][0]).toEqual("v2/user/10");
    expect(genPOST.args[0][1]).toEqual(
      WingsStructUtil.stringify(currentUser.details),
    );
    expect(message.item.calledOnce).toEqual(true);
    expect(message.getMessage()).toEqual("Profile updated successfully!");
    expect(message.getType()).toEqual("success");
    expect(wrapper.vm.$data.edit).toEqual(false);
    await genPOST.restore();
    await message.restore();
  });

  it("Save Edit (failure)", async () => {
    const genPOST = sinon.stub(HTTPReq, "genPOST").resolves(false);
    const wrapper = mount(vMyAccount, mountingOptions());
    const alert = new alertSpy(wrapper);

    wrapper.find(".myAccountEdit").trigger("click");
    expect(wrapper.vm.$data.edit).toEqual(true);
    await wait(100);
    wrapper.find(".myAccountSave").trigger("click");
    await wait(500);
    expect(genPOST.calledOnce).toEqual(true);
    expect(genPOST.args[0][0]).toEqual("v2/user/10");
    expect(genPOST.args[0][1]).toEqual(
      WingsStructUtil.stringify(currentUser.details),
    );
    expect(alert.item.calledOnce).toEqual(true);
    expect(alert.getTitle()).toEqual("Fail");
    expect(alert.getMessage()).toEqual(
      "Save was unsuccessful. Please try again later.",
    );
    expect(alert.getOptions("confirmButtonText")).toEqual("OK");
    await genPOST.restore();
    await alert.restore();
  });
});
