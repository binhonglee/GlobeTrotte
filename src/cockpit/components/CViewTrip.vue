<template lang="pug">
.view_trip(v-if="trip !== undefined")
  .narrow_content
    n-alert.tripPrivateAlertBar(
      v-if="trip.details.private"
      title="Trip is private"
      type="info"
    ) Only you can see this trip.
    h2.tripName.left_col {{ trip.details.name }}
    n-dropdown(
      v-if="menuOptions.length > 0"
      trigger="click"
      :options="menuOptions"
      :show-arrow="true"
      @select="handleSelectMenu"
    )
      n-button.right_col.tripMenu
        n-icon
          ellipsis-horizontal-outline
    p.tripDescription(
      v-if="trip.details.description !== ''"
    ) {{ trip.details.description }}
    p.tripCreatorInfo Author: 
      CLink(
        :url="'/user/' + (trip.user.username.valueOf() === '' ? trip.user.ID.toString() : trip.user.username.toString())") {{ trip.user.name }}
    p.tripUpdatedDate Last Updated: {{ lastUpdated }}
    p.tripCreatedDate Created on: {{ created }}
    div.tripCities
      n-tag.tripCity(v-for="city in cities" type="info") {{ city }}
    CShare(:shareURL="shareURL")
  .viewDays
    n-card.viewDayCard(
      v-for="day in days"
      :key="day.ID.valueOf()"
      content-style="padding: 0"
    )
      .viewDayCardContent
        h3.dayTitle Day {{ day.dayOf }}
        CPlaces(:propPlaces="day.propPlaces")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CPlaces from "./CPlaces.vue";
import CLink from "./CLink.vue";
import CShare from "./CShare.vue";
import { DataDay } from "@/shared/DataProps";
import Day from "@/wings/Day";
import TripObj from "@/wings/TripObj";
import { NAlert, NButton, NCard, NDropdown, NIcon, NTag } from "naive-ui";
import { EllipsisHorizontalOutline } from "@vicons/ionicons5";
import HTTPReq from "@/shared/HTTPReq";
import Routes from "@/routes";
import General from "@/shared/General";

type MenuList = "edit" | "bookmark";

interface MenuListOption {
  label: string;
  key: MenuList;
  disabled?: boolean;
}

interface Data {
  days: DataDay[];
  cities: string[];
  shareURL: string;
  created: string;
  lastUpdated: string;
  menuOptions: MenuListOption[];
}

export default defineComponent({
  name: "CViewTrip",
  components: {
    CLink,
    CPlaces,
    CShare,
    EllipsisHorizontalOutline,
    NAlert,
    NButton,
    NCard,
    NDropdown,
    NIcon,
    NTag,
  },
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
  data: (): Data => ({
    days: [],
    cities: [],
    shareURL: "",
    created: "",
    lastUpdated: "",
    menuOptions: [
      // {
      //   label: "Bookmark",
      //   key: "bookmark",
      // },
    ],
  }),
  beforeMount(): void {
    this.$data.cities = [];
    for (const city of this.$props.trip.details.cities) {
      this.$data.cities.push(
        city.display.valueOf() + ", " + city.iso2.valueOf(),
      );
    }
    this.$data.days = (this.$props.trip.details.days.slice(0) as Day[]).map(
      (day) => new DataDay(day),
    );
    this.$data.shareURL = HTTPReq.getAbsoluteURL(
      Routes.trip_View,
      this.$props.trip.ID.toString(),
    );
    this.$data.created = General.getDisplayDate(this.$props.trip.timeCreated);
    this.$data.lastUpdated = General.getDisplayDate(
      this.$props.trip.lastUpdated,
    );
    if (this.$props.editable) {
      this.$data.menuOptions.push({
        label: "Edit",
        key: "edit",
      });
    }
  },
  methods: {
    handleSelectMenu(key: MenuList) {
      switch (key) {
        case "bookmark":
          return this.bookmark();
        case "edit":
          return this.enableEditMode();
      }
    },
    enableEditMode(): void {
      this.$emit("enableEditMode");
    },
    bookmark(): void {},
  },
});
</script>

<style scoped>
.tripPrivateAlertBar {
  margin: 0 0 20px 0;
}

.tripCities {
  margin: 10px 0 0 0;
  padding-bottom: 10px;
}

.tripCity {
  margin: 5px 5px 0 0;
}

.tripMenu {
  padding: 0 5px 0 8px;
}

.dayTitle {
  margin: 0;
}

.viewDays {
  padding: 20px;
  text-align: center;
}

@media screen and (max-width: 450px) {
  .viewDays {
    padding: 10px;
  }
}

.viewDayCard {
  display: inline-block;
  position: unset;
  text-align: left;
  width: 400px;
  margin: 0 0 20px 10px;
  vertical-align: top;
}

@media screen and (max-width: 760px) {
  .viewDayCard {
    margin: 0 0 20px 0;
  }
}

@media screen and (max-width: 450px) {
  .viewDayCard {
    width: 100%;
  }
}

.viewDayCardContent {
  padding: 10px 10px 0 10px;
}
</style>
