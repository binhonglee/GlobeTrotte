<template lang="pug">
  .places
    ul.placesList(
      v-if="places !== undefined"
    )
      el-row.place(
        v-for="place in places"
        v-bind:key="place.URL"
      )
        el-link.placeLink(
          target="_blank"
          rel="noopener noreferrer"
          :underline="false"
          :href="place.URL"
        )
          el-card.placeDisplayCard
            b {{ place.label }}
            p.placeDescription(v-if="place.description !== ''") {{ place.description }}



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
.places {
  padding: 0;
  margin: 0;
}

.placesList {
  margin-top: 10px;
  padding: 0;
}

.placeLink,
.placeLink .el-link--inner {
  width: 100%;
}

.places .placeDisplayCard .el-card__body {
  b {
    color: #409eff;
  }
  padding: 10px;
}

.placeDisplayCard:hover {
  b {
    text-decoration: underline;
    text-decoration-color: #409eff;
  }
}

.placeDescription {
  padding: 0;
  margin-top: 5px;
  margin-bottom: 0;
}
</style>
