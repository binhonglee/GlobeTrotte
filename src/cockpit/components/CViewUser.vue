<template lang="pug">
  .view_user
    div.userInfo.narrow_content
      h2(v-if="showName").userName {{ user.details.name }}
      span.userID ID: {{ user.ID }}
      p.userEmail
        strong Email:
        br
        | {{ user.details.email }}
      p.userBio(v-if="user.details.bio !== ''")
        strong Bio:
        br
        | {{ user.details.bio }}
    div.viewUserTrips(v-if="trips.length > 0")
      h2 Trips
      el-card.homePageTripCard(v-for="trip in trips" shadow="hover")
        CTripInCarousel(:trip="trip")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTripInCarousel from "./CTripInCarousel.vue";
import UserObj from "@/wings/UserObj";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";

interface Data {
  trips: Array<TripObj>;
  lastPopulated: Array<TripBasic>;
}

export default defineComponent({
  components: {
    CTripInCarousel,
  },
  props: {
    user: {
      type: UserObj,
      required: true,
    },
    showName: {
      type: Boolean,
      default: true,
    },
  },
  data: (): Data => ({
    trips: [],
    lastPopulated: [],
  }),
  methods: {
    /* istanbul ignore next: will move this to some generic file / lib and test there instead */
    compareArray(a: TripBasic[], b: TripBasic[]): boolean {
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
      if (this.compareArray(this.$data.lastPopulated, this.$props.user.trips)) {
        return;
      }
      this.$data.trips = this.$props.user.trips.map((trip: TripBasic) => {
        const tripObj = new TripObj();
        tripObj.ID = trip.ID;
        tripObj.details = trip;
        tripObj.user = this.$props.user.details;
        return tripObj;
      });

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

.userInfo {
  padding: 0;
}

.viewUserTrips {
  text-align: center;
  h2 {
    margin: 20px 0 0 0;
  }
}

.userID {
  @include right_col($p-height);
}

.userName {
  @include left_col($p-height);
}
</style>
