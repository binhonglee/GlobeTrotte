import vLogin from "@/views/vLogin.vue";
import HTTPReq from "@/shared/HTTPReq";
import UserObj from "@/wings/UserObj";
import Routing from "@/shared/Routing";
import { describe, expect, spyOn, test } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
import { mountingOptions, Vue, wait } from "../helper";
import { messageSpy, notifySpy, routerSpy, stub } from "../vitestSpy";
import R from "@/shared/R";
import LoginCredential from "@/wings/LoginCredential";

const email = "ab@test.com";
const password = "1234";

function verifyUI(wrapper: VueWrapper<Vue>): void {
  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find(".loginUsernameLabel").text()).toEqual("Email:");
  expect(wrapper.find(".loginPasswordLabel").text()).toEqual("Password:");
}

interface FormLogin {
  email: string;
  password: string;
}

function fillFormAndLogin(wrapper: VueWrapper<Vue>, form: FormLogin): void {
  wrapper
    .find(".loginUsername")
    .find(".n-input__input-el")
    .setValue(form.email);
  wrapper
    .find(".loginPassword")
    .find(".n-input__input-el")
    .setValue(form.password);
  wrapper.find(".loginConfirm").trigger("click");
  expect(wrapper.html()).toMatchSnapshot();
}

describe("Login", () => {
  beforeAll(() => {
    spyOn(Routing, "genRedirectTo").mockImplementation(async () => {
      return;
    });
  });

  test("Cancel", async () => {
    const wrapper = mount(vLogin, mountingOptions());
    const routerBack = new routerSpy(wrapper, "back");
    const rNext = stub(spyOn(R, "hasNext")).returns(false);
    verifyUI(wrapper);
    wrapper.find(".loginCancel").trigger("click");
    rNext.restore();
    expect(wrapper.html()).toMatchSnapshot();
    expect(routerBack.called(1)).toBeTruthy();
    await routerBack.restore();
  });

  test("Wrong password", async () => {
    const returnedUser = WingsStructUtil.stringify(new UserObj());
    const genPOST = stub(spyOn(HTTPReq, "genPOST")).resolves(
      JSON.parse(returnedUser),
    );
    const wrapper = mount(vLogin, mountingOptions());
    const message = new messageSpy(wrapper);
    const rNext = stub(spyOn(R, "hasNext")).returns(false);
    verifyUI(wrapper);
    fillFormAndLogin(wrapper, {
      email: email,
      password: password,
    });
    rNext.restore();
    expect(genPOST.calledOnce()).toBeTruthy();
    expect(genPOST.args()[0][0]).toEqual("login");
    expect(genPOST.args()[0][1]).toEqual(
      WingsStructUtil.stringify(
        new LoginCredential({
          email: email,
          password: password,
        }),
      ),
    );
    await genPOST.restore();
    await wait(0);
    expect(message.called(1)).toBeTruthy();
    expect(message.getMessage()).toEqual(
      "Wrong email or password. Please try again.",
    );
    expect(message.getType()).toEqual("error");
    await message.restore();
  });

  test("Success", async () => {
    const rNext = stub(spyOn(R, "hasNext")).returns(false);
    const returnedUser = WingsStructUtil.stringify(
      new UserObj({
        id: 10,
      }),
    );
    const genPOST = stub(spyOn(HTTPReq, "genPOST")).resolves(
      JSON.parse(returnedUser),
    );
    const wrapper = mount(vLogin, mountingOptions());
    // const routerPush = new routerSpy(wrapper, "push");
    const notify = new notifySpy(wrapper);
    verifyUI(wrapper);
    fillFormAndLogin(wrapper, {
      email: email,
      password: password,
    });
    await rNext.restore();
    expect(genPOST.calledOnce()).toBeTruthy();
    expect(genPOST.args()[0][0]).toEqual("login");
    expect(genPOST.args()[0][1]).toEqual(
      WingsStructUtil.stringify(
        new LoginCredential({
          email: email,
          password: password,
        }),
      ),
    );
    await genPOST.restore();
    // expect(routerPush.item.calledOnce).toBeTruthy();
    // expect(routerPush.getArg()).toEqual("/");
    // await routerPush.restore();
    await wait(0);
    expect(notify.called(1)).toBeTruthy();
    expect(notify.getTitle()).toEqual("Success");
    expect(notify.getMessage()).toEqual("You are now logged in.");
    expect(notify.getType()).toEqual("success");
    await notify.restore();
  });
});
