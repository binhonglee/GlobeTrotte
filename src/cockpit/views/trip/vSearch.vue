<template lang="pug">
.search_trip
  h1.title Search Trip
  form.tripSearchForm
    n-input.tripSearchQueryInput(
      placeholder="Trip to Alaska"
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
  .tripSearchResultCarousel(v-if="trips.length > 0")
    CTripInCarousel(
      v-for="trip in trips"
      :trip="trip"
    )
  .tripSearchNoResultFound(v-else-if="!searching")
    el-alert.narrow_content.accountUnconfirmedAlertBar(
      title="No results"
      description="We could not find any trips that matches your search parameters. Please try again."
      type="error"
      :closable="false"
      show-icon
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTripInCarousel from "@/components/CTripInCarousel.vue";
import { Options, CityUtil } from "@/shared/CityUtil";
import HTTPReq from "@/shared/HTTPReq";
import TripObj from "@/wings/TripObj";
import TripsSearchQuery from "@/wings/TripSearchQuery";
import { WingsStructUtil } from "wings-ts-util";
import Routing from "@/shared/Routing";
import { NSelect, NInput, c } from "naive-ui";

interface Data {
  length: number;
  possibleCities: Array<Options>;
  query: string;
  searching: boolean;
  selectedCities: string[];
  trips: TripObj[];
}

export default defineComponent({
  components: {
    NInput,
    NSelect,
    CTripInCarousel,
  },
  data: (): Data => ({
    length: 0,
    possibleCities: [],
    query: "",
    searching: false,
    selectedCities: [],
    trips: [],
  }),
  async beforeMount(): Promise<void> {
    this.$data.searching = true;
    this.$data.possibleCities = CityUtil.sortedCityOptions();
    const paramMap = Routing.getParamMap();
    const length = +(paramMap.get("length") ?? "");
    this.$data.length = isNaN(length) ? 0 : length;
    this.$data.query = paramMap.get("query") ?? "";
    this.$data.selectedCities = CityUtil.stringToCityStringArray(
      paramMap.get("cities") ?? "",
    );
    await this.search();
    this.$data.searching = false;
  },
  methods: {
    async search(): Promise<void> {
      if (this.$data.selectedCities.length < 1 && this.$data.query.length < 1) {
        return;
      }
      const cities = CityUtil.stringToCities(
        this.$data.selectedCities.join(","),
      );

      const searchQuery = new TripsSearchQuery({
        cities: cities,
        length: this.$data.length,
        query: this.$data.query,
      });
      this.$data.searching = true;
      const res = await HTTPReq.genPOST(
        "trip/search",
        WingsStructUtil.stringify(searchQuery),
      );

      this.$data.trips = [];
      if (res === null) {
        return;
      }

      for (const trip of res as Array<unknown>) {
        const newTrip = new TripObj(trip);
        if (newTrip.details.days.length > 0) {
          this.$data.trips.push(new TripObj(trip));
        }
      }
      this.$data.searching = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../shared/lib";

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

.tripSearchNoResultFound {
  text-align: left;
}
</style>
