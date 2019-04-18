import SpreadsheetApp from './spreadsheet-simulator';
import SheetAccessor from './sheet-accessor';
import QueryDriver from './query-driver';
import QueryReturn from './query-return';

const doGet = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test');
  const sheetAccessor = new SheetAccessor(sheet);
  const query = r => {
    let balls = 1;
    if (r.nuggets.value === r.nuggets.fontcolor) {
      balls = 5;
    }
    return balls;
  };
  const queryDriver = new QueryDriver(query, 'test');
  const queryReturn = new QueryReturn(queryDriver);

  const output={
    sheet:sheet,
    sheetAccessor:sheetAccessor,
    queryDriver:queryDriver,
    queryReturn:queryReturn
  };

  return ContentService.createTextOutput(output)
  .setMimeType(ContentService.MimeType.JSON);
}

global.doGet = doGet;
