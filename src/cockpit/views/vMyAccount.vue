<template>
  <CHead />
</template>

<!-- DEPRECATED

This page is deprecated. Keeping this redirection for use in e2e tests. Please
redirect to `Routes.User + "/" + General.getCurrentUsername()` instead. -->

<script lang="ts">
import { defineComponent } from "vue";
import CHead from "@/components/CHead.vue";
import General from "@/shared/General";
import Routing from "@/shared/Routing";
import Routes from "@/routes";

export default defineComponent({
  components: {
    CHead,
  },
  async beforeCreate(): Promise<void> {
    await Routing.genRedirectTo(
      Routes.User,
      undefined,
      General.getCurrentUsername(),
    );
  },
});
</script>
