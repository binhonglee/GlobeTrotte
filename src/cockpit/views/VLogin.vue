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
import { Component, Vue } from "vue-property-decorator";
import { WingsStructUtil } from "wings-ts-util";
import Axios, { AxiosResponse } from "axios";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import User from "@/wings/User";

@Component({
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
})
export default class VLogin extends Vue {
  private confirm(): void {
    this.$data.loading = true;
    const newUser = new NewUser();
    newUser.register({
      email: this.$data.email,
      password: this.$data.password,
    });

    Axios.post(
      HTTPReq.getURI("login"),
      WingsStructUtil.stringify(newUser),
      {
        withCredentials: true,
      },
    )
      .then((res: AxiosResponse) => {
        const user = new User(res["data"]);
        if (user.ID === -1) {
          this.failLogin();
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
        });

        this.$router.push({ path: "/" });
      })
      .catch(() => {
        this.failLogin();
      });
  }

  private failLogin(): void {
    this.$data.loading = false;
    this.$message.error(
      "Wrong email or password. Please try again.",
    );
  }

  private cancel(): void {
    this.$router.back();
  }
}
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
