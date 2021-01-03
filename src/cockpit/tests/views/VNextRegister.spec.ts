import VNextRegister from "@/views/VNextRegister.vue";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import User from "@/wings/User";
import {
  alertSpy,
  messageSpy,
  newLocalVueAndRouter,
  notifySpy,
  routerSpy,
  wait,
} from "../helper";

import { mount, Wrapper } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
import sinon from "sinon";
import test, { ExecutionContext } from "ava";

const name = "Ab Cd";
const email = "ab@test.com";
const password = "1234";

function verifyUI(
  t: ExecutionContext<unknown>,
  wrapper: Wrapper<Vue>,
): void {
  t.is(
    wrapper.find(".registrationNameLabel").text(),
    "Name:",
  );
  t.is(
    wrapper.find(".registrationEmailLabel").text(),
    "Email:",
  );
  t.is(
    wrapper.find(".registrationPasswordLabel").text(),
    "Password:",
  );
  t.is(
    wrapper.find(".registrationConfPasswordLabel").text(),
    "Confirm Password:",
  );
}

interface FormReg {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}

function fillFormAndReg(
  t: ExecutionContext<unknown>,
  wrapper: Wrapper<Vue>,
  form: FormReg,
): void {
  wrapper
    .find(".registrationName")
    .find(".el-input__inner")
    .setValue(form.name);
  wrapper
    .find(".registrationEmail")
    .find(".el-input__inner")
    .setValue(form.email);
  wrapper
    .find(".registrationPassword")
    .find(".el-input__inner")
    .setValue(form.password);
  wrapper
    .find(".registrationConfPassword")
    .find(".el-input__inner")
    .setValue(form.confPassword);
  wrapper.find(".registrationSave").trigger("click");
}

test("Registration - Password mismatch", async (t) => {
  const wrapper = mount(VNextRegister);
  const alert = new alertSpy(wrapper);
  verifyUI(t, wrapper);
  fillFormAndReg(t, wrapper, {
    name: name,
    email: email,
    password: password,
    confPassword: password + "a",
  });
  t.true(alert.item.calledOnce);
  t.is(alert.getTitle(), "Fail");
  t.is(alert.getMessage(), "Password does not match.");
  t.is(alert.getOptions("confirmButtonText"), "OK");
  await alert.restore();
});

test.serial(
  "Registration - New user (Failure)",
  async (t) => {
    const returnedUser = WingsStructUtil.stringify(
      new User({
        id: -1,
        name: name,
        email: email,
      }),
    );
    const genPOST = sinon
      .stub(HTTPReq, "genPOST")
      .resolves(JSON.parse(returnedUser));
    const wrapper = mount(VNextRegister);
    const message = new messageSpy(wrapper);
    verifyUI(t, wrapper);
    fillFormAndReg(t, wrapper, {
      name: name,
      email: email,
      password: password,
      confPassword: password,
    });
    t.true(genPOST.calledOnce, "Called genPOST once");
    t.is(genPOST.args[0][0], "user");
    t.is(
      genPOST.args[0][1],
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
    t.true(message.item.calledOnce, "Called $message once");
    t.is(
      message.getMessage(),
      "Invalid email. Please try again.",
    );
    t.is(message.getType(), "error");
    await genPOST.restore();
    await message.restore();
  },
);

test.serial(
  "Registration - New user (Success)",
  async (t) => {
    const returnedUser = WingsStructUtil.stringify(
      new User({
        id: 10,
        name: name,
        email: email,
      }),
    );
    const genPOST = sinon
      .stub(HTTPReq, "genPOST")
      .resolves(JSON.parse(returnedUser));
    const wrapper = mount(
      VNextRegister,
      newLocalVueAndRouter(),
    );
    const notify = new notifySpy(wrapper);
    const routerPush = new routerSpy(wrapper, "push");
    verifyUI(t, wrapper);
    fillFormAndReg(t, wrapper, {
      name: name,
      email: email,
      password: password,
      confPassword: password,
    });
    t.true(genPOST.calledOnce, "Called genPOST once");
    t.is(genPOST.args[0][0], "user");
    t.is(
      genPOST.args[0][1],
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
    t.true(notify.item.calledOnce, "Called $notify once");
    t.is(notify.getTitle(), "Success");
    t.is(
      notify.getMessage(),
      "Your account is created successfully!",
    );
    t.is(notify.getType(), "success");
    t.true(routerPush.item.calledOnce);
    t.is(
      routerPush.getArg()["path"],
      "/unconfirmed/email/:myaccount",
    );
    await genPOST.restore();
    await notify.restore();
    await routerPush.restore();
  },
);

test("Registration - Cancel", async (t) => {
  const wrapper = mount(
    VNextRegister,
    newLocalVueAndRouter(),
  );
  const routerBack = new routerSpy(wrapper, "back");
  verifyUI(t, wrapper);
  wrapper.find(".registrationCancel").trigger("click");
  t.true(routerBack.item.calledOnce);
  await routerBack.restore();
});
