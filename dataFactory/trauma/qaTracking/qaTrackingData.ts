import { qaTracking } from "../../../dataObjects/trauma/qaTracking/qaTracking";

export class QaTrackingData {
    static getQaTrackingData(): qaTracking {
        return {
            code: "41",
            description: "Unplanned Return to OR (Site Specific)",
        }
    }
}