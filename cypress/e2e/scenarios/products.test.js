import ProductsPage from "../pages/products.page";
import LoginPage from "../pages/login.page"
import CartPage from "../pages/cart.page"



describe("Given I am in products page", () => {
    const productPage = new ProductsPage()
    const loginPage = new LoginPage()
    const cartPage = new CartPage()
    chai.use(require("chai-sorted"));

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
        cy.fixture('credentials').then((users) => {
            cy.get(loginPage.userInputField).type(users.user)
            cy.get(loginPage.passwordInputField).type(users.password)
            cy.get(loginPage.loginButton).click()
            cy.get(productPage.shoppingBadge).should('not.exist')
        });
    });


    it('Then I want to verify if I can order by price', () => {

        cy.get(productPage.sortByPrice).select('Price (low to high)')
        var optionsArray = []
        cy.get(productPage.itemPrice).each(($el, index) => {
            optionsArray[index] = parseFloat($el.text().split('$')[1])
            expect(optionsArray).to.be.sorted()
        })

    })


    it('Then I want to verify if the badgy is increasing', () => {

        cy.get(productPage.addToCartButton).each(($btn, index) => {
            if (index >= 0) cy.wrap($btn).click();
            cy.get(productPage.shoppingBadge).should('have.text', index + 1)
        })
    })

    it('Then I want to add the items to cart', () => {

        cy.get(productPage.addToCartButton).each(($btn, index) => {
            if (index >= 0) cy.wrap($btn).click()
        })
        cy.get(productPage.removeCartButton).each(($btn, index) => {
            cy.get(productPage.removeCartButton).should('have.text', 'Removes')
        })
    })


    it('Then I want to remove 1 product from Products page', () => {
        cy.get(productPage.addToCartButton).each(($btn, index) => {
            if (index >= 0) cy.wrap($btn).click()
        })
        cy.get(productPage.removeCartButton).first().click()

        cy.get(productPage.shoppingBadge).then(($bdg) => {
            const badgyNumber = $bdg.text()
            cy.get(productPage.allRemoveButtons).should('have.length', badgyNumber)

        })
    })
});


