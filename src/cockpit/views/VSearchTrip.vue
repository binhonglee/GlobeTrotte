<template lang="pug">
    .search
        h1.title Trip
        |     Trip ID:
        el-input.tripSearchInput#getTripID(type='text' v-on:keyup.enter='gotoTrip' v-model='inputID' autofocus='')
        el-button.tripSearchInput(v-on:click='gotoTrip') Find
        CTripInfo(v-if="trip.name !== ''" :trip='trip' :editable='owner')
</template>

<script lang="ts" src="./VSearchTrip.ts" />

<style lang="scss">
@import '../shared/lib';

.tripSearchInput {
    margin-left: 5px;
    display: inline;
}
#getTripID {
    width: 50px;
}
</style>
