<template lang="pug">
.trip_info.narrow_display_window
  div.view_trip_info(v-if="!editMode")
    CViewTrip(
      :trip="dtrip"
      :editable="editable"
      @enableEditMode="enableEditMode"
    )
  div.edit_trip_info(v-else)
    CEditTrip(
      :trip="dtrip"
      :isNew="false"
      @save="save"
      @cancel="cancel"
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "./CEditTrip.vue";
import CViewTrip from "./CViewTrip.vue";
import HTTPReq from "@/shared/HTTPReq";
import TripObj from "@/wings/TripObj";
import TripBasic from "@/wings/TripBasic";
import NaiveUtils from "@/shared/NaiveUtils";

interface Data {
  editMode: boolean;
  dtrip: TripObj;
}

export default defineComponent({
  name: "CTripInfo",
  components: {
    CViewTrip,
    CEditTrip,
  },
  props: {
    trip: {
      type: TripObj,
      required: true,
    },
    editable: {
      type: Boolean,
    },
  },
  data: (): Data => ({
    editMode: false,
    dtrip: new TripObj(),
  }),
  beforeMount(): void {
    this.$data.editMode = false;
    this.$data.dtrip = this.$props.trip;
    NaiveUtils.init();
  },
  methods: {
    async save(trip: TripBasic): Promise<void> {
      const tripObj = this.$props.trip;
      tripObj.details = trip;
      const success = await HTTPReq.genPOST(
        "v2/trip/" + trip.ID,
        WingsStructUtil.stringify(tripObj),
      );
      if (success) {
        const newTrip = new TripObj(success);
        if (newTrip.ID !== -1) {
          this.$data.dtrip = newTrip;
          this.$data.editMode = false;
        } else {
          NaiveUtils.dialogError({
            title: "Error",
            content: "Save was unsuccessful. Please try again later.",
            positiveText: "OK",
          });
        }
      } else {
        NaiveUtils.dialogError({
          title: "Error",
          content: "Save was unsuccessful. Please try again later.",
          positiveText: "OK",
        });
      }
    },
    cancel(): void {
      this.$data.editMode = false;
    },
    enableEditMode(): void {
      this.$data.editMode = true;
    },
  },
});
</script>
