import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";

export class ProceduresPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    // Medical Imaging Ordered
    private icd9MedicalImagingOrderedCheckbox = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd9Tab"]//td[@field-information-name="Trauma.MedicalImagingOrdered"]`
    private icd10MedicalImagingOrderedCheckbox = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd10Tab"]//td[@field-information-name="Trauma.MedicalImagingOrdered"]`
    private icd910MedicalImagingOrderedCheckbox = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd910Tab"]//td[@field-information-name="Trauma.MedicalImagingOrdered"]`

    // Add Procedure buttons
    private addICD9ProcedureButton = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd9Tab"]//button[@di-grid-button="Add"]`
    private btnForICD10Procedure = (btnName: string) => `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd10Tab"]//button[@di-grid-button="${btnName}"]`
    private addCPTProcedureButton = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd910Tab"]//button[@di-grid-button="Add"]`

    // Procedures - ICD-9
    private icd9CodeDropdown = `//td[@field-information-name="Trauma.Procedures.CURRENT.Icd9Code"]//div[@uib-dropdown]`
    private optionOfIcd9CodeDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Procedures.CURRENT.Icd9Code"]//span[contains(text(),'${optionValue}')]`
    private icd9DateInput = `//di-date-input[@field-information-name="Trauma.Procedures.CURRENT.StartDate"]//input`
    private icd9TimeInput = `//input[@di-time-control="Trauma.Procedures.CURRENT.StartTime"]`


    // Procedures - ICD-10
    private icd10CodeInput = `//di-code-and-description-field[@field-information-name="Trauma.Procedures.CURRENT.Icd10Code"]//input[@di-code-input-element]`
    private icd10DescriptionInput = `//di-code-and-description-field[@field-information-name="Trauma.Procedures.CURRENT.Icd10Code"]//input[@di-desc-input-element]`
    private optionOfIcd10Dropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Procedures.CURRENT.Icd10Code"]//span[contains(text(),'${optionValue}')]`

    private icd10DateInput = `//di-date-input[@field-information-name="Trauma.Procedures.CURRENT.StartDate"]//input`
    private icd10TimeInput = `//input[@di-time-control="Trauma.Procedures.CURRENT.StartTime"]`

    // Button to save Procedure
    private okButtonSaveProcedure = `//di-save-button[@di-save-button-default-label='OK']`;

    async clickOnBtnOfICD10Procedure(btnName: string) {
        await this.clickElement(this.btnForICD10Procedure(btnName));
    }

    async populateICD10ProcedureCodeFieldOfProceduresSpeedScreen(optionCode: string): Promise<void> {
        await this.fillInput(this.icd10CodeInput, '')
        await this.clickElement(this.icd10CodeInput);
        await this.typeUsingKeyboard(optionCode);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
    }

    async getTextOfIcd10DescriptionInput(): Promise<string> {
        return await this.getAttrValue(this.icd10DescriptionInput, 'title');
    }
}
