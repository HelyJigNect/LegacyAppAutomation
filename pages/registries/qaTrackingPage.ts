import { Page } from "@playwright/test";
import { QaItems } from "../../dataObjects/trauma/qaTracking/qaItems";
import { RegistriesPage } from "./registriesPage";

export class QaTrackingPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    //Locators of the QA Tracking tab
    private tabOfSubNavbarOfQaTracking = (tabName: string) => `//div[@di-tab-name="QATrackingTabs"]//ul[contains(@class,'nav nav-tabs')]//a[text()='${tabName}']`

    //Locators of the QA Items tab
    private categoryCellFromFirstRowOfQaItemsTable = `//di-tab-content[@field-information-name="QAItemsTab"]//div[@aria-rowindex="2"]//div[@aria-colindex="1"]`
    private qaItemsCellFromFirstRowOfQaItemsTable = `//di-tab-content[@field-information-name="QAItemsTab"]//div[@aria-rowindex="2"]//div[@aria-colindex="2"]`
    private qaItemsCellOfQaItemsTable = `//di-tab-content[@field-information-name="QAItemsTab"]//div[@aria-colindex="2"]`
    private qaItemsCellFromQaItemsTable = (qaItem: string) => `//di-tab-content[@field-information-name="QAItemsTab"]//div[text()='${qaItem}']`
    private responseCellFromFirstRowOfQaItemsTable = `//di-tab-content[@field-information-name="QAItemsTab"]//div[@aria-rowindex="2"]//div[@aria-colindex="3"]`
    private buttonOfQaItemsTab = (buttonName: string) => `//di-tab-content[@field-information-name="QAItemsTab"]//button[text()='${buttonName}']`

    //Locators of the NTDB speed screen
    private checkboxOfOptionOfNTDBSpeedScreen = (optionValue: string) => `//label[text()='${optionValue}']/../../..//button`

    //Locators of Explicit Negatives speed screen
    private checkboxOfOptionOfExplicitNegativesSpeedScreen = (optionValue: string) => `//label[text()='${optionValue}']/ancestor::td/preceding-sibling::td//button`
    private checkboxValueOfOptionOfExplicitNegativesSpeedScreen = (optionValue: string) => `//label[text()='${optionValue}']/ancestor::td/preceding-sibling::td//di-state-button-input`
    private notKnownCheckboxOfOptionOfExplicitNegativesSpeedScreen = (optionValue: string) => `//label[text()='${optionValue}']/ancestor::td/following-sibling::td//button`
    private notKnownCheckboxValueOfOptionOfExplicitNegativesSpeedScreen = (optionValue: string) => `//label[text()='${optionValue}']/ancestor::td/following-sibling::td//di-state-button-input`

    //Locators of the QA Tracking tab
    private buttonOfQaTrackingTab = (buttonName: string) => `//di-tab-content[@field-information-name="QATrackingTab"]//button[text()='${buttonName}']`
    private qaItemCellFromFirstRowOfQaTrackingTable = `//di-tab-content[@field-information-name="QATrackingTab"]//div[@aria-rowindex="2"]//div[@aria-colindex="1"]`
    private qaItemCellOfQaTrackingTable = `//di-tab-content[@field-information-name="QATrackingTab"]//div//div[@aria-colindex="1"]`

    //Locators of the QA Tracking speed screen
    private qaItemCodeInputOfQaTrackingSpeedScreen = `//di-code-and-description-field[@field-information-name="Trauma.Issues.CURRENT.Code"]//input[@di-code-input-element]`
    private qaItemDescriptionInputOfQaTrackingSpeedScreen = `//di-code-and-description-field[@field-information-name="Trauma.Issues.CURRENT.Code"]//input[@di-desc-input-element]`
    private optionOfQaItemCodeInputFromQaTrackingSpeedScreen = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Issues.CURRENT.Code"]//span[contains(text(),'${optionValue}')]`
    private parentOptionOfOptionOfQaItemCodeInputFromQaTrackingSpeedScreen = (optionValue: string) => `//span[text()='${optionValue}']/ancestor::li/preceding-sibling::li[.//span[contains(@class,'glyphicon-folder-open')]][1]//span[@class='code-option-template-span ng-binding']`
   
    async clickOnTabOfSubNavbarOfQaTracking(tabName: string): Promise<void> {
        await this.clickElement(this.tabOfSubNavbarOfQaTracking(tabName));
    }

    async clickOnCheckboxOfOptionOfNTDBSpeedScreen(optionValue: string): Promise<void> {
        await this.clickElement(this.checkboxOfOptionOfNTDBSpeedScreen(optionValue));
    }

    async getRecordDetailsFromFirstRowOfQaItemsTable(): Promise<QaItems> {
        await this.waitForLoaderToDisappear();
        return {
            category: await this.getElementText(this.categoryCellFromFirstRowOfQaItemsTable),
            qaItem: await this.getElementText(this.qaItemsCellFromFirstRowOfQaItemsTable),
            response: await this.getElementText(this.responseCellFromFirstRowOfQaItemsTable)
        }
    }

    async getAvailableQaItemsOfQaItemsTable(): Promise<string[]> {
        await this.waitForLoaderToDisappear();
        return this.getTextFromListOfElement(this.qaItemsCellOfQaItemsTable)
    }

    async selectQaItemFromQaItemsTable(qaItem: string) {
        await this.clickElement(this.qaItemsCellFromQaItemsTable(qaItem));
    }

    async clickOnButtonOfQaItemsTab(buttonName: string) {
        await this.clickElement(this.buttonOfQaItemsTab(buttonName));
    }

    async isQaItemAvailableInQaItemsTable(qaItem: string): Promise<boolean> {
        return await this.isElementVisible(this.qaItemsCellFromQaItemsTable(qaItem));
    }

    async isCheckboxOfOptionOfExplicitNegativesSpeedScreenEnabled(optionValue: string): Promise<boolean> {
        return await this.isElementEnabled(this.checkboxOfOptionOfExplicitNegativesSpeedScreen(optionValue));
    }

    async isCheckboxOfOptionOfExplicitNegativesSpeedScreenChecked(optionValue: string): Promise<boolean> {
        return (await this.getElementAttribute(this.checkboxValueOfOptionOfExplicitNegativesSpeedScreen(optionValue), 'title')) === 'True';
    }

    async isNotKnownCheckboxOfOptionOfExplicitNegativesSpeedScreenEnabled(optionValue: string): Promise<boolean> {
        return await this.isElementEnabled(this.notKnownCheckboxOfOptionOfExplicitNegativesSpeedScreen(optionValue));
    }

    async isNotKnownCheckboxOfOptionOfExplicitNegativesSpeedScreenChecked(optionValue: string): Promise<boolean> {
        return (await this.getElementAttribute(this.notKnownCheckboxValueOfOptionOfExplicitNegativesSpeedScreen(optionValue), 'title')) === 'True';
    }

    async clickOnNotKnownCheckboxOfOptionOfExplicitNegativesSpeedScreen(optionValue: string): Promise<void> {
        await this.clickElement(this.notKnownCheckboxOfOptionOfExplicitNegativesSpeedScreen(optionValue));
    }

    async clickOnButtonOfQaTrackingTab(buttonName: string): Promise<void> {
        await this.clickElement(this.buttonOfQaTrackingTab(buttonName));
    }

    async populateQaItemFieldOfQaTrackingSpeedScreen(optionCode: string): Promise<void> {
        await this.clickElement(this.qaItemCodeInputOfQaTrackingSpeedScreen);
        await this.typeUsingKeyboard(optionCode);
    }

    async isQaItemDropdownOptionHierarchyAsExpected(optionHierarchy: string[]): Promise<boolean> {
        try {
            // Step 1 — Open dropdown and navigate hierarchy (except last)
            await this.clickElement(this.qaItemCodeInputOfQaTrackingSpeedScreen);

            for (let i = 0; i < optionHierarchy.length - 1; i++) {
                const option = optionHierarchy[i];
                await this.clickElement(this.optionOfQaItemCodeInputFromQaTrackingSpeedScreen(option));
                await this.page.waitForTimeout(300);
            }

            // Step 2 — Validate hierarchy bottom → top
            for (let i = optionHierarchy.length - 1; i > 0; i--) {

                const child = optionHierarchy[i];
                const expectedParent = optionHierarchy[i - 1];

                await this.waitForElement(this.optionOfQaItemCodeInputFromQaTrackingSpeedScreen(child), 3000)

                // Step 3 — Extract real parent text
                await this.waitForElement(this.parentOptionOfOptionOfQaItemCodeInputFromQaTrackingSpeedScreen(child), 3000)
                const parentText = await this.getElementText(this.parentOptionOfOptionOfQaItemCodeInputFromQaTrackingSpeedScreen(child));

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
            await this.clickElement(this.qaItemDescriptionInputOfQaTrackingSpeedScreen, true)

            return true;

        } catch (e) {
            console.log("Error validating hierarchy:", e);
            return false;
        }
    }

    async selectOptionForQaItemDropdownOfQaTrackingSpeedScreen(optionHierarchy: string[]): Promise<void> {
        await this.clickElement(this.qaItemCodeInputOfQaTrackingSpeedScreen);
        for (const option of optionHierarchy) {
            await this.clickElement(this.optionOfQaItemCodeInputFromQaTrackingSpeedScreen(option));
            await this.page.waitForTimeout(200);
        }
    }

    async isOptionOfQaItemCodeInputFromQaTrackingSpeedScreenDisplayed(optionValue: string): Promise<boolean> {
        return await this.isElementVisible(this.optionOfQaItemCodeInputFromQaTrackingSpeedScreen(optionValue));
    }

    async getQaItemDescriptionInputValueOfQaTrackingSpeedScreen(): Promise<string> {
        return await this.getElementText(this.qaItemDescriptionInputOfQaTrackingSpeedScreen);
    }

    async getQaItemFromFirstRowOfQaTrackingTable(): Promise<string> {
        return await this.getElementText(this.qaItemCellFromFirstRowOfQaTrackingTable);
    }

    async getAllQaItemFromQaTrackingTable(): Promise<string[]> {
        return this.getTextFromListOfElement(this.qaItemCellOfQaTrackingTable)
    }


    //  async populateICD10ProcedureCodeFieldOfProceduresSpeedScreen(optionCode: string): Promise<void> {
    //     await this.fillInput(this.icd10CodeInput, '')
    //     await this.clickElement(this.icd10CodeInput);
    //     await this.typeUsingKeyboard(optionCode);
    //     await this.page.keyboard.press('Enter');
    //     await this.page.waitForTimeout(500);
    // }
}