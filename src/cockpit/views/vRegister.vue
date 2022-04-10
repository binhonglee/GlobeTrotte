<template lang="pug">
.new_user.narrow_content
  CHead(
    title="Create Account"
    description="Create your GlobeTrotte account!"
    type="signup"
  )
  h1.title Create Account
  form.newUser.narrow_display_window
    CEditItem(
      className="registrationName"
      label="Name"
      ref="name"
      @enter="confirm"
    )
    CEditItem(
      className="registrationUsername"
      label="Username"
      ref="username"
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
    n-button.registrationSave.left_col(
      type="info"
      @click="confirm"
      :loading="loading"
    ) Confirm
    n-button.registrationCancel.right_col(
      type="default"
      @click="cancel"
    ) Cancel
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import { NButton } from "naive-ui";
import HTTPReq from "@/shared/HTTPReq";
import NewUser from "@/wings/NewUser";
import RegistrationResponse from "@/wings/RegistrationResponse";
import RegistrationError from "@/wings/RegistrationError";
import CEditItem from "@/components/CEditItem.vue";
import Routes from "@/routes";
import E from "@/shared/E";
import Routing from "@/shared/Routing";
import router from "@/router";
import NaiveUtils from "@/shared/NaiveUtils";
import CHead from "@/components/CHead.vue";

interface Data {
  loading: boolean;
}

export default defineComponent({
  components: {
    CEditItem,
    NButton,
    CHead,
  },
  data(): Data {
    return {
      loading: false,
    };
  },
  mounted(): void {
    NaiveUtils.init();
    E.get(E.get(this, "name"), "input").focus();
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

      const name = E.getVal(this, "name").trim();
      const username = E.getVal(this, "username").trim();
      const email = E.getVal(this, "email").trim();
      const password = E.getVal(this, "password").trim();

      if (name.length < 1 || email.length < 1 || password.length < 1) {
        this.$data.loading = false;
        NaiveUtils.messageError("Missing input. Please try again.");
        return;
      }

      if (username.length < 3) {
        this.$data.loading = false;
        NaiveUtils.messageError("Username should be at least 3 letters.");
        return;
      }

      const newUser = new NewUser({
        name: name,
        username: username,
        email: email,
        password: password,
      });

      const res = await HTTPReq.genPOST(
        "v2/user",
        WingsStructUtil.stringify(newUser),
      );

      const regRes = new RegistrationResponse(res);
      if (regRes.error !== RegistrationError.Success) {
        this.$data.loading = false;
        switch (regRes.error) {
          case RegistrationError.EmailAlreadyExists:
            NaiveUtils.messageError("Email already has an account registered.");
            break;
          case RegistrationError.EmailInvalid:
            NaiveUtils.messageError(
              "This is an invalid email. Please try a proper email instead.",
            );
            break;
          case RegistrationError.InvalidType:
            NaiveUtils.messageError("Unknown error. Please try again later.");
            break;
          case RegistrationError.UsernameInvalid:
            NaiveUtils.messageError(
              "The provided username is invalid please try a different username.",
            );
            break;
          case RegistrationError.UsernameTaken:
            NaiveUtils.messageError(
              "Username is already taken. Please try a different username.",
            );
            break;
          case RegistrationError.UsernameTooShort:
            NaiveUtils.messageError("Username should be at least 3 letters.");
            break;
        }
        return;
      }

      const user = regRes.user;
      if (user.ID === -1) {
        this.$data.loading = false;
        NaiveUtils.messageError("Unknown error. Please try again later.");
        return;
      }

      localStorage.setItem("userobj", WingsStructUtil.stringify(user));
      this.$data.loading = false;
      NaiveUtils.messageSuccess("Your account is created successfully!");

      let next = Routing.getNext(this.$route);
      if (next === Routes.Landing) {
        next = Routes.MyAccount;
      }

      await Routing.genRedirectTo(
        Routing.addParamNext(Routes.unconfirmed_Email, next),
      );
    },
    cancel(): void {
      router.back();
    },
  },
});
</script>
