<template lang="pug">
  .my_account.narrow_content
    h1.title My Account
    h2#name {{ user.name }}
    span#id ID: {{ user.ID }}
    p#email Email: {{ user.email }}
    p#bio Bio:
    |    {{ user.bio }}
    el-button#delete(type="danger" v-on:click="deleteAccount") Delete Account
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import General from "shared/General";
import HTTPReq from "shared/HTTPReq";
import User from "wings/User";

@Component({
  data() {
    return {
      user: User,
    };
  },
})
export default class VMyAccount extends Vue {
  private async beforeMount(): Promise<void> {
    this.$data.user = General.getCurrentUser();
  }

  private async deleteAccount(): Promise<void> {
    const deletion = await HTTPReq.genDELETE(
      "user/" + this.$data.user.ID,
    );
    console.log(deletion);

    if (deletion) {
      localStorage.clear();
      this.$router.push("/");
    } else {
      this.$message.error(
        "Account deletion attempt failed.",
      );
    }
  }
}
</script>

<style></style>
