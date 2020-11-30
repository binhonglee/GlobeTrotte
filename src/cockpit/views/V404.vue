<template lang="pug">
  ._404.narrow_content
    h3 Uhh, there's nothing to see here...
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class V404 extends Vue {}
</script>

<style>
h3 {
  margin-top: 40%;
}
</style>
