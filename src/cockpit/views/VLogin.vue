<template lang="pug">
  .login.narrow_content
    h1.title Login
    form.loginbox
      span.editLabel.loginEmailLabel Email:
      el-input.editInput.loginUsername(
        type="text"
        v-on:keyup.enter.native="confirm"
        v-model="email"
      )
      br
      span.editLabel.loginPasswordLabel Password:
      el-input.editInput.loginPassword(
        type="text"
        v-on:keyup.enter.native="confirm"
        v-model="password"
        show-password
      )
      br
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
import HTTPReq from "@/shared/HTTPReq";
import General from "@/shared/General";
import NewUser from "@/wings/NewUser";
import User from "@/wings/User";

interface Data {
  email: string;
  password: string;
  loading: boolean;
}

export default {
  data(): Data {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async confirm(): Promise<void> {
      this.$data.loading = true;
      const newUser = new NewUser();
      newUser.register({
        name: "",
        email: this.$data.email,
        password: this.$data.password,
      });

      const res = await HTTPReq.genPOST(
        "login",
        WingsStructUtil.stringify(newUser),
      );

      const user = new User(res);
      if (user.ID === -1) {
        this.$data.loading = false;
        this.$message({
          type: "error",
          message:
            "Wrong email or password. Please try again.",
        });
        return;
      }
      localStorage.setItem(
        "user",
        WingsStructUtil.stringify(user),
      );
      this.$data.loading = false;
      this.$notify(
        General.notifConfig(
          "Success",
          "You are now logged in.",
          "success",
        ),
      );

      this.$router.push("/");
    },
    cancel(): void {
      this.$router.back();
    },
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
