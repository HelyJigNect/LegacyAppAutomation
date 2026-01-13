import { test } from '../fixtures/fixtures';
import { RecordInfoData } from '../dataFactory/trauma/demographic/recordInfoData';
import { TraumaData } from '../dataFactory/trauma/traumaData';
import { PatientData } from '../dataFactory/trauma/demographic/patientData';
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
import { InjuryInfoData } from '../dataFactory/trauma/injury/injuryInfoData';

const fullRecordCreation_LastName = "Test create record 1"
test.describe('Create record', () => {
  test('Full record creation', async ({ registriesPageAction, demographicPageAction, injuryPageAction,
    prehospitalPageAction, referringFacilityPageAction, diagnosisPageAction, outcomePageAction, edResusPageAction, patientTrackingPageAction }, testInfo) => {
    //testrail
    testInfo.annotations.push({ type: 'testrail', description: 'C324984' });

    const traumaDetails = TraumaData.getTraumaData();
    const identifiersData = RecordInfoData.getIdentifiersData(fullRecordCreation_LastName);
    const patientInfoData = PatientData.getPatientData();
    const patientAddressInfoData = PatientData.getPatientAddressData();
    const injuryInformation = InjuryInfoData.getInjuryInfoData(traumaDetails.arrivalDate);
    const eCodesData = MechanismOfInjuryData.getECodesData();
    const povWalkIn = SceneTransportData.getPrehospitalInfoData().povWalkIn;
    const referralData = ReferralHistoryData.getReferralHistoryData().transferIn;
    const patientArrivalDetails = ArrivalData.getArrivalData(traumaDetails.arrivalDate);
    const initialAssessmentData = InitialAssessmentData.getInitialAssessmentData();
    const vitalsData = InitialAssessmentData.getVitalsData();
    const alcoholData = LabsToxicologyData.getAlcoholData();
    const preArrivalCardiacArrest = ComorbiditiesData.getComorbiditiesData().preArrivalCardiacArrest;
    const injuryCodingData = InjuryCodingData.getInjuryCodingData();
    const dischargeInformation = InitialDischargeData.getDischargeInformationData(patientArrivalDetails.edDepartureOrderDate);
    const billingData = BillingData.getBillingInfoData();
    const locationServiceData = LocationServiceData.getLocationServiceData();

    // ---------------- CREATE TRAUMA ----------------
    await test.step('Navigate to trauma page and start creating the trauma record', async () => {
      await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
    })

    // ---------------- DEMOGRAPHIC DATA ----------------
    await test.step('Populate forms of the Demographic tab', async () => {
      identifiersData.traumaNumber = await demographicPageAction.populateTheFormOfDemographicTab(identifiersData, patientInfoData, patientAddressInfoData)
    })

    // ---------------- INJURY DATA ----------------
    await test.step('Populate forms of the Injury tab', async () => {
      await injuryPageAction.populateTheFormOfInjuryTab(injuryInformation, eCodesData);
    })

    // ---------------- PREHOSPITAL ----------------
    await test.step('Populate forms of the Prehospital tab', async () => {
      await prehospitalPageAction.populateThePrehospitalTab(povWalkIn);
    })

    // ---------------- REFERRING FACILITY ----------------
    await test.step('Populate forms of the Referring Facility tab', async () => {
      await referringFacilityPageAction.populateTheReferringFacilityTab(referralData);
    })

    // ---------------- ED/RESUS ----------------
    await test.step('Populate forms of the ED/Resus tab', async () => {
      await edResusPageAction.populateTheEdResusTab(patientArrivalDetails, initialAssessmentData, vitalsData, alcoholData);
    })

    // ---------------- PATIENT TRACKING ----------------
    await test.step('Populate forms of the ED/Resus tab', async () => {
      await patientTrackingPageAction.populateThePatientTrackingTab(locationServiceData);
    })

    // ---------------- DIAGNOSIS ----------------
    await test.step('Populate forms of the Diagnosis tab', async () => {
      injuryCodingData.issBodyRegion = await diagnosisPageAction.populateTheFormOfDiagnosisTab(preArrivalCardiacArrest, injuryCodingData);
    })

    // ---------------- OUTCOME ----------------    
    await test.step('Populate forms of the Outcome tab', async () => {
      dischargeInformation.icuDay = await outcomePageAction.populateTheFormOfOutcomeTab(dischargeInformation, billingData);
      dischargeInformation.ventilatorDays = dischargeInformation.icuDay;
      locationServiceData.icuDays = dischargeInformation.icuDay;
    })

    // ---------------- SAVE AND VERIFY ----------------
    await test.step('Save and verify the details from the Trauma Manager table', async () => {
      await registriesPageAction.saveTheRecordAndVerifyDetailsFromTraumaManagerTable(identifiersData, traumaDetails, dischargeInformation)
    });

    // ---------------- VERIFICATION AFTER VIEW ICON ----------------
    await test.step('Click on created trauma view icon and verify each tab data.', async () => {
      await registriesPageAction.clickOnViewIconForTraumaNumber(identifiersData.traumaNumber!);

      await demographicPageAction.verifyDemographicTab(identifiersData, patientInfoData, patientAddressInfoData);
      await injuryPageAction.verifyInjuryTab(injuryInformation, eCodesData);
      await prehospitalPageAction.verifyPrehospitalTab(povWalkIn);
      await referringFacilityPageAction.verifyReferringFacilityTab(referralData);
      await edResusPageAction.verifyEdResusTab(patientArrivalDetails, initialAssessmentData, vitalsData, alcoholData);
      await patientTrackingPageAction.verifyPatientTrackingTab(locationServiceData);
      await diagnosisPageAction.verifyDiagnosisTab(preArrivalCardiacArrest, injuryCodingData);
      await outcomePageAction.verifyOutcomeTab(dischargeInformation, billingData);
    });
  });
});