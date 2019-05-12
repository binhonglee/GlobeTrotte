<template lang="pug">
    .places
        ul#places(v-if="locations !== null") Places: 
            div#place(v-for="place in locations" v-bind:key="place.url")
                a(target="_blank" rel="noopener noreferrer" :href="place.url") {{ place.label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CPlaces extends Vue {
    @Prop() private locations!: object;
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
