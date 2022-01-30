<template lang="pug">
.search_trip
  h1.title Search Trip
  form.tripSearchForm
    n-input.tripSearchQueryInput(
      placeholder="Alaska"
      v-model:value="query"
      @keyup.enter.native="search"
    )
    n-select.tripSearchCityInput(
      v-model:value="selectedCities"
      :options="possibleCities"
      filterable
      multiple
      placeholder="City"
    )
    n-button.tripSearchButton(@click="search") Find
  .tripSearchResultCarousel(v-if="trips.length > 0")
    CTripPreviewCard(
      v-for="trip in trips"
      :trip="trip"
    )
  .tripSearchInitialMessage(v-else-if="init")
    .narrow_content
      n-alert(title="Search for a trip!" type="default")
        template(#icon)
          n-icon
            search
        | Try searching for "Alaska"
  .tripSearchNoResultFound(v-else-if="!searching && !init")
    .narrow_content.accountUnconfirmedAlertBar
      n-alert(
        title="No results"
        type="error"
      ) We could not find any trips that matches your search parameters. Please try again.
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTripPreviewCard from "@/components/CTripPreviewCard.vue";
import { Options, CityUtil } from "@/shared/CityUtil";
import HTTPReq from "@/shared/HTTPReq";
import TripObj from "@/wings/TripObj";
import TripsSearchQuery from "@/wings/TripSearchQuery";
import { WingsStructUtil } from "wings-ts-util";
import Routing from "@/shared/Routing";
import { NAlert, NButton, NIcon, NInput, NSelect } from "naive-ui";
import { Search } from "@vicons/ionicons5";
import TripUtil from "@/shared/TripUtil";

interface Data {
  length: number;
  possibleCities: Array<Options>;
  query: string;
  searching: boolean;
  selectedCities: string[];
  trips: TripObj[];
  init: boolean;
}

export default defineComponent({
  components: {
    Search,
    NAlert,
    NButton,
    NIcon,
    NInput,
    NSelect,
    CTripPreviewCard,
  },
  data: (): Data => ({
    length: 0,
    possibleCities: [],
    query: "",
    searching: false,
    selectedCities: [],
    trips: [],
    init: false,
  }),
  async beforeMount(): Promise<void> {
    this.$data.searching = true;
    this.$data.possibleCities = CityUtil.sortedCityOptions();
    const paramMap = Routing.getParamMap();
    if (paramMap.size === 0) {
      this.$data.init = true;
      this.$data.searching = false;
      return;
    }
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
      this.$data.init = false;
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
        this.$data.searching = false;
        return;
      }

      for (const trip of res as Array<unknown>) {
        const newTrip = new TripObj(trip);
        if (newTrip.details.days.length > 0) {
          this.$data.trips.push(new TripObj(trip));
        }
      }
      TripUtil.sortTripsMostRecentlyUpdated(this.$data.trips);
      this.$data.searching = false;
    },
  },
});
</script>

<style scoped>
.tripSearchQueryInput {
  max-width: 300px;
}

.tripSearchForm {
  padding: 30px 10px;
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

.tripSearchInitialMessage {
  max-width: 500px;
  padding: 0 10px;
  margin: auto;
}
</style>
