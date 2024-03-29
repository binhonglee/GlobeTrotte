import CPlaces from "@/components/CPlaces.vue";
import { PropPlace } from "@/shared/DataProps";
import { mockPlace } from "@/tests/mockData/data";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { globalMountingOptions } from "../helper";

const mockedPlace = new mockPlace();

describe("CPlaces", () => {
  it("renders one component", () => {
    const wrapper = mount(CPlaces, {
      global: globalMountingOptions(),
      propsData: {
        propPlaces: [new PropPlace(mockedPlace.place)],
      },
    });

    expect(wrapper.find(".place").text()).toMatch(
      new RegExp(mockedPlace.label),
    );
  });
});
