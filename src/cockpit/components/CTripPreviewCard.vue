<template lang="pug">
.trip_preview_card(:class="{ wide_preview_card: wide }")
  n-card(
    hoverable
    content-style="padding: 0"
    :class="{ widePreviewCard: wide, tripPreviewCard: !wide, limitHeight: limitHeight }"
  )
    CLink.tripLink(
      :url="'/trip/view/' + trip.ID"
      underline="never"
      color="never"
    )
      h3.tripTitleName {{ trip.details.name.valueOf() }}
      n-divider
      .tripPreviewInfo
        p(
          v-if="trip.details.description !== ''"
        ) {{ trip.details.description }}
        p
          CLink.tripPreviewUserProfileLink(
            :url="'/user/' + trip.user.ID"
            underline="hover"
          ) {{ trip.user.name }}
        .cityTags
          n-tag.cityTag(v-for="city in cities" type="info") {{ city }}
        p Last Updated: {{ lastUpdated }}
      .daysInTrip(v-for="day in days")
        n-divider
        .tripDayPreview
          h3.tripDayLabel Day {{ day.dayOf }}
          CPlaces(:propPlaces="day.propPlaces")
      .endOfCardPadding
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard, NDivider, NTag } from "naive-ui";
import CLink from "./CLink.vue";
import CPlaces from "@/components/CPlaces.vue";
import { CityUtil } from "@/shared/CityUtil";
import { DataDay } from "@/shared/DataProps";
import Day from "@/wings/Day";
import TripObj from "@/wings/TripObj";
import General from "@/shared/General";

interface Data {
  cities: string[];
  days: DataDay[];
  lastUpdated: string;
}

export default defineComponent({
  name: "CTripPreviewCard",
  components: {
    CLink,
    CPlaces,
    NCard,
    NDivider,
    NTag,
  },
  props: {
    trip: {
      type: TripObj,
      required: true,
    },
    wide: {
      type: Boolean,
      default: false,
    },
    limitHeight: {
      type: Boolean,
      default: true,
    },
  },
  data: (): Data => ({
    cities: [""],
    days: [],
    lastUpdated: "",
  }),
  mounted(): void {
    this.$data.cities = this.$props.trip.details.cities.map((city) => {
      return CityUtil.toString(city);
    });
    this.$data.days = (this.$props.trip.details.days.slice(0) as Day[]).map(
      (day) => new DataDay(day),
    );
    this.$data.lastUpdated = General.getDisplayDate(
      this.$props.trip.lastUpdated,
    );
  },
});
</script>

<style scoped>
.trip_preview_card {
  display: inline-block;
  margin: 15px;
  max-width: 88%;
}

.wide_preview_card {
  width: 100%;
}

.tripPreviewCard {
  overflow: auto;
  width: 500px;
}

.limitHeight {
  height: 500px;
}

@media screen and (max-width: 1060px) {
  .tripPreviewCard {
    height: auto;
  }
}

@media screen and (max-width: 550px) {
  .trip_preview_card {
    width: 88%;
  }

  .tripPreviewCard {
    width: 100%;
  }
}

.widePreviewCard {
  display: block;
  height: auto;
  margin: auto;
  width: 750px;
  max-width: 100%;
}

.tripLink {
  text-decoration: none;
}

.tripPreviewInfo,
.tripDayPreview {
  padding: 0 20px;
  text-align: left;
}

.tripDayLabel {
  padding: 0 5px;
}

.tripTitleName {
  padding-top: 15px;
}

.cityTag {
  margin-right: 5px;
}
</style>
