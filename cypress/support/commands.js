// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//

Cypress.Commands.add("LoginAPI",()=> {
        cy.request('POST','https://rahulshettyacademy.com/api/ecom/auth/login', {
                  "userEmail":"timothy.gonella@cgi.com",
                  "userPassword":"CypressP@ssword123"
                }).then (function(response) {
                        expect(response.status).to.eq(200)
                        Cypress.env('token',response.body.token)
                });
});

// Cypress.Commands.add('selectProduct',(productName)=> {
//         cy.get('h4.card-title').each(($el,index, $list) => {
//                 if($el.text().includes(productName)) {
//                         cy.get('button.btn.btn-info').eq(index).click()
//                 }
//         })
// })

// This method is a custom wrapper for text called getText so you don't have to write then(....).text
Cypress.Commands.add('getText', { prevSubject: 'element' }, (subject) => {
  return cy.wrap(subject).invoke('text');
});

Cypress.Commands.add('submitFormDetails',()=> {
        cy.get("#country").type("India")
        cy.get(".suggestions ul li a").click()
        cy.get(".btn-success").click()
})






