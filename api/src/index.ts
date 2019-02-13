import SheetService from "./spreadsheet";

interface IPostEvent {
  parameter: {
    lon: number;
    lat: number;
    updated_at: Date;
  };
}

function doPost(e: IPostEvent) {
  const { lon, lat, updated_at } = e.parameter;

  const sheet = new SheetService(
    "1kP7cII23ime_aL7Vgz3C1MCM8cfvK0TFFFETjJN6U_A",
    "test"
  );

  sheet.saveLastRow([lon, lat, updated_at]);
}

function doGet() {
  const sheet = new SheetService(
    "1kP7cII23ime_aL7Vgz3C1MCM8cfvK0TFFFETjJN6U_A",
    "test"
  );

  const payload = JSON.stringify(sheet.getAllDataByJSON());

  ContentService.createTextOutput();

  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(payload);

  return output;
}
