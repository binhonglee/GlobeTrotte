import { defineConfig } from "vite";
import baseConfig from "./vite_base_config";

const config = baseConfig(true);
config.test.include = ["tests/playwright/**/*_vitest.{test,spec}.ts"];
config.test.testTimeout = 20000;

if (config.test.coverage !== undefined) {
  config.test.coverage.reportsDirectory = "playwright_coverage";
}

export default defineConfig(config);
