<template lang="pug">
.view_user
  div.userInfo.narrow_content
    h2(v-if="showName").userName.left_col {{ user.details.name }}
    p.userBio(v-if="user.details.bio !== ''")
      | {{ user.details.bio }}
    .externalLink
      CExternalLink(
        :underline="'hover'"
        :url="user.details.link.valueOf()"
        v-if="user.details.link !== ''"
      ) {{ user.details.link }}
    CShare(v-if="self" :shareURL="shareURL" :onClick="onShare")
    .userInfoButtonGroups(v-if="self")
      n-button.myAccountLogout.left_col(type="error" @click="logout") Logout
      n-button.myAccountEdit.right_col(
        type="default" ref="edit" @click="toggleEdit"
      ) Edit
  n-divider.viewUserDivider
  div.viewUserTrips(v-if="loading || self || !tripsEmpty")
    h2 Trips
    CLoadingTripPreviewCard(
      v-if="loading"
      v-for="count in 5" :key="count" :wide="true" :limit-height="false"
    )
    CTripPreviewCard(
      v-else
      v-for="trip in trips" :trip="trip" :wide="true" :limit-height="false"
    )
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
import CShare from "./CShare.vue";
import CTripPreviewCard from "./CTripPreviewCard.vue";
import { sortTripsMostRecentlyUpdated } from "@/shared/TripUtil";
import UserObj from "@/wings/UserObj";
import TripObj from "@/wings/TripObj";
import Routing from "@/shared/Routing";
import Routes from "@/routes";
import HTTPReq from "@/shared/HTTPReq";
import CLoadingTripPreviewCard from "./loading/CLoadingTripPreviewCard.vue";

interface Data {
  trips: TripObj[];
  tripsEmpty: boolean;
  loading: boolean;
  shareURL: string;
}

export default defineComponent({
  name: "CViewUser",
  components: {
    CExternalLink,
    CShare,
    CTripPreviewCard,
    NAlert,
    NButton,
    NDivider,
    CLoadingTripPreviewCard,
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
    tripsEmpty: true,
    loading: true,
    shareURL: "",
  }),
  async beforeMount(): Promise<void> {
    await this.genPopulateTrips();
  },
  async beforeUpdate(): Promise<void> {
    await this.genPopulateTrips();
  },
  methods: {
    async genPopulateTrips(): Promise<void> {
      this.$data.loading = true;
      this.$data.trips = this.$props.user.trips;
      sortTripsMostRecentlyUpdated(this.$data.trips);
      this.$data.tripsEmpty = this.$data.trips.length <= 0;
      this.$data.loading = false;
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
    onShare(): void {
      let value = this.$props.user.details.username.valueOf();
      if (value === "") {
        value = this.$props.user.details.ID.toString();
      }
      this.$data.shareURL = HTTPReq.getAbsoluteURL(Routes.User, value);
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

.userBio,
.externalLink {
  padding-bottom: 10px;
}

.externalLink {
  width: 100%;
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
