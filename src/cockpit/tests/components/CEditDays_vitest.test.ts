import { expect, describe, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import CEditDay from "@/components/CEditDays.vue";

describe("CEditDays", () => {
  test("mount component", async () => {
    expect(CEditDay).toBeTruthy();

    const wrapper = shallowMount(CEditDay, {
      propsData: { givenDays: [] },
    });

    expect(wrapper.text()).toContain("Add another day");
    // expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".editDayTitle").exists()).toBeFalsy();
    expect(wrapper.find(".removeDay").exists()).toBeFalsy();
    expect(wrapper.find(".addDay").exists()).toBeTruthy();
  });
});
