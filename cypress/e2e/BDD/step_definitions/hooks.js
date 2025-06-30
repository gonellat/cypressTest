import { Before } from "@badeball/cypress-cucumber-preprocessor";

console.log("✅ hooks.js loaded");

Before(function () {
  return cy.fixture("ecommerceData").then((data) => {
    this.data = data;
  });
});