import CEditPlaces from "@/components/CEditPlaces.vue";
import { mockPlace } from "@/tests/mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedPlace = new mockPlace();

test("renders empty component", (t) => {
  const wrapper = shallowMount(CEditPlaces, {});
  t.false(wrapper.find(".editLabel").exists());
  t.false(wrapper.find(".editPlace").exists());
});

test("renders one place object", (t) => {
  const places = [mockedPlace.place];
  const wrapper = shallowMount(CEditPlaces, {
    propsData: { givenPlaces: places },
  });
  t.regex(wrapper.find(".editLabel").text(), /Places:/);
  t.true(wrapper.find(".editPlace").exists());
});
