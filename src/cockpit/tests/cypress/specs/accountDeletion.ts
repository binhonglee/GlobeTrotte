const email = "whatisthisemail@test.com";
const password = "hunter2";
const wrongEmail = "abcd@test.com";
const wrongPassword = "hunter3";

function login(cy) {
  cy.get(".loginUsername").type(email);
  cy.get(".loginPassword").type(password);
  cy.get(".loginConfirm").click();
}

function isLoggedOut(cy) {
  cy.get(".main_menu").should("not.contain", "My Account");
  cy.contains("li", "Register");
  cy.contains("li", "Login");
}

function isLoggedIn(cy) {
  cy.get(".main_menu").should("not.contain", "Register");
  cy.get(".main_menu").should("not.contain", "Login");
  cy.contains("li", "My Account");
}

describe("User account", () => {
  it("register", () => {
    cy.visit("/");
    isLoggedOut(cy);
    cy.contains("li", "Register").click();
    cy.url().should("include", "/register");
    cy.get(".registrationEmail").type(email);
    cy.get(".registrationPassword").type(password);
    cy.get(".registrationConfPassword").type(password);
    cy.get(".registrationSave").click();
    isLoggedIn(cy);
  });

  it("login", () => {
    cy.visit("/");
    isLoggedOut(cy);
    cy.contains("li", "Login").click();
    login(cy);
    isLoggedIn(cy);
  });

  it("wrong email login", () => {
    cy.visit("/login");
    isLoggedOut(cy);
    cy.get(".loginUsername").type(wrongEmail);
    cy.get(".loginPassword").type(password);
    cy.get(".loginConfirm").click();
    isLoggedOut(cy);
    cy.contains(
      "p",
      "Wrong email or password. Please try again.",
    );
  });

  it("wrong password login", () => {
    cy.visit("/login");
    isLoggedOut(cy);
    cy.get(".loginUsername").type(email);
    cy.get(".loginPassword").type(wrongPassword);
    cy.get(".loginConfirm").click();
    isLoggedOut(cy);
    cy.contains(
      "p",
      "Wrong email or password. Please try again.",
    );
  });

  it("wrong everything login", () => {
    cy.visit("/login");
    isLoggedOut(cy);
    cy.get(".loginUsername").type(wrongEmail);
    cy.get(".loginPassword").type(wrongPassword);
    cy.get(".loginConfirm").click();
    isLoggedOut(cy);
    cy.contains(
      "p",
      "Wrong email or password. Please try again.",
    );
  });

  it("logout", () => {
    cy.visit("/login");
    isLoggedOut(cy);
    login(cy);
    isLoggedIn(cy);
    cy.contains("li", "My Account").click();
    cy.contains("button", "Logout").click();
    isLoggedOut(cy);
    cy.contains("h1", "GlobeTrotte");
  });

  it("delete", () => {
    cy.visit("/login");
    isLoggedOut(cy);
    login(cy);
    isLoggedIn(cy);
    cy.contains("li", "My Account").click();
    cy.contains("button", "Edit").click();
    cy.contains("button", "Delete Account").click();
    isLoggedOut(cy);
  });
});
