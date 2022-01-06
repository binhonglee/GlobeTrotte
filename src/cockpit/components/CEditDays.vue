<template>
  <div class="edit_days narrow_content">
    <el-card
      v-for="(day, index) in days"
      :key="day.dayOf.valueOf()"
      class="editDay"
      shadow="hover"
      :class="'day' + day.dayOf"
    >
      <div class="editDayCardContent">
        <div class="editDayTitle"
          ><b>Day {{ day.dayOf }}</b>
          <el-button
            class="removeDay"
            type="danger"
            icon="el-icon-close"
            plain="plain"
            @click="removeDay(index)"
            >Delete this day</el-button
          >
        </div>
        <CEditPlaces
          :ref="'places' + index"
          class="editPlaces"
          :given-places="day.places"
        />
      </div>
    </el-card>
    <el-button class="addDay" icon="el-icon-plus" @click="pushDay"
      >Add another day</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CEditPlaces from "@/components/CEditPlaces.vue";
import Day from "@/wings/Day";

interface Data {
  days: Day[];
}

export default defineComponent({
  components: {
    CEditPlaces,
  },
  props: {
    givenDays: {
      type: Array,
      required: true,
    },
  },
  data: (): Data => ({
    days: [],
  }),
  beforeMount(): void {
    this.$data.days = this.$props.givenDays.slice(0) as Day[];
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
        dayMap[day.dayOf.valueOf()] = day;
      }
      const size = this.$data.days.length;
      this.$data.days = [];
      let offBy = 0;
      for (let i = 0; i < size; i++) {
        let currentDay: Day = dayMap[i + offBy];
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

<style lang="scss" scoped>
@import "../shared/lib";

.editPlaces {
  margin: 15px 0 0 0;
}

.editDay {
  margin: 10px 0 10px 0;
  padding: 0;
  width: 100%;

  .editDayCardContent {
    padding: 10px;
  }
}

.editDayTitle {
  margin-bottom: 5px;
}

.addDay {
  @include right_button();
  font-size: 12px;
  min-height: 28px;
  padding: 5px;
  width: 100%;
}

.removeDay {
  @include right_button();
  font-size: 12px;
  margin-top: -5px;
  min-height: 28px;
  padding: 0 5px;
  line-height: 10px;
}
</style>
