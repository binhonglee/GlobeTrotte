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
import E from "@/shared/E";
import R from "@/shared/R";

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
        E.getVal(this, "password").localeCompare(E.getVal(this, "confPassword"))
      ) {
        this.$alert("Password does not match.", "Fail", {
          confirmButtonText: "OK",
        });
        this.$data.loading = false;
        return;
      }

      const newUser = new NewUser();
      newUser.register({
        name: E.getVal(this, "name"),
        email: E.getVal(this, "email"),
        password: E.getVal(this, "password"),
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

      let next = R.getNext(this.$route);
      if (next === Routes.Landing) {
        next = Routes.MyAccount;
      }

      await R.genRedirectTo(
        this,
        R.addParamNext(Routes.unconfirmed_Email, next),
      );
    },
    cancel(): void {
      this.$router.back();
    },
  },
  beforeMount(): void {
    this.$nextTick(function () {
      E.get(E.get(this, "name"), "input").focus();
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
