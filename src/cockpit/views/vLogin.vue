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
import { defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import CEditItem from "@/components/CEditItem.vue";
import General from "@/shared/General";
import E from "@/shared/E";
import HTTPReq from "@/shared/HTTPReq";
import Routing from "@/shared/Routing";
import UserObj from "@/wings/UserObj";
import LoginCredential from "@/wings/LoginCredential";
import router from "@/router";
import Routes from "@/routes";
import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";

interface Data {
  loading: boolean;
  showError: boolean;
  resetLink: string;
  loadingBar: LoadingBarApiInjection | null;
}

export default defineComponent({
  components: {
    CEditItem,
  },
  data(): Data {
    return {
      loading: false,
      showError: false,
      resetLink: Routes.password_Reset,
      loadingBar: General.loadingBar(),
    };
  },
  beforeMount(): void {
    if (Routing.hasNext()) {
      this.$data.showError = true;
    }
  },
  mounted(): void {
    E.get(E.get(this, "email"), "input").focus();
  },
  methods: {
    async confirm(): Promise<void> {
      this.$data.loading = true;
      this.$data.loadingBar?.start();
      const loginCredential = new LoginCredential({
        email: E.getVal(this, "email"),
        password: E.getVal(this, "password"),
      });

      const res = await HTTPReq.genPOST(
        "login",
        WingsStructUtil.stringify(loginCredential),
      );

      const user = new UserObj(res);
      if (user.ID === -1) {
        this.$data.loadingBar?.error();
        this.$data.loading = false;
        this.$message({
          type: "error",
          message: "Wrong email or password. Please try again.",
        });
        return;
      }
      this.$data.loadingBar?.finish();
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
