import HTTPReq from "@/shared/HTTPReq";
import vLanding from "@/views/vLanding.vue";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import sinon from "sinon";
import { mountingOptions } from "../helper";

describe("Landing", () => {
  it("Load Page", async () => {
    const genGET = sinon.stub(HTTPReq, "genGET").resolves([]);
    const wrapper = mount(vLanding, mountingOptions());
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".title").text()).toEqual("GlobeTrotte");
    expect(genGET.calledOnce).toEqual(true);
    expect(genGET.args[0][0]).toEqual("v2/sample_trips");
    await genGET.restore();
  });
});
