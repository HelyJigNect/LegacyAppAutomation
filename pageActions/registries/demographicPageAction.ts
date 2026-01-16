import { Page } from "@playwright/test";
import { PatientAddressInformationMandatoryField, PatientInformationMandatoryField } from "../../data/enum/demographic/patient";
import { IdentifiersMandatoryField } from "../../data/enum/demographic/recordInfo";
import { DemographicTab } from "../../data/enum/tabNames";
import { PatientAddressInfo, PatientInfo, RaceOptions } from "../../dataObjects/trauma/demographic/patient";
import { Identifiers } from "../../dataObjects/trauma/demographic/recordInfo";
import { expect } from "../../fixtures/fixtures";
import { DemographicPage } from "../../pages/registries/demographicPage";
import { RegistriesPage } from "../../pages/registries/registriesPage";


export class DemographicPageAction {
    private registriesPage: RegistriesPage;
    private demographicPage: DemographicPage;

    constructor(page: Page) {
        this.registriesPage = new RegistriesPage(page);
        this.demographicPage = new DemographicPage(page);
    }

    async populateTheFormOfDemographicTab(identifiersData: Identifiers, patientInfo: PatientInfo, patientAddressInfo: PatientAddressInfo): Promise<string> {
        //Form of Record Info sub tab
        const traumaNumber = await this.demographicPage.populateFieldOfIdentifiersForm(identifiersData)

        // Form of Patient sub tab 
        // await this.demographicPage.clickOnTabFromNavbar('Patient');
        await this.demographicPage.clickOnTabFromNavbar(DemographicTab.Patient);
        await this.demographicPage.populateFieldOfPatientInformationForm(patientInfo);
        await this.demographicPage.populateFieldOfPatientAddressInformationForm(patientAddressInfo);
        return traumaNumber
    }

    async populateRecordInfoFormOfDemographicTab(identifiersData: Identifiers): Promise<string> {
        //Form of Record Info sub tab
        const traumaNumber = await this.demographicPage.populateFieldOfIdentifiersForm(identifiersData)
        return traumaNumber
    }

    async verifyAndSelectOptionFromRaceSpeedScreen(raceOption: RaceOptions[]) {
        if (process.env.ENV === 'dev') {
            return;
        }

        //Verify Race options
        await this.demographicPage.clickOnRaceButtonOfPatientInformationForm();
        expect(await this.demographicPage.isSpeedScreenDisplayed(DemographicTab.Race), 'Race speed screen is not displayed').toBeTruthy();
        expect(await this.demographicPage.getAvailableOptionsFromRaceSpeedScreen(), 'Available options for the Race field are not correct').toEqual(raceOption.map(option => option.description.trim()));

        // Select Race Options & verify
        let selectedRaceOption = await this.demographicPage.selectRaceOptionFromSpeedScreenRandomly(raceOption);
        expect(await this.demographicPage.getSelectedRaceOptionFromPatientInformationForm(), 'Selected race option are not as expected').toEqual(selectedRaceOption);

        //Unselect the race option from the Race speed screen
        await this.demographicPage.clickOnRaceButtonOfPatientInformationForm();
        expect(await this.demographicPage.isSpeedScreenDisplayed(DemographicTab.Race), 'Race speed screen is not displayed').toBeTruthy();
        await this.demographicPage.unselectAllSelectedRaceOptionFromSpeedScreen(selectedRaceOption);
        expect(await this.demographicPage.getSelectedRaceOptionFromPatientInformationForm(), 'Selected race option are not as expected').toEqual([]);
    }

    async verifyStateOfFieldWhilePopulatingRaceField(raceOption: RaceOptions[]) {
        let selectedRaceOption = raceOption.sort(() => Math.random() - 0.5).slice(0, 6);
        for (let i = 1; i <= raceOption.length; i++) {
            await this.demographicPage.populateRaceFieldOfPatientInformationForm(selectedRaceOption[i - 1].code, true, i);
            if (i < 6) {
                expect(await this.demographicPage.isRaceCodeInputOfPatientInformationFormEditable(i + 1), `Field ${i + 1} should be enabled when field ${i} is populated`).toBeTruthy();
            }

            for (let j = i + 2; j <= 6; j++) {
                expect(await this.demographicPage.isRaceCodeInputOfPatientInformationFormEditable(j), `Field ${j} should remain disabled when field ${i} is only populated`).toBeFalsy();
            }
        }
        expect(await this.demographicPage.getSelectedRaceOptionFromPatientInformationForm()).toEqual(selectedRaceOption)
    }

