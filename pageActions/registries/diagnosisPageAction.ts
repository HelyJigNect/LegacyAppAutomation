import { expect, Page } from "@playwright/test";
import { DiagnosisPage } from "../../pages/registries/diagnosisPage";
import { Injurycoding } from "../../dataObjects/trauma/diagnosis/injuryCoding";
import { ComorbiditiesMandatoryField } from "../../data/enum/diagnosis/comorbidities";
import { DiagnosisTab } from "../../data/enum/tabNames";

export class DiagnosisPageAction {

    private diagnosisPage: DiagnosisPage

    constructor(page: Page) {
        this.diagnosisPage = new DiagnosisPage(page);
    }

    async populateTheFormOfDiagnosisTab(preArrivalCardiacArrest: string, injuryCodingData: Injurycoding): Promise<string> {
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Diagnosis);
        const issValue = await this.diagnosisPage.populateFieldsOfInjuryCodingForm(injuryCodingData);
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Comorbidities);
        await this.diagnosisPage.clickOnPreArrivalCardiacArrestCheckbox(preArrivalCardiacArrest);
        return issValue;
    }

    //validation
    async verifyDiagnosisTab(preArrivalCardiacArrest: string, injuryCodingData: Injurycoding) {
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Diagnosis);
        const actualInjurycoding: Injurycoding = {
                    iss: await this.diagnosisPage.getIss()  ,
                    icd10: await this.diagnosisPage.getIcd10(), 
                    preDot: await this.diagnosisPage.getPreDot(), 
                    severity: await this.diagnosisPage.getSeverity(), 
        };
        expect(actualInjurycoding).toMatchObject({
                    iss: injuryCodingData.iss,
                    icd10: injuryCodingData.icd10,
                    preDot: injuryCodingData.preDot,
                    severity: injuryCodingData.severity
                });
        
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Comorbidities);
        const expectedPreArrivalCardiacArrest = preArrivalCardiacArrest;
        const actualPreArrivalCardiacArrest = await this.diagnosisPage.getPreArrivalCardiacArrest();
        expect(actualPreArrivalCardiacArrest).toEqual(expectedPreArrivalCardiacArrest);
    }

    async verifyDiagnosisMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.diagnosisPage.verifyFieldValidationIsNotPresent(availableFieldValidation, ComorbiditiesMandatoryField)).toBeTruthy();
    }

}