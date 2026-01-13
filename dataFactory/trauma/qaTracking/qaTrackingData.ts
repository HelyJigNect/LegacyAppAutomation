import { DropDownOption } from "../../../dataObjects/dropdownOption";
import { qaTracking } from "../../../dataObjects/trauma/qaTracking/qaTracking";
import { DropDownOptionData } from "../../dropdownOptionData";

export class QaTrackingData {
    static getQaTrackingData(): qaTracking {
        return {
            code: "41",
            description: "Unplanned Return to OR (Site Specific)",
        }
    }
}