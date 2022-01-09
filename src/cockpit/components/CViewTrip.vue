<template lang="pug">
.view_trip(v-if="trip !== undefined")
  .narrow_content
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
      a(:href="'/user/' + trip.user.ID") {{ trip.user.name }}
    p.tripCreatedDate Created on: {{ trip.timeCreated.toDateString() }}
    p.tripUpdatedDate Last Updated: {{ trip.lastUpdated.toDateString() }}
    div.tripCities
      n-tag.tripCity(v-for="city in cities" type="info") {{ city }}
  .viewDays
    n-card.viewDayCard(
      v-for="day in trip.details.days"
      :key="day.ID.valueOf()"
      content-style="padding: 0"
    )
      .viewDayCardContent
        h3.dayTitle Day {{ day.dayOf }}
        CPlaces(:places="day.places")
  .narrow_content
    n-button.enableTripEdit(
      v-if="editable" @click="enableEditMode"
    ) Edit
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CityUtil } from "@/shared/CityUtil";
import { NButton, NCard, NTag } from "naive-ui";
import CPlaces from "./CPlaces.vue";
import TripObj from "@/wings/TripObj";

interface Data {
  cities: string[];
}

export default defineComponent({
  name: "CViewTrip",
  components: { CPlaces, NButton, NCard, NTag },
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
  @include right_col($p-height);
}

.tripName {
  @include left_col($p-height);
}
</style>
