describe("Menubar", () => {
  ["/", "/about"].forEach((url) => {
    it("menubar:" + url, () => {
      cy.visit(url);
      cy.get(".main_menu")
        .contains("ul", "Home")
        .contains("ul", "About")
        .contains("ul", "Trips")
        .contains("ul", "View");
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
    cy.contains("p", "There is nothing here for now.");
    cy.contains("p", "You should check back again soon!");
  });
  it("navigate to about", () => {
    cy.visit("/");
    cy.contains("li", "About").click();
    cy.url().should("include", "/about");
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
  it("navigate to view trip", () => {
    cy.visit("/");
    cy.get("#trip").trigger("mouseenter");
    cy.contains("li", "View").click();
    cy.url().should("include", "/trip/view");
  });
});

describe("About", () => {
  it("title", () => {
    cy.visit("/about");
    cy.contains("h1", "About");
  });
  it("description", () => {
    cy.visit("/about");
    cy.contains(
      "p",
      "Our goal is to change the way people share their",
    );
    cy.contains(
      "p",
      "travel experiences and how they plan for their future",
    );
    cy.contains("p", "travels.");
  });
});
