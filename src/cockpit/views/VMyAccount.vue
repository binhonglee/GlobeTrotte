<template lang="pug">
  .my_account.narrow_content
    h1.title My Account
    .profile_info
      div(v-if="!edit")
        CViewUser(:user="user")
        div.buttonGroups
          el-button#logout(
            type="danger" v-on:click="logout"
          ) Logout
          el-button#edit(
            tabindex="0"
            type="default"
            ref="edit"
            v-on:click="toggleEdit"
          ) Edit
      div(v-else)
        CEditItem(
          :label="'Name'"
          :val="user.name"
          v-bind:key="'name'"
          v-bind:ref="'name'"
          :autofocus="true"
        )
        CEditItem(
          :label="'Email'"
          :val="user.email"
          v-bind:key="'email'"
          ref="email"
        )
        CEditItem(
          :label="'Bio'"
          :val="user.bio"
          :large="true"
          v-bind:key="'bio'"
          ref="bio"
        )
        div.buttonGroups
          el-button#save(
            type="primary" v-on:click="save"
          ) Save
          el-button#cancel(
            type="default"
            ref="cancel"
            v-on:click="toggleEdit"
          ) Cancel
        div.deletion
          el-button#deleteUser(
            type="danger" v-on:click="deleteAccount"
          ) Delete Account
          el-button(
            style="hidden: true"
            v-if="false" v-on:click="magic"
          )
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
    };
  },
  methods: {
    async deleteAccount(): Promise<void> {
      const deletion = await HTTPReq.genDELETE(
        "user/" + this.$data.user.ID,
      );

      if (deletion) {
        localStorage.clear();
        this.$notify({
          message: "Your account is now deleted.",
          title: "Deleted",
          type: "info",
          duration: 2000,
        });
        this.$router.push("/");
      } else {
        this.$message.error(
          "Account deletion attempt failed.",
        );
      }
    },
    async save(): Promise<void> {
      this.$data.user.name = this.$refs.name.value;
      this.$data.user.email = this.$refs.email.value;
      this.$data.user.bio = this.$refs.bio.value;
      const success = await HTTPReq.genPOST(
        "user/" + this.$data.user.ID,
        WingsStructUtil.stringify(this.$data.user),
      );

      if (success) {
        this.toggleEdit();
        this.$message.success(
          "Profile updated successfully!",
        );
      } else {
        this.$alert(
          "Save was unsuccessful. Please try again later.",
          "Fail",
          {
            confirmButtonText: "OK",
          },
        );
      }
    },
    async logout(): Promise<void> {
      await HTTPReq.genGET("logout");
      localStorage.clear();
      this.$router.push("/");
    },
    toggleEdit(): void {
      this.$data.edit = !this.$data.edit;
    },
    magic(): void {
      this.$message.success(
        "Shh... This is not yet implemented",
      );
    },
  },
  async beforeMount(): Promise<void> {
    this.$data.user = await General.genCurrentUser();
  },
};
</script>

<style lang="scss">
@import "../shared/lib";

.deletion {
  display: inline-block;
  width: 100%;
}

.buttonGroups {
  margin-top: 20px;
  display: inline-block;
  width: 100%;
  text-align: left;
}

.profile_info {
  @include trip_display();
}

#logout,
#save {
  @include left_col($p-height);
}

#cancel,
#deleteUser,
#edit {
  @include right_col($p-height);
}

#deleteUser {
  width: 100%;
  margin-top: 10px;
}
</style>
