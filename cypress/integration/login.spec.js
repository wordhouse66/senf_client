/** @format */

const authUser = require("../fixtures/auth-user.json");

describe("The Login Page", () => {
  const { email, password } = authUser;
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.intercept("**/api/projects", { fixture: "projects.json" });
    cy.intercept("**/api/screamsFrontend", { fixture: "screams.json" });
    cy.visit("/");
  });

  it("replace with real test", () => {
    cy.get("body");
    cy.get("[data-cy=open-signnote]").click();
  });
});
