<template lang="pug">
.edit_item(v-bind:class="type === 'textarea' ? 'edit_item_large' : 'edit_item_small'")
  span.editLabel(:class="className + 'Label'") {{ label }}:
  el-input.editInput(
    :class="className"
    :ref="'input'"
    :rows="type === 'textarea' ? 3 : 1"
    :type="type"
    :show-password="type === 'password'"
    v-model="value"
    v-on:keyup.enter.native="enter"
  )
  br
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
  },
  data: (): Data => ({
    value: "",
  }),
  methods: {
    enter(): void {
      this.$emit("enter");
    },
  },
  beforeMount(): void {
    this.$data.value = this.$props.val ?? "";
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
