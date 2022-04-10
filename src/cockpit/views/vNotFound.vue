<template>
  <CHead
    title="Oops! Page not found"
    description="There's nothing on this page."
    type="error"
  />
  <div class="_404 narrow_content">
    <h3>Uhh, there's nothing to see here...</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CHead from "@/components/CHead.vue";

export default defineComponent({
  components: {
    CHead,
  },
});
</script>

<style scoped>
._404 {
  margin-top: 100px;
}
</style>
