<template lang="pug">
  .edit_item
    span.editLabel {{ item.label }}:
    el-input.editInput(
      type='text'
      v-on:keyup.enter='save'
      v-model='item.value'
    )
    br
</template>

<script lang="ts">
import Vue from "vue";
import Item from "shared/TripEditable";

export default Vue.extend({
  name: "CEditItem",
  props: {
    item: {
      type: Item,
    },
  },
  computed: {
    save(): void {
      this.$emit("save", this.item);
    }
  }
});
</script>

<style lang="scss">
@import "../shared/lib";
</style>
