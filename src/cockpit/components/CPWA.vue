<template>
  <n-alert v-if="needRefresh" class="pwa-toast" title="Update" type="info">
    New version available. Click here to update.
    <br />
    <n-button @click="updateServiceWorker()">Update</n-button>
  </n-alert>
</template>

<script setup lang="ts">
import { NAlert, NButton } from "naive-ui";
import { useRegisterSW } from "virtual:pwa-register/vue";

const { needRefresh, updateServiceWorker } = useRegisterSW();
</script>

<style>
#app .dark_mode .pwa-toast {
  background-color: #15344a;
}

#app .pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 10px;
  z-index: 1;
  text-align: left;
}

.pwa-toast .n-alert-body {
  padding-bottom: 55px;
}

.pwa-toast .n-button {
  float: right;
  padding: 8px;
  margin-top: 10px;
}
</style>
