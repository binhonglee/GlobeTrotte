<template lang="pug">
.edit_days.narrow_content
  n-card.editDay(
    v-for="(day, index) in days"
    :key="day.dayOf"
    hoverable
    content-style="padding: 0"
    :class="'day' + day.dayOf"
  )
    .editDayCardContent
      .editDayTitle
        b Day {{ day.dayOf }}
        n-button.removeDay.right_button(
          secondary type="error"
          @click="removeDay(index)"
        )
          n-icon
            close-outline
          | Delete this day
      CEditPlaces.editPlaces(
        :ref="'places' + index"
        v-model:propPlaces="day.propPlaces"
      )
  n-button.addDay.right_button(@click="pushDay()")
    n-icon
      add
    | Add another day
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NButton, NCard, NIcon } from "naive-ui";
import { Add, CloseOutline } from "@vicons/ionicons5";
import CEditPlaces from "@/components/CEditPlaces.vue";
import { DataDay } from "@/shared/DataProps";
import Day from "@/wings/Day";

interface Data {
  days: DataDay[];
}

export default defineComponent({
  components: {
    Add,
    CEditPlaces,
    CloseOutline,
    NButton,
    NCard,
    NIcon,
  },
  props: {
    givenDays: {
      type: Array as PropType<Array<Day>>,
      required: true,
    },
  },
  data: (): Data => ({
    days: [],
  }),
  beforeMount(): void {
    this.$data.days = (this.$props.givenDays.slice(0) as Day[]).map(
      (day) => new DataDay(day),
    );
  },
  methods: {
    pushDay(): void {
      let day = new DataDay(
        new Day({
          places: [{}],
        }),
      );
      day.dayOf = this.$data.days.length + 1;
      this.$data.days.push(day);
    },
    removeDay(index: number): void {
      this.$data.days.splice(index, 1);
      let dayMap: { [key: number]: DataDay } = {};
      for (let day of this.$data.days) {
        dayMap[day.dayOf] = day;
      }
      const size = this.$data.days.length;
      this.$data.days = [];
      let offBy = 0;
      for (let i = 0; i < size; i++) {
        let currentDay: DataDay = dayMap[i + offBy];
        while (
          (currentDay === undefined || currentDay === null) &&
          i + offBy < size + 5
        ) {
          offBy++;
          currentDay = dayMap[i + offBy];
        }
        currentDay.dayOf = i + 1;
        this.$data.days.push(currentDay);
      }
    },
  },
});
</script>

<style scoped>
.editPlaces {
  margin: 15px 0 0 0;
}

.editDay {
  margin: 10px 0 10px 0;
  padding: 0;
  width: 100%;
}

.editDay .editDayCardContent {
  padding: 15px 10px;
}

.editDayTitle {
  margin-bottom: 5px;
}

.addDay {
  min-height: 28px;
  padding: 5px;
  width: 100%;
}

.removeDay {
  font-size: 12px;
  margin-top: -5px;
  min-height: 28px;
  padding: 5px 8px 5px 5px;
  line-height: 10px;
}
</style>
