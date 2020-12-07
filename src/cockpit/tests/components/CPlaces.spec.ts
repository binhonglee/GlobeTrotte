import CPlaces from "../../components/CPlaces.vue";
import { mockPlace } from "../mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedPlace = new mockPlace();

test("renders empty component", (t) => {
  const wrapper = shallowMount(CPlaces, {});
  t.is(wrapper.find(".places").text(), "");
});

test("renders one component", (t) => {
  const wrapper = shallowMount(CPlaces, {
    propsData: { places: [mockedPlace.place] },
  });

  t.regex(wrapper.find("#places").text(), /Places:/);
  t.regex(
    wrapper.find("#place").text(),
    new RegExp(mockedPlace.label),
  );
});
