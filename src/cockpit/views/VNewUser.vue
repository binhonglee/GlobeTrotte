<template lang="pug" src="./VNewUser.pug" />

<script lang="ts" src="./VNewUser.ts" />

<style lang="scss">
@import '../shared/lib';

.newUser {
    @include trip_display();
}

#cancel {
    @include right_col($p-height);
}

#save {
    @include left_col($p-height);
}
</style>
