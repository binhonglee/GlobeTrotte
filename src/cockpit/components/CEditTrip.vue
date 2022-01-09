<template lang="pug">
.edit_trip
  form.edit_form
    .narrow_content
      CEditItem(
        :className="'editTripName'"
        :label="'Name'"
        :ref="'name'"
        :val="trip.details.name.valueOf()"
      )
      CEditItem(
        :className="'editTripDescription'"
        :label="'Description'"
        :ref="'description'"
        :type="'textarea'"
        :val="trip.details.description.valueOf()"
        :val-max-count="descriptionMaxCharCount"
        :row-min-count="descriptionRowMinCount"
      )
      .editTripPrivacy
        span.editLabel Private:
        .editInput
          n-switch(v-model:value="private")
      .editCity
        span.editLabel Cities:
        n-select.editInput(
          v-model:value="cities"
          :options="possibleCities"
          filterable
          multiple
          placeholder=""
        )
    CEditDays(ref="days" :givenDays="trip.details.days")
    div.confirmationButtons.narrow_content
      el-button.saveEditTrip(
        type="primary" @click="save" :loading="saving"
      ) Save
      el-button.cancelEditTrip(
        type="default" @click="cancel"
      ) Cancel
      el-button.deleteTrip(
        v-if="!isNew"
        @click="del"
        type="danger"
        :loading="deleting"
      ) Delete
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CEditDays from "./CEditDays.vue";
import CEditItem from "./CEditItem.vue";
import CEditPlaces from "./CEditPlaces.vue";
import { CityUtil, Options } from "@/shared/CityUtil";
import TripEditable from "@/shared/TripEditable";
import HTTPReq from "@/shared/HTTPReq";
import General from "@/shared/General";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";
import Place from "@/wings/Place";
import Routes from "@/routes";
import { WingsStructUtil } from "wings-ts-util";
import E from "@/shared/E";
import Routing from "@/shared/Routing";
import {
  DESCRIPTION_CHAR_MAX_COUNT,
  NAME_CHAR_MAX_COUNT,
  NAME_CHAR_MIN_COUNT,
} from "@/shared/constants";
import { NSelect, NSwitch } from "naive-ui";

interface Data {
  cities: Array<string>;
  possibleCities: Array<Options>;
  private: boolean;
  saving: boolean;
  deleting: boolean;
}

const DESCRIPTION_ROW_MIN_COUNT = 3;

