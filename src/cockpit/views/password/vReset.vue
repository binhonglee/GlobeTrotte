<template lang="pug">
.password_reset.narrow_content
  h1.title Reset Password
  form.resetPasswordStart(v-if="step < 2")
    CEditItem(
      className="emailInput"
      label="Email"
      ref="email"
      :val="email"
      @keydown.enter.native="confirmEmail"
    )
    br
    n-button.resetPasswordSave(
      type="info"
      @click="confirmEmail"
      :loading="loading"
    ) Confirm
    n-button.resetPasswordCancel(
      type="default"
      @click="cancel"
    ) Cancel
    p.backToLogin
      CLink(:url="loginLink") Back to Login
  form.resetPasswordInput(v-else)
    CEditItem(
      className="resetEmail"
      label="Email"
      ref="email"
      :val="email"
      @enter="confirmReset"
    )
    CEditItem(
      className="resetCode"
      label="Code"
      ref="code"
      @enter="confirmReset"
    )
    CEditItem(
      className="resetPassword"
      label="Password"
      ref="password"
      type="password"
      @enter="confirmReset"
    )
    CEditItem(
      className="resetConfPassword"
      label="Confirm Password"
      ref="confPassword"
      type="password"
      @enter="confirmReset"
    )
    br
    n-button.resetPasswordSave(
      type="info"
      @click="confirmReset"
      :loading="loading"
    ) Confirm
    n-button.resetPasswordCancel(
      type="default"
      @click="cancel"
    ) Cancel
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NButton } from "naive-ui";
import CEditItem from "@/components/CEditItem.vue";
import CLink from "@/components/CLink.vue";
import E from "@/shared/E";
import Routing from "@/shared/Routing";
import ResetPassword from "@/wings/ResetPassword";
import HTTPReq from "@/shared/HTTPReq";
import Routes from "@/routes";
import { WingsStructUtil } from "wings-ts-util";

interface Data {
  email: string;
  step: number;
  loginLink: string;
  loading: boolean;
}

export default defineComponent({
  components: {
    CEditItem,
    CLink,
    NButton,
  },
  data: (): Data => ({
    email: "",
    step: 0,
    loginLink: Routes.Login,
    loading: false,
  }),
  async mounted(): Promise<void> {
    if (this.$data.step < 2) {
      E.get(E.get(this, "email"), "input").focus();
    } else {
      E.get(E.get(this, "code"), "input").focus();
    }
  },
  async beforeMount(): Promise<void> {
    const paramMap = Routing.getParamMap();
    this.$data.email = paramMap.get("email") ?? "";
    this.$data.step = +(paramMap.get("step") ?? "") ?? 1;
  },
  methods: {
    async confirmEmail(): Promise<void> {
      const success = await HTTPReq.genPOST(
        "reset/send_email",
        WingsStructUtil.stringify(E.getVal(this, "email")),
      );

      if (success) {
        this.$message({
          type: "success",
          message: "Password reset code sent!",
        });

        await Routing.genRefreshRedirect(
          Routes.password_Reset,
          new Map<string, string>(
            Object.entries({
              email: E.getVal(this, "email"),
              step: "2",
            }),
          ),
        );
      } else {
        this.$message({
          type: "error",
          message: "Account not found with email.",
        });
      }
    },
    async confirmReset(): Promise<void> {
      if (
        E.getVal(this, "password").localeCompare(E.getVal(this, "confPassword"))
      ) {
        this.$alert("Password does not match.", "Fail", {
          confirmButtonText: "OK",
        });
        this.$data.loading = false;
        return;
      }

      const rp = new ResetPassword();
      rp.email = E.getVal(this, "email");
      rp.code = E.getVal(this, "code");
      rp.password = E.getVal(this, "password");

      const success = await HTTPReq.genPOST(
        "reset/password",
        WingsStructUtil.stringify(rp),
      );

      if (success) {
        this.$message({
          type: "success",
          message: "Password reset is successful.",
        });
        await Routing.genRedirectTo(Routes.Login);
      } else {
        this.$message({
          type: "error",
          message: "Password reset attempt failed.",
        });
      }
    },
    async cancel(): Promise<void> {
      await Routing.paramToNext();
    },
  },
});
</script>

<style lang="scss">
@import "../../shared/lib";

.resetPasswordStart,
.resetPasswordInput {
  @include trip_display();
}

.resetPasswordSave {
  @include left_col($p-height);
}

.resetPasswordCancel {
  @include right_col($p-height);
}

.backToLogin {
  text-align: right;
}
</style>
