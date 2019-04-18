import SpreadsheetApp from './spreadsheet-simulator';
import SheetAccessor from './sheet-accessor';
import QueryDriver from './query-driver';
import QueryReturn from './query-return';

let sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test');
const sheetAccessor= new SheetAccessor(sheet);

const query=function(r){
  if(r.nuggets.value===r.nuggets.fontcolor){
      return true;
  }
}

const queryDriver=new QueryDriver(query,'test');
const queryReturn=new QueryReturn(queryDriver);

Logger.log(JSON.stringify(sheet));
Logger.log(JSON.stringify(sheetAccessor));
Logger.log(JSON.stringify(queryDriver));
Logger.log(JSON.stringify(queryResult));
