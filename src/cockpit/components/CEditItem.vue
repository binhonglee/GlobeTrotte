<template lang="pug">
.edit_item(:class="isDescription() ? 'edit_item_large' : 'edit_item_small'")
  span.editLabel(:class="className + 'Label'") {{ label }}:
  n-input.editInput(
    :class="className"
    :ref="'input'"
    :rows="rowMinCount"
    :type="type"
    :show-password-on="'click'"
    v-model:value="value"
    @keyup.enter.native="enter"
    :maxlength="valMaxCount"
    :show-count="type === 'textarea'"
    :placeholder="placeholder"
  )
  br
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NInput } from "naive-ui";
import { NAME_CHAR_MAX_COUNT } from "@/shared/constants";

interface Data {
  value: string;
}

type inputType = "textarea" | "text" | "password";

export default defineComponent({
  name: "CEditItem",
  components: { NInput },
  props: {
    label: {
      type: String,
      required: true,
    },
    val: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<inputType>,
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
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: {
    enter() {
      return true;
    },
  },
  data: (): Data => ({
    value: "",
  }),
  beforeMount(): void {
    this.$data.value = this.getInitialValue();
  },
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
});
</script>

<style lang="scss">
@import "../shared/lib";

.editLabel {
  margin-top: 0px;
}

.edit_item {
  padding: 5px 0;
}

.edit_item_large {
  padding-bottom: 45px;
}
</style>
