import CViewUser from "@/components/CViewUser.vue";
import { mockUser } from "@/tests/mockData/data";
import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("render component", (t) => {
  const user = new mockUser().user;
  const wrapper = shallowMount(CViewUser, {
    propsData: { user },
  });
  t.true(wrapper.find(".user_info").exists());
  t.regex(
    wrapper.find("#name").text(),
    new RegExp(user.name),
  );
  t.regex(wrapper.find("#id").text(), new RegExp(user.ID));
  t.regex(
    wrapper.find("#email").text(),
    new RegExp(user.email),
  );
  t.regex(
    wrapper.find("#bio").text(),
    new RegExp(user.bio),
  );
});
