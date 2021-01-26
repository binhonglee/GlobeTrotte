describe("404", () => {
  it("page_not_found", () => {
    // I just randomly typed a bunch of words here.
    cy.visit("/sdoighado");
    cy.contains("h3", "Uhh, there's nothing to see here...");
  });
});
