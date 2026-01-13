import { DemographicTab, ProceduresTab, TDPTab } from "../data/enum/tabNames";
import { PatientData } from "../dataFactory/trauma/demographic/patientData";
import { RecordInfoData } from "../dataFactory/trauma/demographic/recordInfoData";
import { InjuryCodingData } from "../dataFactory/trauma/diagnosis/injuryCodingData";
import { MechanismOfInjuryData } from "../dataFactory/trauma/injury/mechanismOfInjuryData";
import { ProceduresICD10Data } from "../dataFactory/trauma/procedures/proceduresICD10";
import { TraumaData } from "../dataFactory/trauma/traumaData";
import { test } from "../fixtures/fixtures";

const scenario1_lastName = 'RPNumber_1'
const scenario2_lastName = 'RPNumber_2'
const scenario3_lastName = 'RPNumber_3'

test.describe('Form 45 - dropdown validations', () => {
    let traumaNumber: any;

    test.afterEach(async ({ registriesPageAction }) => {
        await test.step(`Save the trauma record`, async () => {
            await registriesPageAction.saveTheTraumaRecord()
        });
    });

    test('Scenario 1', async ({ registriesPageAction, demographicPageAction, injuryPageAction, tdpPageAction, qaTrackingPageAction, proceduresPageAction }) => {
        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(scenario1_lastName)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Click on the Patient tab', async () => {
            await registriesPageAction.navigateToForm(DemographicTab.Patient, 'Patient Information')
        })

        await test.step('Verify the available option in the Speed scree and race field values upon selecting the race option from the Race speed screen', async () => {
            const raceOptions = PatientData.getRaceOption();
            await demographicPageAction.verifyAndSelectOptionFromRaceSpeedScreen(raceOptions)
        })

        await test.step('Navigate To Injury - Mechanism of Injury tab and verify the option codes and descriptions', async () => {
            const injuryCodingData = MechanismOfInjuryData.getICD10MechanismOptionData(3);
            const activityCode = { code: 'Y93.32', description: 'Rappelling' };
            await injuryPageAction.navigateToMechanismOfInjuryAndVerifyTheOptionCode(injuryCodingData, activityCode);
        })

        await test.step('Navigate To Procedures tab', async () => {
            await registriesPageAction.navigateToForm(ProceduresTab.Procedures, 'Procedures')
        })

        await test.step('Select and verify the ICD 10 code(PCS: April 2025 Changes) using the Add Multiple Procedures speed screen', async () => {
            let icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_April2025Change', 3, 'All', ' (Ret Oct 2024)');
            if (process.env.ENV === 'dev') {
                icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_April2025Change', 3);
            }
            await proceduresPageAction.addICD10ProcedureFromAddMultipleProcedureSpeedScreen(icd10OptionData)

            // const icd10OptionsHierarchy = [['Retired Codes', 'Retired 2019', 'Upper Artery', '037Y046, Dilate Up Art, Bifurc, w Drug-elut Intra, Open (Ret 2019)'], ['Retired Codes', 'Retired 2019', 'Upper Artery', '037Y056, Dilation of Up Art, Bifurc, with 2 Drug-elut, Open Approach (Ret 2019)']]
            // await proceduresPageAction.checkICD10DropDownOptionHierarchyFromAddMultipleProcedureSpeedScreen(icd10OptionsHierarchy)

            icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_April2025Change', 3, 'Retire', ' (Ret Oct 2024)');
            if (process.env.ENV === 'dev') {
                icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_April2025Change', 3, 'Retire');
            }
            await proceduresPageAction.addICD10ProcedureFromAddMultipleProcedureSpeedScreen(icd10OptionData)
        })

        await test.step('Select and verify the ICD 10 code(PCS: April 2025 Changes) using the Procedures speed screen', async () => {
            let icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_April2025Change', 3, 'All', ' (Ret Oct 2024)');
            if (process.env.ENV === 'dev') {
                icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_April2025Change', 3, 'Retire');
            }
            await proceduresPageAction.addICD10ProcedureUsingProceduresSpeedScreen(icd10OptionData)
        })

        await test.step('Select and verify the ICD 10 code(CM - DX: October 2025 Changes) using the Add Multiple Procedures speed screen', async () => {
            let icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_October2025Changes', 5, 'All', ' (Ret Oct 2024)');
            if (process.env.ENV === 'dev') {
                icd10OptionData = ProceduresICD10Data.getProceduresICD10DataOptionData('procedure_October2025Changes', 5);
            }
            await proceduresPageAction.addICD10ProcedureFromAddMultipleProcedureSpeedScreen(icd10OptionData)
            // const icd10OptionsHierarchy = [['Retired Codes', 'Retired 2019', 'Upper Artery', '037Y046, Dilate Up Art, Bifurc, w Drug-elut Intra, Open (Ret 2019)'], ['Retired Codes', 'Retired 2019', 'Upper Artery', '037Y056, Dilation of Up Art, Bifurc, with 2 Drug-elut, Open Approach (Ret 2019)']]
            // await proceduresPageAction.checkICD10DropDownOptionHierarchyFromProcedureSpeedScreen(icd10OptionsHierarchy)
        })

        await test.step('Navigate To TDP tab and verify that nonexistent/invalid code cannot be entered and are not retained in the VTE Prophylaxis dropdown', async () => {
            await registriesPageAction.navigateToTab(TDPTab.TDP)
            await tdpPageAction.populateVteProphylaxisFieldWithNonexistentCode(['0', '13'])
        })

        await test.step('Verify that the option is available for Venous Thromboembolism Prophylaxis dropdown and select it', async () => {
            const vteProphylaxisDropdownOption = [{ code: '10', description: 'Other' }]
            for (const option of vteProphylaxisDropdownOption) {
                await tdpPageAction.verifyIfOptionIsAvailableForVteProphylaxisDropdown(option)
                await tdpPageAction.populateVteProphylaxisFieldOfProcessMeasure1Form(option)
            }
        })

        await test.step('Navigate To QA Tracking', async () => {
            await registriesPageAction.navigateToTab('QA Tracking');
        })

        await test.step('Select option from the NTDB speed screen and verify the checkbox state of Explicit Negatives speed screen', async () => {
            const qaItemsDetails = process.env.ENV === 'dev' ? ['Unplanned Return to OR (Site Specific)', `Unplanned Visit to the Operating Room (Retired 2026)`] : ['Unplanned Visit to the Operating Room', 'Unplanned Intubation'];
            await qaTrackingPageAction.selectOptionOfNTDBSpeedScreenAndVerifyCheckboxStateOfExplicitNegativesSpeedScreen(qaItemsDetails)
        })

        await test.step('Navigate To QA Tracking tab and verify the QA Item dropdown option from QA Tracking speed screen', async () => {
            const qaItemOptionsHierarchy = process.env.ENV === 'dev' ? [['NTDB', 'Retired 2026', 'Unplanned Visit to the Operating Room']] : [['NTDB', 'Retired 2022', 'Extremity Compartment Syndrome']];
            await qaTrackingPageAction.navigateToQaTrackingTabAndVerifyTheQaItemOption(qaItemOptionsHierarchy)
        })
    });

    test('Scenario 2', async ({ registriesPageAction, demographicPageAction, injuryPageAction, diagnosisPageAction, tdpPageAction, qaTrackingPageAction }) => {
        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(scenario2_lastName)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Click on the Patient tab', async () => {
            await registriesPageAction.navigateToForm(DemographicTab.Patient, 'Patient Information')
        })

        //Here when checking with 10 sometime 1 and 0 considered different so 2 first race field gets populated with 1 and 2nd race field gets populated with 0
        await test.step('Enter nonexistent code in Race 1 & verify that nonexistent/invalid code cannot be entered and are not retained in the field', async () => {
            await demographicPageAction.populateRaceFieldWithNonexistentCode(['0', '10'])
        })

        await test.step("Enter a mixture of the options in Race fields while verifying the state of the fields", async () => {
            const raceOptions: [string, string][] = [['1', 'American Indian'], ['2', 'Asian'], ['3', 'Black or African American']]
            await demographicPageAction.verifyStateOfFieldWhilePopulatingRaceField(PatientData.getRaceOption(raceOptions))
        })

        await test.step('Navigate To Injury - Mechanism of Injury tab and verify the option codes and descriptions', async () => {
            const injuryCodingData = MechanismOfInjuryData.getICD10MechanismOptionData(3);
            const activityCode = { code: 'Y93.32', description: 'Rappelling' };
            await injuryPageAction.navigateToMechanismOfInjuryAndVerifyTheOptionCode(injuryCodingData, activityCode);
        })

        await test.step('Navigate to the Diagnosis tab and verify the codes using the Narrative field', async () => {
            const narrativeICD10Option = InjuryCodingData.getNarrativeICD10OptionData(4);
            await diagnosisPageAction.navigateToDiagnosisTabAndVerifyTheOptionCodeUsingNarrative(narrativeICD10Option)
        })

        await test.step('Navigate To TDP tab and verify the VTE Prophylaxis dropdown options', async () => {
            const vteProphylaxisDropdownOptions = [{ code: '5', description: 'None' }]
            await tdpPageAction.navigateToTDPTabAndVerifyTheVteProphylaxisDropdownOptions(vteProphylaxisDropdownOptions)
        })

        await test.step('Navigate To QA Tracking', async () => {
            await registriesPageAction.navigateToTab('QA Tracking');
        })

        await test.step('Select option from the Explicit Negatives speed screen and verify the checkbox state', async () => {
            const qaItemsDetails = process.env.ENV === 'dev' ? ['Unplanned Return to OR (Site Specific)', `Unplanned Visit to the Operating Room (Retired 2026)`] : ['Unplanned Visit to the Operating Room', 'Unplanned Intubation'];
            await qaTrackingPageAction.selectOptionOfExplicitNegativesSpeedScreenAndVerifyCheckboxState(qaItemsDetails)
        })

        await test.step('Navigate To QA Tracking tab and verify the QA Item dropdown option from QA Tracking speed screen', async () => {
            const qaItemOptionsHierarchy = process.env.ENV === 'dev' ? [['NTDB', 'Retired 2026', 'Unplanned Visit to the Operating Room']] : [['NTDB', 'Retired 2022', 'Extremity Compartment Syndrome']];
            await qaTrackingPageAction.navigateToQaTrackingTabAndVerifyTheQaItemOption(qaItemOptionsHierarchy)
        })
    });

    test('Scenario 3', async ({ registriesPageAction, demographicPageAction, qaTrackingPageAction }) => {
        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(scenario3_lastName)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Navigate To QA Tracking', async () => {
            await registriesPageAction.navigateToTab('QA Tracking');
        })

        const qaItemsDetails = process.env.ENV === 'dev' ? ['Unplanned Return to OR (Site Specific)', `Unplanned Visit to the Operating Room (Retired 2026)`] : ['Unplanned Visit to the Operating Room', 'Unplanned Intubation'];
        await test.step('Select option from the Explicit Negatives speed screen and verify the checkbox state', async () => {
            await qaTrackingPageAction.selectOptionOfExplicitNegativesSpeedScreenAndVerifyCheckboxState(qaItemsDetails)
        })

        await test.step('Select option from the NTDB speed screen and verify the checkbox state of Explicit Negatives speed screen', async () => {
            await qaTrackingPageAction.selectOptionOfNTDBSpeedScreenAndVerifyCheckboxStateOfExplicitNegativesSpeedScreen(qaItemsDetails)
        })

    });
});