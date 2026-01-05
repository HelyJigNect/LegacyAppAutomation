import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";

export class PrehospitalPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

  //Locators for Prehospital Information form
    private povWalkInCheckbox = `//di-state-button-input[@field-information-name="Trauma.PhPrivateVehicle"]`
    
    async clickOnPovWalkInCheckboxOfPrehospitalInformationForm(povWalkIn : string):Promise<void>{
        await this.clickAndSelectCheckbox(this.povWalkInCheckbox,povWalkIn)
    }

    //getter methods
    async getPovWalkIn() {
        return this.getValue('state', this.povWalkInCheckbox);
    }
}