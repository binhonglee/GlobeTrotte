<template lang="pug">
.places
  ul.placesList(
    v-if="places !== undefined"
  )
    el-row.place(
      v-for="place in places"
      v-bind:key="place.URL.valueOf()"
    )
      .placeLink(
        @click="redirect(place.URL.valueOf())"
        :underline="false"
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
import Routes from "@/routes";
import Routing from "@/shared/Routing";
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
  methods: {
    async redirect(link: string): Promise<void> {
      await Routing.genNewTab(
        Routes.leaving_Confirm,
        new Map<string, string>(
          Object.entries({
            link: encodeURIComponent(link)
              .split("%")
              .join(".pct.")
              .split(".")
              .join("&dots&"),
          }),
        ),
      );
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
  cursor: pointer;
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
