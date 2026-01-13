import { expect, Page } from "@playwright/test";
import { ProceduresPage } from "../../pages/registries/proceduresPage";
import { DropDownOption } from "../../dataObjects/dropdownOption";

export class ProceduresPageAction {

    private proceduresPage: ProceduresPage

    constructor(page: Page) {
        this.proceduresPage = new ProceduresPage(page);
    }

    async addICD10ProcedureFromAddMultipleProcedureSpeedScreen(icd10Options: DropDownOption[]): Promise<void> {
        await this.proceduresPage.clickOnTabFromNavbar('Procedures');
        expect(await this.proceduresPage.isFormDisplayed('Procedures'), 'Procedures form is not displayed').toBeTruthy();

        await this.proceduresPage.clickOnAddMultipleProcedureBtnForICD10();
        expect(await this.proceduresPage.isSpeedScreenDisplayed('Procedures (Choose Up To 10)'), 'Procedures (Choose Up To 10) Speed screen is not displayed').toBeTruthy();
        await this.proceduresPage.populateICD10CodeFieldOfAddMultipleProceduresSpeedScreen(icd10Options.map(option => option.code));
        await this.proceduresPage.clickOnButtonOfSpeedScreen('Procedures (Choose Up To 10)', 'OK');
        const availableICD10FromProceduresTable = await this.proceduresPage.getAvailableICD10FromProceduresTable();
        for (const icd10Option of icd10Options) {
            expect(availableICD10FromProceduresTable).toContain(`${icd10Option.code}, ${icd10Option.shortDescription}`);
        }
    }

    async checkICD10DropDownOptionHierarchyFromAddMultipleProcedureSpeedScreen(icd10OptionsHierarchy: string[][]) {
        await this.proceduresPage.clickOnAddMultipleProcedureBtnForICD10();
        expect(await this.proceduresPage.isSpeedScreenDisplayed('Procedures (Choose Up To 10)'), 'Procedures (Choose Up To 10) Speed screen is not displayed').toBeTruthy();
        for (const option of icd10OptionsHierarchy) {
            expect(await this.proceduresPage.isICD10DropDownOptionHierarchyFromAddMultipleProcedureSpeedScreenAsExpected(option)).toBeTruthy();
        }
    }

    async addICD10ProcedureUsingProceduresSpeedScreen(icd10Options: DropDownOption[]): Promise<void> {
        await this.proceduresPage.clickOnBtnOfICD10Procedure('Add');
        expect(await this.proceduresPage.isFormDisplayed('Procedures'), 'Procedures form is not displayed').toBeTruthy();
        await this.proceduresPage.populateICD10ProcedureCodeFieldOfProceduresSpeedScreen(icd10Options.map(option => option.code));
        // expect(await this.proceduresPage.getAvailableICD10FromProceduresTable(), 'Available ICD10 options in Procedures table are not as expected').toEqual(expect.arrayContaining(icd10Options.map(option => `${option.code}, ${option.shortDescription}`)));

        const availableICD10FromProceduresTable = await this.proceduresPage.getAvailableICD10FromProceduresTable();
        for (const icd10Option of icd10Options) {
            expect(availableICD10FromProceduresTable).toContain(`${icd10Option.code}, ${icd10Option.shortDescription}`);
        }
    }

    async checkICD10DropDownOptionHierarchyFromProcedureSpeedScreen(icd10OptionsHierarchy: string[][]) {
        await this.proceduresPage.clickOnBtnOfICD10Procedure('Add');
        expect(await this.proceduresPage.isFormDisplayed('Procedures'), 'Procedures form is not displayed').toBeTruthy();

        for (const option of icd10OptionsHierarchy) {
            expect(await this.proceduresPage.isICD10DropDownOptionHierarchyFromProcedureSpeedScreenAsExpected(option)).toBeTruthy();
        }
    }

}