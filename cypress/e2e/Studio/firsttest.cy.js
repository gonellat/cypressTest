/// <reference types="Cypress" />

describe('My First Test Suite', function () {

    it('My FirstTest case', function () {
        /* ==== Generated with Cypress Studio ==== */

        //below code belongs to Login Page - 
        // use copilot.  
        // Add the this code and sample classes with an explanation and it will generate it for you.
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('[href="#/offers"]').click();
        cy.get(':nth-child(1) > .product-image > img').click();
        cy.get('.modal-wrapper.active').click();
        cy.get(':nth-child(2) > .product-action > button').click();
        cy.get('.cart-icon > img').click();
        cy.get('.cart-preview > .action-block > button').click();
        cy.get('[style="text-align: right; width: 100%; margin-top: 20px; margin-right: 10px;"] > :nth-child(14)').click();
        cy.get('select').select('Afghanistan');
        cy.get('.chkAgree').check();
        cy.get('button').click();
        /* ==== End Cypress Studio ==== */
    })
})