import { Page } from "@playwright/test";
import { TDPPage } from "../../pages/registries/tdpPage";
import { expect } from "../../fixtures/fixtures";
import { VteProphylaxisOption } from "../../dataObjects/trauma/tdp/processMeasure";

export class TdpPageAction {
    private tdpPage: TDPPage;

    constructor(page: Page) {
        this.tdpPage = new TDPPage(page);
    }

    async populateVteProphylaxisFieldWithNonexistentCode(nonExistentOptionCode: string[]) {
        for (const optionCode of nonExistentOptionCode) {
            await this.tdpPage.populateVteProphylaxisFieldOfProcessMeasure1Form(optionCode, false);
            expect(await this.tdpPage.isOptionOfVteProphylaxisInputDisplayed(optionCode), `Venous Thromboembolism Prophylaxis's option with code: ${(optionCode)} is available`).toBeFalsy();
            expect(await this.tdpPage.getVteProphylaxisDescriptionInputOfQaTrackingSpeedScreen()).toEqual('')
        }
    }

    async verifyIfOptionIsAvailableForVteProphylaxisDropdown(option: { code: string, description: string }) {
        await this.tdpPage.populateVteProphylaxisFieldOfProcessMeasure1Form(option.code, false);
        expect(await this.tdpPage.isOptionOfVteProphylaxisInputDisplayed(`${option.code} , ${option.description}`), `Venous Thromboembolism Prophylaxis's option with code: ${(option.code)} is available`).toBeFalsy();
    }

    async populateVteProphylaxisFieldOfProcessMeasure1Form(option: { code: string, description: string }) {
        await this.tdpPage.populateVteProphylaxisFieldOfProcessMeasure1Form(option.code, true);
        expect(await this.tdpPage.getVteProphylaxisDescriptionInputOfQaTrackingSpeedScreen()).toEqual(option.description)
    }

    async navigateToTDPTabAndVerifyTheVteProphylaxisDropdownOptions(vteProphylaxisOption: VteProphylaxisOption[]) {
        await this.tdpPage.clickOnTabFromNavbar('TDP');
        for (const option of vteProphylaxisOption) {
            await this.tdpPage.selectOptionForVteProphylaxisDropdownOfProcessMeasure1Form(option.code);
            expect(await this.tdpPage.getSelectedOptionOfVteProphylaxisDropdown()).toEqual(option);
        }
    }

}