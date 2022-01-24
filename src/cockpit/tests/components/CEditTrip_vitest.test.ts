import CEditTrip from "@/components/CEditTrip.vue";
import { mockTripObj } from "@/tests/mockData/data";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { globalMountingOptions } from "../helper";

const mockedTrip = new mockTripObj();

describe("CEditTrip", () => {
  it("renders component", () => {
    const trip = mockedTrip.trip;
    const wrapper = mount(CEditTrip, {
      global: globalMountingOptions(),
      props: {
        trip: trip,
        isNew: false,
      },
    });
    const editCity = wrapper.find(".editCity");
    expect(editCity.exists()).toBeTruthy();
    expect(editCity.text()).toContain("Cities");
  });

  // To investigate failure
  // it("simulate save trip", () => {
  //   const trip = mockedTrip.trip;
  //   const wrapper = mount(CEditTrip, {
  //     props: {
  //       trip,
  //     },
  //   });
  //   const saveEditTrip = wrapper.find(".saveEditTrip");
  //   expect(saveEditTrip.exists()).toBeTruthy();

  //   saveEditTrip.trigger("click");
  //   // Add test in the future after local test works
  // });
});
