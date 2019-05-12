<template lang="pug">
    .view_trip
        h2#name {{ trip.name }}
        span#id {{ trip.id }}
        p#description(v-if="trip.description !== ''") {{ trip.description }}
        CPlaces(v-if="trip.places.length !== 0" :locations='trip.places')
        p#city {{ city }}
        p#creatorInfo Author: {{ trip.userId }}
        p#createdDate Created on: {{ trip.timeCreated.toLocaleDateString() }}
        el-button#enable_edit(v-if='editable === true' v-on:click='enableEditMode') Edit
</template>

<script lang="ts" src="./CViewTrip.ts" />

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
