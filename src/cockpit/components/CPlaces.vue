<template lang="pug">
  .places
    ul#places(
      v-if="places !== undefined"
      v-for="place in places"
    ) Places:
      div#place(v-bind:key="place.url")
        a(
          target="_blank"
          rel="noopener noreferrer"
          :href="place.url"
        ) {{ place.label }}
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import Place from '../structs/Place';

@Component
export default class CPlaces extends Vue {
  @Prop() private places!: Place[];
}
</script>

<style lang="scss">
#places {
  padding: inherit;
  margin: 0;
}

#place {
  margin-left: 10px;
}
</style>
