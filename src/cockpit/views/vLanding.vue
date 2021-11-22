<template lang="pug">
.landing
  h1.title GlobeTrotte
  form.tripSearchForm
  el-input.tripSearchQueryInput(
    placeholder="Trip to Alaska"
    v-model="query"
    v-on:keyup.enter.native="search"
  )
  el-select.tripSearchCityInput(
    v-model="selectedCities"
    filterable
    multiple
    no-match-text="City not found"
    placeholder="City"
  )
    el-option.tripSearchSingleCity(
      v-for="item in possibleCities"
      :label="item.label"
      :value="item.key"
    )
  el-button(v-on:click="search") Find
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
import { CityObj, CityUtil } from "@/shared/CityUtil";
import Routing from "@/shared/Routing";
import Routes from "@/routes";
import City from "@/wings/City";

interface Data {
  length: number;
  possibleCities: Array<CityObj>;
  query: string;
  selectedCities: City[];
  trips: TripObj[];
}

export default defineComponent({
  components: {
    CTripInCarousel,
  },
  data: (): Data => ({
    length: 0,
    possibleCities: [],
    query: "",
    selectedCities: [],
    trips: [],
  }),
  async beforeMount(): Promise<void> {
    this.$data.possibleCities = CityUtil.sortedCityList();
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
  methods: {
    async search(): Promise<void> {
      if (
        !(
          this.$data.query.length > 0 ||
          this.$data.selectedCities.length > 0 ||
          this.$data.length !== 0
        )
      ) {
        return;
      }
      await Routing.genRedirectTo(
        Routes.trip_Search,
        new Map<string, string>(
          Object.entries({
            length: this.$data.length.toString(),
            query: this.$data.query,
            cities: CityUtil.citiesToString(this.$data.selectedCities),
          }),
        ),
      );
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../shared/lib";

.tripSearchQueryInput {
  max-width: 300px;
}

.tripSearchForm {
  text-align: center;
}

.tripSearchCityInput {
  padding: 0 10px;
}

.homePageTripCarousel {
  padding: 0 0 80px 0;

  .viewUserTripInfoCarousel .el-carousel__container {
    height: 350px;
  }
}
</style>
