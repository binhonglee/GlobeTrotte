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
    CTripPreviewCard(
      v-for="trip in trips"
      :trip="trip"
    )
  .tripSearchNoResultFound(v-else-if="!searching && !init")
    el-alert.narrow_content.accountUnconfirmedAlertBar(
      title="No results"
      description="We could not find any trips that matches your search parameters. Please try again."
      type="error"
      :closable="false"
      show-icon
    )
  .tripSearchInitialMessage(v-else)
    n-alert(title="Search for a trip!" type="default")
      template(#icon)
        n-icon
          search
      | Try look for "Trip to Alaska"
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
import { NAlert, NIcon, NInput, NSelect } from "naive-ui";
import { Search } from "@vicons/ionicons5";

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

.tripSearchInitialMessage {
  max-width: 500px;
  margin: auto;
}
</style>
