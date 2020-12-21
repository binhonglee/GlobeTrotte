<template lang="pug">
  .trip_info
    div.view_trip_info(v-if="!editMode")
      CViewTrip(
        :trip="trip"
        :user="user"
        :editable="editable"
        @edit-trip="enableEditMode"
      )
    div.edit_trip_info(v-else)
      CEditTrip(
        :trip="trip"
        :isNew="false"
        @save="save"
        @cancel="cancel"
      )
</template>

<script lang="ts">
import Vue from "vue";
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "./CEditTrip.vue";
import CViewTrip from "./CViewTrip.vue";
import HTTPReq from "@/shared/HTTPReq";
import General from "@/shared/General";
import Trip from "@/wings/Trip";
import User from "@/wings/User";

export default Vue.extend({
  name: "CTripInfo",
  components: {
    CViewTrip,
    CEditTrip,
  },
  data: () => ({
    editMode: false,
  }),
  props: {
    trip: {
      type: Trip,
    },
    user: {
      type: User,
    },
    editable: {
      type: Boolean,
    },
  },
  methods: {
    async save(trip: Trip): Promise<void> {
      const user = await General.genCurrentUser();
      trip.userID = user.ID;
      const success = await HTTPReq.genPOST(
        "trip/" + trip.ID,
        WingsStructUtil.stringify(trip),
      );
      if (success) {
        this.$data.editMode = false;
        this.$props.trip = trip;
      } else {
        this.$alert(
          "Save was unsuccessful. Please try again later.",
          "Fail",
          {
            confirmButtonText: "OK",
          },
        );
      }
    },
    cancel(): void {
      this.$data.editMode = false;
    },
    enableEditMode(): void {
      this.$data.editMode = true;
    },
  },
  beforeMount() {
    this.$data.editMode = false;
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.trip_info {
  @include trip_display();
}
</style>
