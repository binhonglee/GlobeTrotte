<template lang="pug">
  .trip_in_carousel
    el-carousel.viewUserTripInfoCarousel(
      indicator-position="outside"
      arrow="never"
      :interval="0"
      :autoplay="false"
    )
      a(:href="'/trip/view/' + trip.ID")
        el-carousel-item.tripDayPreview
          h3 {{ trip.details.name }}
          p(
            v-if="trip.details.description !== ''"
          ) {{ trip.details.description }}
          p Author:
            a.tripPreviewUserProfileLink(
              v-bind:href="'/user/' + trip.user.ID"
              type="primary"
            ) {{ trip.user.name }}

        el-carousel-item.tripDayPreview(
          v-for="day in trip.details.days"
        )
          h3 Day {{ day.dayOf }}
          CPlaces(:places="day.places")
</template>

<script lang="ts">
import CPlaces from "./CPlaces.vue";
import TripObj from "@/wings/TripObj";

export default {
  name: "CTripInCarousel",
  components: {
    CPlaces,
  },
  props: {
    trip: {
      type: TripObj,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../shared/lib";

.tripDayPreview {
  overflow: auto;
  width: 280px;
  margin: 10px;

  .tripPreviewUserProfileLink {
    color: #409eff;
  }
}

.viewUserTripInfoCarousel {
  text-align: left;

  .el-carousel__container {
    height: 200px;
  }

  a {
    color: inherit;
  }
}
</style>
