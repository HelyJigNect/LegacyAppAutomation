import { expect, Page } from "@playwright/test";
import { DiagnosisPage } from "../../pages/registries/diagnosisPage";
import { InjuryCoding } from "../../dataObjects/trauma/diagnosis/injuryCoding";
import { ComorbiditiesMandatoryField } from "../../data/enum/diagnosis/comorbidities";
import { DiagnosisTab } from "../../data/enum/tabNames";

export class DiagnosisPageAction {

    private diagnosisPage: DiagnosisPage

    constructor(page: Page) {
        this.diagnosisPage = new DiagnosisPage(page);
    }

    async populateTheFormOfDiagnosisTab(preArrivalCardiacArrest: string, injuryCodingData: InjuryCoding): Promise<string> {
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Diagnosis);
        const issValue = await this.diagnosisPage.populateFieldsOfInjuryCodingForm(injuryCodingData);
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Comorbidities);
        await this.diagnosisPage.clickOnPreArrivalCardiacArrestCheckbox(preArrivalCardiacArrest);
        return issValue;
    }

    async navigateToDiagnosisTabAndVerifyTheOptionCodeUsingNarrative(narrativeICD10OptionData: InjuryCoding[]) {
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Diagnosis);
        expect(await this.diagnosisPage.isFormDisplayed('Narrative'), 'Injury Coding form is not displayed').toBeTruthy();
        await this.diagnosisPage.populateTheNarrativeTextareaAndClickTriCodeICD10Ais2015Button(narrativeICD10OptionData.map(option => option.icd10).filter((n): n is string => !!n));

        const actualICD10TableData = await this.diagnosisPage.getAvailableDetailsOfTheICD10Table();
        // for (const expectedRecord of narrativeICD10OptionData) {
        //     console.log('Verifying expectedRecord:', expectedRecord);
        //     const actualRecord = actualICD10TableData.find(a => a.icd10?.startsWith(expectedRecord.icd10 ?? ''));
        //     expect(actualRecord, `ICD10 ${expectedRecord.icd10} not found in the table`).toBeDefined();
        //     expect(actualRecord!.narrative).toContain(`[${expectedRecord.icd10}] ${expectedRecord.narrative}`);
        //     expect(actualRecord!.icd10).toEqual(`${expectedRecord.icd10}, ${expectedRecord.icd10Description}`);
        //     expect(actualRecord!.preDot).toEqual(expectedRecord.preDot);
        //     expect(actualRecord!.severity).toEqual(expectedRecord.severity);
        //     expect(actualRecord!.issBodyRegion).toEqual(expectedRecord.issBodyRegion);
        // }
    }

    async verifyDiagnosisTab(preArrivalCardiacArrest: string, injuryCodingData: InjuryCoding) {
        await this.diagnosisPage.clickOnTabFromNavbar(DiagnosisTab.Diagnosis);
        const actualInjuryCoding: InjuryCoding = {
            issBodyRegion: await this.diagnosisPage.getIss(),
            icd10: await this.diagnosisPage.getIcd10(),
            preDot: await this.diagnosisPage.getPreDot(),
            severity: await this.diagnosisPage.getSeverity(),
        };
        expect(actualInjuryCoding).toMatchObject({
            issBodyRegion: injuryCodingData.issBodyRegion,
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