import { Page } from "@playwright/test";
import { DropDownOption } from "../../dataObjects/dropdownOption";
import { InjuryInformation } from "../../dataObjects/trauma/injury/injuryInformation";
import { MechanismOfInjury } from "../../dataObjects/trauma/injury/mechanismOfInjury";
import { RegistriesPage } from "./registriesPage";

export class InjuryPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    //Locators of Injury Information form
    private injuryDate = `//di-date-input[@field-information-name="Trauma.InjuryDate"]//input`
    private injuryTime = `//di-time-input[@field-information-name="Trauma.InjuryTime"]//input`
    private icd10LocationCode = `//di-code-and-description-field[@field-information-name="Trauma.Icd10InjuryPlace"]//div[@uib-dropdown]`
    private optionOfIcd10LocationCodeDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Icd10InjuryPlace"]//span[contains(text(),'${optionValue}')]`
    private restraintsDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Restraint"]//div[@uib-dropdown]`
    private optionOfRestraintsDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Restraint"]//span[contains(text(),'${optionValue}')]`
    private airbagsDropdown = `//di-code-and-description-field[@field-information-name="Trauma.AirbagDeployments.0.AirbagDeployment"]//div[@uib-dropdown]`
    private optionOfAirbagsDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.AirbagDeployments.0.AirbagDeployment"]//span[contains(text(),'${optionValue}')]`
    private equipmentDropdown = `//di-code-and-description-field[@field-information-name="Trauma.ProtectiveDevices.0.ProtectiveDevice"]//div[@uib-dropdown]`
    private optionOfEquipmentDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.ProtectiveDevices.0.ProtectiveDevice"]//span[contains(text(),'${optionValue}')]`
    private copyPatientAddressButton = `//di-button-field[@field-information-name="CopyAddressButton"]//button[text()='Copy Patient Address']`
    private workRelatedCheckbox = `//di-state-button-input[@field-information-name="Trauma.WorkRelated"]`
    private occupationDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Occupation"]//div[@uib-dropdown]`
    private optionOfOccupationDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Occupation"]//span[contains(text(),'${optionValue}')]`
    private occupationalIndustryDropdown = `//di-code-and-description-field[@field-information-name="Trauma.OccupationalIndustry"]//div[@uib-dropdown]`
    private optionOfOccupationalIndustryDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.OccupationalIndustry"]//span[contains(text(),'${optionValue}')]`
    private domesticViolenceCheckbox = `//di-state-button-input[@field-information-name="Trauma.DomesticViolence"]//button`
    private domesticViolenceCheckboxValue = `//di-state-button-input[@field-information-name="Trauma.DomesticViolence"]`
    private reportOfPhysicalAbuseCheckbox = `//di-state-button-input[@field-information-name="Trauma.AbuseReport"]//button`
    private reportOfPhysicalAbuseCheckboxValue = `//di-state-button-input[@field-information-name="Trauma.AbuseReport"]`

    //Locators of E-Codes form
    private primaryICD10MechanismDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Ecodes.0.Icd10Code"]//div[@uib-dropdown]`
    private optionOfPrimaryICD10MechanismDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Ecodes.0.Icd10Code"]//span[contains(text(),'${optionValue}')]`
    private secondaryICD10MechanismDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Ecodes.1.Icd10Code"]//div[@uib-dropdown]`
    private optionOfSecondaryICD10MechanismDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Ecodes.1.Icd10Code"]//span[contains(text(),'${optionValue}')]`
    private tertiaryICD10MechanismDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Ecodes.2.Icd10Code"]//div[@uib-dropdown]`
    private optionOfTertiaryICD10MechanismDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Ecodes.2.Icd10Code"]//span[contains(text(),'${optionValue}')]`

    private injuryMechanismDropdown = `//di-code-and-description-field[@field-information-name="Trauma.InjuryMechanisms.0.Code"]//div[@auto-close="disabled"]/input`
    private injuryMechanismDescriptionInput = `//di-code-and-description-field[@field-information-name="Trauma.InjuryMechanisms.0.Code"]//div[@auto-close="disabled"]//following-sibling::input`
    private optionOfInjuryMechanismDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.InjuryMechanisms.0.Code"]//span[contains(text(),', ${optionValue}')]`
    private disasterCasualtyDropdown = `//di-code-and-description-field[@field-information-name="Trauma.CasualtyType"]//div[@auto-close="disabled"]/input`
    private disasterCasualtyDescriptionInput = `//di-code-and-description-field[@field-information-name="Trauma.CasualtyType"]//div[@auto-close="disabled"]//following-sibling::input`
    private optionOfDisasterCasualtyDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.CasualtyType"]//span[contains(text(),', ${optionValue}')]`

    private injuryTypeInput = `//di-code-and-description-field[@field-information-name="Trauma.InjuryTypes.0.Code"]//div[contains(@class,'dropdown')]/input`
    private injuryTypeDescriptionInput = `//di-code-and-description-field[@field-information-name="Trauma.InjuryTypes.0.Code"]//input[@title]`
    private injuryTypeDropdown = (optionValue: string) => `//ul[contains(@di-append-to-body,'Trauma.InjuryTypes.0.Code')]//span[contains(text(),'${optionValue}')]`
    private activityCodeICD10DropDown = `//di-code-and-description-field[@field-information-name="Trauma.Icd10EtiologyActivityCode"]//div[@uib-dropdown]`
    private activityCodeICD10dropdownOptionLoader = `//ul[@di-append-to-body="Trauma.Icd10EtiologyActivityCode"]//div[contains(text(),'Loading Options...')]`;

    async populateFieldOfInjuryInformationForm(injuryInfoData: InjuryInformation): Promise<void> {
        await this.fillInput(this.injuryDate, injuryInfoData.injuryDate)
        await this.fillInput(this.injuryTime, injuryInfoData.injuryTime)
        await this.selectDropDownOption(this.icd10LocationCode, this.optionOfIcd10LocationCodeDropdown(injuryInfoData.ICD10LocationCode))
        await this.clickElement(this.copyPatientAddressButton)
        await this.selectDropDownOption(this.restraintsDropdown, this.optionOfRestraintsDropdown(injuryInfoData.restraints))
        await this.selectDropDownOption(this.airbagsDropdown, this.optionOfAirbagsDropdown(injuryInfoData.airbags))
        await this.selectDropDownOption(this.equipmentDropdown, this.optionOfEquipmentDropdown(injuryInfoData.equipment))
        await this.clickAndSelectCheckbox(this.workRelatedCheckbox, injuryInfoData.workRelated);
        await this.clickAndSelectCheckbox(this.reportOfPhysicalAbuseCheckbox, injuryInfoData.reportOfPhysicalAbuse, this.reportOfPhysicalAbuseCheckboxValue)

        switch (process.env.ENV) {
            case 'al_uat':
                await this.clickAndSelectCheckbox(this.domesticViolenceCheckbox, injuryInfoData.domesticViolence, this.domesticViolenceCheckboxValue)
                break;
        }
    }

    async populateFieldOfECodesForm(eCodesData: MechanismOfInjury): Promise<void> {
        await this.page.keyboard.press('Escape');
        await this.scrollAndSelectDropdownOption(this.primaryICD10MechanismDropdown, this.optionOfPrimaryICD10MechanismDropdown(eCodesData.primaryICD10Mechanism))
        await this.page.keyboard.press('Escape');
        await this.clickElement(this.injuryTypeInput);
        await this.clickElement(this.injuryTypeDropdown(eCodesData.injuryTypeCode!));
        await this.page.keyboard.press('Escape');
        switch (process.env.ENV) {
            case 'sd_uat':
                await this.scrollAndSelectDropdownOption(this.injuryMechanismDropdown, this.optionOfInjuryMechanismDropdown(eCodesData.injuryMechanismDescription!))
                await this.scrollAndSelectDropdownOption(this.disasterCasualtyDropdown, this.optionOfDisasterCasualtyDropdown(eCodesData.disasterCasualtyDescription!))
                break;
        }
    }

    async populateICD10MechanismField(optionDetails: DropDownOption[]): Promise<void> {
        let i = 0;
        for (const field of [this.primaryICD10MechanismDropdown, this.secondaryICD10MechanismDropdown, this.tertiaryICD10MechanismDropdown]) {
            await this.clickElement(field);
            await this.typeUsingKeyboard(optionDetails[i].code);
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(500);
            await this.clickElement(`${field}/..//input[@di-desc-input-element]`, true)
            i++;
        }
    }

    async populateActivityCodeICD10CodeField(optionCode: string): Promise<void> {
        await this.clickElement(this.activityCodeICD10DropDown);
        await this.typeUsingKeyboard(optionCode);
        await this.page.keyboard.press('Enter');
        await this.waitForElementToDisappear(this.activityCodeICD10dropdownOptionLoader, 15000);
    }

    //getter methods
    async getInjuryDate() {
        return this.getValue('text', this.injuryDate);
    }

    async getInjuryTime() {
        return this.getValue('text', this.injuryTime);
    }

    async getICD10LocationCode() {
        return this.getValue('dropdown', 'ICD10LocationCodeRow');
    }

    async getRestraints() {
        return this.getValue('dropdown', 'RestraintRow');
    }

    async getAirbags() {
        return this.getValue('dropdown', 'AirbagsRow');
    }

    async getEquipment() {
        return this.getValue('dropdown', 'EquipmentRow');
    }

    async getWorkRelated() {
        return this.getValue('state', this.workRelatedCheckbox);
    }

    async getOccupation() {
        return this.getValue('dropdown', 'OccupationRow');
    }

    async getOccupationIndustry() {
        return this.getValue('dropdown', 'OccupationalIndustryRow');
    }

    async getReportOfPhysicalAbuse() {
        return this.getValue('state', this.reportOfPhysicalAbuseCheckboxValue);
    }

    async getDomesticViolence() {
        return process.env.ENV === "al_uat" ? this.getValue('state', this.domesticViolenceCheckboxValue) : "No";
    }

    async getPrimaryICD10Mechanism() {
        const value = await this.getValue('dropdown', 'PrimaryICD10MechanismRow');
        return value.replace(/^\?,\s*/i, '').trim();
    }

    async getSecondaryICD10Mechanism() {
        const value = await this.getValue('dropdown', 'SecondaryICD10MechanismRow');
        return value.replace(/^\?,\s*/i, '').trim();
    }

    async getTertiaryICD10Mechanism() {
        const value = await this.getValue('dropdown', 'TertiaryICD10MechanismRow');
        return value.replace(/^\?,\s*/i, '').trim();
    }

    async getActivityCodeICD10Code() {
        const value = await this.getValue('dropdown', 'ActivityCodeICD10Row');
        return value.replace(/^\?,\s*/i, '').trim();
    }

    async getInjuryTypeCode() {
        return this.getValue('text', this.injuryTypeInput);
    }

    async getInjuryTypeDescription() {
        return this.getValue('text', this.injuryTypeDescriptionInput);
    }

    async getInjuryMechanismCode() {
        return this.getValue('text', this.injuryMechanismDropdown);
    }

    async getInjuryMechanismDescription() {
        return this.getValue('text', this.injuryMechanismDescriptionInput);
    }

    async getDisasterCasualtyCode() {
        return this.getValue('text', this.disasterCasualtyDropdown);
    }

    async getDisasterCasualtyDescription() {
        return this.getValue('text', this.disasterCasualtyDescriptionInput);
    }
}