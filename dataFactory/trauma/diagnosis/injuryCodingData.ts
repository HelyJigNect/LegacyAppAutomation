import { DropDownOption } from "../../../dataObjects/dropdownOption";
import { InjuryCoding } from "../../../dataObjects/trauma/diagnosis/injuryCoding";
import { DropDownOptionData } from "../../dropdownOptionData";

export class InjuryCodingData {
    static getInjuryCodingData(): InjuryCoding {
        return {
            narrative: "sdh"
        }
    }

    static getICD10CodeData(count: number = 1, desc?: string): DropDownOption[] {
        return DropDownOptionData.getDropDownOptionData('data/procedure_ICD10.xlsx', 'Sheet1', count, desc);
    }
}