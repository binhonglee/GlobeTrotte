import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import vNotFound from "@/views/vNotFound.vue";

test("vNotFound", async () => {
  expect(vNotFound).toBeTruthy();

  const wrapper = mount(vNotFound, {});
  expect(wrapper.text()).toEqual("Uhh, there's nothing to see here...");
});
