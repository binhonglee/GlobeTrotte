<template lang="pug">
.view_user
  div.userInfo.narrow_content
    h2(v-if="showName").userName {{ user.details.name }}
    p.userBio(v-if="user.details.bio !== ''")
      | {{ user.details.bio }}
    .userInfoButtonGroups(v-if="self")
      el-button.myAccountLogout(
        type="danger" v-on:click="logout"
      ) Logout
      el-button.myAccountEdit(
        tabindex="0" type="default" ref="edit" v-on:click="toggleEdit"
      ) Edit
  el-divider.viewUserDivider
  div.viewUserTrips(v-if="trips.length > 0")
    h2 Trips
    CTripPreviewCard(v-for="trip in trips" :trip="trip")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CTripPreviewCard from "./CTripPreviewCard.vue";
import General from "@/shared/General";
import UserObj from "@/wings/UserObj";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";

interface Data {
  trips: Array<TripObj>;
  lastPopulated: Array<TripBasic>;
}

export default defineComponent({
  components: {
    CTripPreviewCard,
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
  },
});
</script>

<style lang="scss" scoped>
@import "../shared/lib";

.userInfo {
  padding: 10px;
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
</style>
