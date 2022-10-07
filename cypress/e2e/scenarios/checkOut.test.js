import ProductsPage from "../pages/products.page";
import LoginPage from "../pages/login.page"
import CartPage from "../pages/cart.page"
import CheckOutpage from "../pages/checkOut.page";


describe('I want', () => {

    const productPage = new ProductsPage()
    const loginPage = new LoginPage()
    const cartPage = new CartPage()
    const checkOutPage = new CheckOutpage()


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
            cy.get(cartPage.checkoutButton).click()
        });
    });


    it('Then I want to checkout without fill First Name', () => {

        cy.get(cartPage.title).should('have.text', 'Checkout: Your Information')
        cy.get(checkOutPage.continueButton).click()
        cy.get(checkOutPage.errorMessage).should('have.text', 'Error: First Name is required')
    });


    it('Then I want to checkout without fill Last Name', () => {

        cy.get(checkOutPage.firstName).type(" ")
        cy.get(checkOutPage.continueButton).click()
        cy.get(checkOutPage.errorMessage).should('have.text', 'Error: Last Name is required')
    });


    it('Then I want to checkout without fill Zip Coide', () => {

        cy.get(checkOutPage.firstName).type(" ")
        cy.get(checkOutPage.lastName).type(" ")
        cy.get(checkOutPage.continueButton).click()
        cy.get(checkOutPage.errorMessage).should('have.text', 'Error: Postal Code is required')
    });


    it('Then I want to checkout with valid information', () => {
        cy.fixture('credentials').then((users) => {
            cy.get(checkOutPage.firstName).type(users.firstName)
            cy.get(checkOutPage.lastName).type(users.lastName)
            cy.get(checkOutPage.zipCode).type(users.zipCode)
            cy.get(checkOutPage.continueButton).click()
            cy.get(checkOutPage.title).should('have.text', 'Checkout: Overview')
        });
    });


    it('Then I want to finish my purchase', () => {
        cy.fixture('credentials').then((users) => {
            cy.get(checkOutPage.firstName).type(users.firstName)
            cy.get(checkOutPage.lastName).type(users.lastName)
            cy.get(checkOutPage.zipCode).type(users.zipCode)
            cy.get(checkOutPage.continueButton).click()

        });

        var optionsArray = []
        var priceAllItems = 0
        cy.get(checkOutPage.itemPrice).then(($ele) => {
            cy.get(checkOutPage.itemPrice).each(($el, index) => {
                optionsArray[index] = parseFloat($el.text().split('$')[1])
                priceAllItems = priceAllItems + optionsArray[index]
                cy.get(checkOutPage.sumaryTotal).invoke('text').then((text) => {
                    var sumaryLabel = parseFloat(text.split('$')[1])
                    expect(sumaryLabel).to.equal(priceAllItems);

                })
            })
        })
    });
});