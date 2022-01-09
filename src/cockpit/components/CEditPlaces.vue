<template lang="pug">
.edit_places
  ul.places
    li.place(v-for="(place, index) in places", :key="index")
      .editPlace(:class="'place' + index")
        n-input.inputPlaceLabel(
          v-model:value="place.label"
          type="text"
          :placeholder="'Place Name' + (index !== 0 ? '' : ' (eg. Golden Gate Bridge)')")
        n-input.inputPlaceLink(
          v-model:value="place.URL"
          type="text"
          :placeholder="'Link' + (index !== 0 ? '' : ' (eg. Google Map link)')"
        )
        br
        n-input.inputPlaceDesc(
          v-model:value="place.description"
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
import { NButton, NDivider, NIcon, NInput } from "naive-ui";
import { Add, CloseOutline } from "@vicons/ionicons5";
import Place from "@/wings/Place";

export class DataPlace {
  public ID: number;
  public label: string;
  public URL: string;
  public description: string;

  public constructor(place?: Place) {
    this.ID = place?.ID.valueOf() ?? -1;
    this.label = place?.label.valueOf() ?? "";
    this.URL = place?.URL.valueOf() ?? "";
    this.description = place?.description.valueOf() ?? "";
  }
}

interface Data {
  places: DataPlace[];
}

export default defineComponent({
  name: "CEditPlaces",
  components: { Add, CloseOutline, NButton, NDivider, NIcon, NInput },
  props: {
    givenPlaces: {
      type: Array as PropType<Array<DataPlace>>,
      default: (): Place[] => {
        return [];
      },
      validator: function (value) {
        if (!Array.isArray(value)) {
          return false;
        }
        value.forEach((element) => {
          if (!(element instanceof DataPlace)) {
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
    this.$data.places = (this.$props.givenPlaces ?? []).slice(0) as DataPlace[];
  },
  methods: {
    pushPlace(): void {
      this.$data.places.push(new DataPlace());
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

el-input {
  width: auto;
  height: auto;
}
</style>
