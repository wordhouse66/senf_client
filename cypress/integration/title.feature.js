/* eslint-disable no-undef */
describe("When Accessing the Application", () => {
  it("should have a page title of Senf.koeln", () => {
    cy.visit("/");
    cy.title().should("include", "Senf.koeln");
  });
});
