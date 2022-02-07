import vRegister from "@/views/vRegister.vue";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import UserObj from "@/wings/UserObj";
import { mountingOptions, Vue, wait } from "../helper";
import { alertSpy, messageSpy, notifySpy, routerSpy, stub } from "../vitestSpy";
import { describe, expect, spyOn, test } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
import Routing from "@/shared/Routing";
import RegistrationResponse from "@/wings/RegistrationResponse";
import NaiveUtils from "@/shared/NaiveUtils";
import RegistrationError from "@/wings/RegistrationError";

const name = "Ab Cd";
const username = "mocked_testuser";
const email = "ab@test.com";
const password = "1234";

function verifyUI(wrapper: VueWrapper<Vue>): void {
  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find(".registrationNameLabel").text()).toEqual("Name:");
  expect(wrapper.find(".registrationUsernameLabel").text()).toEqual(
    "Username:",
  );
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
  username: string;
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
    .find(".registrationUsername")
    .find(".n-input__input-el")
    .setValue(form.username);
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
  test("Registration - Password mismatch", async () => {
    const wrapper = mount(vRegister, mountingOptions());
    const alert = new alertSpy(wrapper);
    verifyUI(wrapper);
    fillFormAndReg(wrapper, {
      name: name,
      username: username,
      email: email,
      password: password,
      confPassword: password + "a",
    });
    expect(alert.called(1)).toBeTruthy();
    expect(alert.getTitle()).toEqual("Fail");
    expect(alert.getMessage()).toEqual("Password does not match.");
    expect(alert.getOptions("confirmButtonText")).toEqual("OK");
    await alert.restore();
  });

  test("Registration - New user (Failure)", async () => {
    const returnedUser = WingsStructUtil.stringify(
      new RegistrationResponse({
        error: RegistrationError.EmailInvalid,
        user: {
          id: -1,
          details: {
            id: -1,
            name: name,
            email: email,
          },
        },
      }),
    );
    const genPOST = stub(spyOn(HTTPReq, "genPOST")).resolves(
      JSON.parse(returnedUser),
    );
    const wrapper = mount(vRegister, mountingOptions());
    const message = stub(spyOn(NaiveUtils, "messageError"));
    verifyUI(wrapper);
    fillFormAndReg(wrapper, {
      name: name,
      username: username,
      email: email,
      password: password,
      confPassword: password,
    });
    expect(genPOST.calledOnce()).toBeTruthy();
    expect(genPOST.args()[0][0]).toEqual("v2/user");
    expect(genPOST.args()[0][1]).toEqual(
      WingsStructUtil.stringify(
        new NewUser({
          id: -1,
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      ),
    );
    await wait(0);
    expect(message.called(1)).toBeTruthy();
    expect(message.args()[0][0]).toEqual(
      "This is an invalid email. Please try a proper email instead.",
    );
    await genPOST.restore();
    await message.restore();
  });

  test("Registration - New user (Success)", async () => {
    const returnedUser = WingsStructUtil.stringify(
      new RegistrationResponse({
        error: RegistrationError.Success,
        user: {
          id: 10,
          details: {
            id: 10,
            name: name,
            username: username,
            email: email,
          },
        },
      }),
    );
    const genPOST = stub(spyOn(HTTPReq, "genPOST")).resolves(
      JSON.parse(returnedUser),
    );
    const wrapper = mount(vRegister, mountingOptions());
    const notify = new notifySpy(wrapper);
    const redirection = stub(
      spyOn(Routing, "genRedirectTo").mockResolvedValue(),
    );
    const getNext = stub(
      spyOn(Routing, "getNext").mockImplementation((r, m) => {
        return Routing.fakeGetNext(m);
      }),
    );
    verifyUI(wrapper);
    fillFormAndReg(wrapper, {
      name: name,
      username: username,
      email: email,
      password: password,
      confPassword: password,
    });
    expect(genPOST.calledOnce()).toBeTruthy();
    expect(genPOST.args()[0][0]).toEqual("v2/user");
    expect(genPOST.args()[0][1]).toEqual(
      WingsStructUtil.stringify(
        new NewUser({
          id: -1,
          name: name,
          username: username,
          email: email,
          password: password,
        }),
      ),
    );
    await wait(0);
    expect(notify.called(1)).toBeTruthy();
    expect(notify.getTitle()).toEqual("Success");
    expect(notify.getMessage()).toEqual(
      "Your account is created successfully!",
    );
    expect(notify.getType()).toEqual("success");
    expect(redirection.calledOnce()).toBeTruthy();
    expect(redirection.args()[0][0]).toEqual(
      "/unconfirmed/email/:next=myaccount",
    );
    await genPOST.restore();
    await notify.restore();
    await redirection.restore();
    await getNext.restore();
  });

  test("Registration - Cancel", async () => {
    const wrapper = mount(vRegister, mountingOptions());
    const routerBack = new routerSpy(wrapper, "back");
    verifyUI(wrapper);
    wrapper.find(".registrationCancel").trigger("click");
    expect(wrapper.html()).toMatchSnapshot();
    expect(routerBack.called(1)).toBeTruthy();
    await routerBack.restore();
  });
});
