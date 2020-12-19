<template lang="pug">
  .view_trip.narrow_content(v-if="trip !== undefined")
    h2#name {{ trip.name }}
    span#id {{ trip.ID }}
    p#description(
      v-if="trip.description !== ''"
    ) {{ trip.description }}
    p#creatorInfo Author: {{ trip.userID }}
    p#createdDate Created on: {{ trip.timeCreated.toLocaleDateString() }}
    div#cities
      el-tag.city(v-for="city in cities") {{ city }}
    el-carousel.viewDays(
      v-if="trip.days.length > 0"
      :autorun="false"
      :interval="0"
      trigger="click"
      arrow="never"
      indicator-position="outside"
    )
      el-carousel-item(v-for="day in trip.days" :key="day.ID")
        el-card.viewDayCard
          h3.dayTitle Day {{ day.dayOf }}
          CPlaces(:places="day.places")
    el-button#enable_edit(
      v-if="editable" v-on:click="enableEditMode"
    ) Edit
</template>

<script lang="ts">
import Vue from "vue";
import { CityUtil } from "@/shared/CityUtil";
import CPlaces from "./CPlaces.vue";
import Trip from "@/wings/Trip";

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
    editable: {
      type: Boolean,
    },
  },
  methods: {
    enableEditMode() {
      this.$emit("edit-trip", this.$props.trip);
    },
  },
  beforeMount() {
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

#cities {
  margin-top: 10px;
}

.city {
  margin-right: 5px;
  margin-top: 5px;
}

.dayTitle {
  margin: 0;
}

.viewDays {
  height: 427.5px;
}

.viewDays .el-carousel__container {
  height: 400px;
}

.viewDayCard {
  overflow: auto;
  height: 95%;
  margin: 10px;
  margin-top: 15px;
}

.viewDayCard .el-card__body {
  padding: 15px;
}

#id {
  @include right_col($p-height);
}

#enable_edit {
  margin-top: 10px;
  @include right_col($p-height);
}

#name {
  @include left_col($p-height);
}

#createdDate {
  @include left_col($p-height);
}
</style>
