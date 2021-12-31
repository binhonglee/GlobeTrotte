import CTripInfo from "@/components/CTripInfo.vue";
import { mockTripObj } from "@/tests/mockData/data";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { globalMountingOptions } from "../helper";

const mockedTrip = new mockTripObj();

describe("CTripInfo", () => {
  it("renders one component", () => {
    const wrapper = mount(CTripInfo, {
      global: globalMountingOptions(),
      propsData: {
        trip: mockedTrip.trip,
      },
    });
    expect(wrapper.find(".view_trip_info").exists()).toBeTruthy();
  });

  it("renders one edit component", () => {
    const wrapper = mount(CTripInfo, {
      global: globalMountingOptions(),
      propsData: {
        trip: mockedTrip.trip,
        editable: true,
      },
    });
    expect(wrapper.find(".view_trip_info").exists()).toBeTruthy();
  });

  it("renders one view component", () => {
    const wrapper = mount(CTripInfo, {
      global: globalMountingOptions(),
      propsData: {
        trip: mockedTrip.trip,
        editable: false,
      },
    });
    expect(wrapper.find(".view_trip_info").exists()).toBeTruthy();
  });
});
