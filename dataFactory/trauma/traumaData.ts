import { Trauma } from "../../dataObjects/trauma/trauma";
import { TsHelper } from "../../utils/tsHelper";

export class TraumaData {
    static getTraumaData(): Trauma {
        return {
            arrivalDate: TsHelper.formatDate(TsHelper.getRandomDateBetweenDays(3, 5)),
            patientType: "Trauma Only"
        };
    }
}