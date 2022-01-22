<template lang="pug">
.edit_places
  ul.places
    li.place(v-for="(propPlace, index) in propPlaces", :key="index")
      .editTravelTime(v-if="index > 0")
        n-divider.editPlaceDivider
        .travelTimeInput(v-if="propPlace.travelTime !== undefined")
          .travelTimeLabel Travel time
          n-input-number(
            placeholder="Travel time (in minutes)" type="text" :min="0"
            v-model:value="propPlace.travelTime.timeInMinutes"
          )
            template(#suffix) minutes
        n-button.setTravelTime(
          v-else type="default"
          @click="setTravelTime(index)"
        ) Set travel time
        n-divider.editPlaceDivider
      .editPlace(:class="'place' + index")
        n-input.inputPlaceLabel(
          v-model:value="propPlace.place.label"
          type="text"
          :placeholder="'Place Name' + (index !== 0 ? '' : ' (eg. Golden Gate Bridge)')")
        n-input.inputPlaceLink(
          v-model:value="propPlace.place.URL"
          type="text"
          :placeholder="'Link' + (index !== 0 ? '' : ' (eg. Google Map link)')"
        )
        br
        n-input.inputPlaceDesc(
          v-model:value="propPlace.place.description"
          type="textarea"
          :placeholder="index !== 0 ? 'Description' : 'Elaborate more about why you include this place in the trip!'"
          :rows="3"
        )
        n-button.removePlace(
          type="error"
          secondary
          @click="removePlace(index)"
        )
          n-icon
            close-outline
          | Delete this place
  n-divider.editPlaceDivider
  n-button.addPlace(
    @click="pushPlace"
  )
    n-icon
      add
    | Add another place
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NButton, NDivider, NIcon, NInput, NInputNumber } from "naive-ui";
import { Add, CloseOutline } from "@vicons/ionicons5";
import { PropPlace, DataTravelTime } from "@/shared/DataProps";

export default defineComponent({
  name: "CEditPlaces",
  components: {
    Add,
    CloseOutline,
    NButton,
    NDivider,
    NIcon,
    NInput,
    NInputNumber,
  },
  model: {
    props: { propPlaces: Array<PropPlace>() },
    emits: ["update:propPlaces"],
  },
  props: {
    propPlaces: {
      type: Array as PropType<Array<PropPlace>>,
      default: (): PropPlace[] => {
        return [];
      },
      validator: function (value) {
        if (!Array.isArray(value)) {
          return false;
        }
        value.forEach((element) => {
          if (!(element instanceof PropPlace)) {
            return false;
          }
        });
        return true;
      },
    },
  },
  methods: {
    pushPlace(): void {
      this.$props.propPlaces.push(new PropPlace());
    },
    removePlace(index: number): void {
      this.$props.propPlaces.splice(index, 1);
    },
    setTravelTime(index: number): void {
      const tt = new DataTravelTime();
      tt.toPlaceIndex = index;
      this.$props.propPlaces[index].travelTime = tt;
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

.places {
  padding: 0;
  margin: 0;
}

.place {
  display: block;
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
  margin: 10px 0;
}

.setTravelTime {
  width: 100%;
}

.travelTimeLabel {
  text-align: center;
  padding-bottom: 5px;
}
</style>
