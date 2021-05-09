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
    span.tripID {{ trip.ID }}
    p.tripDescription(
      v-if="trip.details.description !== ''"
    ) {{ trip.details.description }}
    p.tripCreatorInfo Author: 
      a(v-bind:href="'/user/' + trip.user.ID") {{ trip.user.name }}
    p.tripCreatedDate Created on: {{ trip.timeCreated.toLocaleDateString() }}
    div.tripCities
      el-tag.tripCity(v-for="city in cities") {{ city }}
    el-card.viewDayCard(
      v-for="day in trip.details.days"
      :key="day.ID"
    )
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
import City from "@/wings/City";
import TripObj from "@/wings/TripObj";

interface Data {
  cities: City[];
}

export default defineComponent({
  name: "CViewTrip",
  components: { CPlaces },
  data(): Data {
    return { cities: [] };
  },
  props: {
    trip: {
      type: TripObj,
      default: (): void => {
        new TripObj();
      },
    },
    editable: { type: Boolean },
  },
  methods: {
    enableEditMode(): void {
      this.$emit("edit-trip", this.$props.trip);
    },
  },
  async beforeMount(): Promise<void> {
    this.$data.cities = [];
    if (this.$props.trip !== undefined) {
      for (let city of this.$props.trip.details.cities) {
        this.$data.cities.push(city);
      }
    }
  },
});
</script>

<style lang="scss">
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
