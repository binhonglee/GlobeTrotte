<template lang="pug">
.view_trip(v-if="trip !== undefined")
  .narrow_content
    n-alert.tripPrivateAlertBar(
      v-if="trip.details.private"
      title="Trip is private"
      type="info"
    ) Only you can see this trip.
    h2.tripName.left_col {{ trip.details.name }}
    p.tripDescription(
      v-if="trip.details.description !== ''"
    ) {{ trip.details.description }}
    p.tripCreatorInfo Author: 
      CLink(:url="'/user/' + trip.user.ID") {{ trip.user.name }}
    p.tripCreatedDate Created on: {{ trip.timeCreated.toDateString() }}
    p.tripUpdatedDate Last Updated: {{ trip.lastUpdated.toDateString() }}
    div.tripCities
      n-tag.tripCity(v-for="city in cities" type="info") {{ city }}
  .viewDays
    n-card.viewDayCard(
      v-for="day in days"
      :key="day.ID.valueOf()"
      content-style="padding: 0"
    )
      .viewDayCardContent
        h3.dayTitle Day {{ day.dayOf }}
        CPlaces(:propPlaces="day.propPlaces")
  .narrow_content
    n-button.enableTripEdit.right_col(
      v-if="editable" @click="enableEditMode"
    ) Edit
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CPlaces from "./CPlaces.vue";
import CLink from "./CLink.vue";
import { CityUtil } from "@/shared/CityUtil";
import { DataDay } from "@/shared/DataProps";
import Day from "@/wings/Day";
import { NAlert, NButton, NCard, NTag } from "naive-ui";
import TripObj from "@/wings/TripObj";

interface Data {
  days: DataDay[];
  cities: string[];
}

export default defineComponent({
  name: "CViewTrip",
  components: { CLink, CPlaces, NAlert, NButton, NCard, NTag },
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
  data: (): Data => ({ days: [], cities: [] }),
  beforeMount(): void {
    this.$data.cities = [];
    if (this.$props.trip !== undefined) {
      for (let city of this.$props.trip.details.cities) {
        this.$data.cities.push(CityUtil.toString(city));
      }
      this.$data.days = (this.$props.trip.details.days.slice(0) as Day[]).map(
        (day) => new DataDay(day),
      );
    }
  },
  methods: {
    enableEditMode(): void {
      this.$emit("enableEditMode");
    },
  },
});
</script>

<style scoped>
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

.viewDays {
  padding: 20px;
  text-align: center;
}

.viewDayCard {
  display: inline-block;
  position: unset;
  text-align: left;
  width: 400px;
  margin: 0 0 20px 10px;
  vertical-align: top;

  @media screen and (max-width: 760px) {
    margin: 0 0 20px 0;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
  }
}

.viewDayCardContent {
  padding: 10px 10px 0 10px;
}

.enableTripEdit {
  margin-top: 20px;
}
</style>
