<template lang="pug">
.logout
</template>

<script lang="ts">
import Routes from "@/routes";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import NaiveUtils from "@/shared/NaiveUtils";
import Routing from "@/shared/Routing";
import { defineComponent } from "vue";

interface Data {
  showDialog: boolean;
}

export default defineComponent({
  data: (): Data => ({
    showDialog: false,
  }),
  async beforeMount(): Promise<void> {
    NaiveUtils.init();
    const currentUser = await General.genCurrentUser();
    if (currentUser.ID < 0) {
      await Routing.genRedirectTo(Routes.Landing);
      return;
    }
    NaiveUtils.dialogError({
      title: "Logout",
      content: "Are you sure you want to logout?",
      positiveText: "Logout",
      negativeText: "Cancel",
      onPositiveClick: async () => {
        await this.logout();
      },
      onNegativeClick: () => {
        history.back();
      },
    });
  },
  methods: {
    async logout(): Promise<void> {
      await HTTPReq.genGET("logout");
      // Clear all the localStorage on logout because its all based on current
      // user's privacy settings.
      localStorage.clear();
      NaiveUtils.messageSuccess("You are now logged out.");
      await Routing.genRedirectTo(Routes.Landing);
    },
  },
});
</script>
