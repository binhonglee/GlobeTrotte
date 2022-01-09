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
    this.$data.finalizedURL = Routing.getSubPath(
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
});
</script>
