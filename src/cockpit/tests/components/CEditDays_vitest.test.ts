/// <reference types="vitest/global.d.ts" />

import { shallowMount } from "@vue/test-utils";
import CEditDay from "@/components/CEditDays.vue";

test("mount component", async () => {
  expect(CEditDay).toBeTruthy();

  const wrapper = shallowMount(CEditDay, {
    propsData: { givenDays: [] },
  });
  console.log(wrapper.text());
  console.log(wrapper.html());

  expect(wrapper.text()).toContain("Add another day");
  // expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find(".editDayTitle").exists()).toBeFalsy();
  expect(wrapper.find(".removeDay").exists()).toBeFalsy();
  expect(wrapper.find(".addDay").exists()).toBeTruthy();
});
