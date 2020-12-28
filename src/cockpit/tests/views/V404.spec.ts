import V404 from "@/views/V404.vue";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("404 Page not found", (t) => {
  const wrapper = shallowMount(V404, {});
  t.is(
    wrapper.text(),
    "Uhh, there's nothing to see here...",
  );
});
