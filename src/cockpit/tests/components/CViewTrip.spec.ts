import CViewTrip from "@/components/CViewTrip.vue";
// import { CityUtil } from "@/shared/CityUtil";
import { mockTripObj } from "@/tests/mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedTrip = new mockTripObj();

test("Empty component", (t) => {
  const wrapper = shallowMount(CViewTrip, {});
  t.is(wrapper.text(), "");
});

test("One trip in component", (t) => {
  const wrapper = shallowMount(CViewTrip, {
    propsData: {
      trip: mockedTrip.trip,
    },
  });
  t.is(wrapper.find(".tripName").text(), mockedTrip.trip.details.name);
  t.is(wrapper.find(".tripID").text(), mockedTrip.ID.toString());
  t.is(
    wrapper.find(".tripDescription").text(),
    mockedTrip.trip.details.description,
  );
  // t.is(wrapper.find("#city").text(),
  //   CityUtil.toString(mockedTrip.cities[0]),
  // );
  t.is(
    wrapper.find(".tripCreatorInfo").text(),
    "Author: " + mockedTrip.trip.user.name,
  );
});
