import HomePage from "../support/pageObjects/HomePage";
import CartPage from "./pageObjects/CartPage";
import ConfirmationPage from "./pageObjects/ConfirmationPage";

beforeEach(function () {
    //runs once before all tests in this block
    return cy.fixture('ecommerceData').then((data) =>
    {
        this.data=data
        this.homepage = new HomePage();
        this.cartPage = new CartPage();
        this.confirmationPage = new ConfirmationPage();
  
    })

})