describe("Menubar", () => {
  ["/"].forEach((url) => {
    it("menubar:" + url, () => {
      cy.visit(url);
      cy.get(".main_menu")
        .contains("a", "Home");
      cy.get(".main_menu")
        .contains("div", "Trip")
        .trigger("mouseenter");
      cy.contains("a", "Search");
    });
  });
});

describe("Homepage", () => {
  it("title", () => {
    cy.visit("/");
    cy.contains("h1", "GlobeTrotte");
  });
  it("description", () => {
    cy.visit("/");
    cy.contains("h3", "Look for your next travel plan here!");
  });
  it("navigate to register", () => {
    cy.visit("/");
    cy.contains("a", "Register").click();
    cy.url().should("include", "/register");
  });
  it("navigate to login", () => {
    cy.visit("/");
    cy.contains("a", "Login").click();
    cy.url().should("include", "/login");
  });
  it("navigate to search trip", () => {
    cy.visit("/");
    cy.contains("div", "Trip").trigger("mouseenter");
    cy.contains("a", "Search").click();
    cy.url().should("include", "/trip/search");
  });
});
