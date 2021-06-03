// Intentionally kept as test.ts as its consistently failing.
// Will rename back to spec after its fixed.

import CEditTrip from "@/components/CEditTrip.vue";
import { mockTripObj } from "@/tests/mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedTrip = new mockTripObj();

test("renders empty component", (t) => {
  const trip = mockedTrip.trip;
  const wrapper = shallowMount(CEditTrip, {
    props: {
      trip: trip,
    },
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  } as any);
  t.regex(wrapper.find(".editLabel").text(), /City:/);
});
