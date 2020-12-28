// cypress/plugins/index.ts

/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

export default (on, config) => {
  require('@cypress/code-coverage/task')(on, config);
  return config
};
