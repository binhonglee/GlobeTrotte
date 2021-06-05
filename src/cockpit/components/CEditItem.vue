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
    :id="id"
    :maxlength="getMaxLength()"
  )
  br
</template>

<script lang="ts">
import { defineComponent } from "vue";

/** Constants */
const DESCRIPTION_MAX_COUNT = 500;
const NAME_CHAR_MAX_COUNT = 50;
const NAME_ROW_COUNT = 1;
const DESCRIPTION_ROW_COUNT = 3;

interface Data {
  value: string;
  DESCRIPTION_MAX_COUNT: number;
  NAME_CHAR_MAX_COUNT: number;
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
    id: {
      type: String,
      default: "editItem",
    },
  },
  data: (): Data => ({
    value: "",
    DESCRIPTION_MAX_COUNT,
    NAME_CHAR_MAX_COUNT,
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
        ? this.$data.DESCRIPTION_MAX_COUNT
        : this.$data.NAME_CHAR_MAX_COUNT;
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
    console.table([
      this.$data.value,
      this.$props.val,
      this.$data.NAME_CHAR_MAX_COUNT,
      this.getInitialValue(),
      this.isDescription(),
      this.getMaxLength(),
    ]);
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
