<template lang="pug">
.get_view_trip
  CHead(
    :title="trip.details.name.valueOf()"
    :description="trip.details.description.valueOf()"
    type="article"
  )
  .narrow_content.tapToUpdate(
    v-if="updated !== null"
  )
    n-alert(title="There's an update!" type="warning" v-on:click="update")
      | Press here to view latest version of this profile.
  h1.title Trip
  CLoadingTripInfo(v-if="trip.ID === -1")
  CTripInfo(
    v-else
    :trip="trip"
    :editable="owner"
  )
</template>

<script lang="ts">
import { NAlert } from "naive-ui";
import { defineComponent } from "vue";
import CHead from "@/components/CHead.vue";
import CLoadingTripInfo from "@/components/loading/CLoadingTripInfo.vue";
import CTripInfo from "@/components/CTripInfo.vue";
import General from "@/shared/General";
import TripObj from "@/wings/TripObj";
import Routes from "@/routes";
import Routing from "@/shared/Routing";
import NaiveUtils, { NotifyType } from "@/shared/NaiveUtils";
import { TripCache } from "@/cache/TripCache";
import { sameTrip } from "@/shared/TripUtil";

interface Data {
  inputID: string;
  trip: TripObj;
  updated: TripObj | null;
  owner: boolean;
}

export default defineComponent({
  components: {
    CHead,
    CLoadingTripInfo,
    CTripInfo,
    NAlert,
  },
  data(): Data {
    return {
      inputID: "",
      trip: new TripObj(),
      updated: null,
      owner: false,
    };
  },
  beforeMount(): void {
    NaiveUtils.init();
  },
  async mounted(): Promise<void> {
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
      const res = await TripCache.genObj(id);
      if (res.completed !== null) {
        this.$data.trip = res.completed;
      }

      if (res.promise !== null) {
        const promise = await res.promise;
        if (promise !== null && !sameTrip(promise, this.$data.trip)) {
          this.$data.updated = promise;
        }
      }
      if (this.$data.trip.ID !== -1) {
        this.$data.owner = General.getIsCurrentUser(
          this.$data.trip.user.ID.valueOf(),
        );
        return;
      }

      NaiveUtils.notifyTrigger("Error", "Trip not found.", NotifyType.ERROR);
      await Routing.genRedirectTo(Routes.trip_Search);
    },
    update(): void {
      if (this.$data.updated !== null) {
        this.$data.trip = this.$data.updated;
      }
      this.$data.updated = null;
    },
  },
});
</script>

<style scoped>
.tapToUpdate {
  text-align: left;
  padding: 10px;
}

.tapToUpdate {
  cursor: pointer;
}
</style>
