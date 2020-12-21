<template lang="pug">
  .view_trip.narrow_content(v-if="trip !== undefined")
    h2.tripName {{ trip.name }}
    span.tripID {{ trip.ID }}
    p.tripDescription(
      v-if="trip.description !== ''"
    ) {{ trip.description }}
    p.tripCreatorInfo Author: 
      a(v-bind:href="'/user/' + user.ID") {{ user.name }}
    p.tripCreatedDate Created on: {{ trip.timeCreated.toLocaleDateString() }}
    div.tripCities
      el-tag.tripCity(v-for="city in cities") {{ city }}
    el-card.viewDayCard(v-for="day in trip.days" :key="day.ID")
      h3.dayTitle Day {{ day.dayOf }}
      CPlaces(:places="day.places")
    el-button.enableTripEdit(
      v-if="editable" v-on:click="enableEditMode"
    ) Edit
</template>

<script lang="ts">
import Vue from "vue";
import { CityUtil } from "@/shared/CityUtil";
import General from "@/shared/General";
import CPlaces from "./CPlaces.vue";
import Trip from "@/wings/Trip";
import User from "@/wings/User";

export default Vue.extend({
  name: "CViewTrip",
  components: {
    CPlaces,
  },
  data: () => ({
    cities: [],
  }),
  props: {
    trip: {
      type: Trip,
      default: () => {
        new Trip();
      },
    },
    user: {
      type: User,
      default: () => {
        new User();
      },
    },
    editable: {
      type: Boolean,
    },
  },
  methods: {
    enableEditMode() {
      this.$emit("edit-trip", this.$props.trip);
    },
  },
  async beforeMount() {
    this.$data.cities = [];
    if (this.$props.trip !== undefined) {
      for (let city of this.$props.trip.cities) {
        this.$data.cities.push(CityUtil.toString(city));
      }
    }
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.tripCities {
  margin-top: 10px;
}

.city {
  margin-right: 5px;
  margin-top: 5px;
}

.dayTitle {
  margin: 0;
}

.viewDayCard {
  margin-top: 15px;
}

.viewDayCard .el-card__body {
  padding: 15px;
}

.tripID {
  @include right_col($p-height);
}

.enableTripEdit {
  margin-top: 20px;
  @include right_col($p-height);
}

.tripName {
  @include left_col($p-height);
}

</style>
