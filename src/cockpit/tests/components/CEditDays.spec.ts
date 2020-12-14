import CEditDay from "@/components/CEditDays.vue";
import { mockDay } from "@/tests/mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("renders empty component", (t) => {
  const wrapper = shallowMount(CEditDay, {});
  t.is(wrapper.text(), "");
  t.false(wrapper.find(".editDayTitle").exists());
  t.false(wrapper.find(".removeDay").exists());
  t.true(wrapper.find(".addDay").exists());
});

test("renders one component", (t) => {
  const day = new mockDay().day;
  const wrapper = shallowMount(CEditDay, {
    propsData: { givenDays: [day] },
  });
  t.regex(
    wrapper.find(".editDayTitle").text(),
    new RegExp("Day " + day.dayOf),
  );
  t.true(wrapper.find(".removeDay").exists());
  t.true(wrapper.find(".addDay").exists());
});
