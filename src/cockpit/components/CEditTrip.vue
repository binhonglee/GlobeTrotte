<template lang="pug">
  .edit_trip
    form.edit_form
      CEditItem(
        :className="'editTripName'"
        :label="'Name'"
        :ref="'name'"
        :val="trip.details.name"
      )
      CEditItem(
        :className="'editTripDescription'"
        :label="'Description'"
        :ref="'description'"
        :type="'textarea'"
        :val="trip.details.description"
      )
      .editTripPrivacy
        span.editLabel Private:
        el-switch.editInput(v-model="private")
      .editCity
        span.editLabel Cities:
        el-select.editInput(
          v-model="cities"
          filterable
          multiple
          no-match-text="City not found"
          placeholder=""
        )
          el-option.editTripSingleCity(
            v-for="item in possibleCities"
            :label="item.label"
            :value="item.key"
          )
      CEditDays(ref="days" :givenDays="trip.details.days")
      div.confirmationButtons
        el-button.saveEditTrip(
          type="primary" v-on:click="save" :loading="saving"
        ) Save
        el-button.cancelEditTrip(
          type="default" v-on:click="cancel"
        ) Cancel
        el-button.deleteTrip(
          v-if="!isNew"
          v-on:click="del"
          type="danger"
          :loading="deleting"
        ) Delete
</template>

<script lang="ts">
import CEditDays from "./CEditDays.vue";
import CEditItem from "./CEditItem.vue";
import CEditPlaces from "./CEditPlaces.vue";
import { CityUtil } from "@/shared/CityUtil";
import TripEditable from "@/shared/TripEditable";
import HTTPReq from "@/shared/HTTPReq";
import General from "@/shared/General";
import TripBasic from "@/wings/TripBasic";
import TripObj from "@/wings/TripObj";
import Place from "@/wings/Place";
import City from "@/wings/City";
import Routes from "@/routes";
import { WingsStructUtil } from "wings-ts-util";
import E from "@/shared/E";
import R from "@/shared/R";

interface Data {
  cities: Array<City>;
  possibleCities: Array<City>;
  private: boolean;
  saving: boolean;
  deleting: boolean;
}

export default {
  components: {
    CEditDays,
    CEditItem,
    CEditPlaces,
  },
  data: (): Data => ({
    cities: [],
    possibleCities: [],
    private: false,
    saving: false,
    deleting: false,
  }),
  props: {
    trip: {
      type: TripObj,
    },
    isNew: {
      type: Boolean,
    },
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
        this.$alert("Cities cannot be empty", "", {
          confirmButtonText: "OK",
        });
        return;
      }
      this.$data.saving = true;
      newTrip.cities = [];
      for (let city of this.$data.cities) {
        if (typeof city === "number") {
          newTrip.cities.push(city);
        } else {
          newTrip.cities.push(parseInt(City[city], 10));
        }
      }

      newTrip.name = E.getVal(this, "name");
      newTrip.description = E.getVal(this, "description").split("\n").join(" ");
      newTrip.days = [];
      const days = E.get(this, "days");
      let offBy = 0;
      for (const day in days.$data.days) {
        const currentDay = days.$data.days[day];
        const places = this.filterPlaces(E.get(days, "places" + day)[0].places);
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
          this.$router,
          "v2/trip/" + this.$props.trip.ID,
          WingsStructUtil.stringify(this.$props.trip),
        ),
      );
      if (!success) {
        success =
          (await General.genTripV2(this.$router, this.$props.trip.ID)).ID ===
          -1;
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
        R.genRedirectTo(this, Routes.Landing);
      }
    },
    tripToItem(itemType: string): TripEditable {
      return new TripEditable(itemType, this.$props.trip[itemType]);
    },
    update(): void {
      this.$data.possibleCities = CityUtil.sortedCityList();
      this.$data.cities = this.$props.trip.details.cities;
      this.$data.private = this.$props.trip.details.private;
      this.$nextTick(function () {
        this.$refs.name.$refs.input.focus();
      });
    },
  },
  beforeMount(): void {
    this.update();
  },
};
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
  margin-top: 10px;
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
