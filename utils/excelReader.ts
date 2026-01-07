import * as XLSX from 'xlsx';

export class ExcelReader {

  static readSheet<T>(filePath: string, sheetName: string): T[] {
    const workbook = XLSX.readFile(filePath);

    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
    }

    return XLSX.utils.sheet_to_json<T>(sheet, { defval: '', raw: false });
  }
}