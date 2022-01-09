<template lang="pug">
.trip_preview_card(:class="{ wide_preview_card: wide }")
  CLink.tripLink(:url="'/trip/view/' + trip.ID" underline="never")
    n-card(
      hoverable
      content-style="padding: 0"
      :class="{ widePreviewCard: wide, tripPreviewCard: !wide }"
    )
      h3.tripTitleName {{ trip.details.name.valueOf() }}
      n-divider
      .tripPreviewInfo
        p(
          v-if="trip.details.description !== ''"
        ) {{ trip.details.description }}
        p
          CLink.tripPreviewUserProfileLink(
            :url="'/user/' + trip.user.ID"
            underline="hover"
          ) {{ trip.user.name }}
        .cityTags
          n-tag.cityTag(v-for="city in cities" type="info") {{ city }}
        p Last Updated: {{ trip.lastUpdated.toDateString() }}
      .daysInTrip(v-for="day in trip.details.days")
        n-divider
        .tripDayPreview
          h3.tripDayLabel Day {{ day.dayOf }}
          CPlaces(:places="day.places")
      .endOfCardPadding
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard, NDivider, NTag } from "naive-ui";
import CLink from "./CLink.vue";
import CPlaces from "@/components/CPlaces.vue";
import TripObj from "@/wings/TripObj";
import { CityUtil } from "@/shared/CityUtil";

export default defineComponent({
  name: "CTripPreviewCard",
  components: {
    CLink,
    CPlaces,
    NCard,
    NDivider,
    NTag,
  },
  props: {
    trip: {
      type: TripObj,
      required: true,
    },
    wide: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      cities: [""],
    };
  },
  mounted(): void {
    this.$data.cities = this.$props.trip.details.cities.map((city) => {
      return CityUtil.toString(city);
    });
  },
});
</script>

<style lang="scss" scoped>
.trip_preview_card {
  display: inline-block;
  margin: 15px;
  max-width: 88%;
}

.wide_preview_card {
  width: 100%;
}

.tripPreviewCard {
  overflow: auto;
  width: 330px;
  height: 500px;

  @media screen and (max-width: 720px) {
    height: auto;
  }

  @media screen and (max-width: 375px) {
    width: 100%;
  }
}

.widePreviewCard {
  display: block;
  height: auto;
  margin: auto;
  width: 750px;
  max-width: 100%;
}

.tripLink {
  text-decoration: none;
}

.tripPreviewInfo,
.tripDayPreview {
  padding: 0 20px;
  text-align: left;
}

.tripDayLabel {
  padding: 0 5px;
}

.tripTitleName,
.endOfCardPadding {
  margin-top: 24px;
}

.cityTag {
  margin-right: 5px;
}
</style>
