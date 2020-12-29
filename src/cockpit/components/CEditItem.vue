<template lang="pug">
  .edit_item(v-bind:class="large ? 'edit_item_large' : 'edit_item_small'")
    span.editLabel {{ label }}:
    el-input.editInput(
      v-bind:type="large ? 'textarea' : 'text'"
      v-bind:rows="large ? 3 : 1"
      v-on:keyup.enter="save"
      v-model="value"
      :class="className"
    )
    br
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CEditItem",
  props: {
    label: {
      type: String,
    },
    val: {
      type: String,
    },
    large: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    value: "",
  }),
  beforeMount() {
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
  height: 80px;
}

.edit_item_small {
  height: 50px;
}
</style>
