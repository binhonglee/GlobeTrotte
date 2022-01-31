import HTTPReq from "@/shared/HTTPReq";
import vLanding from "@/views/vLanding.vue";
import { expect, spyOn, test } from "vitest";
import { mount } from "@vue/test-utils";
import { mountingOptions } from "../helper";
import { stub } from "../vitestSpy";

test("Landing - Load Page", async () => {
  const genGET = stub(spyOn(HTTPReq, "genGET")).resolves([]);
  const wrapper = mount(vLanding, mountingOptions());
  expect(wrapper.html()).toMatchSnapshot();
  expect(wrapper.find(".title").text()).toEqual("GlobeTrotte");
  expect(genGET.calledOnce()).toEqual(true);
  expect(genGET.args()[0][0]).toEqual("v2/sample_trips");
  await genGET.restore();
});
