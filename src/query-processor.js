
/**
 * queryProcessor - a function that executes interactions with sheet data
 * @return {QueryReturn}
 */

import QueryDriver from './query-driver';
import SheetAccessor from './sheet-accessor';
import RowIndexCursor from './row-index-cursor';
import QueryReturn from './query-return';

export default function queryProcessor(queryDriver, sheetAccessor, rowIndexCursor){
    if (!(queryDriver instanceof QueryDriver)) {
        throw new Error(`queryProcessor requires a QueryDriver instance.`);
    }
    if (!(sheetAccessor instanceof SheetAccessor)) {
        throw new Error(`queryProcessor requires a SheetAccessor instance.`);
    }
    if (!(rowIndexCursor instanceof RowIndexCursor)) {
        throw new Error(`queryProcessor requires a RowIndexCursor instance.`);
    }

    const queryResult = new QueryReturn(queryDriver);
    const requestedAttributes = queryDriver.requestedAttributes.values; //*** */
    
    const recordProxy = new RecordProxy();
    
    const query = queryDriver.query.bind(recordProxy);
    DataController(sheetAccessor, requestedAttributes, instanceOptions){

    dataController.capWrite();

    /**
      * Determine if rowIndexCursor should be updated
      */
     if(queryDriver.writeToCursor){
        rowIndexCursor.consumeSelection(queryResult.resultSet);
      }


      /**
      * Cap off the QueryResult and return;
      */
      return queryResult.done();


}
