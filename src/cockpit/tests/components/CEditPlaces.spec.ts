import CEditPlaces, { DataPlace } from "@/components/CEditPlaces.vue";
import { mockPlace } from "@/tests/mockData/data";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { globalMountingOptions, mountingOptions } from "../helper";

const mockedPlace = new mockPlace();

describe("CEditPlaces", () => {
  it("renders empty component", () => {
    const wrapper = mount(CEditPlaces, mountingOptions());
    expect(wrapper.find(".editPlace").exists()).toBeFalsy();
  });

  it("renders one place object", () => {
    const places = [new DataPlace(mockedPlace.place)];
    const wrapper = mount(CEditPlaces, {
      global: globalMountingOptions(),
      propsData: { givenPlaces: places },
    });
    expect(wrapper.find(".editPlace").exists()).toBeTruthy();
  });
});
