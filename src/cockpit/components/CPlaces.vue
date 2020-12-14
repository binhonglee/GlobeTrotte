<template lang="pug">
  .places
    ul#places(
      v-if="places !== undefined"
    )
      li#place(
        v-for="place in places"
        v-bind:key="place.URL"
      )
        a(
          target="_blank"
          rel="noopener noreferrer"
          :href="place.URL"
        ) {{ place.label }}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CPlaces",
  props: {
    places: {
      type: Array,
      default: () => {
        [];
      },
    },
  },
});
</script>

<style lang="scss">
#places {
  padding: inherit;
  margin: 0;
}

#place {
  margin-left: 10px;
}
</style>
