import { NotFoundSheet, NotSetColumnName } from "./errors/sheetService";

export default class SheetService {
  constructor(private ssid: string, private sheetName: string) {
    try {
      const sheets = SpreadsheetApp.openById(this.ssid);
      this.sheet = sheets.getSheetByName(this.sheetName);
    } catch (error) {
      throw new NotFoundSheet(this.ssid);
    }
  }

  private sheet: GoogleAppsScript.Spreadsheet.Sheet;

  public deleteRow(row: number) {
    return this.sheet.deleteRow(row);
  }

  public saveLastRow(data: any[]): void {
    this.sheet.appendRow(data);
  }

  public saveCellValue(cell: string, value: string | number) {
    this.sheet.getRange(cell).setValue(value);
  }

  public getCellValue(cell: string) {
    return this.sheet
      .getRange(cell)
      .getValue()
      .toString();
  }

  public getCellsValue(fromCell: string, toCell: string) {
    return this.sheet.getRange(`${fromCell}:${toCell}`).getValues();
  }

  public getAllDataByJSON(): any[] {
    // シートの最終行、列番号を取得
    // row = 列, col = 行
    // A2 : row = 1, col = 2
    const startrow = 1;
    const startcol = 1;
    const lastrow: number = this.sheet.getLastRow();
    const lastcol: number = this.sheet.getLastColumn();

    if (lastrow === 0 || lastcol === 0) {
      throw new NotSetColumnName();
    }

    const sheetdata = this.sheet.getSheetValues(
      startrow,
      startcol,
      lastrow,
      lastcol
    );

    const head = sheetdata.shift() as string[];

    const json = sheetdata.map((v: any[]) => {
      const obj = {};
      v.forEach((_v: string, i: number) => {
        obj[head[i]] = _v;
      });
      return obj;
    });

    return json;
  }
}
