import { DropDownOption } from "../../../dataObjects/dropdownOption";
import { InjuryTypeOptions, MechanismOfInjury } from "../../../dataObjects/trauma/injury/mechanismOfInjury";
import { DropDownOptionData } from "../../dropdownOptionData";

export class ProceduresICD10Data {

    static getProceduresICD10DataOptionData(sheetName: string, count: number = 1, recordAction: string = 'All',desc?: string): DropDownOption[] {
        return DropDownOptionData.getDropDownOptionData('data/Book1.xlsx', sheetName, count, recordAction, desc);
    }
}