<template lang="pug">
  .confirm_email
    h1 Email Confirmation
    p
      | Please confirm your email address before you proceed.
      br
      | Look for a confirmation email in your inbox that
      | looks like below and click on the link.
    el-card.emailConfirmationScreenshot
      h2 Confirm your GlobeTrotte email
      p
        | GlobeTrotte &lt;noreply&commat;globetrotte.com&gt;
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
import R from "@/shared/R";

interface Data {
  hasNext: boolean;
}

export default defineComponent({
  data(): Data {
    return {
      hasNext: false,
    };
  },
  beforeMount(): void {
    this.$data.hasNext = R.hasNext(this);
  },
});
</script>

<style lang="scss" scoped>
.emailConfirmationScreenshot {
  margin: auto;
  max-width: 500px;
  text-align: left;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .el-card__body {
    padding: 15px 20px;
  }

  a {
    pointer-events: none;
  }

  h2 {
    margin: 0;
  }

  p {
    margin: 10px 0 0 0;
  }
}
</style>
