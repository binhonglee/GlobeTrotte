<template lang="pug">
    .edit_trip
        CEditItem(v-for="item in items" @save='save' :item='item' v-bind:key='item.type')
        span.editLabel City:
        el-select.editInput(v-model='value' placeholder='Select')
            el-option(v-for='item in cities' :key='item.key' :label='item.label' :value='item.key')
        CEditPlaces(:places='places')
        div.confirmationButtons
            el-button#save(type='primary' v-on:click='save') Save
            el-button#cancel(type='danger' v-on:click='cancel') Cancel
</template>

<script lang="ts" src="./CEditTrip.ts" />

<style lang="scss">
@import '../shared/lib';

.confirmationButtons {
    display: inline-block;
    width: 100%;
}

#cancel {
    @include right_col($p-height);
}

#save {
    @include left_col($p-height);
}
</style>
