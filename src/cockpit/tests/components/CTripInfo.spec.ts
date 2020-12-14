import CTripInfo from "@/components/CTripInfo.vue";
import { mockTrip } from "@/tests/mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedTrip = new mockTrip();

test("renders empty component", (t) => {
  const wrapper = shallowMount(CTripInfo, {});
  t.is(wrapper.find(".view_trip_info").exists(), true);
  t.is(wrapper.find(".edit_trip_info").exists(), false);
});

test("renders one component", (t) => {
  const wrapper = shallowMount(CTripInfo, {
    propsData: {
      trip: mockedTrip.trip,
    },
  });
  t.is(wrapper.find(".view_trip_info").exists(), true);
});

test("renders one edit component", (t) => {
  const wrapper = shallowMount(CTripInfo, {
    propsData: {
      trip: mockedTrip.trip,
      editable: true,
    },
  });
  t.is(wrapper.find(".view_trip_info").exists(), true);
});

test("renders one view component", (t) => {
  const wrapper = shallowMount(CTripInfo, {
    propsData: {
      trip: mockedTrip.trip,
      editable: false,
    },
  });
  t.is(wrapper.find(".view_trip_info").exists(), true);
});
