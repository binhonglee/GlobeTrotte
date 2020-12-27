<template lang="pug">
  .edit_trip
    CEditItem(
      :label="'Name'"
      :val="trip.name"
      :ref="'name'"
      :key="'name'"
    )
    CEditItem(
      :label="'Description'"
      :val="trip.description"
      :ref="'description'"
      :key="'description'"
      :large="true"
    )
    .editTripPrivacy
      span.editLabel Private:
      el-switch.editInput(v-model="private")
    .editCity
      span.editLabel Cities:
      el-select.editInput(
        v-model="cities" placeholder="" multiple filterable
        no-match-text="City not found"
      )
        el-option(
          v-for="item in possibleCities"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        )
    CEditDays(:ref="'days'" :givenDays="trip.days")
    div.confirmationButtons
      el-button.saveEditTrip(
        type="primary" v-on:click="save" :loading="saving"
      ) Save
      el-button.cancelEditTrip(
        type="default" v-on:click="cancel"
      ) Cancel
      el-button.deleteTrip(
        v-if="!isNew"
        type="danger"
        v-on:click="del"
        :loading="deleting"
      ) Delete
</template>

<script lang="ts">
import Vue from "vue";
import CEditDays from "./CEditDays.vue";
import CEditItem from "./CEditItem.vue";
import CEditPlaces from "./CEditPlaces.vue";
import { CityUtil } from "@/shared/CityUtil";
import Place from "@/wings/Place";
import Trip from "@/wings/Trip";
import City from "@/wings/City";
import TripEditable from "@/shared/TripEditable";
import HTTPReq from "@/shared/HTTPReq";

export default Vue.extend({
  name: "CEditTrip",
  components: {
    CEditDays,
    CEditItem,
    CEditPlaces,
  },
  data: () => ({
    cities: [],
    possibleCities: [],
    locations: [],
    private: false,
    saving: false,
    deleting: false,
  }),
  props: {
    trip: {
      type: Trip,
    },
    isNew: {
      type: Boolean,
    },
  },
  methods: {
    cancel(): void {
      this.$refs.days.days = (
        this.$props.trip.days ?? []
      ).slice(0);
      this.$emit("cancel");
    },
    save(): void {
      let newTrip = new Trip();
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

      newTrip.name = this.$refs.name.value;
      newTrip.description = this.$refs.description.value;
      newTrip.days = [];
      const days = this.$refs.days;
      let offBy = 0;
      for (const day in days.days) {
        const currentDay = days.days[day];
        const places = this.filterPlaces(
          days.$refs["places" + day][0].places,
        );
        if (places === null) {
          this.$message.error(
            "Invalid URL. URL should always begins with 'https://'",
          );
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
        if (place.label !== "" && place.URL !== "") {
          if (place.URL.startsWith("https://")) {
            toReturn.push(place);
          } else {
            return null;
          }
        }
      }
      return toReturn;
    },
    async del(): Promise<void> {
      this.$data.deleting = true;
      let success = Boolean(
        await HTTPReq.genDELETE(
          "trip/" + this.$props.trip.ID,
        ),
      );
      if (!success) {
        success =
          (await HTTPReq.genGET(
            "trip/" + this.$props.trip.ID,
          )) === "";
      }

      this.$data.deleting = false;
      await this.$alert(
        success
          ? "Trip is successfully deleted!"
          : "Trip deletion attempt failed.",
        "Trip Deletion",
        {
          confirmButtonText: "OK",
        },
      );

      if (success) {
        this.$router.push("/trip/new");
      }
    },
    tripToItem(itemType: string): TripEditable {
      return new TripEditable(
        itemType,
        this.$props.trip[itemType],
      );
    },
    update() {
      this.$data.possibleCities = CityUtil.allActiveCities();
      this.$data.cities = this.$props.trip.cities;
      this.$data.private = this.$props.trip.private;
    },
  },
  beforeMount(): void {
    this.update();
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

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
  width: 40px;
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
