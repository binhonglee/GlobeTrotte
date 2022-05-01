import { defineConfig } from "vite";
import baseConfig from "./vite_base_config";

const config = baseConfig(true);
if (config.test.exclude !== undefined) {
  config.test.exclude.push("src/cockpit/tests/playwright/**/*");
} else {
  config.test.exclude = ["src/cockpit/tests/playwright/**/*"];
}

export default defineConfig(config);
