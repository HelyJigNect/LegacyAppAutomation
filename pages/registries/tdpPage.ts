import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";
import { VteProphylaxisOption } from "../../dataObjects/trauma/tdp/processMeasure";

export class TDPPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    //Locators of the Process Measure 1 tab's form
    private vteProphylaxisCodeInput = `//di-code-and-description-field[@field-information-name="Trauma.TqipModule.VteProphylaxisType"]//input[@di-code-input-element]`
    private vteProphylaxisDescriptionInput = `//di-code-and-description-field[@field-information-name="Trauma.TqipModule.VteProphylaxisType"]//input[@di-desc-input-element]`
    private optionOfVteProphylaxisDropDown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.TqipModule.VteProphylaxisType"]//span[starts-with(normalize-space(.), '${optionValue}')]`

    async populateVteProphylaxisFieldOfProcessMeasure1Form(optionCode: string, clickOnDescriptionInput: boolean = true): Promise<void> {
        await this.fillInput(this.vteProphylaxisCodeInput, '')
        await this.clickElement(this.vteProphylaxisCodeInput);
        await this.typeUsingKeyboard(optionCode);
        if (clickOnDescriptionInput) {
            await this.clickElement(this.vteProphylaxisDescriptionInput, true);
        }
    }

    async selectOptionForVteProphylaxisDropdownOfProcessMeasure1Form(option: string): Promise<void> {
        await this.selectDropDownOption(this.vteProphylaxisCodeInput, this.optionOfVteProphylaxisDropDown(option));
    }

    async getVteProphylaxisDescriptionInputOfQaTrackingSpeedScreen(): Promise<string> {
        return await this.getElementText(this.vteProphylaxisDescriptionInput);
    }

    async isOptionOfVteProphylaxisInputDisplayed(optionCode: string): Promise<boolean> {
        return await this.isElementVisible(this.optionOfVteProphylaxisDropDown(optionCode), 1000);
    }

    async getSelectedOptionOfVteProphylaxisDropdown(): Promise<VteProphylaxisOption> {
        const code = await this.getElementText(this.vteProphylaxisCodeInput);
        const description = await this.getElementText(this.vteProphylaxisDescriptionInput);
        return { code, description }
    }
}