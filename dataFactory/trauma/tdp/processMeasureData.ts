import { VteProphylaxisOption } from "../../../dataObjects/trauma/tdp/processMeasure";


export class ProcessMeasureData {

    static getVteProphylaxisOption(): VteProphylaxisOption[] {
        return [
            { code: '1', description: 'Heparin (Retired 2019)' },
            { code: '5', description: 'None' },
            { code: '6', description: 'LMWH (Dalteparin, Enoxaparin, etc.)' },
            { code: '7', description: 'Direct Thrombin Inhibitor' },
            { code: '8', description: 'Xa Inhibitor (Rivaroxaban, etc.)' },
            { code: '9', description: 'Warfarin (Coumadin)' },
            { code: '10', description: 'Other' },
            { code: '11', description: 'Unfractionated Heparin' },
            { code: '12', description: 'Aspirin' },
            { code: '?', description: 'Unknown' }
        ]
    }
}










