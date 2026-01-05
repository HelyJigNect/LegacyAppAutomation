import { expect, Page } from "@playwright/test";
import { PrehospitalPage } from "../../pages/registries/prehospitalPage";
import { ReferringFacilityPage } from "../../pages/registries/referringFacilityPage";
        import { ImmediateReferringFacilityMandatoryField } from "../../data/enum/referringFacility/referralHistory";

export class ReferringFacilityPageAction {
    private referringFacilityPage: ReferringFacilityPage

    constructor(page: Page) {
        this.referringFacilityPage = new ReferringFacilityPage(page);
    }
    
    async populateTheReferringFacilityTab(transferIn : string) {
        await this.referringFacilityPage.clickOnTabFromNavbar('Referring Facility');
        expect(await this.referringFacilityPage.isFormDisplayed('Immediate Referring Facility'), 'Immediate Referring Facility form is not displayed').toBeTruthy();
        await this.referringFacilityPage.clickOnTransferInCheckbox(transferIn)
    }

    //validation
    async verifyReferringFacilityTab(transferIn: string) {
        await this.referringFacilityPage.clickOnTabFromNavbar('Referring Facility');
        const expectedTransferIn = transferIn;
        const actualTransferIn = await this.referringFacilityPage.getTransferIn();
        expect(actualTransferIn).toEqual(expectedTransferIn);
    }

    async verifyReferringFacilityMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.referringFacilityPage.verifyFieldValidationIsNotPresent(availableFieldValidation, ImmediateReferringFacilityMandatoryField)).toBeTruthy();
    }

}