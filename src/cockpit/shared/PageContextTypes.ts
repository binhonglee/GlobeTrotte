export type PageProps = unknown;
// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
  Page: any;
  pageProps?: PageProps;
  documentProps?: {
    title?: string;
    description?: string;
  };
};
