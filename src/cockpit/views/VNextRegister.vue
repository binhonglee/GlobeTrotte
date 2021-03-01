<template lang="pug">
  .new_user.narrow_content
    h1.title Create Account
    form.newUser
      CEditItem(
        className="registrationName"
        label="Name"
        ref="name"
        @enter="confirm"
      )
      CEditItem(
        className="registrationEmail"
        label="Email"
        ref="email"
        @enter="confirm"
      )
      CEditItem(
        className="registrationPassword"
        label="Password"
        ref="password"
        type="password"
        @enter="confirm"
      )
      CEditItem(
        className="registrationConfPassword"
        label="Confirm Password"
        ref="confPassword"
        type="password"
        @enter="confirm"
      )
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
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import UserObj from "@/wings/UserObj";
import CEditItem from "@/components/CEditItem.vue";
import Routes from "@/routes";

interface Data {
  loading: boolean;
}

export default {
  data(): Data {
    return {
      loading: false,
    };
  },
  components: {
    CEditItem,
  },
  methods: {
    async confirm(): Promise<void> {
      this.$data.loading = true;
      if (
        this.$refs.password.value.localeCompare(this.$refs.confPassword.value)
      ) {
        this.$alert("Password does not match.", "Fail", {
          confirmButtonText: "OK",
        });
        this.$data.loading = false;
        return;
      }

      const newUser = new NewUser();
      newUser.register({
        name: this.$refs.name.value,
        email: this.$refs.email.value,
        password: this.$refs.password.value,
      });

      const res = await HTTPReq.genPOST(
        this.$router,
        "v2/user",
        WingsStructUtil.stringify(newUser),
      );

      const user = new UserObj(res);
      if (user.ID === -1) {
        this.$data.loading = false;
        this.$message({
          message: "Invalid email. Please try again.",
          type: "error",
        });
        return;
      }

      localStorage.setItem("userobj", WingsStructUtil.stringify(user));

      this.$data.loading = false;
      this.$notify(
        General.notifConfig(
          "Success",
          "Your account is created successfully!",
          "success",
        ),
      );

      let next = General.getNext(General.paramNext(this));
      if (next === Routes.Landing) {
        next = Routes.MyAccount;
      }
      General.genRedirectTo(
        this.$router,
        General.addNext(Routes.unconfirmed_NextEmail, next),
      );
    },
    cancel(): void {
      this.$router.back();
    },
  },
  beforeMount(): void {
    this.$nextTick(function () {
      this.$refs.name.$refs.input.focus();
    });
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
