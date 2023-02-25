<template lang="pug">
.saved_trips.wide_content
  CHead(
    title="Saved Trips"
  )
  h1.title Saved Trips
  br
  CLoadingTripPreviewCard(v-if="loading" key="loading_preview")
  n-alert.noSavedTrip(
    v-else-if="trips.length < 1"
    type="info"
    title="Seems like you haven't saved any trips."
  )
  CTripPreviewCard(v-else v-for="trip in trips" :trip="trip")
</template>

<script lang="ts">
import TripObj from "@/wings/TripObj";
import CHead from "@/components/CHead.vue";
import CLoadingTripPreviewCard from "@/components/loading/CLoadingTripPreviewCard.vue";
import CTripPreviewCard from "@/components/CTripPreviewCard.vue";
import { NAlert } from "naive-ui";
import { defineComponent } from "vue";
import { getLocal } from "@/shared/Storage";

interface Data {
  trips: TripObj[];
  loading: boolean;
}

export default defineComponent({
  components: {
    CHead,
    CLoadingTripPreviewCard,
    CTripPreviewCard,
    NAlert,
  },
  data: (): Data => ({
    trips: [],
    loading: false,
  }),
  beforeMount(): void {
    const tripsLocal = getLocal("saved_trips");
    if (tripsLocal === null) {
      return;
    }

    const tripList = JSON.parse(tripsLocal);
    for (const trip of tripList) {
      this.trips.push(new TripObj(JSON.parse(trip)));
    }
  },
});
</script>

<style scoped></style>
