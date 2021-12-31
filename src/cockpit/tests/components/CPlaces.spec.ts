import CPlaces from "@/components/CPlaces.vue";
import { mockPlace } from "@/tests/mockData/data";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { globalMountingOptions } from "../helper";

const mockedPlace = new mockPlace();

describe("CPlaces", () => {
  it("renders one component", () => {
    const wrapper = mount(CPlaces, {
      global: globalMountingOptions(),
      propsData: {
        places: [mockedPlace.place],
      },
    });

    expect(wrapper.find(".place").text()).toMatch(
      new RegExp(mockedPlace.label),
    );
  });
});
