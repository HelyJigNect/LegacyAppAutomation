import { faker } from "@faker-js/faker";
import { DischargeInformation } from "../../../dataObjects/trauma/outcome/initialDischarge";
import { TsHelper } from "../../../utils/tsHelper";

export class InitialDischargeData {

    static getDischargeInformationData(edDepartureOrderDate: string): DischargeInformation {

        const base = new Date(edDepartureOrderDate);
        const from = new Date(base.getTime());
        const to = new Date(from.getTime());
        to.setDate(from.getDate() + 2);

        const dischargeDateObj = faker.date.between({ from, to });

        let dischargedTo;
        switch (process.env.ENV) {
            case 'il_uat':
                dischargedTo = 'Home or Self Care (Routine Discharge)'
                break;

            default:
                dischargedTo = 'Home or Self-Care (Routine Discharge)';
                break;
        }

        return {
            dischargeOrderDate: TsHelper.formatDate(dischargeDateObj),
            dischargeOrderTime: TsHelper.getRandomTime(13, 18),
            dischargeDate: TsHelper.formatDate(dischargeDateObj),
            dischargeTime: TsHelper.getRandomTime(19, 23),
            dischargeStatus: '1',
            dischargeStatusDescription: 'Alive',
            dischargedTo
        };
    }
}