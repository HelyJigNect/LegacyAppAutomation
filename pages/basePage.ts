import { Page } from '@playwright/test';
import { Helpers } from '../utils/helpers';

export class BasePage extends Helpers {
    constructor(page: Page) {
        super(page);
    }

    private loaderIcon = `//div[@field-information-name="diHtmlFfeEditorLoadingIcon"]`
    private loader = `//div[@class="ag-overlay-panel"]//span[text()='Loading...']`

    async waitForLoaderIconToDisappear(timeout: number = 10000): Promise<void> {
        await this.waitForElementToDisappear(this.loaderIcon, timeout);
    }

    async waitForLoaderToDisappear(timeout: number = 10000): Promise<void> {
        await this.waitForElementToDisappear(this.loader, timeout);
    }

}