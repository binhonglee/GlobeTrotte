<template lang="pug">
  .view_user
    div.userInfo
      h2(v-if="showName").userName {{ user.name }}
      span.userID ID: {{ user.ID }}
      p.userEmail
        strong Email:
        br
        | {{ user.email }}
      p.userBio(v-if="user.bio !== ''")
        strong Bio:
        br
        | {{ user.bio }}
    div.trips(v-if="trips.length > 0")
      h2 Trips
      el-popover(
        popper-class="tripInfoPopup"
        placement="right"
        width="300"
        trigger="hover"
        v-for="trip in trips"
      )
        CTripInCarousel(
          :user="user"
          :trip="trip"
        )
        a(
          slot="reference"
          v-bind:href="'/trip/view/' + trip.ID"
        ) {{ trip.name }}
</template>

<script lang="ts">
import Vue from "vue";
import General from "@/shared/General";
import CTripInCarousel from "./CTripInCarousel.vue";
import User from "@/wings/User";
import Trip from "@/wings/Trip";

export default Vue.extend({
  name: "CViewUser",
  components: {
    CTripInCarousel,
  },
  props: {
    user: {
      type: User,
    },
    showName: {
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    trips: [],
    lastPopulated: [],
  }),
  methods: {
    compareArray(a: [], b: []) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i in a) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    },
    async genPopulateTrips(): Promise<void> {
      if (
        this.compareArray(
          this.$data.lastPopulated, this.$props.user.trips,
        )
      ) {
        return;
      }
      this.$data.trips = await Promise.all(
        this.$props.user.trips.map(async (trip: number) => {
          return (await General.genTrip(trip));
        }),
      );

      this.$data.lastPopulated = this.$props.user.trips;
    },
  },
  async beforeMount(): Promise<void> {
    await this.genPopulateTrips();
  },
  async beforeUpdate(): Promise<void> {
    await this.genPopulateTrips();
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.tripInfoPopup {
  padding: 0;
}

.trips,
.userInfo {
  text-align: left;
}

.userID {
  @include right_col($p-height);
}

.userName {
  @include left_col($p-height);
}
</style>
