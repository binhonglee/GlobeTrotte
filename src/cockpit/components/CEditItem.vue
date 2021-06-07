<template lang="pug">
.edit_item(v-bind:class="isDescription() ? 'edit_item_large' : 'edit_item_small'")
  span.editLabel(:class="className + 'Label'") {{ label }}:
  el-input.editInput(
    :class="className"
    :ref="'input'"
    :rows="rowMinCount"
    :type="type"
    :show-password="type === 'password'"
    v-model="value"
    v-on:keyup.enter.native="enter"
    :maxlength="valMaxCount"
  )
  br
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NAME_CHAR_MAX_COUNT } from "@/shared/constants";

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
    valMaxCount: {
      type: Number,
      default: NAME_CHAR_MAX_COUNT,
    },
    rowMinCount: {
      type: Number,
      default: 1,
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
    getInitialValue(): string {
      return this.$props.val
        ? this.$props.val.slice(0, this.$props.valMaxCount)
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
