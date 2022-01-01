describe("Menubar", () => {
  ["/"].forEach((url) => {
    it("menubar:" + url, () => {
      cy.visit(url);
      cy.get(".main_menu")
        .contains("ul", "Home")
        .contains("ul", "Trips")
        .trigger("mouseenter");
      cy.contains("ul", "Search");
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
    cy.contains("li", "Register").click();
    cy.url().should("include", "/register");
  });
  it("navigate to login", () => {
    cy.visit("/");
    cy.contains("li", "Login").click();
    cy.url().should("include", "/login");
  });
  it("navigate to search trip", () => {
    cy.visit("/");
    cy.contains("li", "Trip").trigger("mouseenter");
    cy.contains("li", "Search").click();
    cy.url().should("include", "/trip/search");
  });
});
