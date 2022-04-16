<template lang="pug">
.loading_trip_preview_card(:class="{ wide_preview_card: wide }")
  n-card(
    content-style="padding: 0"
    :class="{ widePreviewCard: wide, tripPreviewCard: !wide, limitHeight: limitHeight }"
  )
    n-skeleton.skeletonTitle(height="30px" width="60%")
    .tripDayPreview(v-for="count in 5" :key="count")
      n-divider
      n-skeleton.daysInTrip(text :repeat="3")
    .endOfCardPadding
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard, NDivider, NSkeleton } from "naive-ui";
export default defineComponent({
  name: "CLoadingTripPreviewCard",
  components: { NCard, NDivider, NSkeleton },
  props: {
    wide: {
      type: Boolean,
      default: false,
    },
    limitHeight: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped>
.skeletonText {
  width: 90%;
}

.skeletonTitle {
  text-align: center;
  margin: auto;
  margin-top: 10px;
}

.loading_trip_preview_card {
  display: inline-block;
  margin: 15px;
  max-width: 88%;
}

.wide_preview_card {
  width: 100%;
}

.tripPreviewCard {
  overflow: hidden;
  width: 500px;
}

.limitHeight {
  height: 500px;
}

@media screen and (max-width: 1060px) {
  .tripPreviewCard {
    height: auto;
  }
}

@media screen and (max-width: 550px) {
  .trip_preview_card {
    width: 88%;
  }

  .tripPreviewCard {
    width: 100%;
  }
}

.widePreviewCard {
  display: block;
  height: auto;
  margin: auto;
  width: 750px;
  max-width: 100%;
}

.tripLink {
  text-decoration: none;
}

.tripPreviewInfo,
.tripDayPreview {
  margin: 0 20px;
  text-align: left;
}

.tripDayLabel {
  margin: 0 5px;
}

.tripTitleName,
.endOfCardPadding {
  margin-top: 12px;
}

.cityTag {
  margin-right: 5px;
}
</style>
