describe('JWT Storage', function () {

    it('Is logged i through local storage', function () {

        cy.LoginAPI().then(function () {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            })
        })
    })
})