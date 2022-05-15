import { defineConfig } from "vite";
import baseConfig from "./vite_base_config";

const config = baseConfig(false);
config.test.minThreads = 1;
config.test.maxThreads = 1;
config.test.include = ["**/*_vitest.{test,spec}.ts"];

export default defineConfig(config);
