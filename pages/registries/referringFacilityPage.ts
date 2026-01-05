import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";

export class ReferringFacilityPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    private transferInCheckbox = `//di-state-button-input[@field-information-name="Trauma.InterFacilityTransfer"]`
    
    async clickOnTransferInCheckbox(transferIn : string):Promise<void>{
        await this.clickAndSelectCheckbox(this.transferInCheckbox,transferIn)
    }

    //getter methods
    async getTransferIn() {
        return this.getValue('state', this.transferInCheckbox);
    }
}