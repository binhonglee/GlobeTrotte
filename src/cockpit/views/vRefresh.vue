<template lang="pug">
.refresh
  CHead(title="Redirecting...")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Routing from "@/shared/Routing";
import Routes from "@/routes";
import CHead from "@/components/CHead.vue";

export default defineComponent({
  components: { CHead },
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
