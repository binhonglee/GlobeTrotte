import { renderToString } from "@vue/server-renderer";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import { createApp } from "../main";
import type { PageContext } from "../shared/PageContextTypes";
import type { PageContextBuiltIn } from "vite-plugin-ssr";

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname"];

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext);
  const appHtml = await renderToString(app);

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || "GlobeTrotte";
  const desc = (documentProps && documentProps.description) || "";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {},
  };
}
