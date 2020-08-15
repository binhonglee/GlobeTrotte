<template lang="pug">
  .view_trip(v-if="trip !== undefined")
    h2#name {{ trip.name }}
    span#id {{ trip.ID }}
    p#description(
      v-if="trip.description !== ''"
    ) {{ trip.description }}
    //- p(v-if="trip.places.length !== 0")
    //-   CPlaces(:places='trip.places')
    p#city {{ city }}
    p#creatorInfo Author: {{ trip.userID }}
    p#createdDate Created on: {{ trip.timeCreated.toLocaleDateString() }}
    el-button#enable_edit(
      v-if='editable === true' v-on:click='enableEditMode'
      ) Edit
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from "vue-property-decorator";
import { CityUtil } from "../shared/CityUtil";
import CPlaces from "./CPlaces.vue";
import Trip from "../structs/Trip";
import City from "../enums/City";

@Component({
  data() {
    return {
      city: String,
    };
  },
  components: {
    CPlaces,
  },
})
export default class CViewTrip extends Vue {
  @Prop() private trip!: Trip;
  @Prop() private editable!: boolean;

  private beforeMount(): void {
    const city =
      this.trip !== undefined && this.trip.cities.length > 0
        ? this.trip.cities[0]
        : City.UNKNOWN;
    this.$data.city = CityUtil.toString(city);
  }

  private enableEditMode(): void {
    this.$emit("edit-trip", this.trip);
  }
}
</script>

<style lang="scss">
@import "../shared/lib";

#id {
  @include right_col($p-height);
}

#enable_edit {
  @include right_col($p-height);
}

#name {
  @include left_col($p-height);
}

#createdDate {
  @include left_col($p-height);
}
</style>
