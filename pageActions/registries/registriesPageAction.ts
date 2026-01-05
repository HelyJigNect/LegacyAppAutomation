import { expect, Page } from "@playwright/test";
import { RegistriesPage } from "../../pages/registries/registriesPage";
import { HomePage } from "../../pages/homePage";
import { Trauma } from "../../dataObjects/trauma/trauma";
import { TsHelper } from "../../utils/tsHelper";
import { Identifiers } from "../../dataObjects/trauma/demographic/recordInfo";
import { DischargeInformation } from "../../dataObjects/trauma/outcome/initialDischarge";
       
import { IdentifiersMandatoryField } from "../../data/enum/demographic/recordInfo";
import { PatientInformationMandatoryField } from "../../data/enum/demographic/patient";
import { PatientAddressInformationMandatoryField } from "../../data/enum/demographic/patient";
import { ECodesMandatoryField } from "../../data/enum/injury/mechanismOfInjury";
import { PrehospitalInformationMandatoryField } from "../../data/enum/prehospital/sceneTransport";
import { ImmediateReferringFacilityMandatoryField } from "../../data/enum/referringFacility/referralHistory";
import { ArrivalInformationMandatoryFields } from "../../data/enum/edResus/arrival";
import { InitialAssessmentMandatoryField } from "../../data/enum/edResus/initialAssessment";
import { AlcoholMandatoryField } from "../../data/enum/edResus/labsToxicology";
import { VitalsMandatoryField } from "../../data/enum/edResus/initialAssessment";
import { ComorbiditiesMandatoryField } from "../../data/enum/diagnosis/comorbidities";
import { DischargeInformationMandatoryField } from "../../data/enum/outcome/initialDischarge";
import { BillingMandatoryField } from "../../data/enum/outcome/billing";

export class RegistriesPageAction {

    private registriesPage: RegistriesPage;
    private homePage: HomePage;

    constructor(page: Page) {
        this.registriesPage = new RegistriesPage(page);
        this.homePage = new HomePage(page);
    }

    async navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaData: Trauma) {
        // console.log('Navigate to trauma page')
        await this.homePage.navigateToTraumaPageUsingNavbar();
        expect(await this.registriesPage.isTraumaManagerGridDisplayed(), 'Trauma Manager Grid is not displayed').toBeTruthy();

        // Adding new Trauma Record
        await this.registriesPage.clickOnBtnOfTraumaManagerGrid('Add New');
        expect(await this.registriesPage.isFormDisplayed('Add Trauma'), 'Add Trauma form is not displayed').toBeTruthy();
        await this.registriesPage.populateFieldOfAddTraumaForm(traumaData);
        await this.registriesPage.clickOnSaveBtnOfNewTraumaGrid();
        expect(await this.registriesPage.isFormDisplayed('Record Information'), 'Record Information form is not displayed').toBeTruthy();
    }

    async navigateToForm(tabName: string, formName: string) {
        await this.registriesPage.clickOnTabFromNavbar(tabName);
        expect(await this.registriesPage.isFormDisplayed(formName), `${formName} form is not displayed while navigating to the ${tabName}`).toBeTruthy();
    }

    async navigateToTab(tabName: string) {
        await this.registriesPage.clickOnTabFromNavbar(tabName);
        expect(await this.registriesPage.getActiveTabFromNavbar(), `${tabName} tab is not active`).toEqual(tabName);
    }

    async saveTheRecordAndVerifyDetailsFromTraumaManagerTable(identifiersData: Identifiers, traumaData: Trauma, dischargeInfoData: DischargeInformation) {
        await this.registriesPage.clickOnBtnOfPatientGrid("Save and Exit")
        await this.registriesPage.waitForLoaderToDisappear(20000)
        expect(await this.registriesPage.isTraumaManagerGridDisplayed(), 'Trauma Manager grid is not displayed').toBeTruthy();
        await this.registriesPage.clickOnBtnOfTraumaManagerGrid('Reset')
        await this.registriesPage.waitForLoaderToDisappear(15000)
        expect(await this.registriesPage.isNewRecordDetailPresentInTraumaManagerTable(identifiersData.traumaNumber!), 'Newly created record is not present in Trauma Manager table').toBeTruthy()

        await this.registriesPage.getDetailsOfRecordFromTraumaManagerTable(identifiersData.traumaNumber!).then(async (recordDetails) => {
            expect(TsHelper.normalizeDate(recordDetails.arrivalDate), 'Arrival Date is not matching').toBe(TsHelper.normalizeDate(traumaData.arrivalDate));
            expect(TsHelper.normalizeDate(recordDetails.dischargeDate), 'Discharge Date is not matching').toBe(TsHelper.normalizeDate(dischargeInfoData.dischargeDate));
        })
    }

    async saveTheTraumaRecord() {
        await this.registriesPage.clickOnCancelButtonIfSpeedScreenDisplayed()
        await this.registriesPage.clickOnBtnOfPatientGrid("Save and Exit")
        await this.registriesPage.waitForLoaderToDisappear(20000)
        expect(await this.registriesPage.isTraumaManagerGridDisplayed(), 'Trauma Manager grid is not displayed').toBeTruthy();
    }

    //validation
    async clickOnViewIconForTraumaNumber(traumaNumber: string) {
        await this.registriesPage.clickOnViewIconForTraumaNumber(traumaNumber);
    }

    async verifyInitialMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, IdentifiersMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, PatientInformationMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, PatientAddressInformationMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, ECodesMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, PrehospitalInformationMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, ImmediateReferringFacilityMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, ArrivalInformationMandatoryFields)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, InitialAssessmentMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, VitalsMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, AlcoholMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, ComorbiditiesMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, DischargeInformationMandatoryField)).toBeTruthy();
        expect(await this.registriesPage.verifyFieldValidationIsPresent(availableFieldValidation, BillingMandatoryField)).toBeTruthy();
    }

}