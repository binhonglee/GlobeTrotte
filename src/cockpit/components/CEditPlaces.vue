<template lang="pug">
  .edit_places
    ul.places
      span.editLabel Places: 
      div.editPlace(
        v-for="(place, index) in this.$props.places"
        v-bind:key="index"
      )
        el-button.removePlace(
          type='danger'
          icon='el-icon-close'
          plain v-on:click='removePlace(index)'
        )
        el-input.inputPlaceLabel(
          type='text'
          v-model='place.label'
        )
        el-input.inputPlaceLink(
          type='text'
          v-model='place.URL'
        )
      el-button.addPlace(
        plain icon='el-icon-plus'
        v-on:click='pushPlace' circle
      )
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';
import Place from '../structs/Place';

@Component
export default class CEditPlaces extends Vue {
  @Prop() private places!: [];

  private pushPlace(): void {
    this.$props.places.push(new Place());
  }

  private removePlace(index: number): void {
    this.$props.places.splice(index, 1);
  }
}
</script>

<style lang="scss">
@import '../shared/lib';

$place-label-width: 90px;
$place-link-width: 150px;

.places {
  margin: 0;
  padding: 0;
}

.addPlace {
  float: right;
  margin-left: $edit-width;
  margin-top: 5px;
  margin-bottom: 10px;
  vertical-align: middle;
  font-size: 10px;
}

.editPlace {
  margin-top: 5px;
  margin-bottom: 5px;
  float: right;
}

.inputPlaceLabel {
  vertical-align: middle;
  width: $place-label-width;
}

.inputPlaceLink {
  vertical-align: middle;
  width: $place-link-width;
  margin-left: 10px;
}

.removePlace {
  vertical-align: middle;
  font-size: 10px;
  margin-right: 5px;
  padding: 3px;
}

el-input {
  width: auto;
  height: auto;
}
</style>
