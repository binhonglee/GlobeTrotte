<template lang="pug">
    .view_trip
        h2#name {{ trip.name }}
        span#id {{ trip.id }}
        p#description(v-if="trip.description !== ''") {{ trip.description }}
        p(v-if="trip.places.length !== 0")
            CPlaces(:places='trip.places')
        p#city {{ city }}
        p#creatorInfo Author: {{ trip.userId }}
        p#createdDate Created on: {{ trip.timeCreated.toLocaleDateString() }}
        el-button#enable_edit(v-if='editable === true' v-on:click='enableEditMode') Edit
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CityUtil from '../enums/CityUtil';
import CPlaces from './CPlaces.vue';
import Trip from '../structs/Trip';

@Component({
    data() {
        return {
            city: '',
        };
    },
    components: {
        CPlaces,
    },
})

export default class CViewTrip extends Vue {
    @Prop() private trip!: Trip;
    @Prop() private editable!: boolean;

    private mounted(): void {
        this.$data.city = CityUtil.toString(this.trip.location);
    }

    private enableEditMode(): void {
        this.$emit('edit-trip', this.trip);
    }
}
</script>

<style lang="scss">
@import '../shared/lib';

#id {
    @include right_col($p-height);
}

#enable_edit {
    @include right_col($p-height);
}

#name {
    @include left_col($p-height);
}

#createdDate {
    @include left_col($p-height);
}

</style>
