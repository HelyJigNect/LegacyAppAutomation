import { DropDownOption } from "../../../dataObjects/dropdownOption";
import { InjuryCoding } from "../../../dataObjects/trauma/diagnosis/injuryCoding";
import { ExcelReader } from "../../../utils/excelReader";
import { TsHelper } from "../../../utils/tsHelper";
import { DropDownOptionData } from "../../dropdownOptionData";

export class InjuryCodingData {
    static getInjuryCodingData(): InjuryCoding {
        return {
            narrative: "sdh"
        }
    }

    static getNarrativeICD10OptionData(count: number = 1): InjuryCoding[] {
        const rawData: any[] = ExcelReader.readSheet<any>('data/Book1.xlsx', 'Narrative');

        const mappedData: InjuryCoding[] = rawData.map(row => ({
            narrative: row['Narrative']?.trim() ?? '',
            icd10: row['ICD10']?.trim() ?? '',
            preDot: row['PreDot']?.trim() ?? '',
            severity: row['Severity']?.trim() ?? '',
            issBodyRegion: row['ISS Body Region']?.trim() ?? '',
            icd10Description: row['Short Description']?.trim() ?? '',
        }));

        const randomData = TsHelper.getRandomFromList(mappedData, count);
        const result = Array.isArray(randomData) ? randomData : [randomData];

        return result;
    }
}