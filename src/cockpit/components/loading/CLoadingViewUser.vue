<template lang="pug">
.loading_view_user
  n-skeleton.loading_user_name(height="40px" width="100px")
  .narrow_content
    n-skeleton(text :repeat="5")
  n-divider
  h2 Trips
  CLoadingTripPreviewCard(v-for="count in 5" :key="count" :wide="true" :limit-height="false")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard, NDivider, NSkeleton } from "naive-ui";
import CLoadingTripPreviewCard from "./CLoadingTripPreviewCard.vue";

export default defineComponent({
  name: "CLoadingViewUser",
  components: { NCard, NDivider, NSkeleton, CLoadingTripPreviewCard },
});
</script>

<style scoped>
.loading_user_name {
  margin: 20px auto;
}
</style>
