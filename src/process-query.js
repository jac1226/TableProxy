/**
 * processQuery - a function that executes interactions with sheet data
 * @return {QueryReturn}
 */

import QueryDriver from './query-driver';
import SheetAccessor from './sheet-accessor';
import DataController from './data-controller';
import MainCursor from './main-cursor';
import QueryReturn from './query-return';
import { getRecordProxy } from './record-proxy';
import clone from './clone';
import { inArray } from './utilities';
import { OP_UNIQUE, OP_QUERY, OP_UPDATE, SUPPORTED_OPS } from './CONSTANTS';

export default function processQuery(core, queryDriver) {
  if (!(queryDriver instanceof QueryDriver)) {
    throw new Error(`queryProcessor requires a QueryDriver instance.`);
  }
  if (!(core.sheetAccessor instanceof SheetAccessor)) {
    throw new Error(`queryProcessor requires a SheetAccessor instance.`);
  }
  if (!(core.mainCursor instanceof MainCursor)) {
    throw new Error(`queryProcessor requires a MainCursor instance.`);
  }
  if (!inArray(queryDriver.type, SUPPORTED_OPS)) {
    throw new Error(`queryDriver had invalid type "${queryDriver.type}"`);
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
  if (inArray(queryDriver.type, [OP_UNIQUE, OP_QUERY])) {
    core.mainCursor.indices.forEach(index => {
      dataController.setRowIndex(index);
      if (query(recordProxy, index)) {
        if (queryDriver.returnWithRecords) {
          queryReturn.resultSet.set(index, clone(recordProxy));
        } else {
          queryReturn.resultSet.set(index);
        }
      }
    });
  }
  
  if (inArray(queryDriver.type, [OP_UPDATE])) {
    const dataIndex = dataController
      .getDataIndex(queryDriver.matchColumnName, queryDriver.matchAttributeName);

    // this.recordsToWrite = null;
    // this.writeIffIndexUnique = true;
    // writeToRecordProxy
    // this.withRecords = false;
    // this.requestedAttributesSet = new UniqueSet();
    // this.indexColumnName;
    // this.indexAttribute;

    this.query = null;
    this.returnWithRecords = false;
    this.requestedAttributesSet = new AttributesSet();
    this.matchColumnName = null;
    this.matchAttributeName = null;
    this.matchUnique = true;
    this.recordsToWrite = null;
    this.otherResults = new Map();

    core.mainCursor.forEach(index => {
      dataController.setRowIndex(index);
      if (query(recordProxy, index)) {
        if (queryDriver.withRecords) {
          queryReturn.recordsContainer.push(index, clone(recordProxy));
        } else {
          queryReturn.push(index);
        }
      }
    });
    return indexer;
  }

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
