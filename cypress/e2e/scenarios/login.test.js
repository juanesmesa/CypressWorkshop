import LoginPage from "../pages/login.page";


describe("Given I am valid user" ,()=>{
const loginPage = new LoginPage()

    it('Then I should able to login successfully', () => {
        
        cy.visit("https://www.saucedemo.com/")
        cy.get(loginPage.userInputField).should("be.visible")
        cy.get(loginPage.passwordInputField).should("be.visible")
        cy.get(loginPage.loginButton).should("be.visible")

    });
})
