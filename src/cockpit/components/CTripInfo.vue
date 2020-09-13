<template lang="pug">
  .trip_info
    div.view_trip_info(v-if="!editMode")
      CViewTrip(
        :trip="trip"
        :editable="editable"
        @edit-trip="enableEditMode"
      )
    div.edit_trip_info(v-else)
      CEditTrip(:trip="trip" @save="save" @cancel="cancel")
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from "vue-property-decorator";
import { WingsStructUtil } from "wings-ts-util";
import CEditTrip from "./CEditTrip.vue";
import CViewTrip from "./CViewTrip.vue";
import HTTPReq from "../shared/HTTPReq";
import Trip from "../wings/Trip";

@Component({
  data() {
    return {
      editMode: Boolean,
    };
  },
  components: {
    CViewTrip,
    CEditTrip,
  },
})
export default class CTripInfo extends Vue {
  @Prop() private trip!: Trip;
  @Prop() private editable!: boolean;

  private beforeMount(): void {
    this.$data.editMode = false;
  }

  private enableEditMode(): void {
    this.$data.editMode = true;
  }

  private disableEditMode(): void {
    this.$data.editMode = false;
  }

  private save(trip: Trip): void {
    HTTPReq.post(
      "trip/" + trip.id,
      WingsStructUtil.stringify(trip),
      (success: string) => {
        if (success) {
          this.disableEditMode();
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
    );
  }

  private cancel(): void {
    this.disableEditMode();
  }
}
</script>

<style lang="scss">
@import "../shared/lib";

.trip_info {
  @include trip_display();
}
</style>
