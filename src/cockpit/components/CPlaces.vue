<template lang="pug">
.places
  ul.placesList(
    v-if="places !== undefined"
  )
    el-row.place(
      v-for="place in places"
      v-bind:key="place.URL.valueOf()"
    )
      el-link.placeLink(
        target="_blank"
        rel="noopener noreferrer"
        :underline="false"
        :href="place.URL"
        v-if="place.URL !== ''"
      )
        el-card.placeDisplayCard(shadow="hover")
          .placeDisplayCardContent
            b.link {{ place.label }}
            p.placeDescription(
              v-if="place.description !== ''"
            ) {{ place.description }}
      el-card.placeLink.placeDisplayCard(v-else shadow="hover")
        .placeDisplayCardContent
          b {{ place.label }}
          p.placeDescription(
            v-if="place.description !== ''"
          ) {{ place.description }}
</template>

<script lang="ts">
import Place from "@/wings/Place";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CPlaces",
  props: {
    places: {
      type: Array as PropType<Array<Place>>,
      required: true,
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

.places .placeDisplayCard {
  .placeDisplayCardContent {
    font-size: 14px;
    padding: 5px;

    .link {
      color: #409eff;
    }
  }
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
