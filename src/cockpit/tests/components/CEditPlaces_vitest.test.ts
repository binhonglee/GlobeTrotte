import { expect, test } from "vitest";
import CEditPlaces from "@/components/CEditPlaces.vue";
import { PropPlace } from "@/shared/DataProps";
import { mockPlace } from "@/tests/mockData/data";
import { mount } from "@vue/test-utils";
import { globalMountingOptions, mountingOptions } from "../helper";

const mockedPlace = new mockPlace();

test("renders empty component", () => {
  const wrapper = mount(CEditPlaces, mountingOptions());
  expect(wrapper.find(".editPlace").exists()).toBeFalsy();
});

test("renders one place object", () => {
  const places = [new PropPlace(mockedPlace.place, undefined)];
  const wrapper = mount(CEditPlaces, {
    global: globalMountingOptions(),
    props: { propPlaces: places },
  });
  expect(wrapper.find(".editPlace").exists());
});
