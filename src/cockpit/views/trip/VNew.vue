<template lang="pug">
  .new_trip
    h1.title New Trip
    CEditTrip.newTrip(
      :trip="trip"
      @save="save"
      @cancel="cancel"
    )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "../../components/CEditTrip.vue";
import HTTPReq from "../../shared/HTTPReq";
import General from "../../shared/General";
import Trip from "../../wings/Trip";

@Component({
  data() {
    return {
      trip: new Trip(),
    };
  },
  components: {
    CEditTrip,
  },
})
export default class VNew extends Vue {
  private cancel(): void {
    this.$router.back();
  }

  private async save(trip: Trip): Promise<void> {
    const user = await General.genCurrentUser();
    if (user.ID !== 0) {
      this.$data.trip = trip;
      trip.userID = user.ID;
      const newTrip = await HTTPReq.genPOST(
        "trip",
        WingsStructUtil.stringify(trip),
      );
      this.$router.push(
        "/trip/view/" + new Trip(newTrip).ID,
      );
    }
  }
}
</script>

<style lang="scss">
@import "../../shared/lib";

.newTrip {
  @include trip_display();
}
</style>
