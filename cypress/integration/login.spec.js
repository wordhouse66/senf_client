/** @format */

const authUser = require("../fixtures/auth-user.json");

describe("The Login Page", () => {
  
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    // cy.intercept("**/api/projects", { fixture: "projects.json" });
    // cy.intercept("**/api/screamsFrontend", { fixture: "screams.json" });
    cy.visit("/");
  });

  it("logs in successfully", () => {
    cy.get(".FilterComponent")
      .find("[data-cy=open-signnote]")
      .click({ force: true });
    // click on login / anmelden
    // add data-cy to the html
    cy.get("[data-cy=login]").click();
    // fill email and password
    cy.get("[data-cy=login-email]")
      .click()
      .type(authUser.email)
    cy.get("[data-cy=login-password]")
      .click()
      .type(authUser.password)
    // submit button
    cy.get("[data-cy=login-user]").click();
    // click the Profile button in Sidebar
    cy.get(".FilterComponent")
      .find("[data-cy=profile-button]")
      .click({ force: true });
    cy.get("[data-cy=hey-user]")
      .should('contain.text', 'Hey ' + authUser.handle)
  });
});
