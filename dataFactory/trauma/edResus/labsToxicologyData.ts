import { Alcohol } from "../../../dataObjects/trauma/edResus/labsToxicology";

export class LabsToxicologyData {

    static getAlcoholData(): Alcohol {
        return {
            alcoholUseIndicator: "No (Not Tested)",
            clinicianAdministered: "None"
        }
    }
}
