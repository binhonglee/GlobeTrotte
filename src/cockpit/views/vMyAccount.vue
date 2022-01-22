<template lang="pug">
.my_account
  h1.title My Account
  .narrow_content.accountUnconfirmedAlertBar
    CLink.unconfirmedEmailLink(
      :url="unconfirmedLink"
      :underline="'never'"
    )
      n-alert(
        v-if="!confirmed"
        title="Unconfirmed"
        type="error"
      ) Please confirm you email address to access the full site.
  .profileInfo
    div(v-if="!edit")
      CViewUser(
        :user="user" :self="true"
        @logout="logout" @toggleEdit="toggleEdit"
      )
    .narrow_content(v-else)
      CEditItem(label="Name" ref="name" :val="user.details.name.valueOf()")
      CEditItem(label="Email" ref="email" :val="user.details.email.valueOf()")
      CEditItem(label="Link" ref="link" :val="user.details.link.valueOf()")
      CEditItem(
        label="Bio" type="textarea" ref="bio"
        :val="user.details.bio.valueOf()" :row-min-count="3"
        :val-max-count="1000"
      )
      div.myAccountButtonGroups
        n-button.myAccountSave(type="info" @click="save") Save
        n-button.myAccountCancel(
          type="default"
          ref="cancel"
          @click="toggleEdit"
        ) Cancel
      div.myAccountDeletion
        n-button.myAccountDelete(
          type="error" @click="deleteAccount"
        ) Delete Account
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CEditItem from "@/components/CEditItem.vue";
import CLink from "@/components/CLink.vue";
import CViewUser from "@/components/CViewUser.vue";
import General from "@/shared/General";
import E from "@/shared/E";
import HTTPReq from "@/shared/HTTPReq";
import Routing from "@/shared/Routing";
import UserBasic from "@/wings/UserBasic";
import UserObj from "@/wings/UserObj";
import Routes from "@/routes";
import { WingsStructUtil } from "wings-ts-util";
import { NAlert, NButton } from "naive-ui";
import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";

interface Data {
  user: UserObj;
  edit: boolean;
  confirmed: boolean;
  loading: boolean;
  unconfirmedLink: string;
  loadingBar: LoadingBarApiInjection | null;
}

export default defineComponent({
  components: {
    CEditItem,
    CLink,
    CViewUser,
    NAlert,
    NButton,
  },
  data(): Data {
    return {
      user: new UserObj(),
      edit: false,
      confirmed: true,
      loading: false,
      unconfirmedLink: Routes.unconfirmed_Email,
      loadingBar: General.loadingBar(),
    };
  },
  beforeMount(): void {
    this.init();
  },
  mounted(): void {
    if (this.$data.edit) {
      E.get(E.get(this, "name"), "input").focus();
    }
  },
  methods: {
    async init(): Promise<void> {
      this.$data.loading = true;
      this.$data.user = await General.genCurrentUser();
      this.$data.user.details.bio = this.$data.user.details.bio.replaceAll(
        "\\n",
        "\n",
      );
      if (this.$data.user.ID === -1) {
        await Routing.genRedirectTo(Routes.Landing);
      }
      this.$data.confirmed = this.$data.user.details.confirmed.valueOf();
      this.$data.loading = false;
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
        this.init();
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
      await Routing.genRedirectTo(Routes.Landing);
    },
    toggleEdit(): void {
      this.$data.edit = !this.$data.edit;
    },
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.accountUnconfirmedAlertBar {
  text-align: left;
  padding: 10px;
}

.unconfirmedEmailLink {
  width: 100%;
}

.myAccountDeletion {
  display: inline-block;
  width: 100%;
}

.profileInfo {
  text-align: left;
}

.myAccountButtonGroups {
  padding-top: 10px;
}

.myAccountLogout,
.myAccountSave {
  @include left_col($p-height);
}

.myAccountCancel,
.myAccountDeleteUser,
.myAccountEdit {
  @include right_col($p-height);
}

.myAccountDelete {
  width: 100%;
  margin-top: 10px;
}
</style>
