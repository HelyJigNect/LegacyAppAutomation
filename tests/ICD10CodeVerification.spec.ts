import { PatientData } from "../dataFactory/trauma/demographic/patientData";
import { RecordInfoData } from "../dataFactory/trauma/demographic/recordInfoData";
import { InjuryCodingData } from "../dataFactory/trauma/diagnosis/injuryCodingData";
import { TraumaData } from "../dataFactory/trauma/traumaData";
import { expect, test } from "../fixtures/fixtures";

const ICD10Option_lastName = 'Check ICD 10 code'
test.describe('Form 45 - dropdown validations', () => {
    let traumaNumber: any;

    test.afterEach(async ({ registriesPageAction }) => {
        await test.step(`Save the trauma record`, async () => {
            await registriesPageAction.saveTheTraumaRecord()
        });
    });

    test('Verify the ICD10 options', async ({ registriesPageAction, demographicPageAction, proceduresPageAction }) => {
        await test.step('Navigate to trauma page and start creating the trauma record', async () => {
            const traumaDetails = TraumaData.getTraumaData()
            await registriesPageAction.navigateToTraumaPageAndStartAddingNewTraumaRecord(traumaDetails);
        })

        await test.step('Populate Record Information form of the Demographic tab', async () => {
            const identifiersData = RecordInfoData.getIdentifiersData(ICD10Option_lastName)
            traumaNumber = await demographicPageAction.populateRecordInfoFormOfDemographicTab(identifiersData)
        })

        await test.step(`Trauma Number : ${traumaNumber} `, () => { })

        await test.step('Navigate the Procedure tab and check the ICD10 options', async () => {
            const icd10CodeData = InjuryCodingData.getICD10CodeData(3)
            await proceduresPageAction.navigateToProcedureTabAndVerifyTheICD10Options(icd10CodeData)
        })
    });
});