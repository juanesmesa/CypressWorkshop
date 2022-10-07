import LoginPage from "../pages/login.page";
import ProductsPage from "../pages/products.page";

const productPage = new ProductsPage()
const loginPage = new LoginPage()


describe("Given I want to test login", () => {

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/")
    });

    it('Then I want to check the username and password required message', () => {
        cy.get(loginPage.loginButton).click()
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')
        //cy.get('[data-test="error"]').invoke('text').should('eq', 'Epic sadface: Username is required')
    });


    it('Then I want to check login without username name message', () => {
        cy.fixture('credentials').then((users) => {
            cy.get(loginPage.passwordInputField).type(users.password)
            cy.get(loginPage.loginButton).click()
            cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')
            //cy.get('[data-test="error"]').invoke('text').should('eq', 'Epic sadface: Username is required')
        })
    });


    it('Then I want to check login without password message', () => {
        cy.fixture('credentials').then((users) => {
            cy.get(loginPage.userInputField).type(users.user)
            cy.get(loginPage.loginButton).click()
            cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required')
            //cy.get('[data-test="error"]').invoke('text').should('eq', 'Epic sadface: Password is required')
        })
    });


    it('Then I want to try with a locked user', () => {
        cy.fixture('credentials').then((users) => {
            cy.get(loginPage.userInputField).type(users.lockedUser)
            cy.get(loginPage.passwordInputField).type(users.password)
            cy.get(loginPage.loginButton).click()
            cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
            //cy.get('[data-test="error"]').invoke('text').should('eq', 'Epic sadface: Password is required')
        })
        
    });


    it('Then I should able to login successfully', () => {

        cy.fixture('credentials').then((users) => {

            cy.get(loginPage.userInputField).should("be.visible")
            cy.get(loginPage.passwordInputField).should("be.visible")
            cy.get(loginPage.loginButton).should("be.visible")
            cy.get(loginPage.userInputField).type(users.user)
            cy.get(loginPage.passwordInputField).type(users.password)
            cy.get(loginPage.loginButton).click()
            cy.get(".title").invoke('text').should('eq', 'Products')
            cy.get(".title").should('have.text', 'Products')
        })
    })
})

