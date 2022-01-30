<template lang="pug">
.confirm_email_uuid
  h1 Email Confirmation
  .emailConfirmationLoadingBox(v-loading="loading")
  p Confirming your email address...
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { WingsStructUtil } from "wings-ts-util";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import EmailObj from "@/wings/EmailObj";
import Routes from "@/routes";
import Routing from "@/shared/Routing";

interface Data {
  loading: boolean;
}

export default defineComponent({
  data(): Data {
    return {
      loading: false,
    };
  },
  async mounted(): Promise<void> {
    this.$data.loading = true;
    const user = await General.genCurrentUser();
    if (user.details.confirmed) {
      this.$data.loading = false;
      await Routing.genRedirectTo(Routes.Landing);
      return;
    }
    const uuid = General.paramID();
    if (uuid === undefined) {
      await Routing.genRedirectTo(Routes.unconfirmed_Email);
      return;
    }

    if (process.env.NODE_ENV !== "production") {
      if (uuid.localeCompare("force-confirm") === 0) {
        if (await HTTPReq.genGET("force_confirm_email/" + user.ID)) {
          await General.genUpdateCurrentUser();
          this.$data.loading = false;
          await Routing.genRedirectTo(Routes.Landing);
          return;
        }
      }
    }

    const res = await HTTPReq.genPOST(
      "confirm/email",
      WingsStructUtil.stringify(
        new EmailObj({
          uuid: uuid,
          email: user.details.email,
          userid: user.ID,
        }),
      ),
    );

    await General.genUpdateCurrentUser();
    this.$data.loading = false;

    if (res) {
      this.$notify(
        General.notifConfig(
          "Email Confirmation",
          "Your email is now confirmed!",
          "success",
        ),
      );
      await Routing.genRedirectTo(Routes.Landing);
    } else {
      this.$notify(
        General.notifConfig(
          "Email Confirmation",
          "Email confirmation failed.",
          "error",
        ),
      );
      await Routing.genRedirectTo(Routes.unconfirmed_Email);
    }
  },
});
</script>

<style scoped>
.emailConfirmationLoadingBox {
  max-width: 200px;
  height: 80px;
  margin: auto;
}
</style>