    async populateRaceFieldWithNonexistentCode(nonExistentRaceCode: string[]) {
        for (const optionCode of nonExistentRaceCode) {
            await this.demographicPage.populateRaceFieldOfPatientInformationForm(optionCode);
            expect(await this.demographicPage.isRaceOptionDisplayed((optionCode).toString()), `Race options with code: ${(optionCode).toString()} is available`).toBeFalsy();
            await this.demographicPage.clickOnRaceDescriptionInput();
            const selectedOptions = await this.demographicPage.getSelectedRaceOptionFromPatientInformationForm()
            for (const option of selectedOptions) {
                expect(nonExistentRaceCode).not.toContain(option.code)
            }
        }
    }

    //validation   
    async verifyDemographicTab(identifiers: Identifiers, patientInfo: PatientInfo, patientAddress: PatientAddressInfo) {
        const actualIdentifiers: Identifiers = {
            arrivalTime: await this.demographicPage.getPatientArrivalTime(),
            firstName: await this.demographicPage.getPatientFirstName(),
            lastName: await this.demographicPage.getPatientLastName(),
            traumaNumber: await this.demographicPage.getTraumaNumber()
        };
        let actualAtccID = null;
        switch (process.env.ENV) {
            case 'al_uat':
                actualAtccID = await this.demographicPage.getAtccId();
                expect(actualAtccID).toEqual(identifiers.atccId);
                break;
        }
        expect(actualIdentifiers).toMatchObject({
            arrivalTime: identifiers.arrivalTime,
            firstName: identifiers.firstName,
            lastName: identifiers.lastName,
            traumaNumber: identifiers.traumaNumber
        });

        await this.demographicPage.clickOnTabFromNavbar(DemographicTab.Patient);
        const actualPatientInfo: PatientInfo = {
            dob: await this.demographicPage.getDateOfBirth(),
            gender: await this.demographicPage.getDropdownSelectedText('GenderRow'),
            genderId: '',
            genderAHT: await this.demographicPage.getDropdownSelectedText('GenderAffirmingHormoneTherapyRow'),
            ethnicity: await this.demographicPage.getDropdownSelectedText('EthnicityRow'),
            race: await this.demographicPage.getRaceCode(patientInfo.race!),
            raceDescription: await this.demographicPage.getRaceDescription(patientInfo.race!),
            ssn: await this.demographicPage.getSSN(),
        };

        if (process.env.ENV === 'sd_uat') {
            actualPatientInfo.genderId = await this.demographicPage.getDropdownSelectedText('GenderIdentity')
        }
        else {
            actualPatientInfo.genderId = await this.demographicPage.getDropdownSelectedText('GenderIdentityRow')
        }

        expect(actualPatientInfo).toEqual(patientInfo);

        const actualAddress: PatientAddressInfo = {
            zip: await this.demographicPage.getZip(),
            homeless: await this.demographicPage.getHomeless(),
            state: await this.demographicPage.getState(),
            county: await this.demographicPage.getCounty(),
            country: await this.demographicPage.getCountry(),
        };
        expect(actualAddress).toEqual(patientAddress);
    }

    //validation for mandatory fields after clicking "Check"
    async verifyDemographicMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.demographicPage.verifyFieldValidationIsNotPresent(availableFieldValidation, IdentifiersMandatoryField)).toBeTruthy();
        expect(await this.demographicPage.verifyFieldValidationIsNotPresent(availableFieldValidation, PatientInformationMandatoryField)).toBeTruthy();
        expect(await this.demographicPage.verifyFieldValidationIsNotPresent(availableFieldValidation, PatientAddressInformationMandatoryField)).toBeTruthy();
    }

}