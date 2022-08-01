<template lang="pug">
.confirm_email_uuid
  h1 Email Confirmation
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
import NaiveUtils, { NotifyType } from "@/shared/NaiveUtils";

export default defineComponent({
  beforeMount(): void {
    NaiveUtils.init();
  },
  async mounted(): Promise<void> {
    const user = await General.genCurrentUser();
    if (user.confirmed) {
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

    if (res) {
      NaiveUtils.notifyTrigger(
        "Email Confirmation",
        "Your email is now confirmed!",
        NotifyType.SUCCESS,
      );
      await Routing.genRedirectTo(Routes.Landing);
    } else {
      NaiveUtils.notifyTrigger(
        "Email Confirmation",
        "Email confirmation failed.",
        NotifyType.ERROR,
      );
      await Routing.genRedirectTo(Routes.unconfirmed_Email);
    }
  },
});
</script>
