<template lang="pug">
.view_trip.narrow_content(v-if="trip !== undefined")
  el-alert.tripPrivateAlertBar(
    v-if="trip.details.private"
    title="Trip is private"
    description="Only you can see this trip."
    type="info"
    :closable="false"
    show-icon
  )
  h2.tripName {{ trip.details.name }}
  p.tripDescription(
    v-if="trip.details.description !== ''"
  ) {{ trip.details.description }}
  p.tripCreatorInfo Author: 
    a(v-bind:href="'/user/' + trip.user.ID") {{ trip.user.name }}
  p.tripCreatedDate Created on: {{ trip.timeCreated.toDateString() }}
  p.tripUpdatedDate Last Updated: {{ trip.lastUpdated.toDateString() }}
  div.tripCities
    el-tag.tripCity(v-for="city in cities") {{ city }}
  el-card.viewDayCard(
    v-for="day in trip.details.days"
    :key="day.ID.valueOf()"
  )
    .viewDayCardContent
      h3.dayTitle Day {{ day.dayOf }}
      CPlaces(:places="day.places")
  el-button.enableTripEdit(
    v-if="editable" v-on:click="enableEditMode"
  ) Edit
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CityUtil } from "@/shared/CityUtil";
import CPlaces from "./CPlaces.vue";
import TripObj from "@/wings/TripObj";

interface Data {
  cities: string[];
}

export default defineComponent({
  name: "CViewTrip",
  components: { CPlaces },
  props: {
    trip: {
      type: TripObj,
      required: true,
    },
    editable: { type: Boolean },
  },
  emits: {
    enableEditMode() {
      return true;
    },
  },
  data: (): Data => ({ cities: [] }),
  async beforeMount(): Promise<void> {
    this.$data.cities = [];
    if (this.$props.trip !== undefined) {
      for (let city of this.$props.trip.details.cities) {
        this.$data.cities.push(CityUtil.toString(city));
      }
    }
  },
  methods: {
    enableEditMode(): void {
      this.$emit("enableEditMode");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../shared/lib";

.tripPrivateAlertBar {
  margin: 0 0 20px 0;
}

.tripCities {
  margin: 10px 0 0 0;
}

.tripCity {
  margin: 5px 5px 0 0;
}

.dayTitle {
  margin: 0;
}

.viewDayCard {
  margin-top: 15px;
}

.viewDayCardContent {
  padding: 10px 10px 0 10px;
}

.enableTripEdit {
  margin-top: 20px;
  @include right_col($p-height);
}

.tripName {
  @include left_col($p-height);
}
</style>
