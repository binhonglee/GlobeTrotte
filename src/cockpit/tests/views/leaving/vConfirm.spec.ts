import Routing from "@/shared/Routing";
import { mountingOptions } from "@/tests/helper";
import vConfirm from "@/views/leaving/vConfirm.vue";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import sinon from "sinon";

describe("vConfirm", () => {
  it("Working external link", async () => {
    const externalURL = "https://youtu.be/dQw4w9WgXcQ";
    const paramMap = sinon
      .stub(Routing, "getParamMap")
      .returns(new Map<string, string>().set("link", externalURL));
    const wrapper = mount(vConfirm, mountingOptions());
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toEqual(
      "You are leaving GlobeTrotte...",
    );
    expect(wrapper.find(".content").text()).toContain(
      "Make sure you want to proceed to ",
    );
    expect(wrapper.find(".externalURL").text()).toEqual(externalURL);
    await paramMap.restore();
  });

  it("Working internal link", async () => {
    const internalURL = "https://globetrotte.com/trip/search";
    const redirection = sinon
      .stub(Routing, "genRedirectTo")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .callsFake(async (s, m, o): Promise<void> => {
        return;
      });
    const paramMap = sinon
      .stub(Routing, "getParamMap")
      .returns(new Map<string, string>().set("link", internalURL));
    const wrapper = mount(vConfirm, mountingOptions());
    expect(wrapper.html()).toMatchSnapshot();
    // Redirection doesn't work.
    // expect(wrapper.find(".title").text()).toEqual("Search Trip");
    expect(redirection.calledOnce).toBeTruthy();
    expect(redirection.args[0][0]).toEqual("/trip/search");
    await paramMap.restore();
    await redirection.restore();
  });

  it("Not a link", async () => {
    const brokenURL = "this_is_not_a_url";
    const paramMap = sinon
      .stub(Routing, "getParamMap")
      .returns(new Map<string, string>().set("link", brokenURL));
    const wrapper = mount(vConfirm, mountingOptions());
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toEqual("Broken link");
    expect(wrapper.find(".content").text()).toContain(
      "Seems like this link is broken. 😥",
    );
    await paramMap.restore();
  });
});