export default defineComponent({
  components: {
    NSelect,
    NSwitch,
    CEditDays,
    CEditItem,
    CEditPlaces,
  },
  props: {
    trip: {
      type: TripObj,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    save(trip: TripBasic) {
      return trip.ID !== -1;
    },
    cancel() {
      return true;
    },
  },
  data: (): Data => ({
    cities: [],
    possibleCities: [],
    private: false,
    saving: false,
    deleting: false,
  }),
  computed: {
    descriptionMaxCharCount() {
      return DESCRIPTION_CHAR_MAX_COUNT;
    },
    descriptionRowMinCount() {
      return DESCRIPTION_ROW_MIN_COUNT;
    },
  },
  beforeMount(): void {
    this.update();
  },
  mounted(): void {
    E.get(E.get(this, "name"), "input").focus();
  },
  methods: {
    cancel(): void {
      E.get(this, "days").$data.days = (
        this.$props.trip.details.days ?? []
      ).slice(0);
      this.$emit("cancel");
    },
    save(): void {
      let newTrip = new TripBasic();

      if (this.$data.cities.length < 1) {
        this.showAlert("Cities cannot be empty");
        return;
      }
      this.$data.saving = true;
      newTrip.cities = CityUtil.stringToCities(this.$data.cities.join(","));

      const tripName = E.getVal(this, "name");
      const tripDescription = E.getVal(this, "description")
        .split("\n")
        .join(" ");
      const valid = this.checkValidNameDescription(tripName, tripDescription);
      if (!valid) {
        this.$data.saving = false;
        return;
      }
      newTrip.name = tripName;
      newTrip.description = tripDescription;

      newTrip.days = [];
      const days = E.get(this, "days");
      let offBy = 0;
      for (const day in days.days) {
        const currentDay = days.days[day];
        const places = this.filterPlaces(currentDay.places);
        if (places === null) {
          this.$alert(
            "We currently only support links to limited " +
              "websites including OpenStreetMap, Google " +
              "Map, Bing Maps and Yelp.",
            "Invalid Link",
            {
              confirmButtonText: "OK",
            },
          );
          this.$data.saving = false;
          return;
        }
        if (places.length > 0) {
          currentDay.places = places;
          currentDay.dayOf = currentDay.dayOf - offBy;
          newTrip.days.push(currentDay);
        } else {
          offBy++;
        }
      }
      newTrip.private = this.$data.private;
      newTrip.ID = this.$props.trip.ID;
      this.$emit("save", newTrip);
      this.$data.saving = false;
    },
    filterPlaces(places: Place[]): Place[] | null {
      let toReturn: Place[] = [];
      for (let place of places) {
        place.label = place.label.trim();
        place.URL = place.URL.trim();
        if (place.label !== "") {
          if (place.URL === "" || this.filterPlace(place)) {
            place.description = place.description.split("\n").join(" ");
            toReturn.push(place);
          } else {
            return null;
          }
        }
      }
      return toReturn;
    },
    filterPlace(place: Place): boolean {
      // TODO: Move (or clone) this check on server side
      const whitelistURLs = [
        "https://goo.gl/maps/",
        "https://google.com/maps/",
        "https://www.google.com/maps/",
        "https://maps.google.com/",
        "https://www.openstreetmap.org/way/",
        "https://www.bing.com/maps?",
        "https://www.yelp.com/biz/",
      ];

      for (const whitelistURL of whitelistURLs) {
        if (place.URL.startsWith(whitelistURL)) {
          return true;
        }
      }
      return false;
    },
    async del(): Promise<void> {
      this.$data.deleting = true;
      let success = Boolean(
        await HTTPReq.genDELETE(
          "v2/trip/" + this.$props.trip.ID,
          WingsStructUtil.stringify(this.$props.trip),
        ),
      );
      if (!success) {
        success =
          (await General.genTrip(this.$props.trip.ID.valueOf())).ID === -1;
      }

      this.$data.deleting = false;
      this.$notify(
        General.notifConfig(
          "Trip Deletion",
          success
            ? "Trip is successfully deleted!"
            : "Trip deletion attempt failed.",
          success ? "success" : "error",
        ),
      );

      if (success) {
        Routing.genRedirectTo(Routes.Landing);
      }
    },
    tripToItem(itemType: string): TripEditable {
      return new TripEditable(itemType, this.$props.trip[itemType]);
    },
    update(): void {
      this.$data.possibleCities = CityUtil.sortedCityOptions();
      this.$data.cities = CityUtil.stringToCityStringArray(
        this.$props.trip.details.cities.join(","),
      );
      this.$data.private = this.$props.trip.details.private.valueOf();
    },
    checkValidNameDescription(name: string, description: string): boolean {
      if (!name || name.length < NAME_CHAR_MIN_COUNT) {
        this.showAlert(`Trip name is too short.`);
        return false;
      }
      if (name.length > NAME_CHAR_MAX_COUNT) {
        this.showAlert(
          `Trip name cannot be longer than ${NAME_CHAR_MAX_COUNT}.`,
        );
        return false;
      }
      if (!description || description.length > DESCRIPTION_CHAR_MAX_COUNT) {
        this.showAlert(
          `Trip description cannot be longer than ${DESCRIPTION_CHAR_MAX_COUNT}.`,
        );
        return false;
      }
      return true;
    },
    showAlert(message: string): void {
      this.$alert(message, "", {
        confirmButtonText: "OK",
      });
    },
  },
});
</script>

<style lang="scss">
@import "../shared/lib";
.edit_form {
  display: flex;
  flex-direction: column;
}

.confirmationButtons {
  margin-top: 20px;
  display: inline-block;
  width: 100%;
}

.editCity {
  overflow: hidden;
  line-height: 40px;
  margin-bottom: 5px;
  .editLabel,
  .editInput {
    line-height: 40px;
  }
}

.editTripPrivacy .editInput {
  width: 100%;
}

.editTripPrivacy {
  .editLabel,
  .editInput {
    line-height: 40px;
  }
}

.deleteTrip,
.cancelEditTrip {
  @include right_col($p-height);
}

.saveEditTrip {
  @include left_col($p-height);
}
</style>
