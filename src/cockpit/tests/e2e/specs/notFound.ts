describe("404", () => {
  it("page_not_found", () => {
    cy.visit("/sdoighado");
    cy.contains(
      "h3",
      "Uhh, there's nothing to see here...",
    );
  });
});
