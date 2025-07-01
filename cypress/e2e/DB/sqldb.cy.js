context('Window', () => {
    // beforeEach(() => {
    //     cy.visit('https://example.cypress.io/commands/window')
    // })

    // it('cy.window() - get the global window object', () => {
    //     cy.window().should('have.property','top')
    //     })

    it('Database Interaction', () => {
        cy.sqlServer("SELECT * from Persons").then (function(result) {
            console.log(result[0][1])
        })
    })
})