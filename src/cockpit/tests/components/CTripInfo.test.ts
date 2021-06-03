import CTripInfo from "@/components/CTripInfo.vue";
import { mockTripObj } from "@/tests/mockData/data";
import { expect } from "@jest/globals";

import { mount } from "@vue/test-utils";

const mockedTrip = new mockTripObj();

describe("CTripInfo", () => {
  it("renders empty component", () => {
    const wrapper = mount(CTripInfo, {});
    expect(wrapper.find(".view_trip_info").exists()).toEqual(true);
    expect(wrapper.find(".edit_trip_info").exists()).toEqual(false);
  });

  it("renders one component", () => {
    const wrapper = mount(CTripInfo, {
      props: {
        trip: mockedTrip.trip,
      },
    });
    expect(wrapper.find(".view_trip_info").exists()).toEqual(true);
  });

  it("renders one edit component", () => {
    const wrapper = mount(CTripInfo, {
      props: {
        trip: mockedTrip.trip,
        editable: true,
      },
    });
    expect(wrapper.find(".view_trip_info").exists()).toEqual(true);
  });

  it("renders one view component", () => {
    const wrapper = mount(CTripInfo, {
      props: {
        trip: mockedTrip.trip,
        editable: false,
      },
    });
    expect(wrapper.find(".view_trip_info").exists()).toEqual(true);
  });
});
