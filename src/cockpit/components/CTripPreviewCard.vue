<template lang="pug">
.trip_preview_card
  a.tripLink(:href="'/trip/view/' + trip.ID")
    n-card.tripPreviewCard(
      hoverable
      content-style="padding: 0"
    )
      h3.tripTitleName {{ trip.details.name.valueOf() }}
      n-divider
      .tripPreviewInfo
        p(
          v-if="trip.details.description !== ''"
        ) {{ trip.details.description }}
        p Author:&nbsp;
          a.tripPreviewUserProfileLink(
            v-bind:href="'/user/' + trip.user.ID"
            type="primary"
          ) {{ trip.user.name }}
      .daysInTrip(v-for="day in trip.details.days")
        n-divider
        .tripDayPreview
          h3.tripDayLabel Day {{ day.dayOf }}
          CPlaces(:places="day.places")
      .endOfCardPadding
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard, NDivider } from "naive-ui";
import CPlaces from "@/components/CPlaces.vue";
import TripObj from "@/wings/TripObj";

export default defineComponent({
  name: "CTripPreviewCard",
  components: {
    CPlaces,
    NCard,
    NDivider,
  },
  props: {
    trip: {
      type: TripObj,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.trip_preview_card {
  display: inline-block;
  margin: 15px;
  width: 330px;
  max-width: 88%;
}

.tripPreviewCard {
  overflow: auto;
  height: 500px;

  @media screen and (max-width: 720px) {
    height: auto;
  }
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
</style>
