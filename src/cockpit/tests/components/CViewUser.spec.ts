import CViewUser from "@/components/CViewUser.vue";
import { mockUserObj } from "@/tests/mockData/data";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { globalMountingOptions } from "../helper";

describe("CViewUser", () => {
  it("render component", () => {
    const user = new mockUserObj().user;
    const wrapper = mount(CViewUser, {
      global: globalMountingOptions(),
      propsData: { user },
    });

    expect(wrapper.find(".userInfo").exists()).toBeTruthy();
    expect(wrapper.find(".userName").text()).toMatch(
      new RegExp(user.details.name.valueOf()),
    );
    expect(wrapper.find(".userBio").text()).toMatch(
      new RegExp(user.details.bio.valueOf()),
    );
  });
});
