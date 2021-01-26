import CViewTrip from "@/components/CViewTrip.vue";
// import { CityUtil } from "@/shared/CityUtil";
import { mockTrip, mockUser } from "@/tests/mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedTrip = new mockTrip();
const mockedUser = new mockUser();

test("Empty component", (t) => {
  const wrapper = shallowMount(CViewTrip, {});
  t.is(wrapper.text(), "");
});

test("One trip in component", (t) => {
  const wrapper = shallowMount(CViewTrip, {
    propsData: {
      trip: mockedTrip.trip,
      user: mockedUser.user,
    },
  });
  t.is(wrapper.find(".tripName").text(), mockedTrip.name);
  t.is(wrapper.find(".tripID").text(), mockedTrip.ID.toString());
  t.is(wrapper.find(".tripDescription").text(), mockedTrip.description);
  // t.is(wrapper.find("#city").text(),
  //   CityUtil.toString(mockedTrip.cities[0]),
  // );
  t.is(wrapper.find(".tripCreatorInfo").text(), "Author: " + mockedUser.name);
});
