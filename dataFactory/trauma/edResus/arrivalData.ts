import { faker } from "@faker-js/faker";
import { Arrival } from "../../../dataObjects/trauma/edResus/arrival";
import { TsHelper } from "../../../utils/tsHelper";

export class ArrivalData {

    static getArrivalData(arrivalDate: string): Arrival {

        const base = new Date(arrivalDate);
        const from = new Date(base.getTime());
        from.setDate(base.getDate() + 1);
        const to = new Date(from.getTime());
        to.setDate(from.getDate() + 2);
        const edDepartureDateObj = faker.date.between({ from, to });

        let arrivalData: Arrival = {
            primaryMedicalEvent: "Yes",
            edDepartureOrderDate: TsHelper.formatDate(edDepartureDateObj),
            edDepartureOrderTime: TsHelper.getRandomTime(0, 6),
            edDepartureDate: TsHelper.formatDate(edDepartureDateObj),
            edDepartureTime: TsHelper.getRandomTime(7, 12),
            signsOfLife: "Arrived with Signs of Life",
            intubationPriorToArrival: "Not Applicable",
            postEdDisposition: "Operating Room",
            primaryTraumaServiceType: "Unknown",
        }

        if (process.env.ENV === 'sd_uat') {
            arrivalData.modeOfArrivalCode = "1";
            arrivalData.modeOfArrivalDescription = "Ground Ambulance";
            arrivalData.responseLevelCode = "1";
            arrivalData.responseLevelDescription = "Full";
            arrivalData.responseActivationDate = TsHelper.formatDate(edDepartureDateObj);
            arrivalData.responseActivationTime = TsHelper.getRandomTime(0, 6);
        }

        return arrivalData
    }
}
