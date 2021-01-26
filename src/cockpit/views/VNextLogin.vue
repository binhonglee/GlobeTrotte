<template lang="pug">
  .login.narrow_content
    h1.title Login
    el-alert.tripPrivateAlertBar(
      v-if="showError"
      title="Please login to continue."
      type="error"
      :closable="false"
      show-icon
    )
    form.loginbox
      CEditItem.loginUsernameItem(
        label="Email"
        ref="email"
        className="loginUsername"
        @enter="confirm"
      )
      CEditItem(
        label="Password"
        ref="password"
        className="loginPassword"
        type="password"
        @enter="confirm"
      )
      br
      el-button.loginConfirm(
        type="primary"
        v-on:click="confirm"
        v-loading.fullscreen.lock="loading"
      ) Confirm
      el-button.loginCancel(
        type="default"
        v-on:click="cancel"
      ) Cancel
</template>

<script lang="ts">
import { WingsStructUtil } from "wings-ts-util";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import User from "@/wings/User";
import CEditItem from "@/components/CEditItem.vue";

interface Data {
  loading: boolean;
  showError: boolean;
}

export default {
  data(): Data {
    return {
      loading: false,
      showError: false,
    };
  },
  components: {
    CEditItem,
  },
  methods: {
    async confirm(): Promise<void> {
      this.$data.loading = true;
      const newUser = new NewUser();
      newUser.register({
        name: "",
        email: this.$refs.email.value,
        password: this.$refs.password.value,
      });

      const res = await HTTPReq.genPOST(
        this.$router,
        "login",
        WingsStructUtil.stringify(newUser),
      );

      const user = new User(res);
      if (user.ID === -1) {
        this.$data.loading = false;
        this.$message({
          type: "error",
          message: "Wrong email or password. Please try again.",
        });
        return;
      }
      localStorage.setItem("user", WingsStructUtil.stringify(user));
      this.$data.loading = false;
      this.$notify(
        General.notifConfig("Success", "You are now logged in.", "success"),
      );

      General.toNext(this);
    },
    cancel(): void {
      this.$router.back();
    },
  },
  beforeMount(): void {
    if (General.paramNext(this) !== "") {
      this.$data.showError = true;
    }
    this.$nextTick(function () {
      this.$refs.email.$refs.input.focus();
    });
  },
};
</script>

<style lang="scss">
@import "../shared/lib";

.loginbox {
  @include trip_display();
}

.loginCancel {
  @include right_col($p-height);
}

.loginConfirm {
  @include left_col($p-height);
}
</style>
