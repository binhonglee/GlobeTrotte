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
    p.forgotPassword
      a(:href="resetLink") Forgot Password?
</template>

<script lang="ts">
import { DefineComponent, defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import UserObj from "@/wings/UserObj";
import CEditItem from "@/components/CEditItem.vue";
import E from "@/shared/E";
import Routing from "@/shared/Routing";
import router from "@/router";
import Routes from "@/routes";

interface Data {
  loading: boolean;
  showError: boolean;
  resetLink: string;
}

export default defineComponent({
  data(): Data {
    return {
      loading: false,
      showError: false,
      resetLink: Routes.password_Reset,
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
        email: E.getVal(this, "email"),
        password: E.getVal(this, "password"),
      });

      const res = await HTTPReq.genPOST(
        "v2/login",
        WingsStructUtil.stringify(newUser),
      );

      const user = new UserObj(res);
      if (user.ID === -1) {
        this.$data.loading = false;
        this.$message({
          type: "error",
          message: "Wrong email or password. Please try again.",
        });
        return;
      }
      localStorage.setItem("userobj", WingsStructUtil.stringify(user));
      this.$data.loading = false;
      this.$notify(
        General.notifConfig("Success", "You are now logged in.", "success"),
      );

      await Routing.paramToNext(new Map<string, string>(), true);
    },
    cancel(): void {
      router.back();
    },
  },
  beforeMount(): void {
    if (Routing.hasNext()) {
      this.$data.showError = true;
    }
    this.$nextTick(function (this: DefineComponent) {
      E.get(E.get(this, "email"), "input").focus();
    });
  },
});
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

.forgotPassword {
  text-align: right;
}
</style>
