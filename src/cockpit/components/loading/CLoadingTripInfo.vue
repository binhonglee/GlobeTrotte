<template lang="pug">
.loading_trip_info.narrow_display_window
  .narrow_content
    n-skeleton(height="40px")
    n-skeleton(text)
    .row
      p.tripCreatorInfo Author:
      n-skeleton.inline_text(text width="30%")
    .row
      p.tripUpdatedDate Last Updated:
      n-skeleton.inline_text(text width="30%")
    .row
      p.tripCreatedDate Created on:
      n-skeleton.inline_text(text width="30%")
    n-skeleton.cities(height="28px" width="200px")
    n-skeleton.share(height="35px" width="75px")
  .loadingDays
    n-card.loadingDayCard(
      v-for="num in 3"
      :key="num"
      content-style="padding: 0"
    )
      n-skeleton.loadingDayTitle(height="20px")
      n-divider
      n-skeleton.loadingDayText(text :row="2")
      n-divider
      n-skeleton.loadingDayText.lastLoadingDayText(text :row="2")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard, NDivider, NSkeleton } from "naive-ui";

export default defineComponent({
  name: "CLoadingTripInfo",
  components: { NCard, NDivider, NSkeleton },
});
</script>

<style scoped>
.tripCreatorInfo,
.tripUpdatedDate,
.tripCreatedDate {
  position: relative;
  display: inline-block;
}

.row {
  display: block;
  width: 100%;
  margin: 14px 0;
}

.loading_trip_info .narrow_content .row p {
  margin: 0;
}

.loading_trip_info .narrow_content .row .n-skeleton {
  position: relative;
  margin-left: 5px;
}

.share {
  margin-top: 10px;
}

.loadingDays {
  margin: 20px;
  text-align: center;
}

@media screen and (max-width: 450px) {
  .loadingDays {
    margin: 10px;
  }
}

.loadingDayCard {
  display: inline-block;
  position: unset;
  text-align: left;
  width: 400px;
  margin: 0 0 20px 10px;
  vertical-align: top;
}

@media screen and (max-width: 760px) {
  .loadingDayCard {
    margin: 0 0 20px 0;
  }
}

@media screen and (max-width: 450px) {
  .loadingDayCard {
    width: 100%;
  }
}

.loadingDayTitle {
  margin: 10px 0 0 10px;
  width: 60%;
}

.loadingDayText {
  margin: 0 0 0 10px;
  width: 90%;
}

.lastLoadingDayText {
  margin-bottom: 5px;
}
</style>
