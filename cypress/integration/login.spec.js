/** @format */

const authUser = require("../fixtures/auth-user.json");

describe("The Login Page", () => {
  it("should login User", () => {
    const { email, password } = authUser;
    cy.setCookie("Cookie_settings", "all");

    cy.visit("/");

    cy.get(".FilterComponent").find(".login").contains("div").click();
  });
});
