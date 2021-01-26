import "@cypress/code-coverage/support";

Cypress.Commands.add("registration", (email, password, confPassword) => {
  cy.url().should("include", "/register");
  cy.get(".registrationEmail").type(email);
  cy.get(".registrationPassword").type(password);
  cy.get(".registrationConfPassword").type(confPassword);
  cy.get(".registrationSave").click();
  cy.url().should("include", "/unconfirmed/email");
  cy.visit("/confirm/email/force-confirm");
});

Cypress.Commands.add("loginAction", (email, password) => {
  cy.url().should("include", "/login");
  cy.get(".loginUsername").type(email);
  cy.get(".loginPassword").type(password);
  cy.get(".loginConfirm").click();
});

Cypress.Commands.add("isLoggedOut", () => {
  cy.get(".main_menu").should("not.contain", "My Account");
  cy.contains("li", "Register");
  cy.contains("li", "Login");
});

Cypress.Commands.add("isLoggedIn", () => {
  cy.get(".main_menu").should("not.contain", "Register");
  cy.get(".main_menu").should("not.contain", "Login");
  cy.contains("li", "My Account");
});

Cypress.Commands.add("register", (email, password) => {
  cy.visit("/register");
  cy.isLoggedOut();
  cy.registration(email, password, password);
  cy.isLoggedIn();
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.isLoggedOut();
  cy.loginAction(email, password);
  cy.isLoggedIn();
});

Cypress.Commands.add("logout", () => {
  cy.isLoggedIn();
  cy.visit("/myaccount");
  cy.contains("button", "Logout").click();
  cy.isLoggedOut();
});

Cypress.Commands.add("deleteAccount", () => {
  cy.isLoggedIn();
  cy.visit("/myaccount");
  cy.contains("button", "Edit").click();
  cy.contains("button", "Delete Account").click();
  cy.isLoggedOut();
});
