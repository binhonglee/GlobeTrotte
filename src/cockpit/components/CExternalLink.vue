<template lang="pug">
.external_link(
  v-bind:class="underline"
  @click="redirect(url.valueOf())"
)
  slot
</template>

<script lang="ts">
import Routes from "@/routes";
import Routing from "@/shared/Routing";
import { defineComponent } from "vue";

enum ExternalLinkUnderline {
  never = "never",
  always = "always",
  hover = "hover",
}

export default defineComponent({
  name: "CExternalLink",
  props: {
    url: {
      type: String,
      required: true,
    },
    underline: {
      type: String,
      default: ExternalLinkUnderline.always,
    },
  },
  methods: {
    async redirect(link: string): Promise<void> {
      await Routing.genNewTab(
        Routes.leaving_Confirm,
        new Map<string, string>(
          Object.entries({
            link: encodeURIComponent(link)
              .split("%")
              .join(".pct.")
              .split(".")
              .join("&dots&"),
          }),
        ),
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../shared/lib";

.external_link {
  color: var(--default-link);
  cursor: pointer;
}

.always {
  text-decoration: underline;
}

.hover:hover {
  text-decoration: underline;
}
</style>
