<template lang="pug">
.new_trip.narrow_content
  CHead(title="New Trip" description="Create new trip")
  h1.title New Trip
  CEditTrip.newTrip.narrow_display_window(
    :trip="trip"
    :isNew="true"
    @save="save"
    @cancel="cancel"
  )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "@/components/CEditTrip.vue";
import HTTPReq from "@/shared/HTTPReq";
import General from "@/shared/General";
import TripObj from "@/wings/TripObj";
import TripBasic from "@/wings/TripBasic";
import Routes from "@/routes";
import router from "@/router";
import Routing from "@/shared/Routing";
import CHead from "@/components/CHead.vue";

interface Data {
  trip: TripObj;
}

export default defineComponent({
  components: {
    CEditTrip,
    CHead,
  },
  data(): Data {
    return {
      trip: new TripObj({
        details: { days: [{ day_of: 1, places: [{}] }] },
      }),
    };
  },
  methods: {
    cancel(): void {
      router.back();
    },
    async save(trip: TripBasic): Promise<void> {
      const user = await General.genCurrentUser();
      try {
        if (user.ID !== 0) {
          const newTrip = await HTTPReq.genPOST(
            "v2/trip",
            WingsStructUtil.stringify(trip),
          );
          await Routing.genRedirectTo(
            Routes.trip_View + "/" + new TripObj(newTrip).ID,
          );
          return;
        }
        // eslint-disable-next-line no-empty
      } catch (_) {}
      this.$alert("Save was unsuccessful. Please try again later.", "Fail", {
        confirmButtonText: "OK",
      });
    },
  },
});
</script>
