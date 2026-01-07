import { Page } from '@playwright/test';
import { Login } from '../dataObjects/logIn';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public userNameId = 'input[placeholder="User ID"]';
    public passwordID = 'input[id="password"]';
    public facilityID = 'input[id="facility"]';
    public submitLogin = 'button[type="submit"]';
    
    async login(loginDetails: Login){
        await this.fillInput(this.userNameId, loginDetails.userName);
        await this.fillInput(this.passwordID, loginDetails.password);
        await this.fillInput(this.facilityID, loginDetails.facilityID);
        await this.clickElement(this.submitLogin);
    }
}