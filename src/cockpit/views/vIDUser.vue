<template lang="pug">
  .get_user
    h1.title {{ user.details.name }}
    .profile_info
      CViewUser(:user="user" :showName="false")
</template>

<script lang="ts">
import CViewUser from "@/components/CViewUser.vue";
import General from "@/shared/General";
import UserObj from "@/wings/UserObj";
import Routes from "@/routes";
import R from "@/shared/R";

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
  async beforeMount(): Promise<void> {
    if (General.paramID(this) === undefined) {
      await R.genRedirectTo(this, Routes.NotFound);
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
      await R.genRedirectTo(this, Routes.Landing);
    }

    if (General.getIsCurrentUser(this.$data.user.ID)) {
      await R.genRedirectTo(this, Routes.MyAccount);
    }
  },
};
</script>

<style lang="scss">
@import "../shared/lib";

.profile_info {
  @include trip_display();
}
</style>
