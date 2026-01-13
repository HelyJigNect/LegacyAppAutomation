import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";

export class ProceduresPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    // Add Procedure buttons
    private addMultipleProcedureBtnForICD10 = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd10Tab"]//button[text()='Add Multiple Procedures...']`
    private btnForICD10Procedure = (btnName: string) => `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd10Tab"]//button[@di-grid-button="${btnName}"]`

    // Locators for Add multiple Procedures Speed Screen
    private icd10CodeInputOfAddMultipleProceduresSpeedScreen = (fieldNumber?: number) => `//di-code-and-description-field[@field-information-name="TraumaTemp.ProceduresTempList.${fieldNumber ? fieldNumber : 0}.Icd10Code"]//input[@di-code-input-element]`
    private optionOfICD10CodeInputOfAddMultipleProceduresSpeedScreen = (optionValue: string) => `//ul[@di-append-to-body="TraumaTemp.ProceduresTempList.0.Icd10Code"]//span[contains(text(),'${optionValue}')]`
    private parentOptionOfICD10CodeInputOfAddMultipleProceduresSpeedScreen = (optionValue: string) => `//span[text()='${optionValue}']/ancestor::li/preceding-sibling::li[.//span[contains(@class,'glyphicon-folder-open')]][1]//span[@class='code-option-template-span ng-binding']`
    private icd10CodedropdownOptionLoaderOfAddMultipleProceduresSpeedScreen = (fieldNumber?: number) => `//ul[@di-append-to-body="TraumaTemp.ProceduresTempList.${fieldNumber ? fieldNumber : 0}.Icd10Code"]//div[contains(text(),'Loading Options...')]`;
    private icd10DescriptionInputOfAddMultipleProceduresSpeedScreen = (fieldNumber?: number) => `//di-code-and-description-field[@field-information-name="TraumaTemp.ProceduresTempList.${fieldNumber ? fieldNumber : 0}.Icd10Code"]//input[@di-desc-input-element]`
    private locationDescriptionInputOfAddMultipleProceduresSpeedScreen = `//di-code-and-description-field[@field-information-name="TraumaTemp.LocationTemp"]//input[@di-desc-input-element]`

    // Locators for Procedures table
    private proceduresICD10CellOfProceduresTable = `//di-panel-field[@field-information-name="TraumaTemp.ProcIcd10Tab"]//span[@ref="eCellValue" and @aria-colindex="1"]`

    // Procedures - ICD-10
    private icd10CodeInputOfProceduresSpeedScreen = `//di-code-and-description-field[@field-information-name="Trauma.Procedures.CURRENT.Icd10Code"]//input[@di-code-input-element]`
    private optionOfICD10CodeInputOfProceduresSpeedScreen = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Procedures.CURRENT.Icd10Code"]//span[contains(text(),'${optionValue}')]`
    private parentOptionOfICD10CodeInputOfProceduresSpeedScreen = (optionValue: string) => `//span[text()='${optionValue}']/ancestor::li/preceding-sibling::li[.//span[contains(@class,'glyphicon-folder-open')]][1]//span[@class='code-option-template-span ng-binding']`
    private icd10CodedropdownOptionLoaderOfProceduresSpeedScreen = `//ul[@di-append-to-body="Trauma.Procedures.CURRENT.Icd10Code"]//div[contains(text(),'Loading Options...')]`
    private icd10DescriptionInputOfProceduresSpeedScreen = `//di-code-and-description-field[@field-information-name="Trauma.Procedures.CURRENT.Icd10Code"]//input[@di-desc-input-element]`

    async clickOnAddMultipleProcedureBtnForICD10() {
        await this.clickElement(this.addMultipleProcedureBtnForICD10);
    }

    async clickOnBtnOfICD10Procedure(btnName: string) {
        await this.clickElement(this.btnForICD10Procedure(btnName));
    }

    async populateICD10ProcedureCodeFieldOfProceduresSpeedScreen(optionCodes: string[]): Promise<void> {
        for (const code of optionCodes) {
            await this.fillInput(this.icd10CodeInputOfProceduresSpeedScreen, code);
            await this.waitForElementToDisappear(this.icd10CodedropdownOptionLoaderOfProceduresSpeedScreen, 15000);
            await this.clickElement(this.icd10DescriptionInputOfProceduresSpeedScreen, true);
            if (code !== optionCodes[optionCodes.length - 1]) {
                await this.clickOnButtonOfSpeedScreen('Procedures', 'Add Another')
            }
        }
        await this.clickOnButtonOfSpeedScreen('Procedures', 'OK')
    }

    async getTextOfIcd10DescriptionInput(): Promise<string> {
        return await this.getAttrValue(this.icd10DescriptionInputOfProceduresSpeedScreen, 'title');
    }


    async populateICD10CodeFieldOfAddMultipleProceduresSpeedScreen(optionCodes: string[]): Promise<void> {
        await this.clickElement(this.locationDescriptionInputOfAddMultipleProceduresSpeedScreen, true);
        for (let i = 0; i < optionCodes.length; i++) {
            const code = optionCodes[i];
            await this.fillInput(this.icd10CodeInputOfAddMultipleProceduresSpeedScreen(i), code);
            await this.waitForElementToDisappear(this.icd10CodedropdownOptionLoaderOfAddMultipleProceduresSpeedScreen(i), 15000);
            await this.clickElement(this.icd10DescriptionInputOfAddMultipleProceduresSpeedScreen(i), true);
            await this.page.waitForTimeout(500);
        }
    }

    async getAvailableICD10FromProceduresTable(): Promise<string[]> {
        return this.getTextFromListOfElement(this.proceduresICD10CellOfProceduresTable)
    }

    async isICD10DropDownOptionHierarchyFromAddMultipleProcedureSpeedScreenAsExpected(optionHierarchy: string[]): Promise<boolean> {
        await this.clickElement(this.locationDescriptionInputOfAddMultipleProceduresSpeedScreen, true);
        try {
            // Step 1 — Open dropdown and navigate hierarchy (except last)
            await this.clickElement(this.icd10CodeInputOfAddMultipleProceduresSpeedScreen());

            for (let i = 0; i < optionHierarchy.length - 1; i++) {
                const option = optionHierarchy[i];
                await this.clickElement(this.optionOfICD10CodeInputOfAddMultipleProceduresSpeedScreen(option));
                await this.page.waitForTimeout(300);
            }

            // Step 2 — Validate hierarchy bottom → top
            for (let i = optionHierarchy.length - 1; i > 0; i--) {

                const child = optionHierarchy[i];
                const expectedParent = optionHierarchy[i - 1];

                await this.waitForElement(this.optionOfICD10CodeInputOfAddMultipleProceduresSpeedScreen(child), 3000)

                // Step 3 — Extract real parent text
                await this.waitForElement(this.parentOptionOfICD10CodeInputOfAddMultipleProceduresSpeedScreen(child), 3000)
                const parentText = await this.getElementText(this.parentOptionOfICD10CodeInputOfAddMultipleProceduresSpeedScreen(child));

                if (!parentText) {
                    console.log(`Unable to read parent of "${child}"`);
                    return false;
                }

                // Step 4 — Compare real parent with expected parent from list
                if (parentText.trim() !== expectedParent.trim()) {
                    console.log(`Hierarchy mismatch → Child: "${child}", Expected Parent: "${expectedParent}", Actual Parent: "${parentText}"`);
                    return false;
                }
            }
            await this.clickElement(this.icd10DescriptionInputOfAddMultipleProceduresSpeedScreen(), true)

            return true;

        } catch (e) {
            console.log("Error validating hierarchy:", e);
            return false;
        }
    }

    async isICD10DropDownOptionHierarchyFromProcedureSpeedScreenAsExpected(optionHierarchy: string[]): Promise<boolean> {
        try {
            // Step 1 — Open dropdown and navigate hierarchy (except last)
            await this.clickElement(this.icd10CodeInputOfProceduresSpeedScreen);

            for (let i = 0; i < optionHierarchy.length - 1; i++) {
                const option = optionHierarchy[i];
                await this.clickElement(this.optionOfICD10CodeInputOfProceduresSpeedScreen(option));
                await this.page.waitForTimeout(300);
            }

            // Step 2 — Validate hierarchy bottom → top
            for (let i = optionHierarchy.length - 1; i > 0; i--) {

                const child = optionHierarchy[i];
                const expectedParent = optionHierarchy[i - 1];

                await this.waitForElement(this.optionOfICD10CodeInputOfProceduresSpeedScreen(child), 3000)

                // Step 3 — Extract real parent text
                await this.waitForElement(this.parentOptionOfICD10CodeInputOfProceduresSpeedScreen(child), 3000)
                const parentText = await this.getElementText(this.parentOptionOfICD10CodeInputOfProceduresSpeedScreen(child));

                if (!parentText) {
                    console.log(`Unable to read parent of "${child}"`);
                    return false;
                }

                // Step 4 — Compare real parent with expected parent from list
                if (parentText.trim() !== expectedParent.trim()) {
                    console.log(`Hierarchy mismatch → Child: "${child}", Expected Parent: "${expectedParent}", Actual Parent: "${parentText}"`);
                    return false;
                }
            }
            await this.clickElement(this.icd10DescriptionInputOfProceduresSpeedScreen, true)

            return true;

        } catch (e) {
            console.log("Error validating hierarchy:", e);
            return false;
        }
    }

}