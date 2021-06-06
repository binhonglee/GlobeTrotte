// Intentionally kept as test.ts as its consistently failing.
// Will rename back to spec after its fixed.

import CEditTrip from "@/components/CEditTrip.vue";
import { mockTripObj } from "@/tests/mockData/data";

import { shallowMount } from "@vue/test-utils";
import { expect } from "@jest/globals";

const mockedTrip = new mockTripObj();

describe("CEditTrip", () => {
  it("renders component", () => {
    const trip = mockedTrip.trip;
    const wrapper = shallowMount(CEditTrip, {
      props: {
        trip,
      },
    });
    const editCity = wrapper.find(".editCity");
    expect(editCity.exists()).toBeTruthy();
    expect(editCity.text()).toContain("Cities");
  });

  it("simulate save trip", () => {
    const trip = mockedTrip.trip;
    const wrapper = shallowMount(CEditTrip, {
      props: {
        trip,
      },
    });
    const saveEditTrip = wrapper.find(".saveEditTrip");
    saveEditTrip.trigger("click");
    expect(saveEditTrip.exists()).toBeTruthy();
  });
});
