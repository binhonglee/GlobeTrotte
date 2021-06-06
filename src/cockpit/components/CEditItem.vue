<template lang="pug">
.edit_item(v-bind:class="isDescription() ? 'edit_item_large' : 'edit_item_small'")
  span.editLabel(:class="className + 'Label'") {{ label }}:
  el-input.editInput(
    :class="className"
    :ref="'input'"
    :rows="getMaxRows()"
    :type="type"
    :show-password="type === 'password'"
    v-model="value"
    v-on:keyup.enter.native="enter"
    :maxlength="getMaxLength()"
  )
  br
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  DESCRIPTION_CHAR_MAX_COUNT,
  NAME_CHAR_MAX_COUNT,
} from "@/shared/constants";

/** Constants */
const NAME_ROW_COUNT = 1;
const DESCRIPTION_ROW_COUNT = 3;

interface Data {
  value: string;
}

export default defineComponent({
  name: "CEditItem",
  props: {
    label: {
      type: String,
    },
    val: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    className: {
      type: String,
      default: "",
    },
    nameCharMaxCount: {
      type: Number,
      default: NAME_CHAR_MAX_COUNT,
    },
    descriptionCharMaxCount: {
      type: Number,
      default: DESCRIPTION_CHAR_MAX_COUNT,
    },
  },
  data: (): Data => ({
    value: "",
  }),
  methods: {
    enter(): void {
      this.$emit("enter");
    },
    isDescription(): boolean {
      return this.$props.type === "textarea";
    },
    getMaxLength(): number {
      return this.isDescription()
        ? this.$props.descriptionCharMaxCount
        : this.$props.nameCharMaxCount;
    },
    getMaxRows(): number {
      return this.isDescription() ? DESCRIPTION_ROW_COUNT : NAME_ROW_COUNT;
    },
    getInitialValue(): string {
      return this.$props.val
        ? this.$props.val.slice(0, this.getMaxLength())
        : "";
    },
  },
  beforeMount(): void {
    this.$data.value = this.getInitialValue();
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.editLabel {
  margin-top: 0px;
}

.edit_item_large {
  min-height: 75px;
}

.edit_item_small {
  height: 50px;
}
</style>
