/// <reference types="Cypress" />

describe('My First Test Suite', function () {

   it('My FirstTest case', function () {

      cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

      cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
         (req) => {
            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

            // No wait as we're only validating the response not the UI
            req.continue((res) => {
               //expect(res.statusCode).to.equal(403)
            })
         }
      ).as("dummyUrl")

      cy.get("button[class='btn btn-primary']").click()
      cy.wait('@dummyUrl')

   })

})






