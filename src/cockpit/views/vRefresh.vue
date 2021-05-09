<template lang="pug">
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Routing from "@/shared/Routing";
import Routes from "@/routes";

export default defineComponent({
  async beforeMount(): Promise<void> {
    const paramMap = Routing.getParamMap();
    await Routing.genRedirectTo(
      (paramMap.get("next") ?? Routes.Landing)
        .replaceAll(".slash.", "/")
        .replaceAll(".colon.", ":")
        .replaceAll(".equal.", "="),
    );
  },
});
</script>
