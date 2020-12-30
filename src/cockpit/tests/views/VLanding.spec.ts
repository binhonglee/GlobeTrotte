import HTTPReq from "@/shared/HTTPReq";
import VLanding from "@/views/VLanding.vue";

import { shallowMount } from "@vue/test-utils";
import sinon from "sinon";
import test from "ava";

test("Landing Page", async (t) => {
  const genGET = sinon.stub(HTTPReq, "genGET").resolves([]);
  const wrapper = shallowMount(VLanding, {});
  t.is(wrapper.find(".title").text(), "GlobeTrotte");
  t.true(genGET.calledOnce);
  t.is(genGET.args[0][0], "sample_trips");
  await genGET.restore();
});
