<template lang="pug">
  .trip_in_carousel
    el-carousel.viewUserTripInfoCarousel(
      indicator-position="outside"
      arrow="never"
      :interval="0"
      :autoplay="false"
    )
      el-carousel-item.tripDayPreview
        h3 {{ trip.name }}
        p(
          v-if="trip.description !== ''"
        ) {{ trip.description }}
        p Author: 
          a(
            v-bind:href="'/user/' + user.ID"
          ) {{ user.name }}
        p Created on: {{ trip.timeCreated.toLocaleDateString() }}

      el-carousel-item.tripDayPreview(
        v-for="day in trip.days"
      )
        h3 Day {{ day.dayOf }}
        CPlaces(:places="day.places")
</template>

<script lang="ts">
import Vue from "vue";
import General from "@/shared/General";
import CPlaces from "./CPlaces.vue";
import User from "@/wings/User";
import Trip from "@/wings/Trip";

export default Vue.extend({
  name: "CTripInCarousel",
  components: {
    CPlaces,
  },
  props: {
    user: {
      type: User,
    },
    trip: {
      type: Trip,
    }
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.tripDayPreview {
  overflow: auto;
  width: 280px;
  margin: 10px;
}

.viewUserTripInfoCarousel {
  .el-carousel__container {
    height: 200px;
  }
}
</style>
