import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
