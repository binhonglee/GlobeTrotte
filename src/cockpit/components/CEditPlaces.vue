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
        n-input.inputPlaceLink(
          v-model:value="propPlace.place.URL"
          type="text"
          :disabled="parsing[index]"
          :placeholder="'Link' + (index !== 0 ? '' : ' (eg. Google Map link)')"
        )
        n-button.inputPlaceLinkParse(
          type="default"
          :disabled="propPlace.place.URL.length === 0 || parsing[index]"
          :loading="parsing[index]"
          @click="parse(index)"
        ) Parse
        n-input.inputPlaceLabel(
          v-model:value="propPlace.place.label"
          type="text"
          :disabled="parsing[index]"
          :placeholder="'Place Name' + (index !== 0 ? '' : ' (eg. Golden Gate Bridge)')")
        br
        n-input.inputPlaceDesc(
          v-model:value="propPlace.place.description"
          type="textarea"
          :disabled="parsing[index]"
          :placeholder="index !== 0 ? 'Description' : 'Elaborate more about why you include this place in the trip!'"
          :rows="3"
        )
        n-button.removePlace.wide_button(
          type="error"
          secondary
          @click="removePlace(index)"
        )
          n-icon
            close-outline
          | Delete this place
  n-divider.editPlaceDivider
  n-button.addPlace.wide_button(
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
import HTTPReq from "@/shared/HTTPReq";
import ParsedURLData from "@/wings/ParsedURLData";
import ParsedURLError from "@/wings/ParsedURLError";

interface Data {
  parsing: Array<boolean>;
}

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
  data: (): Data => ({
    parsing: [],
  }),
  beforeMount(): void {
    this.$props.propPlaces.map(() => this.$data.parsing.push(false));
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
    async parse(index: number): Promise<void> {
      this.$data.parsing[index] = true;
      const searchTerm = JSON.stringify(
        this.$props.propPlaces[index].place.URL.valueOf().trim(),
      );
      const res = await HTTPReq.genPOST("parseURL", searchTerm);
      if (res === null) {
        this.$data.parsing[index] = false;
        return;
      }
      const parsedURL = new ParsedURLData(res);
      if (parsedURL.error !== ParsedURLError.None) {
        this.$data.parsing[index] = false;
        return;
      }
      this.$props.propPlaces[index].place.URL = parsedURL.URL.valueOf();
      this.$props.propPlaces[index].place.label = parsedURL.title.valueOf();
      this.$props.propPlaces[index].place.description =
        parsedURL.description.valueOf();
      this.$data.parsing[index] = false;
    },
  },
});
</script>

<style scoped>
.addPlace {
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

.editPlace .inputPlaceLink {
  width: 78%;
}

.inputPlaceLinkParse {
  float: right;
  width: 21%;
}

.inputPlaceLabel,
.inputPlaceDesc,
.removePlace {
  margin: 5px 0 0 0;
}

.removePlace {
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
