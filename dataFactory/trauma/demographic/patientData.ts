import { faker } from '@faker-js/faker';
import { PatientAddressInfo, PatientInfo, RaceOptions } from "../../../dataObjects/trauma/demographic/patient";

export class PatientData {

    static getPatientData(): PatientInfo {
        const gender = faker.person.sexType().replace(/^\w/, c => c.toUpperCase());
        const dobDate = faker.date.birthdate({ min: 10, max: 50, mode: 'age' });
        const dob = [String(dobDate.getMonth() + 1).padStart(2, '0'), String(dobDate.getDate()).padStart(2, '0'), dobDate.getFullYear(),].join('/');

        const patientData: PatientInfo = {
            dob,
            gender,
            genderId: `${gender} (The Patient Identifies as ${gender})`,
            genderAHT: 'No',
            ethnicity: 'Unknown',
            race: '1',
            raceDescription: 'American Indian',
            ssn: faker.helpers.replaceSymbols('###-##-####')
        }

        if (process.env.ENV === 'dev' || process.env.ENV === 'md_uat') {
            patientData.ssn = '';
        }

        return patientData;
    }

    static getPatientAddressData(): PatientAddressInfo {
        return {
            zip: '90011',
            homeless: 'No',
            state: 'California',
            county: '06037, Los Angeles',
            country: 'United States',
        }
    }

    static getRaceOption(raceOption?: [string, string][]): RaceOptions[] {
        const raceOptions: RaceOptions[] = [];

        if (raceOption?.length) {
            return raceOption.map(([code, description]) => ({ code, description }));
        }

        raceOptions.push(
            { code: '1', description: 'American Indian' },
            { code: '2', description: 'Asian' },
            { code: '3', description: 'Black or African American' },
            { code: '4', description: 'Native Hawaiian or Other Pacific Islander' },
            { code: '5', description: 'White' },
            { code: '6', description: 'Other Race' },
            { code: '?', description: 'Unknown' },
        );

        switch (process.env.ENV) {
            case 'dev':
                raceOptions.push(
                    { code: '7', description: 'Alaska Native' },
                    { code: '8', description: 'Middle Eastern' },
                    { code: '9', description: 'North African' },
                )
                break;
        }
        return raceOptions;
    }
}