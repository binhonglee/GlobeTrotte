import v404 from "@/views/v404.vue";

import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";

describe("404", () => {
  it("404 Page not found", () => {
    const wrapper = mount(v404, {});
    expect(wrapper.text()).toEqual("Uhh, there's nothing to see here...");
  });
});
