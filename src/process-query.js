/**
 * processQuery - a function that executes interactions with sheet data
 * @return {QueryReturn}
 */

import QueryDriver from './query-driver';
import SheetAccessor from './sheet-accessor';
import DataController from './data-controller';
import MainCursor from './main-cursor';
import QueryReturn from './query-return';
import { getRecordProxy, writeToRecordProxy } from './record-proxy';
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
          queryReturn.pushResult(index, clone(recordProxy));
        } else {
          queryReturn.pushResult(index);
        }
      }
    });
  }

  if (inArray(queryDriver.type, [OP_UPDATE])) {
    const matchCol = queryDriver.matchColumnName;
    const matchAttr = queryDriver.matchAttributeName;
    const dataIndex = dataController.getDataIndex(matchCol, matchAttr);

    if (queryDriver.matchUnique && !dataIndex.isUnique) {
      throw new Error(`update failed because${matchCol}.${matchAttr} is not a unique index.`);
    }

    queryDriver.recordsToWrite.forEach((record, index) => {
      if (!Object.prototype.hasOwnProperty.call(record, matchCol)) {
        queryReturn.pushError(`input at index ${index} missing "${matchCol}" column.`);
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(record[matchCol], matchAttr)) {
        queryReturn.pushError(`input at index ${index} missing "${matchAttr}" attribute.`);
        return;
      }

      const localIndex = dataIndex.get(record[matchCol][matchAttr]);

      if (!localIndex) {
        queryReturn.pushWarning(`input at index ${index} had no match.`);
        return;
      }

      dataController.setRowIndex(localIndex);

      if (queryDriver.returnWithRecords) {
        queryReturn.pushResult(localIndex, clone(writeToRecordProxy(recordProxy, record)));
      } else {
        queryReturn.pushResult(localIndex);
      }
    });
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
