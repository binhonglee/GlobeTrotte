// cypress/plugins/index.ts

/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

export default (_on, config) => {
  config = Object.assign({}, config, {
    fixturesFolder: "src/cockpit/tests/e2e/fixtures",
    integrationFolder: "src/cockpit/tests/e2e/specs",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    supportFile: "src/cockpit/tests/e2e/support.ts",
  });
  return config;
};
