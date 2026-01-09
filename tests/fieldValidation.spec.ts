import { expect, test } from '../fixtures/fixtures';
import { RecordInfoData } from '../dataFactory/trauma/demographic/recordInfoData';
import { TraumaData } from '../dataFactory/trauma/traumaData';
import { PatientData } from '../dataFactory/trauma/demographic/patientData';
import { InjuryInfoData } from '../dataFactory/trauma/injury/injuryInfoData';
import { MechanismOfInjuryData } from '../dataFactory/trauma/injury/mechanismOfInjuryData';
import { SceneTransportData } from '../dataFactory/trauma/prehospital/sceneTransportData';
import { ReferralHistoryData } from '../dataFactory/trauma/referringFacility/referralHistoryData';
import { InitialDischargeData } from '../dataFactory/trauma/outcome/initialDischargeData';
import { BillingData } from '../dataFactory/trauma/outcome/billingData';
import { ComorbiditiesData } from '../dataFactory/trauma/diagnosis/comorbiditiesData';
import { ArrivalData } from '../dataFactory/trauma/edResus/arrivalData';
import { InitialAssessmentData } from '../dataFactory/trauma/edResus/initialAssessmentData';
import { LabsToxicologyData } from '../dataFactory/trauma/edResus/labsToxicologyData';
import { InjuryCodingData } from '../dataFactory/trauma/diagnosis/injuryCodingData';
import { LocationServiceData } from '../dataFactory/trauma/patientTracking/locationServiceData';

const checkFieldValidation_LastName = "Field validation"
test.describe('Field validation', () => {
  test('Check field validation', async ({registriesPage, referringFacilityPage, registriesPageAction, demographicPageAction, injuryPageAction, prehospitalPageAction, referringFacilityPageAction, edResusPageAction, diagnosisPageAction, outcomePageAction, patientTrackingPageAction}, testInfo) => 
  {
    testInfo.annotations.push({ type: 'testrail', description: 'C325052' });
    const traumaDetails = TraumaData.getTraumaData();

    // ---------------- CREATE TRAUMA ----------------
    await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);

    // ---------------- INITIAL VALIDATION ----------------
    await registriesPage.clickOnBtnOfPatientGrid('Check');
    expect(await registriesPage.isResultsPopupVisible()).toBeTruthy();
    let availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();

    // verify initial mandatory fields
    await registriesPageAction.verifyInitialMandatoryFields(availableFieldValidation);

    // ---------------- DEMOGRAPHIC ----------------
    const identifiersData = RecordInfoData.getIdentifiersData(checkFieldValidation_LastName);
    const patientInfoData = PatientData.getPatientData();
    const patientAddressInfoData = PatientData.getPatientAddressData();
    await demographicPageAction.populateTheFormOfDemographicTab(identifiersData, patientInfoData, patientAddressInfoData);
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    await demographicPageAction.verifyDemographicMandatoryFields(availableFieldValidation);

    // ---------------- INJURY ----------------
    const injuryInformation = InjuryInfoData.getInjuryInfoData(traumaDetails.arrivalDate);
    const eCodesData = MechanismOfInjuryData.getECodesData();
    await injuryPageAction.populateTheFormOfInjuryTab(injuryInformation, eCodesData);
    await registriesPage.clickOnBtnOfPatientGrid('Check');
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    await injuryPageAction.verifyInjuryMandatoryFields(availableFieldValidation);

    // ---------------- PREHOSPITAL ----------------
    const povWalkIn = SceneTransportData.getPrehospitalInfoData().povWalkIn;
    await prehospitalPageAction.populateThePrehospitalTab(povWalkIn);
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    await prehospitalPageAction.verifyPrehospitalMandatoryFields(availableFieldValidation);

    // ---------------- REFERRING FACILITY ----------------
    const referralData = ReferralHistoryData.getReferralHistoryData().transferIn;
    await referringFacilityPageAction.populateTheReferringFacilityTab(referralData);
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    await referringFacilityPageAction.verifyReferringFacilityMandatoryFields(availableFieldValidation);

    // ---------------- ED/RESUS ----------------
    const patientArrivalDetails = ArrivalData.getArrivalData(traumaDetails.arrivalDate);
    const initialAssessmentData = InitialAssessmentData.getInitialAssessmentData();
    const vitalsData = InitialAssessmentData.getVitalsData();
    const alcoholData = LabsToxicologyData.getAlcoholData();
    await edResusPageAction.populateTheEdResusTab(patientArrivalDetails, initialAssessmentData, vitalsData, alcoholData);
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    await edResusPageAction.verifyEdResusMandatoryFields(availableFieldValidation);

    // ---------------- DIAGNOSIS ----------------
    const preArrivalCardiacArrest = ComorbiditiesData.getComorbiditiesData().preArrivalCardiacArrest;
    const injuryCodingData = InjuryCodingData.getInjuryCodingData();
    await diagnosisPageAction.populateTheFormOfDiagnosisTab(preArrivalCardiacArrest, injuryCodingData);
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    await diagnosisPageAction.verifyDiagnosisMandatoryFields(availableFieldValidation);

    // ---------------- OUTCOME ----------------
    const dischargeInformation = InitialDischargeData.getDischargeInformationData(patientArrivalDetails.edDepartureOrderDate);
    const billingData = BillingData.getBillingInfoData();
    await outcomePageAction.populateTheFormOfOutcomeTab(dischargeInformation, billingData);
    await registriesPage.clickOnBtnOfPatientGrid('Check');
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    referringFacilityPage.clickOnCancelButtonIfSpeedScreenDisplayed();
    await outcomePageAction.verifyOutcomeMandatoryFields(availableFieldValidation);

    // ---------------- PATIENT TRACKING ----------------
    const locationServiceData = LocationServiceData.getLocationServiceData();
    await referringFacilityPage.clickOnCloseButtonFromResultPopup();
    await patientTrackingPageAction.populateThePatientTrackingTab(locationServiceData);
    await registriesPage.clickOnBtnOfPatientGrid('Check');
    availableFieldValidation = await referringFacilityPage.clickOnRecheckBtnAndGetListOfFieldValidationPresentInResultPopup();
    await patientTrackingPageAction.verifyPatientTrackingMandatoryFields(availableFieldValidation);
  });
});