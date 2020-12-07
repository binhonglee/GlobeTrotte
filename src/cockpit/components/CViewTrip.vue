<template lang="pug">
  .view_trip(v-if="trip !== undefined")
    h2#name {{ trip.name }}
    span#id {{ trip.ID }}
    p#description(
      v-if="trip.description !== ''"
    ) {{ trip.description }}
    //- p(v-if="trip.places.length !== 0")
    //-   CPlaces(:places="trip.places")
    p#city {{ city }}
    p#creatorInfo Author: {{ trip.userID }}
    p#createdDate Created on: {{ trip.timeCreated.toLocaleDateString() }}
    el-button#enable_edit(
      v-if="editBtn === true" v-on:click="enableEditMode"
      ) Edit
</template>

<script lang="ts">
import Vue from "vue";
import { CityUtil } from "../shared/CityUtil";
import CPlaces from "./CPlaces.vue";
import Trip from "../wings/Trip";
import City from "../wings/City";

export default Vue.extend({
  name: "CViewTrip",
  components: {
    CPlaces,
  },
  data: () => ({
    city: String,
    editBtn: Boolean,
  }),
  props: {
    trip: {
      type: Trip,
    },
    editable: {
      type: Boolean,
    }
  },
  computed: {
    beforeMount() {
      this.$data.editBtn = this.$props.editable;
      const city =
        this.$props.trip !== undefined && this.$props.trip.cities.length > 0
          ? this.$props.trip.cities[0]
          : City.UNKNOWN;
      this.$data.city = CityUtil.toString(city);
    },
    enableEditMode() {
      this.$emit("edit-trip", this.$props.trip);
    }
  }
});
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
