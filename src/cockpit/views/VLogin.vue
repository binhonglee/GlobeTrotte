<template lang="pug">
  .login.narrow_content
    h1.title Login
    form.loginbox
      span.editLabel Email:
      el-input.editInput#username(
        type="text"
        v-on:keyup.enter.native="confirm"
        v-model="email"
      )
      br
      span.editLabel Password:
      el-input.editInput#password(
        type="text"
        v-on:keyup.enter.native="confirm"
        v-model="password"
        show-password
      )
      br
      br
      el-button#save(
        type="primary"
        v-on:click="confirm"
        v-loading.fullscreen.lock="loading"
      ) Confirm
      el-button#cancel(
        type="default"
        v-on:click="cancel"
      ) Cancel
</template>

<script lang="ts">
import { WingsStructUtil } from "wings-ts-util";
import Axios from "axios";
import HTTPReq from "@/shared/HTTPReq";
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
        email: this.$data.email,
        password: this.$data.password,
      });

      const res = await Axios.post(
        HTTPReq.getURI("login"),
        WingsStructUtil.stringify(newUser),
        {
          withCredentials: true,
        },
      );

      const user = new User(res["data"]);
      if (user.ID === -1) {
        this.$data.loading = false;
        this.$message.error(
          "Wrong email or password. Please try again.",
        );
        return;
      }
      localStorage.setItem(
        "user",
        WingsStructUtil.stringify(user),
      );
      this.$data.loading = false;
      this.$notify({
        message: "You are now logged in.",
        title: "Success",
        type: "success",
        duration: 2000,
      });

      this.$router.push({ path: "/" });
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

#cancel {
  @include right_col($p-height);
}

#save {
  @include left_col($p-height);
}
</style>
