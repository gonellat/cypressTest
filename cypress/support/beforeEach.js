import HomePage from "../support/pageObjects/HomePage";

beforeEach(function () {
    //runs once before all tests in this block
    return cy.fixture('ecommerceData').then((data) =>
    {
        this.data=data
        this.homepage = new HomePage();
  
    })

})