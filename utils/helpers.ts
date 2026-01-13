
import { Page } from '@playwright/test';

export class Helpers {
    constructor(public page: Page) { }

    async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
        await this.page.waitForSelector(selector, { timeout });
    }

    async clickElement(selector: string, force: boolean = false): Promise<void> {
        await this.waitForElement(selector);
        await this.page.click(selector, { force });
    }

    async fillInput(selector: string, value: string): Promise<void> {
        await this.page.fill(selector, value);
    }

    async isElementVisible(selector: string, timeout = 10000): Promise<boolean> {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    async isElementEnabled(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isEnabled();
    }

    async isElementReadOnly(selector: string): Promise<boolean> {
        return await this.page.locator(selector).isEditable();
    }

    async getElementText(selector: string): Promise<string> {
        const locator = this.page.locator(selector);
        const text = await locator.textContent();
        if (text?.trim()) return text.trim();

        return await locator.evaluate((el) => {
            const input = el as HTMLInputElement;
            return (
                (el as HTMLElement).innerText?.trim() ||
                input.value?.trim() ||
                input.placeholder?.trim() ||
                ''
            );
        });
    }

    async getTextFromListOfElement(element: string): Promise<string[]> {
        const elements = this.page.locator(element);
        const count = await elements.count();
        const textSet = new Set<string>();

        for (let i = 0; i < count; i++) {
            const text = await elements.nth(i).innerText();
            if (text.trim()) {
                textSet.add(text.trim());
            }
        }
        return Array.from(textSet);
    }

    async scrollAndGetTextFromListOfElement(containerSelector: string, itemSelector: string): Promise<string[]> {
        const container = this.page.locator(containerSelector);
        const seenTexts = new Set<string>();
        let previousCount = 0;

        while (true) {
            const elements = this.page.locator(itemSelector);
            const count = await elements.count();

            for (let i = 0; i < count; i++) {
                const text = (await elements.nth(i).innerText()).trim();
                if (text) seenTexts.add(text);
            }

            await container.evaluate(el => el.scrollBy(0, el.clientHeight / 2));

            await this.page.waitForTimeout(100);

            if (seenTexts.size === previousCount) break;
            previousCount = seenTexts.size;
        }

        return Array.from(seenTexts);
    }

    async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
        return await this.page.locator(selector).getAttribute(attribute);
    }

    async refreshThePage(): Promise<void> {
        await this.page.reload();
    }

    async scrollToElement(selector: string): Promise<void> {
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    async uploadFile(selector: string, filePath: string): Promise<void> {
        await this.page.locator(selector).setInputFiles(filePath);
    }

    async selectDropDownOption(dropdownSelector: string, optionSelector: string, subOptionSelector?: string): Promise<void> {
        await this.clickElement(dropdownSelector);

        if (await this.isElementVisible(optionSelector)) {
            await this.clickElement(optionSelector)
        }
        else {
            throw new Error(`Option not found in dropdown`);
        }

        if (subOptionSelector) {
            if (await this.isElementVisible(subOptionSelector)) {
                await this.clickElement(subOptionSelector)
            } else {
                throw new Error(`Sub-Option not found in dropdown`);
            }
        }
        // await this.clickElement(dropdownSelector);
    }

    async scrollAndSelectDropdownOption(dropdownSelector: string, optionTextSelector: string, scrollStep: number = 100, maxScroll: number = 5000): Promise<void> {

        // Step 1: Open the dropdown
        const dropdown = this.page.locator(dropdownSelector);
        await dropdown.click();

        // Step 2: Derive container XPath from option XPath (everything before the //span)
        const containerSelector = optionTextSelector.split('//span')[0];

        // Step 3: Wait for container to appear
        const dropdownMenu = this.page.locator(containerSelector);
        await dropdownMenu.waitFor({ state: 'visible', timeout: 5000 });

        // Step 4: Define option locator
        const optionLocator = this.page.locator(optionTextSelector);

        let isVisible = await optionLocator.isVisible();
        let scrollTop = 0;

        // Step 5: Scroll until option becomes visible or until max scroll reached
        while (!isVisible && scrollTop < maxScroll) {
            const containerHandle = await this.page.$(containerSelector);

            if (containerHandle) {
                await containerHandle.evaluate((menu: HTMLElement, step: number) => {
                    menu.scrollTop += step;
                }, scrollStep);
            } else {
                throw new Error(`Dropdown container not found for selector: ${containerSelector}`);
            }

            await this.page.waitForTimeout(200);
            isVisible = await optionLocator.isVisible();
            scrollTop += scrollStep;
        }

        if (isVisible) {
            await optionLocator.click();
        } else {
            throw new Error(`Option not found in dropdown after scrolling: ${optionTextSelector}`);
        }
    }

    async clickAndSelectCheckbox(checkboxSelector: string, checkboxValue: string, checkBoxValueSelector?: string, maxRetries = 5) {
        for (let i = 0; i < maxRetries; i++) {
            const title = await this.getElementAttribute(checkBoxValueSelector || checkboxSelector, 'title');

            if (title === checkboxValue) {
                return;
            }
            await this.clickElement(checkboxSelector);
            await this.page.waitForTimeout(500);
        }
        throw new Error(`Failed to select checkbox with value '${checkboxValue}' after ${maxRetries} attempts.`);
    }

    async typeUsingKeyboard(str: string): Promise<void> {
        for (const char of str.split('')) {
            await this.page.keyboard.press(char);
        }
    }

    //added for assertions
    private getDropdownTextInput = (rowName: string) => `tr[field-information-name="${rowName}"] input.item-description`;
    private relativeSuffix = "//following-sibling::input";

    async getDropdownSelectedText(rowName: string): Promise<string> {
        return (await this.getElementText(this.getDropdownTextInput(rowName)));
    }

    async getStateButtonValue(selector: string): Promise<string> {
        const spanLocator = this.page.locator(`${selector}//button//span`);
        const text = (await spanLocator.textContent())?.trim();
        return text === 'Y' ? 'Yes' : 'No';
    }

    async getTextValue(locator: string): Promise<string> {
        return (await this.getElementText(locator)) || '';
    }

    async getAttrValue(locator: string, attr: string): Promise<string> {
        return (await this.getElementAttribute(locator, attr)) || '';
    }

    async getStateValue(locator: string): Promise<string> {
        return await this.getStateButtonValue(locator);
    }

    async getDropdownValue(rowIdentifier: string): Promise<string> {
        return await this.getDropdownSelectedText(rowIdentifier);
    }

    async getTextAfterLocator(baseLocator: string): Promise<string> {
        const fullLocator = `${baseLocator}${this.relativeSuffix}`;
        return (await this.getElementText(fullLocator)) || '';
    }

    // Universal getter
    async getValue(
        type: 'text' | 'attr' | 'state' | 'dropdown' | 'after',
        locator: string,
        extra?: string
    ): Promise<string> {
        switch (type) {
            case 'text':
                return this.getTextValue(locator);

            case 'attr':
                return this.getAttrValue(locator, extra!);

            case 'state':
                return this.getStateValue(locator);

            case 'dropdown':
                return this.getDropdownValue(locator);

            case 'after':
                return this.getTextAfterLocator(locator);

            default:
                throw new Error(`Invalid getter type: ${type}`);
        }
    }

    async waitForText(selector: string, timeout = 5000): Promise<void> {
        await this.page.waitForFunction(
            (sel) => {
                const el = document.querySelector(sel) as HTMLElement;
                return el && el.innerText.trim().length > 0;
            },
            selector,
            { timeout }
        );
    }

    async waitForElementToDisappear(selector: string, timeout: number = 10000): Promise<void> {
        let loaderLocator = this.page.locator(selector);

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