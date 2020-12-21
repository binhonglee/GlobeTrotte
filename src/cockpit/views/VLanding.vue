<template lang="pug">
  .landing
    h1.title GlobeTrotte
    p
      | Feel free to click around but nothing is set in
      | stone. Do not save any important infomation here.
      | Everything can and will be wiped from time to time.
      br
      br
      | You should check back again soon!
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VLanding extends Vue {}
</script>
