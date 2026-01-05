import { expect, Page } from "@playwright/test";
import { Login } from "../dataObjects/logIn";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";

export class LoginPageAction {

    private loginPage: LoginPage;
    private homePage: HomePage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
    }

    async loginSuccessfully(loginDetails: Login) {
        await this.loginPage.login(loginDetails)
        expect(await this.homePage.isSsGen6HeaderDisplayed(), 'SS Gen 6 Header is not displayed').toBeTruthy();
    }

} 