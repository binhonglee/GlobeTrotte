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
    CTripInCarousel(
      v-for="trip in trips"
      :trip="trip"
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTripInCarousel from "@/components/CTripInCarousel.vue";
import HTTPReq from "@/shared/HTTPReq";
import TripObj from "@/wings/TripObj";

interface Data {
  trips: TripObj[];
}

export default defineComponent({
  components: {
    CTripInCarousel,
  },
  data: (): Data => ({
    trips: [],
  }),
  async beforeMount(): Promise<void> {
    this.$data.trips = [];
    console.log(process.env.NODE_ENV);
    const trips = await HTTPReq.genGET("v2/sample_trips");
    for (const trip of trips as Array<unknown>) {
      const newTrip = new TripObj(trip);
      if (newTrip.details.days.length > 0) {
        this.$data.trips.push(new TripObj(trip));
      }
    }
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.homePageTripCarousel {
  padding: 0 0 80px 0;

  .viewUserTripInfoCarousel .el-carousel__container {
    height: 350px;
  }
}
</style>
