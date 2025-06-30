const { Given } = require("@badeball/cypress-cucumber-preprocessor");

Given("I visit the homepage", () => {
  cy.visit(Cypress.env("url"));
})