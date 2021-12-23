<template lang="pug">
.edit_places
  ul.places(
    v-for="(place, index) in places"
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
