import vRegister from "@/views/vRegister.vue";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import UserObj from "@/wings/UserObj";
import {
  alertSpy,
  messageSpy,
  mountingOptions,
  notifySpy,
  routerSpy,
  Vue,
  wait,
} from "../helper";
import { describe, expect, it } from "@jest/globals";
import { mount, VueWrapper } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
import sinon from "sinon";
import Routing from "@/shared/Routing";

const name = "Ab Cd";
const email = "ab@test.com";
const password = "1234";

function verifyUI(wrapper: VueWrapper<Vue>): void {
  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find(".registrationNameLabel").text()).toEqual("Name:");
  expect(wrapper.find(".registrationEmailLabel").text()).toEqual("Email:");
  expect(wrapper.find(".registrationPasswordLabel").text()).toEqual(
    "Password:",
  );
  expect(wrapper.find(".registrationConfPasswordLabel").text()).toEqual(
    "Confirm Password:",
  );
}

interface FormReg {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}

function fillFormAndReg(wrapper: VueWrapper<Vue>, form: FormReg): void {
  wrapper
    .find(".registrationName")
    .find(".n-input__input-el")
    .setValue(form.name);
  wrapper
    .find(".registrationEmail")
    .find(".n-input__input-el")
    .setValue(form.email);
  wrapper
    .find(".registrationPassword")
    .find(".n-input__input-el")
    .setValue(form.password);
  wrapper
    .find(".registrationConfPassword")
    .find(".n-input__input-el")
    .setValue(form.confPassword);
  wrapper.find(".registrationSave").trigger("click");
  expect(wrapper.html()).toMatchSnapshot();
}

describe("vRegister", () => {
  it("Registration - Password mismatch", async () => {
    const wrapper = mount(vRegister, mountingOptions());
    const alert = new alertSpy(wrapper);
    verifyUI(wrapper);
    fillFormAndReg(wrapper, {
      name: name,
      email: email,
      password: password,
      confPassword: password + "a",
    });
    expect(alert.item.calledOnce).toBeTruthy();
    expect(alert.getTitle()).toEqual("Fail");
    expect(alert.getMessage()).toEqual("Password does not match.");
    expect(alert.getOptions("confirmButtonText")).toEqual("OK");
    await alert.restore();
  });

  it("Registration - New user (Failure)", async () => {
    const returnedUser = WingsStructUtil.stringify(
      new UserObj({
        id: -1,
        details: {
          id: -1,
          name: name,
          email: email,
        },
      }),
    );
    const genPOST = sinon
      .stub(HTTPReq, "genPOST")
      .resolves(JSON.parse(returnedUser));
    const wrapper = mount(vRegister, mountingOptions());
    const message = new messageSpy(wrapper);
    verifyUI(wrapper);
    fillFormAndReg(wrapper, {
      name: name,
      email: email,
      password: password,
      confPassword: password,
    });
    expect(genPOST.calledOnce).toBeTruthy();
    expect(genPOST.args[0][0]).toEqual("v2/user");
    expect(genPOST.args[0][1]).toEqual(
      WingsStructUtil.stringify(
        new NewUser({
          id: -1,
          name: name,
          email: email,
          password: password,
        }),
      ),
    );
    await wait(500);
    expect(message.item.calledOnce).toBeTruthy();
    expect(message.getMessage()).toEqual("Invalid email. Please try again.");
    expect(message.getType()).toEqual("error");
    await genPOST.restore();
    await message.restore();
  });

  it("Registration - New user (Success)", async () => {
    const returnedUser = WingsStructUtil.stringify(
      new UserObj({
        id: 10,
        details: {
          id: 10,
          name: name,
          email: email,
        },
      }),
    );
    const genPOST = sinon
      .stub(HTTPReq, "genPOST")
      .resolves(JSON.parse(returnedUser));
    const wrapper = mount(vRegister, mountingOptions());
    const notify = new notifySpy(wrapper);
    const redirection = sinon.stub(Routing, "genRedirectTo").resolves();
    const getNext = sinon.stub(Routing, "getNext").callsFake((r, m) => {
      return Routing.fakeGetNext(m);
    });
    verifyUI(wrapper);
    fillFormAndReg(wrapper, {
      name: name,
      email: email,
      password: password,
      confPassword: password,
    });
    expect(genPOST.calledOnce).toBeTruthy();
    expect(genPOST.args[0][0]).toEqual("v2/user");
    expect(genPOST.args[0][1]).toEqual(
      WingsStructUtil.stringify(
        new NewUser({
          id: -1,
          name: name,
          email: email,
          password: password,
        }),
      ),
    );
    await wait(500);
    expect(notify.item.calledOnce).toBeTruthy();
    expect(notify.getTitle()).toEqual("Success");
    expect(notify.getMessage()).toEqual(
      "Your account is created successfully!",
    );
    expect(notify.getType()).toEqual("success");
    expect(redirection.calledOnce).toBeTruthy();
    expect(redirection.args[0][0]).toEqual(
      "/unconfirmed/email/:next=myaccount",
    );
    await genPOST.restore();
    await notify.restore();
    await redirection.restore();
    await getNext.restore();
  });

  it("Registration - Cancel", async () => {
    const wrapper = mount(vRegister, mountingOptions());
    const routerBack = new routerSpy(wrapper, "back");
    verifyUI(wrapper);
    wrapper.find(".registrationCancel").trigger("click");
    expect(wrapper.html()).toMatchSnapshot();
    expect(routerBack.item.calledOnce).toBeTruthy();
    await routerBack.restore();
  });
});
