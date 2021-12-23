/// <reference types="vitest/global.d.ts" />

import { mount } from "@vue/test-utils";
import CEditTrip from "@/components/CEditTrip.vue";
import { mockTripObj } from "@/tests/mockData/data";

const mockedTrip = new mockTripObj();

test("CEditTrip", async () => {
  expect(CEditTrip).toBeTruthy();

  const trip = mockedTrip.trip;
  const wrapper = mount(CEditTrip, {
    props: {
      trip: trip,
      isNew: false,
    },
  });
  const editCity = wrapper.find(".editCity");
  expect(editCity.exists()).toBeTruthy();
  expect(editCity.text()).toContain("Cities");
});
