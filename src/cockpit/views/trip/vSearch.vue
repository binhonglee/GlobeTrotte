<template lang="pug">
.search_trip
  h1.title Search Trip
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
import { CityObj, CityUtil } from "@/shared/CityUtil";
import HTTPReq from "@/shared/HTTPReq";
import City from "@/wings/City";
import TripObj from "@/wings/TripObj";
import TripsSearchQuery from "@/wings/TripSearchQuery";
import { WingsStructUtil } from "wings-ts-util";
import Routing from "@/shared/Routing";

interface Data {
  length: number;
  possibleCities: Array<CityObj>;
  query: string;
  searching: boolean;
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
    searching: false,
    selectedCities: [],
    trips: [],
  }),
  async beforeMount(): Promise<void> {
    this.$data.searching = true;
    this.$data.possibleCities = CityUtil.sortedCityList();
    const paramMap = Routing.getParamMap();
    const length = +(paramMap.get("length") ?? "");
    this.$data.length = isNaN(length) ? 0 : length;
    this.$data.query = paramMap.get("query") ?? "";
    this.$data.selectedCities = CityUtil.stringToCities(
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

      const searchQuery = new TripsSearchQuery({
        cities: this.$data.selectedCities,
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

.tripSearchCityInput {
  padding: 0 10px;
}

.tripSearchNoResultFound {
  text-align: left;
}
</style>
