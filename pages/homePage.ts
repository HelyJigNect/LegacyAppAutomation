import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private registryMenu = 'role=button[name="Registries"]';
  private traumaSectionLink = 'role=link[name="Trauma"]';
  private pageHeading = (headingText: string) => `//b[text()='${headingText}']`;
  private pageHeadingWithNormalizeSpace = (headingText: string) => `//b[contains(normalize-space(.), '${headingText}')]`;

  async isSsGen6HeaderDisplayed(): Promise<boolean> {
    let selector: string;

    switch (process.env.ENV) {
      case 'dev':
        selector = this.pageHeading("SS DEV Gen 6");
        break;

      case 'al_uat':
        selector = this.pageHeading("AL UAT  Gen 6");
        break;
   
      case 'il_uat':
        selector = this.pageHeading("IL UAT Web Registry and C/S");
        break;

      case 'montana_uat':
        selector = this.pageHeading("Montana UAT Gen 6");
        break;

      case 'mtqip_uat':
        selector = this.pageHeading("MTQIP UAT Gen 6");
        break;

      case 'nots_uat':
        selector = this.pageHeadingWithNormalizeSpace("NOTS UAT Gen 6");
        break;

      default:
        selector = this.pageHeading("SS DEV Gen 6");
    }

    return await this.isElementVisible(selector)
  }

  async navigateToTraumaPageUsingNavbar(): Promise<void> {
    await this.clickElement(this.registryMenu);
    await this.clickElement(this.traumaSectionLink);
  }
}