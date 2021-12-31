<template>
  <div class="edit_places">
    <ul v-for="(place, index) in places" :key="index" class="places">
      <div class="editPlace" :class="'place' + index">
        <el-input
          v-model="place.label"
          class="inputPlaceLabel"
          type="text"
          :placeholder="
            'Place Name' + (index !== 0 ? '' : ' (eg. Golden Gate Bridge)')
          "
        ></el-input>
        <el-input
          v-model="place.URL"
          class="inputPlaceLink"
          type="text"
          :placeholder="'Link' + (index !== 0 ? '' : ' (eg. Google Map link)')"
        ></el-input
        ><br />
        <el-input
          v-model="place.description"
          class="inputPlaceDesc"
          type="textarea"
          :placeholder="
            index !== 0
              ? 'Description'
              : 'Elaborate more about why you include this place in the trip!'
          "
          :rows="3"
        ></el-input>
        <el-button
          class="removePlace"
          type="danger"
          icon="el-icon-close"
          plain="plain"
          @click="removePlace(index)"
          >Delete this place</el-button
        >
        <el-divider class="editPlaceDivider"></el-divider>
      </div>
    </ul>
    <el-button
      class="addPlace"
      plain="plain"
      icon="el-icon-plus"
      @click="pushPlace"
      >Add another place</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Place from "@/wings/Place";

interface Data {
  places: Place[];
}

export default defineComponent({
  name: "CEditPlaces",
  props: {
    givenPlaces: {
      type: Array,
      default: (): Place[] => {
        return [];
      },
      validator: function (value) {
        if (!Array.isArray(value)) {
          return false;
        }
        value.forEach((element) => {
          if (!(element instanceof Place)) {
            return false;
          }
        });
        return true;
      },
    },
  },
  data: (): Data => ({
    places: [],
  }),
  beforeMount() {
    this.$data.places = (this.$props.givenPlaces ?? []).slice(0) as Place[];
  },
  methods: {
    pushPlace(): void {
      this.$data.places.push(new Place());
    },
    removePlace(index: number): void {
      this.$data.places.splice(index, 1);
    },
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.addPlace {
  @include wide_button();
  margin: 0;
}

.editPlace {
  display: inline-block;
  margin: 0;
  width: 100%;
}

.inputPlaceLink,
.inputPlaceDesc,
.removePlace {
  margin: 5px 0 0 0;
}

.removePlace {
  @include wide_button();
  margin: 10px 0 0 0;
}

.editPlaceDivider {
  margin: 10px -10px 10px;
  width: 104%;
}

el-input {
  width: auto;
  height: auto;
}
</style>
