import CViewUser from "@/components/CViewUser.vue";
import { mockUser } from "@/tests/mockData/data";
import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("render component", (t) => {
  const user = new mockUser().user;
  const wrapper = shallowMount(CViewUser, {
    propsData: { user },
  });
  t.true(wrapper.find(".userInfo").exists());
  t.regex(wrapper.find(".userName").text(), new RegExp(user.name.valueOf()));
  t.regex(wrapper.find(".userID").text(), new RegExp(user.ID.toString()));
  t.regex(wrapper.find(".userEmail").text(), new RegExp(user.email.valueOf()));
  t.regex(wrapper.find(".userBio").text(), new RegExp(user.bio.valueOf()));
});
