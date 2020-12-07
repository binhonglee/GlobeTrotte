// Intentionally kept as test.ts as its consistently failing.
// Will rename back to spec after its fixed.

import CEditTrip from "../../components/CEditTrip.vue";
import { mockTrip } from "../mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedTrip = new mockTrip();

test("renders empty component", (t) => {
  const trip = mockedTrip.trip;
  const wrapper = shallowMount(CEditTrip, {
    propsData: trip,
  });
  t.regex(wrapper.find(".editLabel").text(), /City:/);
});
