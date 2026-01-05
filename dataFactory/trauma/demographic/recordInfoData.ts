import { faker } from "@faker-js/faker";
import { Identifiers } from "../../../dataObjects/trauma/demographic/recordInfo";
import { TsHelper } from "../../../utils/tsHelper";

export class RecordInfoData {

    static getIdentifiersData(lastName?: string): Identifiers {
        return {
            arrivalTime: TsHelper.getRandomTime(0, 12),
            firstName: faker.person.firstName(),
            lastName: lastName || faker.person.lastName(),
            atccId: (faker.number.int({ min: 85, max: 100 })).toString()
        }
    }

    static getIdentifiersDataNotApplicable(): Identifiers {
        return {
            arrivalTime: '/',
            firstName: '/',
            lastName: '/',
            atccId: '/'
        }
    }
    static getIdentifiersDataUnknown(): Identifiers {
        return {
            arrivalTime: '/',
            firstName: '?',
            lastName: '?',
            atccId: '/'
        }
    }
}