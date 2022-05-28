<template lang="pug">
.login.narrow_content
  CHead(title="Login" description="Login to your GlobeTrotte account.")
  h1.title Login
  n-alert.tripPrivateAlertBar(
    v-if="showError"
    title="Please login to continue."
    type="error"
  )
  form.narrow_display_window
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
    n-button.loginConfirm.left_col(
      type="info"
      @click="confirm"
      :loading="loading"
    ) Confirm
    n-button.loginCancel.right_col(
      type="default"
      @click="cancel"
    ) Cancel
  p.forgotPassword
    CLink(:url="resetLink") Forgot Password?
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import { NAlert, NButton } from "naive-ui";
import CEditItem from "@/components/CEditItem.vue";
import CLink from "@/components/CLink.vue";
import General from "@/shared/General";
import { E } from "@glareshield/all";
import HTTPReq from "@/shared/HTTPReq";
import Routing from "@/shared/Routing";
import UserObj from "@/wings/UserObj";
import LoginCredential from "@/wings/LoginCredential";
import router from "@/router";
import Routes from "@/routes";
import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";
import NaiveUtils from "@/shared/NaiveUtils";
import CHead from "@/components/CHead.vue";

interface Data {
  loading: boolean;
  showError: boolean;
  resetLink: string;
  loadingBar: LoadingBarApiInjection | null;
}

export default defineComponent({
  components: {
    CEditItem,
    CLink,
    NAlert,
    NButton,
    CHead,
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
    NaiveUtils.init();
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
        NaiveUtils.messageError("Wrong email or password. Please try again.");
        return;
      }
      this.$data.loadingBar?.finish();
      localStorage.setItem("userobj", WingsStructUtil.stringify(user));
      this.$data.loading = false;
      NaiveUtils.messageSuccess("You are now logged in.");

      await Routing.paramToNext(new Map<string, string>(), true);
    },
    cancel(): void {
      router.back();
    },
  },
});
</script>

<style scoped>
.forgotPassword {
  text-align: right;
}
</style>
