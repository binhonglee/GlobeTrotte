<template lang="pug">
  .rate_limited
    h1.title Going Around A Little Too Fast
    p
      | Hey there, we think you might be going around the website a little too
      | fast. You might take a little break before continue browsing.
      br
      | Refresh this page again when you are ready.
    br
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HTTPReq from "@/shared/HTTPReq";
import Routing from "@/shared/Routing";

export default defineComponent({
  async beforeMount(): Promise<void> {
    if (!(await HTTPReq.genGET("ratelimit"))) {
      await Routing.paramToNext();
    }
  },
});
</script>
