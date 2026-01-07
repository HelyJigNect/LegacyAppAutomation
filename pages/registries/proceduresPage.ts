import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";

export class ProceduresPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    // Behavior note - SS has three tables for the different procedure coding systems.
    // This is not the case for State specific registries, but the locators remain the same.
    // To trigger the different tables, to appear on the Procedures page, the user must select
    // the appropriate date which may be state dependent. i.e for KS an arrival date of 2014 or later
    // the procedures page will have the ICD9 code grid

    // Medical Imaging Ordered
    private icd9MedicalImagingOrderedCheckbox = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd9Tab"]//td[@field-information-name="Trauma.MedicalImagingOrdered"]`
    private icd10MedicalImagingOrderedCheckbox = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd10Tab"]//td[@field-information-name="Trauma.MedicalImagingOrdered"]`
    private icd910MedicalImagingOrderedCheckbox = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd910Tab"]//td[@field-information-name="Trauma.MedicalImagingOrdered"]`

    // Add Procedure buttons
    private addICD9ProcedureButton = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd9Tab"]//button[@di-grid-button="Add"]`
    private addICD10ProcedureButton = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd10Tab"]//button[@di-grid-button="Add"]`
    private addCPTProcedureButton = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd910Tab"]//button[@di-grid-button="Add"]`

    // Procedures - ICD-9
    private icd9CodeDropdown = `//td[@field-information-name="Trauma.Procedures.CURRENT.Icd9Code"]//div[@uib-dropdown]`
    private optionOfIcd9CodeDropdown =(optionValue : string)=> `//ul[@di-append-to-body="Trauma.Procedures.CURRENT.Icd9Code"]//span[contains(text(),'${optionValue}')]`
    private icd9DateInput = `//di-date-input[@field-information-name="Trauma.Procedures.CURRENT.StartDate"]//input`
    private icd9TimeInput = `//input[@di-time-control="Trauma.Procedures.CURRENT.StartTime"]`


    // Procedures - ICD-10
    private icd10CodeDropdown = `//td[@field-information-name="Trauma.Procedures.CURRENT.Icd10Code"]//div[@uib-dropdown]`
    private optionOfIcd10CodeDropdown =(optionValue : string)=> `//ul[@di-append-to-body="Trauma.Procedures.CURRENT.Icd10Code"]//span[contains(text(),'${optionValue}')]`
    private icd10DateInput = `//di-date-input[@field-information-name="Trauma.Procedures.CURRENT.StartDate"]//input`
    private icd10TimeInput = `//input[@di-time-control="Trauma.Procedures.CURRENT.StartTime"]`

    // Button to save Procedure
    private okButtonSaveProcedure = `//di-save-button[@di-save-button-default-label='OK']`;
}
