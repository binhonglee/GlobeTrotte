import CEditPlaces from "@/components/CEditPlaces.vue";
import { PropPlace } from "@/shared/DataProps";
import { mockPlace, mockPlace2, mockTravelTime } from "@/tests/mockData/data";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { globalMountingOptions, mountingOptions } from "../helper";

const mockedPlace = new mockPlace();
const mockedPlace2 = new mockPlace2();
const mockedTravelTime = new mockTravelTime();

describe("CEditPlaces", () => {
  it("renders empty component", () => {
    const wrapper = mount(CEditPlaces, mountingOptions());
    expect(wrapper.find(".editPlace").exists()).toBeFalsy();
  });

  it("renders one place object", () => {
    const places = [new PropPlace(mockedPlace.place, undefined)];
    const wrapper = mount(CEditPlaces, {
      global: globalMountingOptions(),
      props: { propPlaces: places },
    });
    expect(wrapper.find(".editPlace").exists()).toBeTruthy();
  });

  it("renders one place object with travel time", () => {
    const places = [
      new PropPlace(mockedPlace.place),
      new PropPlace(mockedPlace2.place, mockedTravelTime.travelTime),
    ];
    const wrapper = mount(CEditPlaces, {
      global: globalMountingOptions(),
      props: { propPlaces: places },
    });
    expect(wrapper.find(".editPlace").exists()).toBeTruthy();
    expect(wrapper.find(".editTravelTime").exists()).toBeTruthy();
  });
});
