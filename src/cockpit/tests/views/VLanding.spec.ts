import VLanding from "@/views/VLanding.vue";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("Landing Page", (t) => {
  const wrapper = shallowMount(VLanding, {});
  t.is(wrapper.find(".title").text(), "GlobeTrotte");
});
