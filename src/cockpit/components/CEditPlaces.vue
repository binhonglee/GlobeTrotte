<template lang="pug">
  .edit_places
    ul.places
      span.editLabel(
        v-if="this.$data.places.length > 0"
      ) Places:
      div.editPlace(
        v-for="(place, index) in this.$data.places"
        v-bind:key="index"
      )
        el-input.inputPlaceLabel(
          type="text"
          placeholder="Name"
          v-model="place.label"
        )
        el-input.inputPlaceLink(
          type="text"
          placeholder="Link"
          v-model="place.URL"
        )
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

$place-label-width: 90px;
$place-link-width: 150px;

.places {
  margin: 0;
  padding: 0;
}

.addPlace {
  @include right_button();
}

.editPlace {
  margin-top: 5px;
  margin-bottom: 5px;
  float: right;
}

.inputPlaceLabel {
  vertical-align: middle;
  width: $place-label-width;
}

.inputPlaceLink {
  vertical-align: middle;
  width: $place-link-width;
  margin-left: 10px;
}

.removePlace {
  vertical-align: middle;
  font-size: 10px;
  margin-left: 5px;
  padding: 3px;
}

el-input {
  width: auto;
  height: auto;
}
</style>
