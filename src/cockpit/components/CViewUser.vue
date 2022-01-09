<template lang="pug">
.view_user
  div.userInfo.narrow_content
    h2(v-if="showName").userName {{ user.details.name }}
    p.userBio(v-if="user.details.bio !== ''")
      | {{ user.details.bio }}
    CExternalLink(
      :underline="'hover'"
      :url="user.details.link.valueOf()"
      v-if="user.details.link !== ''"
    )
      | {{ user.details.link }}
    .userInfoButtonGroups(v-if="self")
      n-button.myAccountLogout(
        type="error" @click="logout"
      ) Logout
      n-button.myAccountEdit(
        tabindex="0" type="default" ref="edit" @click="toggleEdit"
      ) Edit
  n-divider.viewUserDivider
  div.viewUserTrips
    h2 Trips
    CTripPreviewCard(v-for="trip in trips" :trip="trip" :wide="true")
    div.createTripAlertDiv(v-if="self && trips.length <= 0")
      n-alert.createTripAlert(
        type="default"
        :show-icon="false"
      )
        span.createTripAlertText Seems like you have not shared any of your own trips.
        n-button.createTripButton(type="info" @click="newTrip" size="large") Create New Trip
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NAlert, NButton, NDivider, NIcon } from "naive-ui";
import { CreateOutline } from "@vicons/ionicons5";
import CExternalLink from "./CExternalLink.vue";
import CTripPreviewCard from "./CTripPreviewCard.vue";
import General from "@/shared/General";
import UserObj from "@/wings/UserObj";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";
import Routing from "@/shared/Routing";
import Routes from "@/routes";

interface Data {
  trips: Array<TripObj>;
  lastPopulated: Array<TripBasic>;
}

export default defineComponent({
  components: {
    CExternalLink,
    CTripPreviewCard,
    NAlert,
    NButton,
    NDivider,
    NIcon,
    CreateOutline,
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

<style lang="scss" scoped>
@import "../shared/lib";

.userInfo {
  padding: 10px;
}

.userBio {
  white-space: pre-wrap;
  margin: 0;
}

.viewUserTrips {
  text-align: center;
  h2 {
    margin: 20px 0 0 0;
  }
}

.viewUserDivider {
  width: 100%;
}

.userName {
  @include left_col($p-height);
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
  margin: auto;
}

.createTripAlertText {
  text-align: left;
  line-height: 15px;
  font-size: 15px;
  padding: 0 10px;
}

.createTripButton {
  margin-top: 10px;
  width: 100%;
}
</style>
