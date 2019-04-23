/**
 * processQuery - a function that executes interactions with sheet data
 * @return {QueryReturn}
 */

import QueryDriver from './query-driver';
import SheetAccessor from './sheet-accessor';
import DataController from './data-controller';
import RowIndexCursor from './row-index-cursor';
import QueryReturn from './query-return';
import getRecordProxy from './get-record-proxy';
import clone from './simple-clone';

export default function processQuery(queryDriver, sheetAccessor, rowIndexCursor, instanceOptions) {
  if (!(queryDriver instanceof QueryDriver)) {
    throw new Error(`queryProcessor requires a QueryDriver instance.`);
  }
  if (!(sheetAccessor instanceof SheetAccessor)) {
    throw new Error(`queryProcessor requires a SheetAccessor instance.`);
  }
  if (!(rowIndexCursor instanceof RowIndexCursor)) {
    throw new Error(`queryProcessor requires a RowIndexCursor instance.`);
  }

  /**
   * Build queryResult
   */
  const queryReturn = new QueryReturn(queryDriver);

  /**
   * Build dataController
   */
  const dataController = new DataController(
    sheetAccessor,
    instanceOptions,
    queryDriver.requestedAttributesSet
  );

  /**
   * Build recordProxy
   */
  const recordProxy = getRecordProxy(
    sheetAccessor,
    dataController,
    instanceOptions,
    queryDriver.requestedAttributesSet
  );

  /**
   * Get query from queryDriver and bind to recordProxy
   */
  const query = queryDriver.query.bind(recordProxy);

  /**
   * Iterate through rowIndexCursor & apply query
   */
  rowIndexCursor.forEach(index => {
    dataController.setRowIndex(index);
    if (query(recordProxy)) {
      queryReturn.push(index);
      if (queryDriver.withRecords) {
        queryReturn.returnContainer.records[index] = clone(recordProxy);
      }
    }
  });

  /**
   * capWrite the iteration
   */
  dataController.capWrite();

  /**
   * write the resultSet to the cursor if needed
   */
  if (queryDriver.writeToCursor) {
    rowIndexCursor.consumeSelection(queryReturn.resultSet);
  }

  /**
   * write the resultSet to the cursor if needed
   */
  if (instanceOptions.autoResizeColumns) {
    sheetAccessor.resizeColumns();
  }

  /**
   * stop the timer and return
   */
  return queryReturn.done();
}
