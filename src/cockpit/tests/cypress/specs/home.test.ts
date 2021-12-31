describe("Menubar", () => {
  ["/"].forEach((url) => {
    it("menubar:" + url, () => {
      cy.visit(url);
      cy.get(".main_menu")
        .contains("ul", "Home")
        .contains("ul", "Trips")
        .trigger("mouseenter");
      cy.contains("ul", "View");
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
    cy.contains("p", "Feel free to click around but nothing is set in");
    cy.contains("p", "stone. Do not save any important infomation here.");
    cy.contains("p", "Everything can and will be wiped from time to time.");
    cy.contains("p", "You should check back again soon!");
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
    cy.contains("li", "Trip").trigger("mouseenter");
    cy.contains("li", "View").click();
    cy.url().should("include", "/trip/view");
  });
});
