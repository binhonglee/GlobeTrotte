<template lang="pug">
.view_user
  div.userInfo.narrow_content
    h2(v-if="showName").userName.left_col {{ user.details.name }}
    p.userBio(v-if="user.details.bio !== ''")
      | {{ user.details.bio }}
    CExternalLink(
      :underline="'hover'"
      :url="user.details.link.valueOf()"
      v-if="user.details.link !== ''"
    )
      | {{ user.details.link }}
    .userInfoButtonGroups(v-if="self")
      n-button.myAccountLogout.left_col(type="error" @click="logout") Logout
      n-button.myAccountEdit.right_col(
        type="default" ref="edit" @click="toggleEdit"
      ) Edit
  n-divider.viewUserDivider
  div.viewUserTrips
    h2 Trips
    CTripPreviewCard(v-for="trip in trips" :trip="trip" :wide="true")
    .createTripAlertDiv(v-if="self && tripsEmpty")
      n-alert.createTripAlert(type="default" :show-icon="false")
        | Seems like you have not shared any of your own trips.
        n-button.createTripButton(
          v-if="confirmed" type="info" @click="newTrip" size="large"
        )
          | Create New Trip
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NAlert, NButton, NDivider } from "naive-ui";
import CExternalLink from "./CExternalLink.vue";
import CTripPreviewCard from "./CTripPreviewCard.vue";
import General from "@/shared/General";
import TripUtil from "@/shared/TripUtil";
import UserObj from "@/wings/UserObj";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";
import Routing from "@/shared/Routing";
import Routes from "@/routes";

interface Data {
  trips: TripObj[];
  lastPopulated: TripBasic[];
  tripsEmpty: boolean;
}

export default defineComponent({
  name: "CViewUser",
  components: {
    CExternalLink,
    CTripPreviewCard,
    NAlert,
    NButton,
    NDivider,
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
    self: {
      type: Boolean,
      default: false,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    logout() {
      return true;
    },
    toggleEdit() {
      return true;
    },
  },
  data: (): Data => ({
    trips: [],
    lastPopulated: [],
    tripsEmpty: true,
  }),
  async beforeMount(): Promise<void> {
    await this.genPopulateTrips();
  },
  async beforeUpdate(): Promise<void> {
    await this.genPopulateTrips();
  },
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
      this.$data.trips = await Promise.all(
        this.$props.user.trips.map(async (trip: TripBasic) => {
          return await General.genTrip(trip.ID.valueOf());
        }),
      );
      TripUtil.sortTripsMostRecentlyUpdated(this.$data.trips);
      this.$data.tripsEmpty = this.$data.trips.length <= 0;
      this.$data.lastPopulated = this.$props.user.trips;
    },
    logout(): void {
      this.$emit("logout");
    },
    toggleEdit(): void {
      this.$emit("toggleEdit");
    },
    async newTrip(): Promise<void> {
      await Routing.genRedirectTo(Routes.trip_New);
    },
  },
});
</script>

<style scoped>
.userInfo {
  padding: 10px;
}

.userBio {
  white-space: pre-wrap;
  margin: 0;
}

.viewUserTrips {
  text-align: center;
}

.viewUserTrips h2 {
  margin: 20px 0 0 0;
}

.viewUserDivider {
  width: 100%;
}

.userInfoButtonGroups {
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  text-align: left;
}

.createTripAlertDiv {
  padding: 10px;
}

.createTripAlert {
  max-width: 500px;
  text-align: center;
  margin: auto;
  line-height: 15px;
  font-size: 15px;
}

.createTripButton {
  margin-top: 10px;
  width: 100%;
}
</style>
