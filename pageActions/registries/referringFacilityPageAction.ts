import { expect, Page } from "@playwright/test";
import { ReferringFacilityPage } from "../../pages/registries/referringFacilityPage";
import { ImmediateReferringFacilityMandatoryField } from "../../data/enum/referringFacility/referralHistory";
import { ReferingFacilityTab } from "../../data/enum/tabNames";

export class ReferringFacilityPageAction {
    private referringFacilityPage: ReferringFacilityPage

    constructor(page: Page) {
        this.referringFacilityPage = new ReferringFacilityPage(page);
    }
    
    async populateTheReferringFacilityTab(transferIn : string) {
        await this.referringFacilityPage.clickOnTabFromNavbar(ReferingFacilityTab.ReferringFacility);
        expect(await this.referringFacilityPage.isFormDisplayed('Immediate Referring Facility'), 'Immediate Referring Facility form is not displayed').toBeTruthy();
        await this.referringFacilityPage.clickOnTransferInCheckbox(transferIn)
    }

    //validation
    async verifyReferringFacilityTab(transferIn: string) {
        await this.referringFacilityPage.clickOnTabFromNavbar(ReferingFacilityTab.ReferringFacility);
        const expectedTransferIn = transferIn;
        const actualTransferIn = await this.referringFacilityPage.getTransferIn();
        expect(actualTransferIn).toEqual(expectedTransferIn);
    }

    async verifyReferringFacilityMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.referringFacilityPage.verifyFieldValidationIsNotPresent(availableFieldValidation, ImmediateReferringFacilityMandatoryField)).toBeTruthy();
    }

}