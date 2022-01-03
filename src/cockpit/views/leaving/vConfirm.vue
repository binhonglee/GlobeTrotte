<template lang="pug">
.leaving_confirm
  .nonBrokenLink(v-if="!broken")
    h1.title You are leaving GlobeTrotte...
    p.content Make sure you want to proceed to 
      a.externalURL(:href="link") {{ link }}
    n-button.proceedButton(type="primary" tag="a" :href="link") Proceed
    n-button(@click="close") Back to GlobeTrotte
  .brokenLink(v-else)
    h1.title Broken link
    p.content Seems like this link is broken. 😥
    n-button(@click="close") Back to GlobeTrotte
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NButton } from "naive-ui";
import Routing from "@/shared/Routing";

interface Data {
  link: string;
  broken: boolean;
}

export default defineComponent({
  components: {
    NButton,
  },
  data(): Data {
    return {
      link: "",
      broken: false,
    };
  },
  async beforeMount(): Promise<void> {
    const paramMap = Routing.getParamMap();
    if (paramMap.size === 0 || !paramMap.has("link")) {
      this.$data.broken = true;
      return;
    }

    this.$data.link = decodeURIComponent(
      (paramMap.get("link")?.trim() ?? "")
        .split("&dots&")
        .join(".")
        .split(".pct.")
        .join("%"),
    );
    if (!this.$data.link.startsWith("https://")) {
      this.$data.broken = true;
      return;
    }

    let temp = this.$data.link;
    if (temp.startsWith("https://")) {
      temp = temp.substring(8);
    }

    if (temp.startsWith("globetrotte.com")) {
      await Routing.genRedirectTo(temp.substring(15));
    } else if (temp.startsWith("www.globetrotte.com")) {
      await Routing.genRedirectTo(temp.substring(19));
    }
  },
  methods: {
    close(): void {
      window.close();
    },
  },
});
</script>

<style lang="scss" scoped>
.proceedButton {
  margin-right: 10px;
}
</style>
