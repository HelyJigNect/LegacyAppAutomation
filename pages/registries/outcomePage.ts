import { Page } from "@playwright/test";
import { DischargeInformation } from "../../dataObjects/trauma/outcome/initialDischarge";
import { Billing } from "../../dataObjects/trauma/outcome/billing";
import { RegistriesPage } from "./registriesPage";

export class OutcomePage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    //Locators of the Discharge Information form
    private dischargeStatusInput = `//label[contains(normalize-space(.), 'Discharge Status')]//ancestor::tr//input[contains(@class,'dropdown')]`;
    private dischargeStatusDescriptionInput = `//label[contains(normalize-space(.), 'Discharge Status')]//ancestor::tr//input[not(contains(@class,'dropdown'))]`;
    private dischargeDateInput = `//di-date-input[@field-information-name="Trauma.DischargeDate"]//input`
    private dischargeTimeInput = `//di-time-input[@field-information-name="Trauma.DischargeTime"]//input`
    private dischargeOrderDateInput = `//di-date-input[@field-information-name="Trauma.DischargeOrderDate"]//input`
    private dischargeOrderTimeInput = `//di-time-input[@field-information-name="Trauma.DischargeOrderTime"]//input`
    private icuDaysInput = `//td[@field-information-name="TotalDaysLabel"]//following-sibling::td//di-int-input[@field-information-name="Trauma.IcuDays"]//input`
    private ventilatorDaysInput = `//td[@field-information-name="TotalDaysLabel"]//following-sibling::td//di-int-input[@field-information-name="Trauma.VentilatorDays"]//input`
    private hospitalDaysInput = `//di-int-input[@field-information-name="Trauma.HospitalDays"]//input`
    private dischargedToDropdown = `//di-code-and-description-field[@field-information-name="Trauma.DischargeDisposition"]//div[@uib-dropdown]`
    private optionOfDischargedToDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.DischargeDisposition"]//span[contains(text(),', ${optionValue}')]`

    //Locators of the Billing form
    private primaryPayorDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Payors.0.Code"]//div[@uib-dropdown]`
    private optionOfPrimaryPayorDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Payors.0.Code"]//span[contains(text(),', ${optionValue}')]`

    async populateFieldOfDischargeInformationForm(dischargeInfoData: DischargeInformation): Promise<string> {
        await this.fillInput(this.dischargeDateInput, dischargeInfoData.dischargeDate)
        await this.fillInput(this.dischargeTimeInput, dischargeInfoData.dischargeTime)
        await this.fillInput(this.dischargeOrderDateInput, dischargeInfoData.dischargeOrderDate)
        await this.fillInput(this.dischargeOrderTimeInput, dischargeInfoData.dischargeOrderTime)

        const hospitalDay = await this.getElementText(this.hospitalDaysInput)
        await this.fillInput(this.icuDaysInput, hospitalDay)
        await this.fillInput(this.ventilatorDaysInput, hospitalDay)
        await this.scrollAndSelectDropdownOption(this.dischargedToDropdown, this.optionOfDischargedToDropdown(dischargeInfoData.dischargedTo))
        await this.clickElement(this.dischargeStatusInput);
        await this.typeUsingKeyboard(dischargeInfoData.dischargeStatus);
        return hospitalDay;
    }
    
    async populateFieldOfBillingForm(billingData: Billing) {
        await this.scrollAndSelectDropdownOption(this.primaryPayorDropdown, this.optionOfPrimaryPayorDropdown(billingData.primaryPayor))
    }

    //getter methods
    // Discharge Information
    async getDischargeDate(): Promise<string> {
        return await this.getElementText(this.dischargeDateInput) || '';
    }

    async getDischargeTime(): Promise<string> {
        return await this.getElementText(this.dischargeTimeInput) || '';
    }

    async getIcuDays(): Promise<string> {
        return await this.getElementText(this.icuDaysInput) || '';
    }

    async getVentilatorDays(): Promise<string> {
        return await this.getElementText(this.ventilatorDaysInput) || '';
    }

    async getHospitalDays(): Promise<string> {
        return await this.getElementText(this.hospitalDaysInput) || '';
    }

    async getDischargedTo(): Promise<string> {
        return await this.getDropdownSelectedText('DischargedToRow');
    }

    async getPrimaryPayor(): Promise<string> {
        return await this.getDropdownSelectedText('PrimaryPayorRow');
    }

    async getDischargeStatus() {
        return this.getValue('text', this.dischargeStatusInput);
    }

    async getDischargeStatusDescription() {
        return this.getValue('text', this.dischargeStatusDescriptionInput);
    }
}
