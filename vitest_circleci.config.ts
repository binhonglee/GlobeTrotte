import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "GlobeTrotte",
        short_name: "GT",
        description: "Travel itinerary crowdsourcing platform",
        theme_color: "#2A947D",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
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
    globals: true,
    environment: "jsdom",
    minThreads: 1,
    maxThreads: 1,
    include: ["src/cockpit/**/*_vitest.{test,spec}.ts"],
    exclude: ["src/cockpit/tests/cypress/**/*"],
    reporters: ["default", "junit"],
    outputFile: "vitest_junit",
    watch: false,
    setupFiles: ["src/cockpit/tests/vitest_setup.ts"],
    testTimeout: 10000,
  },
});
