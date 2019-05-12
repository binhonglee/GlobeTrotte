<template lang="pug">
    .new_trip
        h1.title New Trip
        CEditTrip.newTrip(:trip='trip' @save='save' @cancel='cancel')
</template>

<script lang="ts" src="./VNewTrip.ts" />

<style lang="scss">
@import '../shared/lib';

.newTrip {
    @include trip_display();
}
</style>
