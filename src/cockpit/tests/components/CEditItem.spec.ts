import CEditItem from "@/components/CEditItem.vue";
import Item from "@/shared/TripEditable";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("renders name item", (t) => {
  const item = new Item("name", "something");
  const wrapper = shallowMount(CEditItem, {
    propsData: {
      label: item.label,
      val: item.value,
    },
  });
  t.regex(wrapper.find(".editLabel").text(), /Name/);
});

test("renders description item", (t) => {
  const item = new Item("description", "something");
  const wrapper = shallowMount(CEditItem, {
    propsData: {
      label: item.label,
      val: item.value,
    },
  });
  t.regex(wrapper.find(".editLabel").text(), /Description/);
});

test("renders unknown item", (t) => {
  const item = new Item("random", "something");
  const wrapper = shallowMount(CEditItem, {
    propsData: {
      label: item.label,
      val: item.value,
    },
  });
  t.regex(wrapper.find(".editLabel").text(), /unknown_type/);
});
