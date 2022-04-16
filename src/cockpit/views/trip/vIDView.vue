<template lang="pug">
.get_view_trip
  CHead(
    :title="trip.details.name.valueOf()"
    :description="trip.details.description.valueOf()"
    type="article"
  )
  h1.title Trip
  CLoadingTripInfo(v-if="trip.ID === -1")
  CTripInfo(
    v-else
    :trip="trip"
    :editable="owner"
  )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CHead from "@/components/CHead.vue";
import CLoadingTripInfo from "@/components/loading/CLoadingTripInfo.vue";
import CTripInfo from "@/components/CTripInfo.vue";
import General from "@/shared/General";
import TripObj from "@/wings/TripObj";
import Routes from "@/routes";
import Routing from "@/shared/Routing";

interface Data {
  inputID: string;
  trip: TripObj;
  owner: boolean;
}

export default defineComponent({
  components: {
    CHead,
    CLoadingTripInfo,
    CTripInfo,
  },
  data(): Data {
    return {
      inputID: "",
      trip: new TripObj(),
      owner: false,
    };
  },
  async created(): Promise<void> {
    await this.init();
  },
  methods: {
    async init(): Promise<void> {
      const id = General.paramID();
      if (id === undefined) {
        this.$data.trip = new TripObj();
        await Routing.genRedirectTo(Routes.trip_Search);
        return;
      }

      this.$data.inputID = id;
      this.$data.trip = await General.genTrip(Number(id));
      if (this.$data.trip.ID !== -1) {
        this.$data.owner = General.getIsCurrentUser(
          this.$data.trip.user.ID.valueOf(),
        );
        return;
      }

      this.$notify(General.notifConfig("Error", "Trip not found.", "error"));
      await Routing.genRedirectTo(Routes.trip_Search);
    },
  },
});
</script>
