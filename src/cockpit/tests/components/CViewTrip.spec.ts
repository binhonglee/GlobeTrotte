import CViewTrip from "@/components/CViewTrip.vue";
import { CityUtil } from "@/shared/CityUtil";
import { mockTripObj } from "@/tests/mockData/data";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { globalMountingOptions } from "../helper";

const mockedTrip = new mockTripObj();

describe("CViewTrip", () => {
  it("One trip in component", () => {
    const wrapper = mount(CViewTrip, {
      global: globalMountingOptions(),
      propsData: {
        trip: mockedTrip.trip,
      },
    });
    expect(wrapper.find(".tripName").text()).toEqual(
      mockedTrip.trip.details.name,
    );
    expect(wrapper.find(".tripDescription").text()).toEqual(
      mockedTrip.trip.details.description,
    );
    expect(wrapper.find(".tripCity").text()).toEqual(
      CityUtil.toString(mockedTrip.trip.details.cities[0]),
    );
    expect(wrapper.find(".tripCreatorInfo").text()).toEqual(
      "Author: " + mockedTrip.trip.user.name,
    );
  });
});
