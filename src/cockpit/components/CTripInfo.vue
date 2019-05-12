<template lang="pug">
    .trip_info
        div(v-if="!editMode")
            CViewTrip(:trip='trip' :editable='editable' @edit-trip='enableEditMode')
        div(v-else)
            CEditTrip(:trip='trip' @save='save' @cancel='cancel')
</template>

<script lang="ts" src="./CTripInfo.ts" />

<style lang="scss">
@import '../shared/lib';

.trip_info {
    @include trip_display();
}
</style>
