import { QaItems } from "../../../dataObjects/trauma/qaTracking/qaItems";

export class QaItemsData {
    static getQaItemsData(): QaItems {
        let qaItem;
        switch (process.env.ENV) {
            case 'al_uat':
            case 'il_uat':
                qaItem = 'Unplanned Visit to the Operating Room';
                break;

            default:
                qaItem = 'Unplanned Return to OR (Site Specific)';
                 break;
        }

        return {
            category: "NTDB",
            qaItem,
            response: "Yes"
        }
    }
}