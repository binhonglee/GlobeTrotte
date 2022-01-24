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
    threads: false,
    include: ["src/cockpit/**/*_vitest.{test,spec}.ts"],
    exclude: ["src/cockpit/tests/cypress/**/*"],
    reporters: "junit",
    outputFile: "vitest_junit",
    watch: false,
    coverage: {
      enabled: true,
      clean: true,
      reportsDirectory: "vitest_coverage",
      reporter: "json",
    },
  },
});
