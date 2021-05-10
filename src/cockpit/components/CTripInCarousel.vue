<template lang="pug">
.trip_in_carousel
  el-card.carouselTripCard(shadow="hover")
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
          p Author:&nbsp;
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
import { defineComponent } from "vue";
import CPlaces from "@/components/CPlaces.vue";
import TripObj from "@/wings/TripObj";

export default defineComponent({
  name: "CTripInCarousel",
  components: {
    CPlaces,
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
@import "../shared/lib";

.trip_in_carousel {
  display: inline-block;
}
.carouselTripCard {
  display: inline-block;
  margin: 15px;
  width: 330px;
}

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
