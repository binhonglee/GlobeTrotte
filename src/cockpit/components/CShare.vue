<template lang="pug">
.share_component
  n-button(@click="share()" v-if="!showShareURL")
    n-icon
      share-outline
    | Share
  n-input-group.tripLink(v-else)
    n-input(
      :autofocus="true"
      :readonly="true"
      :default-value="shareURL"
    )
    n-button(@click="copyLink()")
      n-icon
        copy-outline
      | Copy
    n-button(@click="hideShareURL()" type="error") Hide
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NButton, NIcon, NInput, NInputGroup } from "naive-ui";
import { CopyOutline, ShareOutline } from "@vicons/ionicons5";
import NaiveUtils from "@/shared/NaiveUtils";

interface Data {
  showShareURL: boolean;
}

export default defineComponent({
  name: "CShare",
  components: {
    NButton,
    NIcon,
    NInput,
    NInputGroup,
    CopyOutline,
    ShareOutline,
  },
  props: {
    shareURL: {
      type: String,
      required: true,
    },
  },
  data: (): Data => ({
    showShareURL: false,
  }),
  beforeMount(): void {
    NaiveUtils.init();
  },
  methods: {
    share(): void {
      if (this.$data.showShareURL) {
        this.$data.showShareURL = false;
        return;
      }
      const userAgent = navigator.userAgent;

      if (
        (userAgent.indexOf("iPad") !== -1 ||
          userAgent.indexOf("iPhone") !== -1 ||
          userAgent.indexOf("Android") !== -1) &&
        navigator.share
      ) {
        navigator.share({
          title: document.title,
          text: "",
          url: this.$props.shareURL,
        });
      } else {
        this.$data.showShareURL = true;
      }
    },
    hideShareURL(): void {
      this.$data.showShareURL = false;
    },
    async copyLink(): Promise<void> {
      await navigator.clipboard.writeText(this.$props.shareURL);
      NaiveUtils.messageInfo("Link copied to clipboard!");
    },
  },
});
</script>
