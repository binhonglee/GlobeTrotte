<template lang="pug">
.head
  Head
    title(v-if="title && title.length > 0") {{ title + " - GlobeTrotte" }}
    title(v-else) GlobeTrotte
    meta(property="og:type" :content="type")
    meta(property="og:site_name" content="GlobeTrotte")
    meta(
      property="og:title" :content="title + ' - GlobeTrotte'"
      v-if="title && title.length > 0"
    )
    meta(property="og:title" content="GlobeTrotte" v-else)
    meta(property="og:description" :content="description")
    meta(
      name="twitter:title" :content="title + ' - GlobeTrotte'"
      v-if="title && title.length > 0"
    )
    meta(name="twitter:title" content="GlobeTrotte" v-else)
    meta(name="twitter:description" :content="description")
    meta(
      itemprop="name" :content="title + ' - GlobeTrotte'"
      v-if="title && title.length > 0"
    )
    meta(itemprop="name" content="GlobeTrotte" v-else)
    meta(itemprop="description" :content="description")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Head } from "@vueuse/head";

export default defineComponent({
  components: {
    Head,
  },
  props: {
    title: {
      type: String || undefined,
      default: undefined,
    },
    description: {
      type: String || undefined,
      default: undefined,
    },
    type: {
      type: String || undefined,
      default: undefined,
    },
  },
});
</script>
