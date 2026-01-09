import { Page } from "@playwright/test";
import { Identifiers } from "../../dataObjects/trauma/demographic/recordInfo";
import { PatientInfo, PatientAddressInfo, RaceOptions } from "../../dataObjects/trauma/demographic/patient";
import { RegistriesPage } from "./registriesPage";

export class DemographicPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    //Locators of Identifiers
    private traumaNumberField = `//td[@field-information-name="Trauma.TraumaNumber"]`
    private patientArrivalTimeInput = `//input[@di-time-control="Trauma.FacilityArrivalTime"]`
    private patientLastNameInput = `//tr[@field-information-name="PatientNameLastRow"]//td[@field-information-name="Trauma.PatientName.Last"]//input`
    private patientFirstNameInput = `//di-string-input[@field-information-name="Trauma.PatientName.First"]//input`
    private atccId = `//di-string-input[@field-information-name="Trauma.LinkageNumber"]//input`

    //Locator of Patient Information form
    private ssnInput = `//di-string-input[@field-information-name="Trauma.SocialSecurityNumber"]//input`
    private dateOfBirthInput = `//di-date-input[@field-information-name="Trauma.BirthDate"]//input`
    private ageInput = `//di-int-input[@field-information-name="Trauma.AgeValue"]//input`
    private ageInDropdown = `//di-code-and-description-field[@field-information-name="Trauma.AgeUnit"]//div[@uib-dropdown]`
    private optionOfAgeInDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.AgeUnit"]//span[contains(text(),'${optionValue}')]`
    private raceButton = `//di-button-field[@field-information-name="RaceButton"]//button`
    private raceCodeInput = (fieldNumber?: number) => `//di-code-and-description-field[@field-information-name="Trauma.Race${fieldNumber ? fieldNumber : ''}"]//input[@di-code-input-element]`
    private raceDescriptionInput = (fieldNumber?: number) => `//di-code-and-description-field[@field-information-name="Trauma.Race${fieldNumber ? fieldNumber : ''}"]//input[@di-desc-input-element]`
    private optionOfRaceDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Race"]//span[contains(text(),'${optionValue}')]`
    private genderDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Gender"]//div[@uib-dropdown]`
    private optionOfGenderDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Gender"]//span[contains(text(),'${optionValue}')]`
    private genderIdentityDropdown = `//di-code-and-description-field[@field-information-name="Trauma.GenderIdentity"]//div[@uib-dropdown]`
    private optionOfGenderIdentityDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.GenderIdentity"]//span[contains(text(),'${optionValue}')]`
    private ethnicityDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Ethnicity"]//div[@uib-dropdown]`
    private optionOfEthnicityDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.Ethnicity"]//span[contains(text(),', ${optionValue}')]`
    private genderAffirmingHormoneTherapyDropdown = `//di-code-and-description-field[@field-information-name="Trauma.GenderAffirmingHormoneTherapy"]//div[@uib-dropdown]`
    private optionOfGenderAffirmingHormoneTherapyDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.GenderAffirmingHormoneTherapy"]//span[contains(text(),', ${optionValue}')]`

    //Locators of the Race speed screen
    private availableOptionInRaceSpeedScreen = `//div[@data-ng-repeat="option in options"]//label`
    private checkboxForOptionOfRaceSpeedScreen = (optionValue: string) => `//div[@data-ng-repeat="option in options"]//label[contains(text(),'${optionValue}')]/input`

    //Locator of Patient Address Information form 
    private zipInput = `//di-string-input[@field-information-name="Trauma.PatientAddress.Zip"]//input`
    private postalCodeInput = `//di-string-input[@field-information-name="Trauma.PatientAddress.PostalCode"]`
    private homelessCheckbox = `//td[@field-information-name="Trauma.Homeless"]`
    private stateDropdown = `//di-dropdown-field[@field-information-name="Trauma.PatientAddress.State"]`
    private countyDropdown = `//td[@field-information-name="Trauma.PatientAddress.FipsCounty"]//div[@uib-dropdown]`
    private countryDropdown = `//td[@field-information-name="Trauma.PatientAddress.CountryText"]//div[@uib-dropdown]`
    private alternateHomeResidenceDropdown = `//td[@field-information-name="Trauma.AlternateHomeResidence"]//div[@uib-dropdown]`

    async populateFieldOfIdentifiersForm(identifiersData: Identifiers): Promise<string> {
        await this.fillInput(this.patientArrivalTimeInput, identifiersData.arrivalTime)
        await this.fillInput(this.patientLastNameInput, identifiersData.lastName)
        await this.fillInput(this.patientFirstNameInput, identifiersData.firstName)
        switch (process.env.ENV) {
            case 'al_uat':
                await this.fillInput(this.atccId, identifiersData.atccId!)
                break;
        }
        return await this.getElementAttribute(this.traumaNumberField, 'title') || '';
    }

    async populateFieldOfPatientInformationForm(patientInfo: PatientInfo): Promise<void> {
        await this.fillInput(this.dateOfBirthInput, patientInfo.dob)
        await this.selectDropDownOption(this.genderDropdown, this.optionOfGenderDropdown(patientInfo.gender))
        await this.selectDropDownOption(this.genderIdentityDropdown, this.optionOfGenderIdentityDropdown(patientInfo.genderId))
        await this.selectDropDownOption(this.ethnicityDropdown, this.optionOfEthnicityDropdown(patientInfo.ethnicity))
        await this.selectDropDownOption(this.genderAffirmingHormoneTherapyDropdown, this.optionOfGenderAffirmingHormoneTherapyDropdown(patientInfo.genderAHT))
      
        switch (process.env.ENV) {
            case 'al_uat':
                await this.fillInput(this.ssnInput, patientInfo.ssn)
                break;
            case 'il_uat':
                await this.fillInput(this.ssnInput, patientInfo.ssn)
                break;
            case 'sd_uat':
                await this.fillInput(this.ssnInput, patientInfo.ssn)
                break;
        }

        await this.clickElement(this.raceCodeInput());
        await this.typeUsingKeyboard(patientInfo.race);
    }

    async populateFieldOfPatientAddressInformationForm(patientAddressInfo: PatientAddressInfo): Promise<void> {
        await this.fillInput(this.zipInput, patientAddressInfo.zip)
    };

    async clickOnRaceButtonOfPatientInformationForm(): Promise<void> {
        await this.clickElement(this.raceButton)
    }
    async getAvailableOptionsFromRaceSpeedScreen(): Promise<string[]> {
        return this.getTextFromListOfElement(this.availableOptionInRaceSpeedScreen)
    }

    async selectRaceOptionFromSpeedScreenRandomly(options: RaceOptions[]): Promise<RaceOptions[]> {
        const selectedOptions = [...options].sort(() => 0.5 - Math.random()).slice(0, Math.min(6, options.length));
        for (const { description } of selectedOptions) {
            await this.clickElement(this.checkboxForOptionOfRaceSpeedScreen(description));
        }

        await this.clickOnButtonOfSpeedScreen('Race', 'OK')
        return selectedOptions;
    }

    async unselectAllSelectedRaceOptionFromSpeedScreen(options: RaceOptions[]): Promise<void> {
        for (const { description } of options) {
            await this.clickElement(this.checkboxForOptionOfRaceSpeedScreen(description));
        }
        await this.clickOnButtonOfSpeedScreen('Race', 'OK')

    }

    async getSelectedRaceOptionFromPatientInformationForm(): Promise<RaceOptions[]> {
        const selectedOptions: RaceOptions[] = [];

        for (let i = 0; i < 6; i++) {
            const fieldNumber = i === 0 ? undefined : i + 1;

            const codeLocator = this.raceCodeInput(fieldNumber);
            const descLocator = this.raceDescriptionInput(fieldNumber);

            if (await this.isElementVisible(codeLocator) && await this.isElementVisible(descLocator)) {
                const codeValue = (await this.getElementText(codeLocator)).trim();
                const description = (await this.getElementText(descLocator)).trim();
                if (codeValue || description) {
                    selectedOptions.push({ code: codeValue, description });
                }
            }
        }
        return selectedOptions;
    }

    async isRaceCodeInputOfPatientInformationFormEditable(raceCodeInputNumber: number) {
        return await this.isElementReadOnly(this.raceCodeInput(raceCodeInputNumber))
    }

    async populateRaceFieldOfPatientInformationForm(optionCode: string, clickOnDescriptionInput: boolean = true, raceCodeInputNumber: number = 1): Promise<void> {
        if (raceCodeInputNumber === 1) {
            await this.fillInput(this.raceCodeInput(), '')
            await this.clickElement(this.raceCodeInput());
        } else {
            await this.clickElement(this.raceCodeInput(raceCodeInputNumber));
        }

        await this.typeUsingKeyboard(optionCode);
        if (clickOnDescriptionInput) { await this.clickElement(this.raceDescriptionInput(), true); }
    }

    async clickOnRaceDescriptionInput(): Promise<void> {
        await this.clickElement(this.raceDescriptionInput(), true);
    }

    async populateAllRaceFieldsOfPatientInformationForm(
        raceOptions: RaceOptions[]
    ): Promise<{ selected: RaceOptions[]; remaining: RaceOptions[] }> {

        // Shuffle and pick 6 random options
        const shuffled = [...raceOptions].sort(() => Math.random() - 0.5);
        const selectedOptions = shuffled.slice(0, 6);
        const remainingOptions = shuffled.slice(6);

        for (let i = 0; i < selectedOptions.length; i++) {
            const option = selectedOptions[i];
            const fieldNumber = i === 0 ? undefined : i + 1;
            await this.clickElement(this.raceCodeInput(fieldNumber));
            await this.typeUsingKeyboard(option.code);
        }

        return { selected: selectedOptions, remaining: remainingOptions };
    }

    async isRaceOptionDisplayed(optionCode: string): Promise<boolean> {
        return await this.isElementVisible(this.optionOfRaceDropdown(optionCode), 1000);
    }

    //getter methods
    async getTraumaNumber() {
        return this.getValue('attr', this.traumaNumberField, 'title');
    }

    async getPatientArrivalTime() {
        return this.getValue('text', this.patientArrivalTimeInput);
    }

    async getPatientLastName() {
        return this.getValue('text', this.patientLastNameInput);
    }

    async getPatientFirstName() {
        return this.getValue('text', this.patientFirstNameInput);
    }

    async getDateOfBirth() {
        return this.getValue('text', this.dateOfBirthInput);
    }

    async getRaceCode(raceCode: string) {
        return this.getValue('text', this.raceCodeInput());
    }

    async getRaceDescription(raceCode: string) {
        return this.getValue('text', this.raceDescriptionInput());
    }

    async getSSN() {
        return process.env.ENV === "al_uat" || "il_uat" ? this.getValue('text', this.ssnInput) : '';
    }

    async getAtccId() {
        return process.env.ENV === "al_uat" ? this.getValue('text', this.atccId) : '';
    }

    async getZip() {
        return this.getValue('text', this.zipInput);
    }

    async getPostalCode() {
        return this.getValue('text', this.postalCodeInput);
    }

    async getHomeless() {
        return this.getValue('state', this.homelessCheckbox);
    }

    async getState() {
        return this.getValue('attr', this.stateDropdown, 'title');
    }

    async getCounty() {
        return this.getValue('dropdown', 'CountyRow');
    }

    async getCountry() {
        return this.getValue('dropdown', 'CountryRow');
    }

    async getAlternateResidence() {
        return this.getValue('dropdown', 'AlternateResidenceRow');
    }

}