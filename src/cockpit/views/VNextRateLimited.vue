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
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";

export default {
  async beforeMount(): Promise<void> {
    if (!(await HTTPReq.genGET(this.$router, "ratelimit"))) {
      General.toNext(this);
    }
  },
};
</script>
