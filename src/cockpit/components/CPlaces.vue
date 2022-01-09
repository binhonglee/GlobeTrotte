<template lang="pug">
.places
  ul.placesList(
    v-if="places !== undefined"
  )
    n-space.place(
      v-for="place in places"
      :key="place.URL.valueOf()"
      vertical
    )
      CExternalLink.placeLink(
        :url="place.URL.valueOf()"
        :underline="'never'"
        v-if="place.URL !== ''"
      )
        n-card.placeDisplayCard(
          hoverable
          content-style="padding: 0"
        )
          .placeDisplayCardContent
            b.link {{ place.label }}
            p.placeDescription(
              v-if="place.description !== ''"
            ) {{ place.description }}
      n-card.placeDisplayCard(
        v-else
        content-style="padding: 0")
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
import CExternalLink from "./CExternalLink.vue";
import { NCard, NSpace } from "naive-ui";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CPlaces",
  components: { CExternalLink, NCard, NSpace },
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
