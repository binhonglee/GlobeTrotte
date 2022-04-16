<template lang="pug">
.get_user
  CHead(
    :title="user.details.name.valueOf()"
    :description="user.details.bio.valueOf()"
    type="profile"
  )
  .narrow_content.accountUnconfirmedAlertBar(
    v-if="self && !user.details.confirmed"
  )
    CLink.unconfirmedEmailLink(
      :url="unconfirmedLink"
      :underline="'never'"
    )
      n-alert(
        title="Unconfirmed" type="error"
      ) Please confirm you email address to access the full site.
  CLoadingViewUser(v-if="user.ID === -1")
  .userinfo(v-else)
    h1.title {{ user.details.name }}
    .profile_info
      CViewUser(
        v-if="!edit"
        :user="user" :showName="false" :self="self"
        @logout="logout" @toggleEdit="toggleEdit"
      )
      .narrow_content(v-else)
        CEditItem(label="Name" ref="name" :val="user.details.name.valueOf()")
        CEditItem(
          label="Username" ref="username"
          :val="user.details.username.valueOf()" placeholder="Set a username"
        )
        CEditItem(label="Email" ref="email" :val="user.details.email.valueOf()")
        CEditItem(label="Link" ref="link" :val="user.details.link.valueOf()")
        CEditItem(
          label="Bio" type="textarea" ref="bio"
          :val="user.details.bio.valueOf()" :row-min-count="3"
          :val-max-count="1000"
        )
        div.myAccountButtonGroups
          n-button.myAccountSave.left_col(type="info" @click="save") Save
          n-button.myAccountCancel.right_col(
            type="default"
            ref="cancel"
            @click="toggleEdit"
          ) Cancel
        div.myAccountDeletion
          n-button.myAccountDelete(
            type="error" @click="confirmDelete"
          ) Delete Account
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NAlert, NButton } from "naive-ui";

import CEditItem from "@/components/CEditItem.vue";
import CHead from "@/components/CHead.vue";
import CLink from "@/components/CLink.vue";
import CLoadingViewUser from "@/components/loading/CLoadingViewUser.vue";
import CViewUser from "@/components/CViewUser.vue";
import Routes from "@/routes";
import General from "@/shared/General";
import Routing from "@/shared/Routing";
import UserObj from "@/wings/UserObj";
import HTTPReq from "@/shared/HTTPReq";
import NaiveUtils from "@/shared/NaiveUtils";
import { WingsStructUtil } from "wings-ts-util";
import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";
import E from "@/shared/E";
import UserBasic from "@/wings/UserBasic";

interface Data {
  user: UserObj;
  edit: boolean;
  self: boolean;
  unconfirmedLink: string;
  loadingBar: LoadingBarApiInjection | null;
}

export default defineComponent({
  components: {
    CEditItem,
    CHead,
    CLink,
    CLoadingViewUser,
    CViewUser,
    NAlert,
    NButton,
  },
  data: (): Data => ({
    user: new UserObj(),
    edit: false,
    self: false,
    unconfirmedLink: Routes.unconfirmed_Email,
    loadingBar: General.loadingBar(),
  }),
  async beforeMount(): Promise<void> {
    await this.init();
  },
  methods: {
    async init(): Promise<void> {
      NaiveUtils.init();
      const paramID = General.paramID();
      if (paramID === undefined) {
        await Routing.genRedirectTo(Routes.NotFound);
        return;
      }
      if (isNaN(Number(paramID))) {
        this.$data.user = await General.genFromUsername(paramID);
      } else {
        const user = await General.genUser(Number(paramID));
        this.$data.user = user;
        if (user.details.username !== "") {
          await Routing.genRedirectTo(
            Routes.User + "/" + user.details.username,
          );
        }
      }

      if (this.$data.user.ID === -1) {
        await this.$alert("User not found.", "Error", {
          confirmButtonText: "OK",
        });
        await Routing.genRedirectTo(Routes.Landing);
        return;
      }

      this.$data.self = General.getIsCurrentUser(this.$data.user.ID.valueOf());
      // if (General.getIsCurrentUser(this.$data.user.ID.valueOf())) {
      //   await Routing.genRedirectTo(Routes.MyAccount);
      // }

      this.$data.user.details.bio = this.$data.user.details.bio.replaceAll(
        "\\\\n",
        "\n",
      );
    },
    confirmDelete(): void {
      NaiveUtils.dialogWarning({
        title: "Delete account",
        content:
          "Are you sure you want to delete this account? All trips owned by this account will also be deleted. THIS PROCESS IS IRREVERSIBLE.",
        positiveText: "Confirm",
        negativeText: "Cancel",
        onPositiveClick: async () => {
          await this.deleteAccount();
        },
      });
    },
    async deleteAccount(): Promise<void> {
      this.$data.loadingBar?.start();
      const deletion = await HTTPReq.genDELETE(
        "v2/user/" + this.$data.user.ID,
        WingsStructUtil.stringify(this.$data.user.details),
      );

      if (deletion) {
        localStorage.clear();
        this.$notify(
          General.notifConfig(
            "Deleted",
            "Your account is now deleted.",
            "info",
          ),
        );
        this.$data.loadingBar?.finish();
        await Routing.genRedirectTo(Routes.Landing);
      } else {
        this.$data.loadingBar?.error();
        this.$message({
          type: "error",
          message: "Account deletion attempt failed.",
        });
      }
    },
    async save(): Promise<void> {
      this.$data.loadingBar?.start();
      const user = new UserBasic({
        id: this.$data.user.ID,
        name: E.getVal(this, "name"),
        email: E.getVal(this, "email"),
        bio: E.getVal(this, "bio")
          .replaceAll("\\t", "\t")
          .replaceAll("\t", "")
          .replaceAll("\n", "\\\\n")
          .replaceAll("\\", "\\\\"),
        link: E.getVal(this, "link"),
        username: E.getVal(this, "username"),
        confirmed: this.$data.user.details.confirmed,
      });
      const success = await HTTPReq.genPOST(
        "v2/user/" + this.$data.user.ID,
        WingsStructUtil.stringify(user),
      );

      if (success !== false) {
        this.toggleEdit();
        this.$data.loadingBar?.finish();
        this.$message({
          message: "Profile updated successfully!",
          type: "success",
        });
        await this.init();
      } else {
        this.$data.loadingBar?.error();
        this.$alert("Save was unsuccessful. Please try again later.", "Fail", {
          confirmButtonText: "OK",
        });
      }
    },
    async logout(): Promise<void> {
      await HTTPReq.genGET("logout");
      localStorage.clear();
      NaiveUtils.messageSuccess("You are now logged out.");
      await Routing.genRedirectTo(Routes.Landing);
    },
    toggleEdit(): void {
      this.$data.edit = !this.$data.edit;
    },
  },
});
</script>

<style scoped>
.profile_info {
  text-align: left;
}

.accountUnconfirmedAlertBar {
  text-align: left;
  padding: 10px;
}

.myAccountDeletion {
  display: inline-block;
  width: 100%;
}

.myAccountButtonGroups {
  padding-top: 10px;
}

.myAccountDelete {
  width: 100%;
  margin-top: 10px;
}
</style>
