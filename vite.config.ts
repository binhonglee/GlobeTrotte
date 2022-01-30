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
    environment: "jsdom",
    include: ["src/cockpit/**/*_vitest.{test,spec}.ts"],
    exclude: ["src/cockpit/tests/cypress/**/*"],
    reporters: "default",
    watch: false,
    coverage: {
      enabled: true,
      clean: true,
      reporter: "text-summary",
    },
  },
});
