<template lang="pug">
  .edit_places
    ul.places(
      v-for="(place, index) in this.$data.places"
      v-bind:key="index"
    )
      div.editPlace(:class="'place' + index")
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
        el-button.removePlace(
          type="danger"
          icon="el-icon-close"
          plain v-on:click="removePlace(index)"
        ) Delete this place
        el-divider.editPlaceDivider
    el-button.addPlace(
      plain icon="el-icon-plus"
      v-on:click="pushPlace"
    ) Add another place
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
    this.$data.places = (this.$props.givenPlaces ?? []).slice(0);
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.addPlace {
  @include right_button();
  margin: 0 0 0 0;
  font-size: 12px;
  padding: 5px;
  width: 100%;
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
  font-size: 12px;
  padding: 5px;
  width: 100%;
}

.editPlaceDivider {
  margin: 10px -2% 10px;
  width: 104%;
}

el-input {
  width: auto;
  height: auto;
}
</style>
