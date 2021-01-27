<template lang="pug">
  .new_trip.narrow_content
    h1.title New Trip
    CEditTrip.newTrip(
      :trip="trip"
      :isNew="true"
      @save="save"
      @cancel="cancel"
    )
</template>

<script lang="ts">
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "@/components/CEditTrip.vue";
import HTTPReq from "@/shared/HTTPReq";
import General from "@/shared/General";
import Trip from "@/wings/Trip";
import Routes from "@/routes";

interface Data {
  trip: Trip;
}

export default {
  data(): Data {
    return {
      trip: new Trip({
        days: [
          {
            day_of: 1,
            places: [{}],
          },
        ],
      }),
    };
  },
  components: {
    CEditTrip,
  },
  methods: {
    cancel(): void {
      this.$router.back();
    },
    async save(trip: Trip): Promise<void> {
      const user = await General.genCurrentUser(this.$router);
      try {
        if (user.ID !== 0) {
          this.$data.trip = trip;
          trip.userID = user.ID;
          const newTrip = await HTTPReq.genPOST(
            this.$router,
            "trip",
            WingsStructUtil.stringify(trip),
          );
          General.genRedirectTo(
            this.$router,
            Routes.trip_GetView + "/" + new Trip(newTrip).ID,
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
};
</script>

<style lang="scss">
@import "../../shared/lib";

.newTrip {
  @include trip_display();
}
</style>
