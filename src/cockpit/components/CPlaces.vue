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
          v-if="place.URL !== ''"
        )
          el-card.placeDisplayCard(shadow="hover")
            b.link {{ place.label }}
            p.placeDescription(
              v-if="place.description !== ''"
            ) {{ place.description }}
        el-card.placeDisplayCard(v-else shadow="hover")
          b {{ place.label }}
          p.placeDescription(
            v-if="place.description !== ''"
          ) {{ place.description }}
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
  beforeMount(): void {
    console.log(this.$props.places);
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
  .link {
    color: #409eff;
  }
  font-size: 14px;
  padding: 10px;
}

.placeDisplayCard:hover {
  .link {
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
