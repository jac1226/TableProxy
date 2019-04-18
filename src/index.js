import SpreadsheetApp from './spreadsheet-simulator';
import SheetAccessor from './sheet-accessor';
import QueryDriver from './query-driver';
import QueryReturn from './query-return';

const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test');
const sheetAccessor = new SheetAccessor(sheet);

const query=function(r){
  let balls=1;
  if(r.nuggets.value === r.nuggets.fontcolor){
      balls=5;
  }
  return balls;
}

const queryDriver = new QueryDriver(query, 'test');
const queryReturn = new QueryReturn(queryDriver);

Logger.log(JSON.stringify(sheet));
Logger.log(JSON.stringify(sheetAccessor));
Logger.log(JSON.stringify(queryDriver));
Logger.log(JSON.stringify(queryReturn));
