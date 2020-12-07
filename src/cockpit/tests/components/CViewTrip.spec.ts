import CViewTrip from "../../components/CViewTrip.vue";
// import { CityUtil } from "../../shared/CityUtil";
import { mockTrip } from "../mockData/data";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

const mockedTrip = new mockTrip();

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
  t.is(wrapper.find("#name").text(), mockedTrip.name);
  t.is(
    wrapper.find("#id").text(),
    mockedTrip.ID.toString(),
  );
  t.is(
    wrapper.find("#description").text(),
    mockedTrip.description,
  );
  // t.is(wrapper.find("#city").text(),
  //   CityUtil.toString(mockedTrip.cities[0]),
  // );
  t.is(
    wrapper.find("#creatorInfo").text(),
    "Author: " + mockedTrip.userID,
  );
});
