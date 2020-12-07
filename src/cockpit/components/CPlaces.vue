<template lang="pug">
  .places
    ul#places(
      v-if="places !== undefined"
      v-for="place in places"
    ) Places:
      div#place(v-bind:key="place.url")
        a(
          target="_blank"
          rel="noopener noreferrer"
          :href="place.url"
        ) {{ place.label }}
</template>

<script lang="ts">
import Vue from "vue";
import Place from "wings/Place";

export default Vue.extend({
  name: "CPlaces",
  props: {
    places: {
      type: Array,
    }
  }
})
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
