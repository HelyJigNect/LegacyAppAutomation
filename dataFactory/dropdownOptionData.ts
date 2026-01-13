import { DropDownOption } from "../dataObjects/dropdownOption";
import { ExcelReader } from "../utils/excelReader";
import { TsHelper } from "../utils/tsHelper";

export class DropDownOptionData {

    static getDropDownOptionData(filePath: string, sheetName: string, count: number = 1, recordAction: string = 'All', desc?: string): DropDownOption[] {
        const rawData: any[] = ExcelReader.readSheet<any>(filePath, sheetName);

        const mappedData: DropDownOption[] = rawData.map(row => ({
            action: row['Action']?.trim() ?? '',
            type: row['Type']?.trim() ?? '',
            code: row['Code/Header']?.trim() ?? '',
            shortDescription: row['Short Description']?.trim() ?? '',
            longDescription: row['Long Description']?.trim() ?? ''
        }));
        const filteredData =
            recordAction === 'All'
                ? mappedData
                : mappedData.filter(item => item.action === recordAction);

        const randomData = TsHelper.getRandomFromList(filteredData, count);
        const result = Array.isArray(randomData) ? randomData : [randomData];

        if (desc) {
            result.forEach(item => {
                if (item.action === 'Retire') {
                    item.shortDescription = `${item.shortDescription}${desc}`;
                }
            });
        }

        return result;
    }
    // static getDropDownOptionData(filePath: string, sheetName: string, count: number = 1, recordAction: string = 'All', desc?: string): DropDownOption[] {
    //     const rawData: any[] = ExcelReader.readSheet<any>(filePath, sheetName);

    //     const mappedData: DropDownOption[] = rawData.map(row => ({
    //         action: row['Action']?.trim() ?? '',
    //         type: row['Type']?.trim() ?? '',
    //         code: row['Code/Header']?.trim() ?? '',
    //         shortDescription: row['Short Description']?.trim() ?? '',
    //         longDescription: row['Long Description']?.trim() ?? ''
    //     }));

    //     const randomData = TsHelper.getRandomFromList(mappedData, count);
    //     const result = Array.isArray(randomData) ? randomData : [randomData];

    //     if (desc) {
    //         result.forEach(item => {
    //             if (item.action === 'Retire') {
    //                 item.shortDescription = `${item.shortDescription}${desc}`;
    //             }
    //         });
    //     }

    //     return result;
    // }
}