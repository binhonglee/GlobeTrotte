<template lang="pug">
  .about.narrow_content
    h1.title About
    p
      | Our goal is to change the way people share their
      | travel experiences and how they plan for their future
      | travels.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VAbout extends Vue {}
</script>
