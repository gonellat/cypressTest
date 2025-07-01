const neatCSV = require('neat-csv');
let productName 
describe('JWT Storage', function () {

    // use async as we are using async later on in the script
    it('Is logged in through local storage', async () => {

        cy.LoginAPI().then(function () {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            })
        })

        cy.get(".card-body b").eq(1).then(function(ele) {
            productName = ele.text();
        })
        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click();
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("ind");
        cy.get('.ta-results button').each(($el, index, $list) => {
            if (($el.text() === " India")) {
                cy.wrap($el).click();
            }
        })
        cy.get('.action__submit').click();
        // page will load but the csv won't be ready
        cy.wait(4000);
        cy.contains('.btn-primary', 'CSV').click();

        cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_timothy.gonella.csv")
            .then(async (text) => {
                const csv = await neatCSV(text)
                const actualProductName = csv[0]["Product Name"]
                expect(productName).to.equal(actualProductName)
            })
    })
})