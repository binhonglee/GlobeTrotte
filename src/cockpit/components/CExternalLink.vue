<template lang="pug">
CLink(
  :underline="underline"
  :url="finalizedURL"
  :external="true"
)
  slot
</template>

<script lang="ts">
import Routes from "@/routes";
import Routing from "@/shared/Routing";
import { defineComponent, PropType } from "vue";
import CLink, { LinkUnderline } from "./CLink.vue";

interface Data {
  finalizedURL: string;
}

export default defineComponent({
  name: "CExternalLink",
  components: { CLink },
  props: {
    url: {
      type: String,
      required: true,
    },
    underline: {
      type: String as PropType<LinkUnderline>,
      default: "always",
    },
  },
  data: (): Data => ({
    finalizedURL: "",
  }),
  beforeMount(): void {
    this.$data.finalizedURL = this.isWhitelistedURL(this.$props.url.valueOf())
      ? this.$props.url.valueOf()
      : Routing.getSubPath(
          Routes.leaving_Confirm,
          new Map<string, string>(
            Object.entries({
              link: encodeURIComponent(this.$props.url.valueOf())
                .split("%")
                .join(".pct.")
                .split(".")
                .join("&dots&"),
            }),
          ),
          "",
        );
  },
  methods: {
    isWhitelistedURL(url: string): boolean {
      const whitelistURLs = [
        "https://goo.gl/maps/",
        "https://google.com/maps/",
        "https://www.google.com/maps/",
        "https://maps.google.com/",
        "https://maps.app.goog.gl/",
        "https://www.openstreetmap.org/way/",
        "https://www.bing.com/maps?",
        "https://www.yelp.com/biz/",
      ];

      for (const whitelistURL of whitelistURLs) {
        if (url.startsWith(whitelistURL)) {
          return true;
        }
      }
      return false;
    },
  },
});
</script>
