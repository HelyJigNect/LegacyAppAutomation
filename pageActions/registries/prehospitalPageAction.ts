import { expect, Page } from "@playwright/test";
import { PrehospitalPage } from "../../pages/registries/prehospitalPage";
import { PrehospitalInformationMandatoryField } from "../../data/enum/prehospital/sceneTransport";
import { PreHospitalTab } from "../../data/enum/tabNames";

export class PrehospitalPageAction {
    private prehospitalPage: PrehospitalPage

    constructor(page: Page) {
        this.prehospitalPage = new PrehospitalPage(page);
    }

    async populateThePrehospitalTab(povWalkIn : string) {
        await this.prehospitalPage.clickOnTabFromNavbar(PreHospitalTab.Prehospital);
        expect(await this.prehospitalPage.isFormDisplayed('Prehospital Information'), 'Prehospital Information form is not displayed').toBeTruthy();
        await this.prehospitalPage.clickOnPovWalkInCheckboxOfPrehospitalInformationForm(povWalkIn)
    }

    //validation
    async verifyPrehospitalTab(povWalkIn: string) {
        await this.prehospitalPage.clickOnTabFromNavbar(PreHospitalTab.Prehospital);
        const expectedPovWalkIn = povWalkIn;
        const actualPovWalkIn = await this.prehospitalPage.getPovWalkIn();
        expect(actualPovWalkIn).toEqual(expectedPovWalkIn);
    }

    async verifyPrehospitalMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.prehospitalPage.verifyFieldValidationIsNotPresent(availableFieldValidation, PrehospitalInformationMandatoryField)).toBeTruthy();
    }

}