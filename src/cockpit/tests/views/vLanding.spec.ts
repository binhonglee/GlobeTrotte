import HTTPReq from "@/shared/HTTPReq";
import vLanding from "@/views/vLanding.vue";

import { shallowMount } from "@vue/test-utils";
import sinon from "sinon";
import test from "ava";

test("Landing Page", async (t) => {
  const genGET = sinon.stub(HTTPReq, "genGET").resolves([]);
  const wrapper = shallowMount(vLanding, {});
  t.is(wrapper.find(".title").text(), "GlobeTrotte");
  t.true(genGET.calledOnce);
  t.is(genGET.args[0][1], "v2/sample_trips");
  await genGET.restore();
});
