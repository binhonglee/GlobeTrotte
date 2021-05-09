<template lang="pug">
  .my_account
    h1.title My Account
    el-link.unconfirmedEmailLink(:href="unconfirmedLink" :underline="false")
      el-alert.narrow_content.accountUnconfirmedAlertBar(
        v-if="!confirmed"
        title="Unconfirmed"
        description="Please confirm you email address to access the full site."
        type="error"
        :closable="false"
        show-icon
      )
    .profileInfo
      div(v-if="!edit")
        CViewUser(:user="user")
        .narrow_content
          .myAccountButtonGroups
            el-button.myAccountLogout(
              type="danger" v-on:click="logout"
            ) Logout
            el-button.myAccountEdit(
              tabindex="0" type="default" ref="edit" v-on:click="toggleEdit"
            ) Edit
      .narrow_content(v-else)
        CEditItem(label="Name" ref="name" :val="user.details.name")
        CEditItem(label="Email" ref="email" :val="user.details.email")
        CEditItem(label="Bio" type="textarea" ref="bio" :val="user.details.bio")
        div.myAccountButtonGroups
          el-button.myAccountSave(type="primary" v-on:click="save") Save
          el-button.myAccountCancel(
            type="default"
            ref="cancel"
            v-on:click="toggleEdit"
          ) Cancel
        div.myAccountDeletion
          el-button.myAccountDelete(
            type="danger" v-on:click="deleteAccount"
          ) Delete Account
          el-button(style="hidden: true" v-if="false")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CEditItem from "@/components/CEditItem.vue";
import CViewUser from "@/components/CViewUser.vue";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import UserBasic from "@/wings/UserBasic";
import UserObj from "@/wings/UserObj";
import Routes from "@/routes";
import { WingsStructUtil } from "wings-ts-util";
import Routing from "@/shared/Routing";
import E from "@/shared/E";

interface Data {
  user: UserObj;
  edit: boolean;
  confirmed: boolean;
  unconfirmedLink: string;
}

export default defineComponent({
  components: {
    CEditItem,
    CViewUser,
  },
  data(): Data {
    return {
      user: new UserObj(),
      edit: false,
      confirmed: true,
      unconfirmedLink: Routes.unconfirmed_Email,
    };
  },
  methods: {
    async deleteAccount(): Promise<void> {
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
        await Routing.genRedirectTo(Routes.Landing);
      } else {
        this.$message({
          type: "error",
          message: "Account deletion attempt failed.",
        });
      }
    },
    async save(): Promise<void> {
      const user = new UserBasic({
        id: this.$data.user.ID,
        name: E.getVal(this, "name"),
        email: E.getVal(this, "email"),
        bio: E.getVal(this, "bio"),
        confirmed: this.$data.user.details.confirmed,
      });
      const success = await HTTPReq.genPOST(
        "v2/user/" + this.$data.user.ID,
        WingsStructUtil.stringify(user),
      );

      if (success) {
        this.toggleEdit();
        this.$message({
          message: "Profile updated successfully!",
          type: "success",
        });
      } else {
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
      if (this.$data.edit) {
        this.$nextTick(function () {
          E.get(E.get(this, "name"), "input").focus();
        });
      }
    },
  },
  async beforeMount(): Promise<void> {
    this.$data.user = await General.genCurrentUser();
    if (this.$data.user.ID === -1) {
      await Routing.genRedirectTo(Routes.Landing);
    }
    this.$data.confirmed = this.$data.user.details.confirmed.valueOf();
  },
});
</script>

<style lang="scss">
@import "../shared/lib";

.accountUnconfirmedAlertBar {
  text-align: left;
  padding: 10px;
}

.unconfirmedEmailLink,
.unconfirmedEmailLink .el-link--inner {
  width: 100%;
}

.myAccountDeletion {
  display: inline-block;
  width: 100%;
}

.myAccountButtonGroups {
  margin-top: 10px;
  display: inline-block;
  width: 100%;
  text-align: left;
}

.profileInfo {
  @include trip_display();
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
