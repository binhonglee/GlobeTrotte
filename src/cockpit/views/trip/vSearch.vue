<template lang="pug">
.search_trip.narrow_content
  h1.title Search Trip
  form.tripSearchForm
    el-select.tripSearchCityInput(
      v-model="selectedCity"
      filterable
      no-match-text="City not found"
      placeholder="City"
    )
      el-option.tripSearchSingleCity(
        v-for="item in possibleCities"
        :label="item.label"
        :value="item.key"
      )
    el-button(v-on:click="search") Find
  .TripSearchResultCarousel
    CTripInCarousel(
      v-for="trip in trips"
      :trip="trip"
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTripInCarousel from "@/components/CTripInCarousel.vue";
import { CityObj, CityUtil } from "@/shared/CityUtil";
import HTTPReq from "@/shared/HTTPReq";
import City from "@/wings/City";
import TripObj from "@/wings/TripObj";
import TripsSearchQuery from "@/wings/TripSearchQuery";
import { WingsStructUtil } from "wings-ts-util";

interface Data {
  selectedCity: City | null;
  possibleCities: Array<CityObj>;
  searching: boolean;
  trips: TripObj[];
}

export default defineComponent({
  components: {
    CTripInCarousel,
  },
  data: (): Data => ({
    selectedCity: null,
    possibleCities: [],
    searching: false,
    trips: [],
  }),
  beforeMount(): void {
    this.$data.possibleCities = CityUtil.sortedCityList();
  },
  methods: {
    async search(): Promise<void> {
      if (this.$data.selectedCity === null) {
        return;
      }

      const searchQuery = new TripsSearchQuery({
        cities: [this.$data.selectedCity],
      });
      this.$data.searching = true;
      const res = await HTTPReq.genPOST(
        "trip/search",
        WingsStructUtil.stringify(searchQuery),
      );
      this.$data.trips = [];

      for (const trip of res as Array<unknown>) {
        const newTrip = new TripObj(trip);
        if (newTrip.details.days.length > 0) {
          this.$data.trips.push(new TripObj(trip));
        }
      }

      console.log(res);
      this.$data.searching = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../shared/lib";

.tripSearchForm {
  @include trip_display();
}
.tripSearchCityInput {
  padding: 0 10px;
}
</style>
