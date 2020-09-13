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
import {
  Component,
  Prop,
  Vue,
} from "vue-property-decorator";
import CEditItem from "./CEditItem.vue";
import CEditPlaces from "./CEditPlaces.vue";
import City from "../wings/City";
import { CityUtil } from "../shared/CityUtil";
import Trip from "../wings/Trip";
import TripEditable from "../shared/TripEditable";

@Component({
  data() {
    return {
      city: "",
      cities: [],
      editables: [],
      items: [],
      locations: [],
      saving: false,
    };
  },
  components: {
    CEditItem,
    CEditPlaces,
  },
})
export default class CEditTrip extends Vue {
  @Prop() private trip!: Trip;

  private beforeMount(): void {
    this.$data.cities = CityUtil.allActiveCities();
    this.$data.editables = TripEditable.getAllTypes();

    if (this.trip.cities.length > 0) {
      this.$data.city = this.trip.cities[0];
    }

    for (const field in this.$data.editables) {
      if (typeof field === "string") {
        this.$data.items.push(
          this.tripToItem(this.$data.editables[field]),
        );
      }
    }
  }

  private cancel(): void {
    this.$emit("cancel");
  }

  private save(): void {
    this.$data.saving = true;
    if (typeof this.$data.city === "number") {
      this.trip.location = this.$data.city;
    } else {
      this.trip.location = parseInt(
        City[this.$data.city],
        10,
      );
    }

    for (const item of this.$data.items) {
      if (item instanceof TripEditable) {
        if (typeof this.trip[item.type] !== "string") {
          this.trip[item.type] = +item.value;
        } else {
          this.trip[item.type] = item.value;
        }
      }
    }

    this.trip.userID = 213;
    this.trip.places = this.$data.locations;

    this.$emit("save", this.trip);
    this.$data.saving = false;
  }

  private tripToItem(itemType: string): TripEditable {
    return new TripEditable(itemType, this.trip[itemType]);
  }
}
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
