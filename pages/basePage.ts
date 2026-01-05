import { Page } from '@playwright/test';
import { Helpers } from '../utils/helpers';

export class BasePage extends Helpers {
    constructor(page: Page) {
        super(page);
    }

    private loaderIcon = `//div[@field-information-name="diHtmlFfeEditorLoadingIcon"]`
    private loader = `//div[@class="ag-overlay-panel"]//span[text()='Loading...']`

    async waitForLoaderIconToDisappear(timeout: number = 10000): Promise<void> {
        let loaderLocator = this.page.locator(this.loaderIcon);

        for (let i = 0; i < 2; i++) {
            const count = await loaderLocator.count();
            if (count > 0 && await loaderLocator.first().isVisible()) {
                await loaderLocator.first().waitFor({ state: 'hidden', timeout });
                return;
            }
            await this.page.waitForTimeout(200);
        }
    }

    async waitForLoaderToDisappear(timeout: number = 10000): Promise<void> {
        let loaderLocator = this.page.locator(this.loader);

        for (let i = 0; i < 2; i++) {
            const count = await loaderLocator.count();
            if (count > 0 && await loaderLocator.first().isVisible()) {
                await loaderLocator.first().waitFor({ state: 'hidden', timeout });
                return;
            }
            await this.page.waitForTimeout(200);
        }
    }
}