<template lang="pug">
  .edit_days
    el-card.editDay(
      v-for="(day, index) in days"
      :key="day.dayOf"
    )
      div.editDayTitle
        b Day {{ day.dayOf }}
        el-button.removeDay(
          type='danger'
          icon='el-icon-close'
          plain v-on:click='removeDay(index)'
        )
      CEditPlaces(
        :givenPlaces="day.places"
        :ref="'places' + index"
      )
    el-button.addDay(
      plain icon='el-icon-plus'
      v-on:click='pushDay' circle
    )
</template>

<script lang="ts">
import Vue from "vue";
import CEditPlaces from "@/components/CEditPlaces.vue";
import Day from "@/wings/Day";

export default Vue.extend({
  name: "CEditDay",
  data: () => ({
    days: [],
  }),
  props: {
    givenDays: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    pushDay(): void {
      let day = new Day({
        places: [{}],
      });
      day.dayOf = this.$data.days.length + 1;
      this.$data.days.push(day);
    },
    removeDay(index: number): void {
      this.$data.days.splice(index, 1);
      let dayMap: { [key: number]: Day } = {};
      for (let day of this.$data.days) {
        dayMap[day.dayOf] = day;
      }
      const size = this.$data.days.length;
      this.$data.days = [];
      let offBy = 0;
      for (let i = 0; i < size; i++) {
        let currentDay: Day = dayMap[i + offBy];
        while (
          (currentDay === undefined ||
            currentDay === null) &&
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
  beforeMount() {
    this.$data.days = (this.$props.givenDays ?? []).slice(
      0,
    );
  },
  components: {
    CEditPlaces,
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.editDay {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.editDayTitle {
  margin-bottom: 5px;
}

.addDay {
  @include right_button();
}

.removeDay {
  @include right_button();
  padding: 3px;
  margin: 0;
}
</style>
