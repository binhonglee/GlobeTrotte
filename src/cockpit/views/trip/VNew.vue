<template lang="pug">
  .new_trip
    h1.title New Trip
    CEditTrip.newTrip(:trip='trip' @save='save' @cancel='cancel')
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "../../components/CEditTrip.vue";
import HTTPReq from "../../shared/HTTPReq";
import Trip from "../../structs/Trip";

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

  private save(trip: Trip): void {
    this.$data.trip = trip;
    HTTPReq.post(
      "trip",
      WingsStructUtil.stringify(trip),
      (newTrip: string) => {
        this.$router.push(
          "/trip/view/" + JSON.parse(newTrip).id,
        );
      },
    );
  }
}
</script>

<style lang="scss">
@import "../../shared/lib";

.newTrip {
  @include trip_display();
}
</style>
