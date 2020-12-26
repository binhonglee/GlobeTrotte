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
import { CityUtil } from "@/shared/CityUtil";
import CPlaces from "./CPlaces.vue";
import City from "@/wings/City";
import Trip from "@/wings/Trip";
import User from "@/wings/User";

interface Data {
  cities: City[];
}

export default {
  name: "CViewTrip",
  components: {
    CPlaces,
  },
  data: (): Data => ({
    cities: [],
  }),
  props: {
    trip: {
      type: Trip,
      default: (): void => {
        new Trip();
      },
    },
    user: {
      type: User,
      default: (): void => {
        new User();
      },
    },
    editable: {
      type: Boolean,
    },
  },
  methods: {
    enableEditMode(): void {
      this.$emit("edit-trip", this.$props.trip);
    },
  },
  async beforeMount(): Promise<void> {
    this.$data.cities = [];
    if (this.$props.trip !== undefined) {
      for (let city of this.$props.trip.cities) {
        this.$data.cities.push(CityUtil.toString(city));
      }
    }
  },
};
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
  padding: 10px 15px 0 15px;
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
