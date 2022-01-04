import vNotFound from "@/views/vNotFound.vue";

import { mount } from "@vue/test-utils";
import { expect } from "@jest/globals";

describe("vNotFound", () => {
  it("404 Page not found", () => {
    const wrapper = mount(vNotFound, {});
    expect(wrapper.text()).toEqual("Uhh, there's nothing to see here...");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
