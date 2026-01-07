import { Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { Trauma } from "../../dataObjects/trauma/trauma";

export class RegistriesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private traumaManagerGrid = `//div[contains(@class,'panel-heading') and contains(text(),'Trauma Manager')]`;
  private traumaNumberCellFromOfTraumaManagerGrid = (recordNumber: string) => `//div[@row-index="0"]//div[@col-id="Trauma.TraumaNumber.#value"]/div[text()="${recordNumber}"]`
  private patientLastNameCellOfTraumaManagerTable = (recordNumber: string) => `//div[text()='${recordNumber}']/../..//../..//div[@row-index="0"]//div[@col-id="Trauma.PatientName.Last.#value"]/div`
  private patientFirstNameCellOfTraumaManagerTable = (recordNumber: string) => `//div[text()='${recordNumber}']/../..//../..//div[@row-index="0"]//div[@col-id="Trauma.PatientName.First.#value"]/div`
  private arrivalDateCellOfTraumaManagerTable = (recordNumber: string) => `//div[text()='${recordNumber}']/../..//../..//div[@row-index="0"]//div[@col-id="Trauma.FacilityArrivalDate.#value"]/div`
  private dischargeDateCellOfTraumaManagerTable = (recordNumber: string) => `//div[text()='${recordNumber}']/../..//../..//div[@row-index="0"]//div[@col-id="Trauma.DischargeDate.#value"]/div`

  private formOfRegistry = (formTitle: string) => `//di-panel-field//div[text()='${formTitle}']`;
  private btnOfTraumaManagerGrid = (btnName: string) => `//div[contains(@class,'rm-heading')]//button[contains(text(),'${btnName}')]`
  private saveBtnOfNewTraumaGrid = `//span[text()='New Trauma']/../../../..//di-save-button[@di-save-button-default-label='Save']`;

  // Locators of Add Trauma form
  private arrivalDateInput = `//di-date-input[@field-information-name="Trauma.FacilityArrivalDate"]//input`
  private calenderIconOfArrivalDateField = `//label[text()='Arrival Date']/../../..//button`;
  private currentDayFromCalendarWindow = `td.day.ng-binding.ng-scope.current`;
  private patientTypeDropdown = `//di-code-and-description-field[@field-information-name="Trauma.PatientType"]//input[contains(@class,'dropdown-toggle')]`
  private optionOfPatientTypeDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.PatientType"]//span[contains(text(),'${optionValue}')]`

  private tabOfNavbarOfRegistries = (tabName: string) => `//ul[contains(@class,'nav nav-tabs')]//a[text()='${tabName}']`
  private activeTabOfNavbarFromRegistries = `//di-tab-set[@field-information-name="MainTabs"]/div/ul/li[contains(@class,'di-active-tab')]/a`
  private activeTabOfSubNavbarFromRegistries = `//div[@class="main-tab-panel di-tab-content"]//li[contains(@class,'di-active-tab')]/a`

  //Locators of the Patient grid
  private btnOfPatientGrid = (btnName: string) => `//button[text()='${btnName} ']`

  //Locators of the Results popup window 
  private btnOfResultsPopup = (btnName: string) => `//h3[@class="panel-title ng-binding" and text()='Results']/../../..//button[contains(text(),'${btnName}')]`
  private resultsPopup = `//h3[@class="panel-title ng-binding" and text()='Results']/../../..//div[@ref="eBodyViewport"]`
  private sourceCellFromResultPopup = `//h3[@class="panel-title ng-binding" and text()='Results']/../../..//div[@ref="eBodyViewport"]//div[@col-id="source_name"]`
  private messageCellFromResultPopup = (fieldName: string) => `//div[@ref="eBodyViewport"]//div[@col-id="source_name" and text()='${fieldName}']/../div[@col-id="message"]`
  private closeButtonFromResultPopup = `//button[contains(text(),'Close')]`;

  //Locators of the Speed Screen
  private speedScreenHeader = (headerText: string) => `//div[@uib-modal-window="modal-window"]//h3[text()='${headerText}']`;
  private buttonOfSpeedScreen = (headerText: string, buttonName: string) => `//div[@uib-modal-window="modal-window"]//h3[text()='${headerText}']/../..//button[contains(text(),'${buttonName}')]`;
  private cancelButtonOfSpeedScreen = `//div[@uib-modal-window="modal-window"]//h3/../..//button[contains(text(),'Cancel')]`

  //validation locator
  private viewIconForTraumaNumber = (traumaNumber: string) => `//div[@role='row']//div[@col-id='Trauma.TraumaNumber.#value']/div[text()='${traumaNumber}']/ancestor::div[@role='row']//button[@title='View']`;
  
  async isTraumaManagerGridDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.traumaManagerGrid)
  }

  async clickOnBtnOfTraumaManagerGrid(btnName: string) {
    await this.clickElement(this.btnOfTraumaManagerGrid(btnName))
    await this.waitForLoaderIconToDisappear(20000)
  }

  async getActiveTabFromNavbar(): Promise<string> {
    return await this.getElementText(this.activeTabOfNavbarFromRegistries)
  }

  async getActiveTabFromSubNavbar(): Promise<string> {
    return await this.getElementText(this.activeTabOfSubNavbarFromRegistries)
  }

  async isFormDisplayed(formTitle: string) {
    return await this.isElementVisible(this.formOfRegistry(formTitle), 20000);
  }

  async populateFieldOfAddTraumaForm(traumaData: Trauma) {
    await this.fillInput(this.arrivalDateInput, traumaData.arrivalDate)

    switch (process.env.ENV) {
      case 'al_uat':
        await this.selectDropDownOption(this.patientTypeDropdown, this.optionOfPatientTypeDropdown(traumaData.patientType))
        break;
    }
  }

  async clickOnSaveBtnOfNewTraumaGrid() {
    await this.clickElement(this.saveBtnOfNewTraumaGrid);
  }

  async clickOnTabFromNavbar(tabName: string): Promise<void> {
    await this.clickElement(this.tabOfNavbarOfRegistries(tabName))
  }

  async clickOnBtnOfPatientGrid(btnName: string): Promise<void> {
    await this.clickElement(this.btnOfPatientGrid(btnName))
  }

  async isNewRecordDetailPresentInTraumaManagerTable(traumaNumber: string): Promise<boolean> {
    return this.isElementVisible(this.traumaNumberCellFromOfTraumaManagerGrid(traumaNumber))
  }

  async getDetailsOfRecordFromTraumaManagerTable(traumaNumber: string): Promise<any> {
    return {
      patientLastName: await this.getElementText(this.patientLastNameCellOfTraumaManagerTable(traumaNumber)),
      patientFirstName: await this.getElementText(this.patientFirstNameCellOfTraumaManagerTable(traumaNumber)),
      arrivalDate: await this.getElementText(this.arrivalDateCellOfTraumaManagerTable(traumaNumber)),
      dischargeDate: await this.getElementText(this.dischargeDateCellOfTraumaManagerTable(traumaNumber)),
    };
  }

  async isResultsPopupVisible(): Promise<boolean> {
    return this.isElementVisible(this.resultsPopup)
  }

  async clickOnBtnOfBtnOfResultsPopup(btnName: string): Promise<void> {
    await this.clickElement(this.btnOfResultsPopup(btnName))
  }

  async clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup(): Promise<{ field: string; message: string }[]> {
    await this.clickOnBtnOfBtnOfResultsPopup('Recheck');
    const fields = await this.scrollAndGetTextFromListOfElement(this.resultsPopup, this.sourceCellFromResultPopup);
    await this.clickOnBtnOfBtnOfResultsPopup('Recheck');

    await this.page.waitForTimeout(100);

    const result: { field: string; message: string }[] = [];
    for (const field of fields) {
      const messageLocator = this.messageCellFromResultPopup(field);
      const locator = this.page.locator(messageLocator);

      let message = '';
      if (await locator.isVisible()) {
        message = (await this.getElementText(messageLocator))?.trim() || '';
      } else {
        const container = this.page.locator(this.resultsPopup);
        let visible = false;
        const maxScrolls = 10;

        for (let i = 0; i < maxScrolls; i++) {
          await container.evaluate(el => el.scrollBy(0, el.clientHeight / 2));
          await this.page.waitForTimeout(200);

          if (await locator.isVisible()) {
            visible = true;
            break;
          }
        }

        if (visible) {
          message = (await this.getElementText(messageLocator))?.trim() || '';
        }
      }

      result.push({
        field,
        message: message || 'No message found',
      });
    }

    return result;
  }

  async verifyFieldValidationIsPresent(
    actual: { field: string; message: string }[],
    expected: { field: string; message: string }[]
  ): Promise<boolean> {
    const missing = expected.filter(
      exp =>
        !actual.some(
          act =>
            act.field?.trim().toLowerCase() === exp.field?.trim().toLowerCase() &&
            act.message?.trim().toLowerCase() === exp.message?.trim().toLowerCase()
        )
    );

    if (missing.length > 0) {
      console.error(
        "Expected the following fields/messages to be present, but they were NOT found:\n" +
        JSON.stringify(missing, null, 2) +
        "\n\n Full actual validation list:\n" +
        JSON.stringify(actual, null, 2)
      );
      return false;
    }
    return true;
  }

  async verifyFieldValidationIsNotPresent(
    actual: { field: string; message: string }[],
    expected: { field: string; message: string }[]
  ): Promise<boolean> {
    const found = expected.filter(exp =>
      actual.some(
        act =>
          act.field?.trim().toLowerCase() === exp.field?.trim().toLowerCase() &&
          act.message?.trim().toLowerCase() === exp.message?.trim().toLowerCase()
      )
    );

    if (found.length > 0) {
      console.error(
        ` Expected the following fields/messages NOT to be present, but they were found:\n` +
        JSON.stringify(found, null, 2)
      );
      console.info(
        ` Full actual validation list:\n` +
        JSON.stringify(actual, null, 2)
      );
      return false;
    }
    return true;
  }

  async isSpeedScreenDisplayed(headerText: string): Promise<boolean> {
    return this.isElementVisible(this.speedScreenHeader(headerText))
  }

  async clickOnButtonOfSpeedScreen(headerText: string, buttonName: string): Promise<void> {
    await this.clickElement(this.buttonOfSpeedScreen(headerText, buttonName))
  }

  async clickOnCancelButtonIfSpeedScreenDisplayed(): Promise<void> {
    await this.page.waitForTimeout(200);
    if (await this.isElementVisible(this.cancelButtonOfSpeedScreen, 1000)) {
      await this.clickElement(this.cancelButtonOfSpeedScreen)
    }
  }

  async clickOnCloseButtonFromResultPopup(): Promise<void> {
    await this.clickElement(this.closeButtonFromResultPopup);
  }

  //getter method
  async clickOnViewIconForTraumaNumber(traumaNumber: string): Promise<void> {
        await this.clickElement(this.viewIconForTraumaNumber(traumaNumber));
    }
}