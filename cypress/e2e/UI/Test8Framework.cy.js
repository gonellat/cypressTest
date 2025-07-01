import HomePage from '../../support/pageObjects/HomePage'

describe('End To End Ecommerce test', () => {

    // before(function () {
    //     cy.fixture('ecommerceData').then(function (data) {
    //         this.data = data; // 
    //         this.homepage = new HomePage();
    //     });
    // });

    it('Submit Order', function () {

        const productName = this.data.productName;
        this.homepage.goTo(Cypress.env('url') + "loginpagePractise/#")
        const productPage = this.homepage.login(this.data.username, this.data.password);

        productPage.pageValidation();
        productPage.getCardCount().should("have.length", 4)
        productPage.selectProduct(productName);
        productPage.selectFirstProduct()
        const cartPage = productPage.goToCart();

        cartPage.sumOfProducts().then(function (sum) {
            expect(sum).to.be.lessThan(200000)
        })

        const confirmationPage = cartPage.checkOutItems();
        confirmationPage.submitFormDetails();
        confirmationPage.getAlertMessage().should('contain', "Success")
    })
})
