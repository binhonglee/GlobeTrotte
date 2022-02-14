<template lang="pug">
a(
  :class="'underline_' + underline + ' ' + 'color_' + color"
  :href="url"
  :rel="external ? 'noopener noreferrer' : ''"
  :target="external ? '_blank': ''"
)
  slot
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export type LinkUnderline = "never" | "always" | "hover";
export type LinkColor = "never" | "always";

export default defineComponent({
  name: "CLink",
  props: {
    url: {
      type: String,
      required: true,
    },
    underline: {
      type: String as PropType<LinkUnderline>,
      default: "always",
    },
    color: {
      type: String as PropType<LinkUnderline>,
      default: "always",
    },
    external: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.underline_always {
  text-decoration: underline;
}

.underline_never,
.underline_hover {
  text-decoration: none;
}

.underline_hover:hover {
  text-decoration: underline;
}

.color_always {
  color: var(--default-link);
}

.color_never {
  color: unset;
}
</style>
