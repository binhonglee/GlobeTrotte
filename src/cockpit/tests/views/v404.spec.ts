import v404 from "@/views/v404.vue";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("404 Page not found", (t) => {
  const wrapper = shallowMount(v404, {});
  t.is(wrapper.text(), "Uhh, there's nothing to see here...");
});
