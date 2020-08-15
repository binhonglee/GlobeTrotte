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
import {
  Component,
  Prop,
  Vue,
} from "vue-property-decorator";
import Item from "../shared/TripEditable";

@Component
export default class CEditItem extends Vue {
  @Prop() private item!: Item;

  private save(): void {
    this.$emit("save", this.item);
  }
}
</script>

<style lang="scss">
@import "../shared/lib";
</style>
