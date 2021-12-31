import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import v404 from "@/views/v404.vue";

test("v404", async () => {
  expect(v404).toBeTruthy();

  const wrapper = mount(v404, {});
  expect(wrapper.text()).toEqual("Uhh, there's nothing to see here...");
});
