<template lang="pug">
    .edit_places
        ul.places
            span.editLabel Places: 
            div.editPlace(v-for="place in places" v-bind:key="place.label")
                el-input.inputPlaceLabel(
                    type='text'
                    v-model='place.label'
                )
                el-input.inputPlaceLink(
                    type='text'
                    v-model='place.url'
                )
            el-button.addPlace(v-on:click='pushPlace') +
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Place from '../structs/Place';

@Component
export default class CEditPlaces extends Vue {
    @Prop() private places!: [];

    private pushPlace(): void {
        this.$props.places.push(new Place());
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

el-input {
    width: auto;
    height: auto;
}
</style>
