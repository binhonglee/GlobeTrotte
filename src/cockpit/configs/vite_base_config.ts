import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import { UserConfig } from "vite";
import { InlineConfig } from "vitest";

type ViteConfig = UserConfig & { test: InlineConfig };

export default function baseConfig(coverage = true): ViteConfig {
  const config = {
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
        "@": path.resolve(__dirname + "/.."),
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
      include: ["tests/**/*_vitest.{test,spec}.ts"],
      exclude: ["tests/cypress/**/*"],
      reporters: ["default", "junit"],
      outputFile: "vitest_junit",
      watch: false,
      setupFiles: ["tests/vitest_setup.ts"],
    },
  } as ViteConfig;

  if (coverage) {
    config.test.coverage = {
      enabled: true,
      clean: true,
      reportsDirectory: "vitest_coverage",
      reporter: ["text-summary", "json"],
    };
  }

  return config;
}
