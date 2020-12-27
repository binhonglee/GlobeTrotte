<template lang="pug">
  .new_user.narrow_content
    h1.title Create Account
    form.newUser
      span.editLabel Name:
      el-input.editInput.registrationName(
        type="text"
        v-on:keyup.enter="save"
        v-model="name"
      )
      br
      span.editLabel Email:
      el-input.editInput.registrationEmail(
        type="text"
        v-on:keyup.enter="save"
        v-model="email"
      )
      br
      span.editLabel Password:
      el-input.editInput.registrationPassword(
        type="text"
        v-on:keyup.enter.native="confirm"
        v-model="password"
        show-password
      )
      br
      span.editLabel Confirm Password:
      el-input.editInput.registrationConfPassword(
        type="text"
        v-on:keyup.enter.native="confirm"
        v-model="confPassword"
        show-password
      )
      br
      br
      el-button.registrationSave(
        type="primary"
        v-on:click="confirm"
        v-loading.fullscreen.lock="loading"
      ) Confirm
      el-button.registrationCancel(
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
import General from '@/shared/General';

interface Data {
  name: string;
  email: string;
  password: string;
  confPassword: string;
  loading: boolean;
}

export default {
  data(): Data {
    return {
      name: "",
      email: "",
      password: "",
      confPassword: "",
      loading: false,
    };
  },
  methods: {
    async confirm(): Promise<void> {
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
        name: this.$data.name,
        email: this.$data.email,
        password: this.$data.password,
      });

      const res = await Axios.post(
        HTTPReq.getURI("user"),
        WingsStructUtil.stringify(newUser),
        {
          withCredentials: true,
        },
      );

      const user = new User(res["data"]);
      if (user.ID === -1) {
        this.$data.loading = false;
        this.$message.error(
          "Invalid email. Please try again.",
        );
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
          "Your account is created successfully!",
          "success",
        ),
      );

      this.$router.push({ path: "/myaccount" });
    },
    cancel(): void {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
@import "../shared/lib";

.newUser {
  @include trip_display();
}

.registrationCancel {
  @include right_col($p-height);
}

.registrationSave {
  @include left_col($p-height);
}
</style>
