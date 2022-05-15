import { defineConfig } from "vite";
import baseConfig from "./configs/vite_base_config";

const config = baseConfig(true);
if (config.test.exclude !== undefined) {
  config.test.exclude.push("tests/playwright/**/*");
} else {
  config.test.exclude = ["tests/playwright/**/*"];
}

config.build = {
  outDir: "./dist",
  rollupOptions: {
    external: ["vue", "workbox-window"],
  },
};

export default defineConfig(config);
