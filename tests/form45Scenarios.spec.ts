import { PatientData } from "../dataFactory/trauma/demographic/patientData";
import { RecordInfoData } from "../dataFactory/trauma/demographic/recordInfoData";
import { TraumaData } from "../dataFactory/trauma/traumaData";
import { expect, test } from "../fixtures/fixtures";
const lastNameRaceField = 'race field scenario'
const lastNameVTEField = 'VTE scenario'
const lastNameNTDBField = 'NTDB Complications scenario'
const lastNameQaItemsField = 'QA Items scenario'

test.describe.skip('Form 45 - Confluence scenarios', () => {
    let traumaNumber: any;

    test.afterEach(async ({ registriesPageAction }) => {
        await test.step(`Save the trauma record`, async () => {
            await registriesPageAction.saveTheTraumaRecord()
        });
    });

    test('New Menu Options for Race Field', async ({ demographicPageAction, demographicPage, registriesPageAction }) => {

        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(lastNameRaceField)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Click on the Patient tab', async () => {
            await registriesPageAction.navigateToForm('Patient', 'Patient Information')
        })

        await test.step('Verify the available option in the Speed scree and race field values upon selecting the race option from the Race speed screen', async () => {
            const raceOptions = PatientData.getRaceOption();
            await demographicPageAction.verifyAndSelectOptionFromRaceSpeedScreen(raceOptions)

            for (const option of PatientData.getRaceOption()) {
                await demographicPage.populateRaceFieldOfPatientInformationForm(option.code);
                expect(await demographicPage.getSelectedRaceOptionFromPatientInformationForm(), 'Selected race option is not as expected').toEqual([option]);
            }
        })

        await test.step("Enter a mixture of the options in all 6 Race fields while verifying the state of the fields", async () => {
            await demographicPageAction.verifyStateOfFieldWhilePopulatingRaceField(PatientData.getRaceOption())
        })

        await test.step('Enter nonexistent code in Race 1 & verify that nonexistent/invalid code cannot be entered and are not retained in the field', async () => {
            await demographicPageAction.populateRaceFieldWithNonexistentCode(['0', '9'])
        })
    });

    test('New Menu Options for Venous Thromboembolism Prophylaxis (VTE Prophylaxis)', async ({ registriesPageAction, demographicPageAction, tdpPageAction }) => {

        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(lastNameVTEField)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Navigate To TDP tab', async () => {
            await registriesPageAction.navigateToTab('TDP')
        })

        await test.step('Enter nonexistent code in VTE Prophylaxis & verify that nonexistent/invalid code cannot be entered and are not retained in the field', async () => {
            await tdpPageAction.populateVteProphylaxisFieldWithNonexistentCode(['0', '13'])
        })

        await test.step('Verify that the option is available for Venous Thromboembolism Prophylaxis dropdown and select it', async () => {
            const vteProphylaxisDropdownOption = [{ code: '9', description: 'Warfarin (Coumadin)' }, { code: '12', description: 'Aspirin' }]
            for (const option of vteProphylaxisDropdownOption) {
                await tdpPageAction.verifyIfOptionIsAvailableForVteProphylaxisDropdown(option)
                await tdpPageAction.populateVteProphylaxisFieldOfProcessMeasure1Form(option)
            }
        })
    });

    test('NTDB Complications', async ({ demographicPageAction, registriesPageAction, qaTrackingPageAction }) => {

        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(lastNameNTDBField)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Navigate To QA Tracking - QA Items tab', async () => {
            await registriesPageAction.navigateToTab('QA Tracking')
        })

        let qaItemsDetails;
        await test.step('Select option from the NTDB speed screen and verify selected option are available in the QA tracking grid', async () => {
            const qaItemsDetails = ['Unplanned Return to OR (Site Specific)', 'Unplanned Visit to the Operating Room (Retired 2026)'];
            await qaTrackingPageAction.selectOptionsFromNTDBSpeedScreen(qaItemsDetails)
        })

        await test.step('Click on the Explicit Negatives button & verify the state of the checkboxes for previously selected qa item', async () => {
            qaItemsDetails = ['Unplanned Return to OR (Site Specific)', 'Unplanned Visit to the Operating Room (Retired 2026)'];
            await qaTrackingPageAction.verifyStateOfOptionCheckboxFromExplicitNegativesSpeedScreenForOptionSelectedFromNTDBSpeedScreen(qaItemsDetails)
        })
    });

    test('QA Items Field', async ({ demographicPageAction, registriesPageAction, qaTrackingPage, qaTrackingPageAction }) => {

        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(lastNameQaItemsField)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Navigate To QA Tracking - QA Tracking tab', async () => {
            await registriesPageAction.navigateToTab('QA Tracking')
            await qaTrackingPage.clickOnTabOfSubNavbarOfQaTracking('QA Tracking');
        })

        let qaItemOptionsHierarchy: any;
        await test.step(`Open QA Tracking speed screen & Verify the Qa Item dropdown's option hierarchy `, async () => {
            qaItemOptionsHierarchy = [['NTDB', 'Unplanned Return to OR (Site Specific)'], ['NTDB', 'Retired 2026', 'Unplanned Visit to the Operating Room']]
            await qaTrackingPageAction.verifyQaItemDropdownHierarchyFromQaTrackingSpeedScreen(qaItemOptionsHierarchy)
        })

        await test.step(`Open QA Tracking speed screen, Select option for an QA Item dropdown and verify the QA Tracking grid/table`, async () => {
            await qaTrackingPageAction.selectQaItemDropdownOptionFromQaTrackingSpeedScreen(qaItemOptionsHierarchy)
        })
    });
});