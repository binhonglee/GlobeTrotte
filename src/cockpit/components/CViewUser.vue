<template lang="pug">
  .view_user
    div.user_info
      h2#name {{ user.name }}
      span#id ID: {{ user.ID }}
      p#email
        strong Email:
        br
        | {{ user.email }}
      p#bio(v-if="user.bio !== ''")
        strong Bio:
        br
        | {{ user.bio }}
    div.trips(v-if="user.trips.length > 0")
      h2 Trips
      a(
        v-for="trip in user.trips"
        v-bind:href="'trip/view/' + trip"
      ) {{ trip }}
</template>

<script lang="ts">
import Vue from "vue";
import User from "@/wings/User";

export default Vue.extend({
  name: "CViewUser",
  props: {
    user: {
      type: User,
    },
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.trips,
.user_info {
  text-align: left;
}
</style>
