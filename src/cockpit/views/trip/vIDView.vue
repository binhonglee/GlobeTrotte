<template lang="pug">
  .get_view_trip.narrow_content
    h1.title Trip
    |     Trip ID:
    el-input.tripSearchInput(
      ref="tripIDSearch"
      type="text"
      v-model="inputID"
      v-on:keydown.enter.native="gotoTrip"
    )
    el-button.tripSearchInput(v-on:click="gotoTrip") Find
    CTripInfo(
      v-if="trip.ID !== -1"
      :trip="trip"
      :editable="owner"
    )
</template>

<script lang="ts">
import CTripInfo from "@/components/CTripInfo.vue";
import General from "@/shared/General";
import TripObj from "@/wings/TripObj";
import Routes from "@/routes";
import E from "@/shared/E";
import R from "@/shared/R";

interface Data {
  inputID: string;
  trip: TripObj;
  owner: boolean;
}

export default {
  components: {
    CTripInfo,
  },
  data(): Data {
    return {
      inputID: "",
      trip: new TripObj(),
      owner: false,
    };
  },
  methods: {
    async init(): Promise<void> {
      const id = General.paramID(this);
      if (id === undefined) {
        this.$data.trip = new TripObj();
        return;
      }

      this.$data.inputID = id;
      this.$data.trip = await General.genTripV2(this.$router, Number(id));
      if (this.$data.trip.ID !== -1) {
        this.$data.owner = General.getIsCurrentUser(this.$data.trip.user.ID);
        this.$nextTick(function () {
          E.get(this, "tripIDSearch").focus();
        });

        return;
      }

      this.$notify(General.notifConfig("Error", "Trip not found.", "error"));
      await R.genRedirectTo(this, Routes.trip_GetView);
    },
    gotoTrip(): void {
      const id: number = parseInt(this.$data.inputID, 10);
      if (String(id) !== this.$data.inputID) {
        alert("Invalid number");
      } else if (this.$route.params.id !== this.$data.inputID) {
        R.genRedirectTo(this, Routes.trip_GetView + "/" + id);
      }
    },
  },
  async beforeMount(): Promise<void> {
    await this.init();
  },
  watch: {
    "$route.path": async function (): Promise<void> {
      await this.init();
    },
  },
};
</script>

<style lang="scss">
@import "../../shared/lib";

.tripSearchInput {
  margin-left: 5px;
  display: inline;
}

.tripSearchInput .el-input__inner {
  width: 100px;
}
</style>
