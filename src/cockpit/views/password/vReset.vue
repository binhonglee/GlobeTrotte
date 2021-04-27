<template lang="pug">
  .password_reset.narrow_content
    h1.title Reset Password
    form.resetPasswordStart(v-if="step < 2")
      CEditItem(
        className="emailInput"
        label="Email"
        ref="email"
        :val="email"
        v-on:keydown.enter.native="confirmEmail"
      )
      br
      el-button.resetPasswordSave(
        type="primary"
        v-on:click="confirmEmail"
        v-loading.fullscreen.lock="loading"
      ) Confirm
      el-button.resetPasswordCancel(
        type="default"
        v-on:click="cancel"
      ) Cancel
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
      el-button.resetPasswordSave(
        type="primary"
        v-on:click="confirmReset"
        v-loading.fullscreen.lock="loading"
      ) Confirm
      el-button.resetPasswordCancel(
        type="default"
        v-on:click="cancel"
      ) Cancel
</template>

<script lang="ts">
import CEditItem from "@/components/CEditItem.vue";
import Routes from "@/routes";
import R from "@/shared/R";
import E from "@/shared/E";
import ResetPassword from "@/wings/ResetPassword";
import HTTPReq from "@/shared/HTTPReq";
import { WingsStructUtil } from "wings-ts-util";

interface Data {
  email: string;
  step: number;
  loading: boolean;
}

export default {
  components: {
    CEditItem,
  },
  data: (): Data => ({
    email: "",
    step: 0,
    loading: false,
  }),
  methods: {
    async confirmEmail(): Promise<void> {
      const success = await HTTPReq.genPOST(
        this.$router,
        "reset/send_email",
        WingsStructUtil.stringify(E.getVal(this, "email")),
      );

      if (success) {
        this.$message({
          type: "success",
          message: "Password reset code sent!",
        });

        await R.genRefreshRedirect(
          this,
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
        this.$router,
        "reset/password",
        WingsStructUtil.stringify(rp),
      );

      if (success) {
        this.$message({
          type: "success",
          message: "Password reset is successful.",
        });
        await R.genRedirectTo(this, Routes.Login);
      } else {
        this.$message({
          type: "error",
          message: "Password reset attempt failed.",
        });
      }
    },
    async cancel(): Promise<void> {
      await R.paramToNext(this);
    },
  },
  async mounted(): Promise<void> {
    if (this.$data.step < 2) {
      E.get(E.get(this, "email"), "input").focus();
    } else {
      E.get(E.get(this, "code"), "input").focus();
    }
  },
  async beforeMount(): Promise<void> {
    const paramMap = R.getParamMap(this);
    this.$data.email = paramMap.get("email") ?? "";
    this.$data.step = +(paramMap.get("step") ?? "") ?? 1;
  },
};
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
</style>
