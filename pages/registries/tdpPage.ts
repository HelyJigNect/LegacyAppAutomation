import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";

export class TDPPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    //Locators of the Process Measure 1 tab's form
    private vteProphylaxisCodeInputOfQaTrackingSpeedScreen = `//di-code-and-description-field[@field-information-name="Trauma.TqipModule.VteProphylaxisType"]//input[@di-code-input-element]`
    private vteProphylaxisDescriptionInputOfQaTrackingSpeedScreen = `//di-code-and-description-field[@field-information-name="Trauma.TqipModule.VteProphylaxisType"]//input[@di-desc-input-element]`
    private optionOfVteProphylaxisInputFromQaTrackingSpeedScreen = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Issues.CURRENT.Code"]//span[contains(text(),'${optionValue}')]`

    async populateVteProphylaxisFieldOfProcessMeasure1Form(optionCode: string, clickOnDescriptionInput: boolean = true): Promise<void> {
        await this.fillInput(this.vteProphylaxisCodeInputOfQaTrackingSpeedScreen, '')
        await this.clickElement(this.vteProphylaxisCodeInputOfQaTrackingSpeedScreen);
        await this.typeUsingKeyboard(optionCode);
        if (clickOnDescriptionInput) {
            await this.clickElement(this.vteProphylaxisDescriptionInputOfQaTrackingSpeedScreen, true);
        }
    }

    async getVteProphylaxisDescriptionInputOfQaTrackingSpeedScreen(): Promise<string> {
        return await this.getElementText(this.vteProphylaxisDescriptionInputOfQaTrackingSpeedScreen);
    }

    async isOptionOfVteProphylaxisInputDisplayed(optionCode: string): Promise<boolean> {
        return await this.isElementVisible(this.optionOfVteProphylaxisInputFromQaTrackingSpeedScreen(optionCode), 1000);
    }
}