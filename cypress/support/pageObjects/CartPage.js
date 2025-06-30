import ConfirmationPage from '../../support/pageObjects/ConfirmationPage'

class CartPage {

    sumOfProducts() {
        let sum = 0
        return cy.get("tr td:nth-child(4) strong")
            .each(($e1) => {
            const amount = Number($e1.text().split(" ")[1].trim())
            sum = sum + amount
        }).then(() => {
            return cy.wrap(sum)
        })
    }

    checkOutItems() {
        cy.contains('button', 'Checkout').click();
        return new ConfirmationPage();
    }
}

export default CartPage;