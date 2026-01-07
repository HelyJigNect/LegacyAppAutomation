import { faker } from "@faker-js/faker";
import { InjuryInformation } from "../../../dataObjects/trauma/injury/injuryInformation";
import { TsHelper } from "../../../utils/tsHelper";

export class InjuryInfoData {

    static getInjuryInfoData(arrivalDate: string): InjuryInformation {
        const base = new Date(arrivalDate);
        const to = new Date(base.getTime());
        to.setDate(base.getDate() - 1);
        const from = new Date(to.getTime());
        from.setDate(to.getDate() - 1);

        return {
            injuryDate: TsHelper.formatDate(faker.date.between({ from, to })),
            injuryTime: TsHelper.getRandomTime(0, 23),
            ICD10LocationCode: "Y92.9, Unspecified place or not applicable",
            restraints: "None",
            airbags: "No Airbags in Vehicle",
            equipment: "None",
            workRelated: "No",
            domesticViolence: "No",
            reportOfPhysicalAbuse: "No"
        }
    }
}