<template lang="pug">
  .my_account
    h1.title My Account
    el-link.unconfirmedEmailLink(href="/unconfirmed/email" :underline="false")
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
        CEditItem(label="Name" ref="name" :val="user.name")
        CEditItem(label="Email" ref="email" :val="user.email")
        CEditItem(label="Bio" type="textarea" ref="bio" :val="user.bio")
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
import CEditItem from "@/components/CEditItem.vue";
import CViewUser from "@/components/CViewUser.vue";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import User from "@/wings/User";
import { WingsStructUtil } from "wings-ts-util";

interface Data {
  user: User;
  edit: boolean;
  confirmed: boolean;
}

export default {
  components: {
    CEditItem,
    CViewUser,
  },
  data(): Data {
    return {
      user: new User(),
      edit: false,
      confirmed: true,
    };
  },
  methods: {
    async deleteAccount(): Promise<void> {
      const deletion = await HTTPReq.genDELETE(
        this.$router,
        "user/" + this.$data.user.ID,
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
        await General.genRedirectTo(this.$router, "/");
      } else {
        this.$message({
          type: "error",
          message: "Account deletion attempt failed.",
        });
      }
    },
    async save(): Promise<void> {
      this.$data.user.name = this.$refs.name.value;
      this.$data.user.email = this.$refs.email.value;
      this.$data.user.bio = this.$refs.bio.value;
      const success = await HTTPReq.genPOST(
        this.$router,
        "user/" + this.$data.user.ID,
        WingsStructUtil.stringify(this.$data.user),
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
      await HTTPReq.genGET(this.$router, "logout");
      localStorage.clear();
      await General.genRedirectTo(this.$router, "/");
    },
    toggleEdit(): void {
      this.$data.edit = !this.$data.edit;
      if (this.$data.edit) {
        this.$nextTick(function () {
          this.$refs.name.$refs.input.focus();
        });
      }
    },
  },
  async beforeMount(): Promise<void> {
    this.$data.user = await General.genCurrentUser();
    this.$data.confirmed = this.$data.user.confirmed;
  },
};
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
  margin-top: 20px;
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
