<template lang="pug">
  .edit_places
    ul.places(
      v-for="(place, index) in this.$data.places"
      v-bind:key="index"
    )
      div.editPlace
        el-input.inputPlaceLabel(
          type="text"
          :placeholder="'Place Name' + (index !== 0 ? '' : ' (eg. Golden Gate Bridge)')"
          v-model="place.label"
        )
        el-input.inputPlaceLink(
          type="text"
          :placeholder="'Link' + (index !== 0 ? '' : ' (eg. Google Map link)')"
          v-model="place.URL"
        )
        br
        el-input.inputPlaceDesc(
          type="textarea"
          :placeholder="index !== 0 ? 'Description' : 'Elaborate more about why you include this place in the trip!'"
          :rows="3"
          v-model="place.description"
        )
      div.removePlaceBlock
        el-button.removePlace(
          type="danger"
          icon="el-icon-close"
          plain v-on:click="removePlace(index)"
        )
    el-button.addPlace(
      plain icon="el-icon-plus"
      v-on:click="pushPlace" circle
    )
</template>

<script lang="ts">
import Vue from "vue";
import Place from "@/wings/Place";

export default Vue.extend({
  name: "CEditPlaces",
  data: () => ({
    places: [],
  }),
  props: {
    givenPlaces: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    pushPlace(): void {
      this.$data.places.push(new Place());
    },
    removePlace(index: number): void {
      this.$data.places.splice(index, 1);
    },
  },
  beforeMount() {
    this.$data.places = (
      this.$props.givenPlaces ?? []
    ).slice(0);
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.places {
  margin: 0;
  padding: 0;
}

.addPlace {
  @include right_button();
}

.editPlace {
  display: inline-block;
  height: 120px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 93%;
}

.inputPlaceLink {
  margin-top: 5px;
}

.inputPlaceDesc {
  margin-top: 5px;
}

.removePlaceBlock {
  display: inline-block;
  width: 7%;
  height: 120px;
}

.removePlace {
  margin-top: 25px;
  font-size: 10px;
  float: right;
  padding: 3px;
}

el-input {
  width: auto;
  height: auto;
}
</style>
