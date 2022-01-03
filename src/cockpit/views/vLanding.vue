<template lang="pug">
.landing
  h1.title GlobeTrotte
  h3.subtitle Look for your next travel plan here!
  br
  form.tripSearchForm
    n-input.tripSearchQueryInput(
      placeholder="Alaska"
      v-model:value="query"
      v-on:keyup.enter.native="search"
    )
    n-select.tripSearchCityInput(
      v-model:value="selectedCities"
      :options="possibleCities"
      filterable
      multiple
      placeholder="City"
    )
    el-button(v-on:click="search") Find
  .homePageTripCarousel
    CTripPreviewCard(
      v-for="trip in trips"
      :trip="trip"
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTripPreviewCard from "@/components/CTripPreviewCard.vue";
import HTTPReq from "@/shared/HTTPReq";
import TripObj from "@/wings/TripObj";
import { Options, CityUtil } from "@/shared/CityUtil";
import Routing from "@/shared/Routing";
import Routes from "@/routes";
import City from "@/wings/City";
import { NSelect, NInput } from "naive-ui";

interface Data {
  length: number;
  possibleCities: Array<Options>;
  query: string;
  selectedCities: City[];
  trips: TripObj[];
}

export default defineComponent({
  components: {
    NInput,
    NSelect,
    CTripPreviewCard,
  },
  data: (): Data => ({
    length: 0,
    possibleCities: [],
    query: "",
    selectedCities: [],
    trips: [],
  }),
  async beforeMount(): Promise<void> {
    this.$data.possibleCities = CityUtil.sortedCityOptions();
    this.$data.trips = [];
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
        await Routing.genRedirectTo(Routes.trip_Search);
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
  padding-bottom: 30px;
  text-align: center;
}

.tripSearchQueryInput {
  display: inline-block;
  text-align: left;
}

.tripSearchCityInput {
  margin: auto;
  padding: 10px 0;
  max-width: 300px;
}

.homePageTripCarousel {
  padding: 0 0 80px 0;
}
</style>
