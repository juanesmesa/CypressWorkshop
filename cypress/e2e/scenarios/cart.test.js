import ProductsPage from "../pages/products.page";
import LoginPage from "../pages/login.page"
import CartPage from "../pages/cart.page"

describe('Given I am in checkout page and I want to checkout items', () => {

    const productPage = new ProductsPage()
    const loginPage = new LoginPage()
    const cartPage = new CartPage()

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
        cy.fixture('credentials').then((users) => {
            cy.get(loginPage.userInputField).type(users.user)
            cy.get(loginPage.passwordInputField).type(users.password)
            cy.get(loginPage.loginButton).click()
            cy.get(productPage.shoppingBadge).should('not.exist')
            cy.get(productPage.addToCartButton).each(($btn, index) => {
                if (index >= 0) cy.wrap($btn).click()
            })
            cy.get(productPage.cart).click()
            cy.get(cartPage.title).should('have.text', 'Your Cart')
        });
    });

    it('Then I want to remove 1 product from Cart page', () => {
        
        cy.get(cartPage.removeItem).first().click()
        cy.get(productPage.shoppingBadge).then(($bdg) => {
            const badgyNumber = $bdg.text()
            cy.get(productPage.allRemoveButtons).should('have.length', badgyNumber)
        });
    });
});