<template lang="pug">
.get_user
  h1.title {{ user.details.name }}
  .profile_info
    CViewUser(:user="user" :showName="false")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CViewUser from "@/components/CViewUser.vue";
import General from "@/shared/General";
import UserObj from "@/wings/UserObj";
import Routes from "@/routes";
import Routing from "@/shared/Routing";

interface Data {
  user: UserObj;
}

export default defineComponent({
  components: {
    CViewUser,
  },
  data: (): Data => ({
    user: new UserObj(),
  }),
  async beforeMount(): Promise<void> {
    if (General.paramID() === undefined) {
      await Routing.genRedirectTo(Routes.NotFound);
      return;
    }

    this.$data.user = await General.genUser(Number(General.paramID()));

    if (this.$data.user.ID === -1) {
      await this.$alert("User not found.", "Error", {
        confirmButtonText: "OK",
      });
      await Routing.genRedirectTo(Routes.Landing);
      return;
    }

    if (General.getIsCurrentUser(this.$data.user.ID.valueOf())) {
      await Routing.genRedirectTo(Routes.MyAccount);
    }

    this.$data.user.details.bio = this.$data.user.details.bio.replaceAll(
      "\\\\n",
      "\n",
    );
  },
});
</script>

<style lang="scss" scoped>
@import "../shared/lib";

.profile_info {
  text-align: left;
}
</style>
