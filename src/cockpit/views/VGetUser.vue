<template lang="pug">
  .get_user.narrow_content
    h1.title {{ user.name }}
    .profile_info
      CViewUser(:user="user" :showName="false")
</template>

<script lang="ts">
import CViewUser from "@/components/CViewUser.vue";
import User from "@/wings/User";
import General from "@/shared/General";

interface Data {
  user: User;
}

export default {
  components: {
    CViewUser,
  },
  data: (): Data => ({
    user: new User(),
  }),
  methods: {
    async init(): Promise<void> {
      if (General.paramID(this) === undefined) {
        this.$data.user.name = "";
        return;
      }

      this.$data.user = await General.genUser(
        Number(General.paramID(this)),
      );

      if (this.$data.user.ID === -1) {
        this.$alert("User not found.", "Error", {
          confirmButtonText: "OK",
        });
        return;
      }

      const isCurrentUser = General.getIsCurrentUser(
        this.$data.user.ID,
      );
      if (isCurrentUser) {
        this.$router.push("/myaccount");
      }
      return;
    },
  },
  async beforeMount(): Promise<void> {
    await this.init();
  },
};
</script>

<style lang="scss">
@import "../shared/lib";

.profile_info {
  @include trip_display();
}
</style>
