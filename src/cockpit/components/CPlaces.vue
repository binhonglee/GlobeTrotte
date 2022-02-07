<template lang="pug">
.places
  ul.placesList(
    v-if="propPlaces !== undefined"
  )
    .place(
      v-for="propPlace in propPlaces"
      :key="propPlace.place.URL.valueOf()"
      vertical
    )
      n-divider.travelTime(
        v-if="propPlace.travelTime !== undefined && propPlace.travelTime.timeInMinutes > 1"
      )
        | {{ propPlace.travelTime.timeInMinutes }} mins
      n-divider.travelTime(
        v-else-if="propPlace.travelTime !== undefined"
      )
        | {{ propPlace.travelTime.timeInMinutes }} min
      n-divider(v-else)
      .placeDisplayCard(
        hoverable
        content-style="padding: 0"
        v-if="propPlace.place.URL !== ''"
      )
        .placeDisplayCardContent
          CExternalLink.placeLink(
            :url="propPlace.place.URL.valueOf()"
            underline="hover"
          )
            b.link {{ propPlace.place.label }}
          p.placeDescription(
            v-if="propPlace.place.description !== ''"
          ) {{ propPlace.place.description }}
      .placeDisplayCard(
        v-else
        content-style="padding: 0")
        .placeDisplayCardContent
          b {{ propPlace.place.label }}
          p.placeDescription(
            v-if="propPlace.place.description !== ''"
          ) {{ propPlace.place.description }}
</template>

<script lang="ts">
import Routes from "@/routes";
import Routing from "@/shared/Routing";
import { PropPlace } from "@/shared/DataProps";
import CExternalLink from "./CExternalLink.vue";
import { NCard, NDivider, NSpace } from "naive-ui";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CPlaces",
  components: { CExternalLink, NCard, NDivider, NSpace },
  props: {
    propPlaces: {
      type: Array as PropType<Array<PropPlace>>,
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

<style>
.places {
  padding: 0;
  margin: 0;
}

.placesList {
  margin-top: 10px;
  padding: 0;
}

.place .n-divider:not(.n-divider--vertical) {
  margin: 5px 0;
}

.placeLink,
.placeLink .el-link--inner {
  width: 100%;
  cursor: pointer;
}

.places .placeDisplayCard .placeDisplayCardContent {
  font-size: 14px;
  padding: 5px;
}

.placeDescription {
  padding: 0;
  margin-top: 5px;
  margin-bottom: 0;
}
</style>
