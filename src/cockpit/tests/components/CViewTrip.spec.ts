import CViewTrip from "../../components/CViewTrip.vue";
// import { CityUtil } from "../../shared/CityUtil";
import { mockTrip } from "../mockData/data";

import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";

const mockedTrip = new mockTrip();

describe("CViewTrip.vue", () => {
  it("renders empty component", () => {
    const wrapper = shallowMount(CViewTrip, {});
    expect(wrapper.text()).equals("");
  });

  it("renders one component", () => {
    const wrapper = shallowMount(CViewTrip, {
      propsData: {
        trip: mockedTrip.trip,
      },
    });
    expect(wrapper.find("#name").text()).equals(
      mockedTrip.name,
    );
    expect(wrapper.find("#id").text()).equals(
      mockedTrip.ID.toString(),
    );
    expect(wrapper.find("#description").text()).equals(
      mockedTrip.description,
    );
    // expect(wrapper.find("#city").text()).equals(
    //   CityUtil.toString(mockedTrip.cities[0]),
    // );
    expect(wrapper.find("#creatorInfo").text()).equals(
      "Author: " + mockedTrip.userID,
    );
  });
});
