import { expect, test } from "vitest";
import CEditPlaces, { DataPlace } from "@/components/CEditPlaces.vue";
import { mockPlace } from "@/tests/mockData/data";
import { shallowMount } from "@vue/test-utils";

const mockedPlace = new mockPlace();

test("renders empty component", () => {
  const wrapper = shallowMount(CEditPlaces, {});
  expect(wrapper.find(".editPlace").exists()).toBeFalsy();
});

test("renders one place object", () => {
  const places = [new DataPlace(mockedPlace.place)];
  const wrapper = shallowMount(CEditPlaces, {
    propsData: { givenPlaces: places },
  });
  expect(wrapper.find(".editPlace").exists());
});
