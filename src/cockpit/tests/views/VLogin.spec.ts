import VLogin from "@/views/VLogin.vue";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import User from "@/wings/User";

import { mount } from "@vue/test-utils";
import { WingsStructUtil } from "wings-ts-util";
import {
  messageSpy,
  notifySpy,
  newLocalVueAndRouter,
  routerSpy,
} from "../helper";
import sinon from "sinon";
import test from "ava";

const email = "ab@test.com";
const password = "1234";

function verifyUI(
  t: ExecutionContext<unknown>,
  wrapper: Wrapper<Vue>,
): void {
  t.is(
    wrapper.find(".loginUsernameLabel").text(),
    "Email:",
  );
  t.is(
    wrapper.find(".loginPasswordLabel").text(),
    "Password:",
  );
}

interface FormLogin {
  email: string;
  password: string;
}

function fillFormAndLogin(
  t: ExecutionContext<unknown>,
  wrapper: Wrapper<Vue>,
  form: FormLogin,
): void {
  wrapper
    .find(".loginUsername")
    .find(".el-input__inner")
    .setValue(form.email);
  wrapper
    .find(".loginPassword")
    .find(".el-input__inner")
    .setValue(form.password);
  wrapper.find(".loginConfirm").trigger("click");
}

test("Login - Cancel", async (t) => {
  const wrapper = mount(VLogin, newLocalVueAndRouter());
  const routerBack = new routerSpy(wrapper, "back");
  verifyUI(t, wrapper);
  wrapper.find(".loginCancel").trigger("click");
  t.true(routerBack.item.calledOnce);
  await routerBack.restore();
});

test.serial("Login - Wrong password", async (t) => {
  const returnedUser = WingsStructUtil.stringify(
    new User({
      id: -1,
    }),
  );
  const genPOST = sinon
    .stub(HTTPReq, "genPOST")
    .resolves(JSON.parse(returnedUser));
  const wrapper = mount(VLogin);
  const message = new messageSpy(wrapper);
  verifyUI(t, wrapper);
  fillFormAndLogin(t, wrapper, {
    email: email,
    password: password,
  });
  t.true(genPOST.calledOnce, "Called genPOST once");
  t.is(genPOST.args[0][0], "login");
  t.is(
    genPOST.args[0][1],
    WingsStructUtil.stringify(
      new NewUser({
        id: -1,
        name: "",
        email: email,
        password: password,
      }),
    ),
  );
  await genPOST.restore();
  t.true(message.item.calledOnce);
  t.is(
    message.getMessage(),
    "Wrong email or password. Please try again.",
  );
  t.is(message.getType(), "error");
  await message.restore();
});

test.serial("Login - Success", async (t) => {
  const returnedUser = WingsStructUtil.stringify(
    new User({
      id: 10,
    }),
  );
  const genPOST = sinon
    .stub(HTTPReq, "genPOST")
    .resolves(JSON.parse(returnedUser));
  const wrapper = mount(VLogin, newLocalVueAndRouter());
  await wrapper.vm.$router.push("/login");
  const routerPush = new routerSpy(wrapper, "push");
  const notify = new notifySpy(wrapper);
  verifyUI(t, wrapper);
  fillFormAndLogin(t, wrapper, {
    name: name,
    email: email,
    password: password,
  });
  t.true(genPOST.calledOnce, "Called genPOST once");
  t.is(genPOST.args[0][0], "login");
  t.is(
    genPOST.args[0][1],
    WingsStructUtil.stringify(
      new NewUser({
        id: -1,
        name: "",
        email: email,
        password: password,
      }),
    ),
  );
  await genPOST.restore();
  t.true(routerPush.item.calledOnce);
  t.is(routerPush.getArg(), "/");
  await routerPush.restore();
  t.true(notify.item.calledOnce);
  t.is(notify.getTitle(), "Success");
  t.is(notify.getMessage(), "You are now logged in.");
  t.is(notify.getType(), "success");
  await notify.restore();
});
