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
import clone from './clone';

export default function processQuery(core, queryDriver) {
  if (!(queryDriver instanceof QueryDriver)) {
    throw new Error(`queryProcessor requires a QueryDriver instance.`);
  }
  if (!(core.sheetAccessor instanceof SheetAccessor)) {
    throw new Error(`queryProcessor requires a SheetAccessor instance.`);
  }
  if (!(core.rowIndexCursor instanceof RowIndexCursor)) {
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
    core.sheetAccessor,
    core.instanceOptions,
    queryDriver.requestedAttributesSet
  );

  /**
   * Build recordProxy
   */
  const recordProxy = getRecordProxy(core, dataController, queryDriver.requestedAttributesSet);

  /**
   * Get query from queryDriver and bind to recordProxy
   */
  const query = queryDriver.query.bind(recordProxy);

  /**
   * Iterate through rowIndexCursor & apply query
   */
  core.rowIndexCursor.forEach(index => {
    dataController.setRowIndex(index);
    if (query(recordProxy, index)) {
      queryReturn.push(index);
      if (queryDriver.withRecords) {
        queryReturn.recordsContainer.push(clone(recordProxy), index);
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
  if (core.instanceOptions.autoResizeColumns) {
    core.sheetAccessor.resizeColumns();
  }

  /**
   * stop the timer and return
   */
  return queryReturn.done();
}
