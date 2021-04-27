<template lang="pug">
</template>

<script lang="ts">
import R from "@/shared/R";
import Routes from "@/routes";

export default {
  async beforeMount(): Promise<void> {
    const paramMap = R.getParamMap(this);
    await R.genRedirectTo(
      this,
      (paramMap.get("next") ?? Routes.Landing)
        .replaceAll(".slash.", "/")
        .replaceAll(".colon.", ":")
        .replaceAll(".equal.", "="),
    );
  },
};
</script>
