import vLogin from "@/views/vLogin.vue";
import HTTPReq from "@/shared/HTTPReq";
import UserObj from "@/wings/UserObj";
import Routing from "@/shared/Routing";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
import { mountingOptions, Vue, wait } from "../helper";
import { routerSpy, stub } from "../vitestSpy";
import { R } from "@glareshield/all";
import LoginCredential from "@/wings/LoginCredential";
import NaiveUtils from "@/shared/NaiveUtils";

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
    vi.spyOn(Routing, "genRedirectTo").mockImplementation(async () => {
      return;
    });
  });

  test("Cancel", async () => {
    const wrapper = mount(vLogin, mountingOptions());
    const routerBack = new routerSpy(wrapper, "back");
    const rNext = stub(vi.spyOn(R, "hasNext")).returns(false);
    verifyUI(wrapper);
    wrapper.find(".loginCancel").trigger("click");
    rNext.restore();
    expect(wrapper.html()).toMatchSnapshot();
    expect(routerBack.called(1)).toBeTruthy();
    await routerBack.restore();
  });

  test("Wrong password", async () => {
    const returnedUser = WingsStructUtil.stringify(new UserObj());
    const genPOST = stub(vi.spyOn(HTTPReq, "genPOST")).resolves(
      JSON.parse(returnedUser),
    );
    const wrapper = mount(vLogin, mountingOptions());
    const message = stub(vi.spyOn(NaiveUtils, "messageError"));
    const rNext = stub(vi.spyOn(R, "hasNext")).returns(false);
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
    expect(message.args()[0][0]).toEqual(
      "Wrong email or password. Please try again.",
    );
    await message.restore();
  });

  test("Success", async () => {
    const rNext = stub(vi.spyOn(R, "hasNext")).returns(false);
    const returnedUser = WingsStructUtil.stringify(
      new UserObj({
        id: 10,
      }),
    );
    const genPOST = stub(vi.spyOn(HTTPReq, "genPOST")).resolves(
      JSON.parse(returnedUser),
    );
    const wrapper = mount(vLogin, mountingOptions());
    // const routerPush = new routerSpy(wrapper, "push");
    const notify = stub(vi.spyOn(NaiveUtils, "messageSuccess"));
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
    expect(notify.args()[0][0]).toEqual("You are now logged in.");
    await notify.restore();
  });
});
