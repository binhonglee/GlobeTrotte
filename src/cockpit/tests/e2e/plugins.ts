/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  return Object.assign({}, config, {
    fixturesFolder: "src/cockpit/tests/e2e/fixtures",
    integrationFolder: "src/cockpit/tests/e2e/specs",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    supportFile: "src/cockpit/tests/e2e/support.ts",
  });
};
