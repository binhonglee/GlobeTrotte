import { expect, describe, test } from "vitest";
import { mockDay } from "@/tests/mockData/data";
import { mount } from "@vue/test-utils";
import CEditDay from "@/components/CEditDays.vue";
import { globalMountingOptions } from "../helper";

describe("CEditDays", () => {
  test("renders one component", () => {
    const day = new mockDay().day;
    const wrapper = mount(CEditDay, {
      global: globalMountingOptions(),
      propsData: { givenDays: [day] },
    });
    expect(wrapper.find(".editDayTitle").text()).toMatch(
      new RegExp("Day " + day.dayOf),
    );
    expect(wrapper.find(".removeDay").exists()).toBeTruthy();
    expect(wrapper.find(".addDay").exists()).toBeTruthy();
  });
});
