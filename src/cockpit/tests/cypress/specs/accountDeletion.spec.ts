const email = "accountDeletionTest@globetrotte.com";
const password = "hunter2";
const wrongEmail = "abcd@globetrotte.com";
const wrongPassword = "hunter3";

describe("User account", () => {
  it("register", () => {
    cy.visit("/");
    cy.isLoggedOut();
    cy.contains("li", "Register").click();
    cy.registration(email, password, password);
    cy.isLoggedIn();
  });

  it("login", () => {
    cy.visit("/");
    cy.isLoggedOut();
    cy.contains("li", "Login").click();
    cy.login(email, password);
    cy.isLoggedIn();
  });

  it("wrong email login", () => {
    cy.visit("/login");
    cy.isLoggedOut();
    cy.loginAction(wrongEmail, password);
    cy.isLoggedOut();
    cy.contains(
      "p",
      "Wrong email or password. Please try again.",
    );
  });

  it("wrong password login", () => {
    cy.visit("/login");
    cy.isLoggedOut();
    cy.loginAction(email, wrongPassword);
    cy.isLoggedOut();
    cy.contains(
      "p",
      "Wrong email or password. Please try again.",
    );
  });

  it("wrong everything login", () => {
    cy.visit("/login");
    cy.isLoggedOut();
    cy.loginAction(wrongEmail, wrongPassword);
    cy.isLoggedOut();
    cy.contains(
      "p",
      "Wrong email or password. Please try again.",
    );
  });

  it("logout", () => {
    cy.visit("/login");
    cy.isLoggedOut();
    cy.loginAction(email, password);
    cy.isLoggedIn();
    cy.contains("li", "My Account").click();
    cy.contains("button", "Logout").click();
    cy.isLoggedOut();
    cy.contains("h1", "GlobeTrotte");
  });

  it("delete", () => {
    cy.visit("/login");
    cy.isLoggedOut();
    cy.loginAction(email, password);
    cy.isLoggedIn();
    cy.contains("li", "My Account").click();
    cy.contains("button", "Edit").click();
    cy.contains("button", "Delete Account").click();
    cy.isLoggedOut();
  });
});
