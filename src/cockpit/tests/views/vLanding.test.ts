import HTTPReq from "@/shared/HTTPReq";
import vLanding from "@/views/vLanding.vue";
import { expect } from "@jest/globals";

import { shallowMount } from "@vue/test-utils";
import sinon from "sinon";

describe("Landing", () => {
  it("Load Page", async () => {
    const genGET = sinon.stub(HTTPReq, "genGET").resolves([]);
    const wrapper = shallowMount(vLanding, {});
    expect(wrapper.find(".title").text()).toEqual("GlobeTrotte");
    expect(genGET.calledOnce).toEqual(true);
    expect(genGET.args[0][0]).toEqual("v2/sample_trips");
    await genGET.restore();
  });
});
