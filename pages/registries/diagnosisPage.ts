import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";
import { InjuryCoding } from "../../dataObjects/trauma/diagnosis/injuryCoding";

export class DiagnosisPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    // Locators of the Comorbidities section
    private preArrivalCardiacArrestCheckbox = `//di-state-button-input[@field-information-name="Trauma.PreArrivalCardiacArrest"]`;
    private narrativeTextarea = `//di-memo-field[@field-information-name="Trauma.InjuryNarrative"]//textarea[not(@readonly)]`;
    private triCodeIcd10Ais2015Button = `//button[normalize-space()='Tri-Code ICD 10 (AIS 2015)'][not(@disabled)]`;
    private issInput = `(//label[contains(., 'ISS')]/span//ancestor::td//following-sibling::td//di-int-input//input)[1]`;
    private icd10Cell = `//di-panel-field[@field-information-name="TraumaTemp.DxIcd10Tab"]//di-grid-field[@field-information-name="Trauma.FinalAnatomicalDiagnosis"]//div[@ref="gridPanel"]//div[@ref="eCenterColsClipper"]//div[@row-index="0"]`;
    private preDotCell = `//di-panel-field[@field-information-name="TraumaTemp.DxIcd10Tab"]//di-grid-field[@field-information-name="Trauma.FinalAnatomicalDiagnosis"]//div[@ref="gridPanel"]//div[@ref="eCenterColsClipper"]//div[@row-index="0"]//div[@col-id="di_cell_value_1_1"]`;
    private severityCell = `//di-panel-field[@field-information-name="TraumaTemp.DxIcd10Tab"]//di-grid-field[@field-information-name="Trauma.FinalAnatomicalDiagnosis"]//div[@ref="gridPanel"]//div[@ref="eCenterColsClipper"]//div[@row-index="0"]//div[@col-id="di_cell_value_2_1"]`;

    async clickOnPreArrivalCardiacArrestCheckbox(preArrivalCardiacArrest: string): Promise<void> {
        await this.clickAndSelectCheckbox(this.preArrivalCardiacArrestCheckbox, preArrivalCardiacArrest)
    }

    async populateFieldsOfInjuryCodingForm(injuryCodingData: InjuryCoding): Promise<string> {
        await this.fillInput(this.narrativeTextarea, injuryCodingData.narrative!);
        await this.clickElement(this.triCodeIcd10Ais2015Button);
        await this.page.waitForTimeout(2000);;
        injuryCodingData.icd10 = (await this.getTextValue(this.icd10Cell)).toString();
        injuryCodingData.preDot = (await this.getTextValue(this.preDotCell)).toString();
        injuryCodingData.severity = (await this.getTextValue(this.severityCell)).toString();
        return this.getTextValue(this.issInput);
    }

    //getter methods
    async getPreArrivalCardiacArrest(): Promise<string> {
        return await this.getStateButtonValue(this.preArrivalCardiacArrestCheckbox);
    }

    async getIss() {
        return this.getValue('text', this.issInput);
    }
    
    async getIcd10() {
        return this.getValue('text', this.icd10Cell);
    }

    async getPreDot() {
        return this.getValue('text', this.preDotCell);
    }
    
    async getSeverity() {
        return this.getValue('text', this.severityCell);
    }

    async getNarrative() {
        return this.getValue('text', this.narrativeTextarea);
    }
}
