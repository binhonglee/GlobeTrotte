<template lang="pug">
.confirm_email
  h1 Email Confirmation
  p
    | Please confirm your email address before you proceed.
    br
    | Look for a confirmation email in your inbox that
    | looks like below and click on the link.
  n-card.emailConfirmationScreenshot(content-style="padding: 10px")
    h2 Confirm your GlobeTrotte email
    p GlobeTrotte 
      strong &lt;noreply&commat;globetrotte.com&gt;
      br
      | To: You
    p
      | Click
      | 
      a(href="") here
      | 
      | to confirm your GlobeTrotte account email
  p(v-if="hasNext")
    | Once you've completed the account confirmation
    | process, you can refresh this page to continue
    | browsing this website.
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NCard } from "naive-ui";
import Routing from "@/shared/Routing";
import General from "@/shared/General";
import Routes from "@/routes";

interface Data {
  hasNext: boolean;
}

export default defineComponent({
  components: { NCard },
  data(): Data {
    return {
      hasNext: false,
    };
  },
  beforeMount(): void {
    this.$data.hasNext = Routing.hasNext();
  },
  async mounted(): Promise<void> {
    if (General.confirmed()) {
      await Routing.genRedirectTo(
        Routing.hasNext()
          ? Routing.getNext(this.$route)
          : Routes.User + "/" + General.getCurrentUsername(),
      );
    }
  },
});
</script>

<style scoped>
.confirm_email .emailConfirmationScreenshot {
  margin: auto;
  max-width: 500px;
  text-align: left;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.confirm_email .emailConfirmationScreenshot .el-card__body {
  padding: 15px 20px;
}

.confirm_email .emailConfirmationScreenshot a {
  pointer-events: none;
}

.confirm_email .emailConfirmationScreenshot h2 {
  margin: 0;
}

.confirm_email .emailConfirmationScreenshot p {
  margin: 10px 0 0 0;
}
</style>
