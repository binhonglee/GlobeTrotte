import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ssr from "vite-plugin-ssr/plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ssr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src/cockpit"),
    },
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
  test: {
    global: true,
    environment: "happy-dom",
    include: [
      "src/cockpit/**/*_vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
  },
});
