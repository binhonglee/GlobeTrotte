// cypress/plugins/index.ts

/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const path = require("path")
const { startDevServer } = require("@cypress/vite-dev-server")

export default (on, config) => {
  on("dev-server:start", (options) => {
    startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(
          __dirname,
          "..", // cypress
          "..", // tests
          "..", // cockpit
          "..", // src
          "vite.config.js",
        ),
      },
    })
  })
  require("@cypress/code-coverage/task")(on, config);
  return config
};
