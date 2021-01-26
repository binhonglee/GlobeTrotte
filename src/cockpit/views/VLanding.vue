<template lang="pug">
  .landing
    h1.title GlobeTrotte
    p
      | Feel free to click around but nothing is set in
      | stone. Do not save any important infomation here.
      | Everything can and will be wiped from time to time.
      br
      br
      | You should check back again soon!
    br
    br
    .homePageTripCarousel
      el-card.homePageTripCard(
        v-for="trip in trips"
        shadow="hover"
      )
        CTripInCarousel(
          :trip="trip"
        )
</template>

<script lang="ts">
import CTripInCarousel from "@/components/CTripInCarousel.vue";
import HTTPReq from "@/shared/HTTPReq";
import Trip from "@/wings/Trip";

interface Data {
  trips: Trip[];
}

export default {
  components: {
    CTripInCarousel,
  },
  data: (): Data => ({
    trips: [],
  }),
  async beforeMount(): Promise<void> {
    this.$data.trips = [];
    const trips = await HTTPReq.genGET(this.$router, "sample_trips");
    for (const trip of trips) {
      const newTrip = new Trip(trip);
      if (newTrip.days.length > 0) {
        this.$data.trips.push(new Trip(trip));
      }
    }
  },
};
</script>

<style lang="scss">
@import "../shared/lib";

.homePageTripCarousel {
  padding: 0 0 80px 0;

  .viewUserTripInfoCarousel .el-carousel__container {
    height: 350px;
  }
}

.homePageTripCard {
  display: inline-block;
  margin: 15px;
  width: 310px;

  .el-card__body {
    padding: 5px;
  }
}
</style>
