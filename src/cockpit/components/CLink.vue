<template lang="pug">
a.link(
  :class="underline"
  :href="url"
  :rel="external ? 'noopener noreferrer' : ''"
  :target="external ? '_blank': ''"
)
  slot
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export type LinkUnderline = "never" | "always" | "hover";

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
    external: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.link {
  color: var(--default-link);
}

.always {
  text-decoration: underline;
}

.hover {
  text-decoration: none;
}

.hover:hover {
  text-decoration: underline;
}

.never {
  text-decoration: none;
}
</style>
