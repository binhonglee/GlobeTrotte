<template lang="pug">
  .new_user.narrow_content
    h1.title Create Account
    form.newUser
      span.editLabel Email:
      el-input.editInput#username(
        type="text"
        v-on:keyup.enter="save"
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
      span.editLabel Confirm Password:
      el-input.editInput#confPassword(
        type="text"
        v-on:keyup.enter.native="confirm"
        v-model="confPassword"
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
      confPassword: "",
      loading: false,
    };
  },
})
export default class VRegsiter extends Vue {
  private confirm(): void {
    this.$data.loading = true;
    if (
      this.$data.password.localeCompare(
        this.$data.confPassword,
      )
    ) {
      this.$alert("Password does not match.", "Fail", {
        confirmButtonText: "OK",
      });
      this.$data.loading = false;
      return;
    }

    const newUser = new NewUser();
    newUser.register({
      email: this.$data.email,
      password: this.$data.password,
    });

    Axios.post(
      HTTPReq.getURI("user"),
      WingsStructUtil.stringify(newUser),
      {
        withCredentials: true,
      },
    )
      .then((res: AxiosResponse) => {
        const user = new User(res["data"]);
        if (user.ID === -1) {
          this.accountCreationFailed();
          return;
        }
        localStorage.setItem(
          "user",
          WingsStructUtil.stringify(user),
        );
        this.$data.loading = false;
        this.$notify({
          message: "Your account is created successfully!",
          title: "Success",
          type: "success",
        });

        this.$router.push({ path: "/myaccount" });
      })
      .catch(() => {
        this.accountCreationFailed();
      });
  }

  private accountCreationFailed(): void {
    this.$data.loading = false;
    this.$message.error("Invalid email. Please try again.");
  }

  private cancel(): void {
    this.$router.back();
  }
}
</script>

<style lang="scss">
@import "../shared/lib";

.newUser {
  @include trip_display();
}

#cancel {
  @include right_col($p-height);
}

#save {
  @include left_col($p-height);
}
</style>
