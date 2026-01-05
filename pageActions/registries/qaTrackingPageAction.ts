import { Page } from "@playwright/test";
import { QaTrackingPage } from "../../pages/registries/qaTrackingPage";
import { expect } from "../../fixtures/fixtures";

export class QaTrackingPageAction {
    private qaTrackingPage: QaTrackingPage

    constructor(page: Page) {
        this.qaTrackingPage = new QaTrackingPage(page);
    }

    async selectOptionsFromNTDBSpeedScreen(qaItemOption: string[]) {
        await this.qaTrackingPage.clickOnButtonOfQaItemsTab('NTDB Complications')
        expect(await this.qaTrackingPage.isSpeedScreenDisplayed('NTDB'), 'NTDB speed screen is not displayed').toBeTruthy();
        for (const qaItem of qaItemOption) {
            await this.qaTrackingPage.clickOnCheckboxOfOptionOfNTDBSpeedScreen(qaItem)
        }
        await this.qaTrackingPage.clickOnButtonOfSpeedScreen('NTDB', 'OK')
        // Uncomment below assertion once the qa item name is displayed correctly [problem with 2026 option]
        // expect(await this.qaTrackingPage.getAvailableQaItemsOfQaItemsTable(), 'QA item details in table do not match expected values').toEqual(qaItemOption);
    }

    async verifyStateOfOptionCheckboxFromExplicitNegativesSpeedScreenForOptionSelectedFromNTDBSpeedScreen(selectedQaItem: string[]) {
        await this.qaTrackingPage.clickOnButtonOfQaItemsTab('Explicit Negatives')
        expect(await this.qaTrackingPage.isSpeedScreenDisplayed('Explicit Negatives'), 'Explicit Negatives speed screen is not displayed').toBeTruthy();

        for (const qaItem of selectedQaItem) {
            expect(await this.qaTrackingPage.isCheckboxOfOptionOfExplicitNegativesSpeedScreenChecked(qaItem), 'Checkbox of option is not checked').toBeTruthy()
            expect(await this.qaTrackingPage.isCheckboxOfOptionOfExplicitNegativesSpeedScreenEnabled(qaItem), 'Checkbox of option is enabled').toBeFalsy()
            expect(await this.qaTrackingPage.isNotKnownCheckboxOfOptionOfExplicitNegativesSpeedScreenEnabled(qaItem), 'Not Known checkbox of option is enabled').toBeFalsy()
            expect(await this.qaTrackingPage.isNotKnownCheckboxOfOptionOfExplicitNegativesSpeedScreenChecked(qaItem), 'Not Known checkbox of option is checked').toBeFalsy()
        }
        await this.qaTrackingPage.clickOnButtonOfSpeedScreen('Explicit Negatives', 'OK')
    }

    async verifyQaItemDropdownHierarchyFromQaTrackingSpeedScreen(qaItemOptionsHierarchy: string[][]) {
        await this.qaTrackingPage.clickOnButtonOfQaTrackingTab('Add')
        expect(await this.qaTrackingPage.isSpeedScreenDisplayed('QA Tracking'), 'QA Tracking speed screen is not displayed').toBeTruthy();

        for (const option of qaItemOptionsHierarchy) {
            expect(await this.qaTrackingPage.isQaItemDropdownOptionHierarchyAsExpected(option)).toBeTruthy();
        }

        await this.qaTrackingPage.clickOnButtonOfSpeedScreen('QA Tracking', 'Cancel')
    }

    async selectQaItemDropdownOptionFromQaTrackingSpeedScreen(qaItemOptionsHierarchy: string[][]) {
        await this.qaTrackingPage.clickOnButtonOfQaTrackingTab('Add')
        expect(await this.qaTrackingPage.isSpeedScreenDisplayed('QA Tracking'), 'QA Tracking speed screen is not displayed').toBeTruthy();
        for (const option of qaItemOptionsHierarchy) {
            await this.qaTrackingPage.selectOptionForQaItemDropdownOfQaTrackingSpeedScreen(option)
            if (option !== qaItemOptionsHierarchy[qaItemOptionsHierarchy.length - 1]) {
                await this.qaTrackingPage.clickOnButtonOfSpeedScreen('QA Tracking', 'Add Another')
            }
        }

        await this.qaTrackingPage.clickOnButtonOfSpeedScreen('QA Tracking', 'OK')
        expect(await this.qaTrackingPage.getAllQaItemFromQaTrackingTable(), 'Qa items in Qa tracking table are not as expected').toEqual(qaItemOptionsHierarchy.map(option => option[option.length - 1]));
    }
}