import { getPage } from "vite-plugin-ssr/client";
import { createApp } from "../main";
import type { PageContext } from "../shared/PageContextTypes";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";

hydrate();

async function hydrate() {
  // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
  // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>();
  const app = createApp(pageContext);
  app.mount("#app");
}
