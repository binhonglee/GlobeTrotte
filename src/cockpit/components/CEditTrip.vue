<template lang="pug">
  .edit_trip
    CEditItem(
      v-for="item in items"
      @save="save"
      :item="item"
      v-bind:key="item.type"
    )
    span.editLabel City:
    el-select.editInput(v-model="city" placeholder="")
      el-option(
        v-for="item in cities"
        :key="item.key"
        :label="item.label"
        :value="item.key"
      )
    CEditPlaces(:places="locations")
    div.confirmationButtons
      el-button#save(
        type="primary" v-on:click="save" :loading="saving"
      ) Save
      el-button#cancel(
        type="danger" v-on:click="cancel"
      ) Cancel
</template>

<script lang="ts">
import Vue from "vue";
import CEditItem from "./CEditItem.vue";
import CEditPlaces from "./CEditPlaces.vue";
import City from "wings/City";
import { CityUtil } from "shared/CityUtil";
import Trip from "wings/Trip";
import TripEditable from "shared/TripEditable";

export default Vue.extend({
  name: "CEditTrip",
  components: {
    CEditItem,
    CEditPlaces,
  },
  data: () => ({
    city: String,
    cities: Array,
    editables: Array,
    items: Array,
    locations: Array,
    saving: Boolean,
  }),
  props: {
    trip: {
      type: Trip,
    }
  },
  computed: {
    beforeMount(): void {
      this.$data.cities = CityUtil.allActiveCities();
      this.$data.editables = TripEditable.getAllTypes();

      if (this.$props.trip.cities.length > 0) {
        this.$data.city = this.$props.trip.cities[0];
      }

      for (const field in this.$data.editables) {
        if (typeof field === "string") {
          this.$data.items.push(
            this.tripToItem(this.$data.editables[field]),
          );
        }
      }
    },
    cancel(): void {
      this.$emit("cancel");
    },
    save(): void {
      this.$data.saving = true;
      if (typeof this.$data.city === "number") {
        this.$props.trip.location = this.$data.city;
      } else {
        this.$props.trip.location = parseInt(
          City[this.$data.city],
          10,
        );
      }

      for (const item of this.$data.items) {
        if (item instanceof TripEditable) {
          if (typeof this.$props.trip[item.type] !== "string") {
            this.$props.trip[item.type] = +item.value;
          } else {
            this.$props.trip[item.type] = item.value;
          }
        }
      }

      this.$props.trip.places = this.$data.locations;

      this.$emit("save", this.$props.trip);
      this.$data.saving = false;
    }
  },
  methods: {
    tripToItem(itemType: string): TripEditable {
      return new TripEditable(itemType, this.$props.trip[itemType]);
    }
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

#cancel {
  @include right_col($p-height);
}

#save {
  @include left_col($p-height);
}
</style>
