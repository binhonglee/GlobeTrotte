<template lang="pug">
  .confirm_email_uuid
    h1 Email Confirmation
    .emailConfirmationLoadingBox(v-loading="loading")
    p Confirming your email address...
</template>

<script lang="ts">
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import ConfimEmail from "@/wings/ConfirmEmail";
import { WingsStructUtil } from "wings-ts-util";
import ConfirmEmail from "@/wings/ConfirmEmail";

interface Data {
  loading: boolean;
}

export default {
  data(): Data {
    return {
      loading: false,
    };
  },
  async mounted(): Promise<void> {
    this.$data.loading = true;
    const user = await General.genCurrentUser();
    if (user.confirmed) {
      this.$data.loading = false;
      await this.$router.push("/");
    }
    const uuid = General.paramUUID(this);
    console.log(uuid);
    const res = await HTTPReq.genPOST(
      "confirm/email",
      WingsStructUtil.stringify(
        new ConfirmEmail({
          uuid: uuid,
          email: user.email,
          userid: user.ID,
        }),
      ),
    );

    this.$data.loading = false;
    console.log(res);

    if (res) {
      this.$notify(
        General.notifConfig(
          "Email Confirmation",
          "Your email is now confirmed!",
          "success",
        ),
      );
      await this.$router.push("/");
    } else {
      this.$notify(
        General.notifConfig(
          "Email Confirmation",
          "Email confirmation failed.",
          "error",
        ),
      );
      await this.$router.push("/unconfirmed/email");
    }
  },
};
</script>

<style lang="scss">
@import "../../shared/lib";

.emailConfirmationLoadingBox {
  max-width: 200px;
  height: 80px;
  margin: auto;
}
</style>
