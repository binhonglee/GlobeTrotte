<template lang="pug">
  .get_user.narrow_content
    h1.title {{ user.details.name }}
    .profile_info
      CViewUser(:user="user" :showName="false")
</template>

<script lang="ts">
import CViewUser from "@/components/CViewUser.vue";
import General from "@/shared/General";
import UserObj from "@/wings/UserObj";
import Routes from "@/routes";

interface Data {
  user: UserObj;
}

export default {
  components: {
    CViewUser,
  },
  data: (): Data => ({
    user: new UserObj(),
  }),
  methods: {
    async init(): Promise<void> {
      if (General.paramID(this) === undefined) {
        this.$data.user.details.name = "";
        return;
      }

      this.$data.user = await General.genUserV2(
        this.$router,
        Number(General.paramID(this)),
      );

      if (this.$data.user.ID === -1) {
        await this.$alert("User not found.", "Error", {
          confirmButtonText: "OK",
        });
        await General.genRedirectTo(this.$router, Routes.Landing);
      }

      const isCurrentUser = General.getIsCurrentUser(this.$data.user.ID);
      if (isCurrentUser) {
        await General.genRedirectTo(this.$router, Routes.MyAccount);
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
