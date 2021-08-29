<template lang="pug">
.trip_info
  div.view_trip_info(v-if="!editMode")
    CViewTrip(
      :trip="trip"
      :editable="editable"
      @enableEditMode="enableEditMode"
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
import { defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "./CEditTrip.vue";
import CViewTrip from "./CViewTrip.vue";
import HTTPReq from "@/shared/HTTPReq";
import TripObj from "@/wings/TripObj";
import TripBasic from "@/wings/TripBasic";

interface Data {
  editMode: boolean;
}

export default defineComponent({
  name: "CTripInfo",
  components: {
    CViewTrip,
    CEditTrip,
  },
  data: (): Data => ({
    editMode: false,
  }),
  props: {
    trip: {
      type: TripObj,
      required: true,
    },
    editable: {
      type: Boolean,
    },
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
        this.$data.editMode = false;
      } else {
        this.$alert("Save was unsuccessful. Please try again later.", "Fail", {
          confirmButtonText: "OK",
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
  beforeMount(): void {
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
