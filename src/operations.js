/**
 * Operations
 */

import { UniqueSet } from './map-unique';
import QueryDriver from './query-driver';
import processQuery from './process-query';
import { inArray } from './utilities';
import clone from './clone';
import {
  DEFAULT_ATTRIBUTE,
  SUPPORTED_ATTRIBUTES,
  OP_UNIQUE,
  OP_SELECT,
  OP_WRITE_RECORDS
} from './CONSTANTS';

/**
 * runQuery - processes query against indices in mainCursor
 * @param {object} core
 * @param {function} query
 * @param {boolean} [returnWithRecords]
 * @param {AttributesSet} [attributesSet]
 */
export function runQuery(core, query, withSelect, returnWithRecords, attributesSet) {
  const queryDriver = new QueryDriver(OP_SELECT)
    .setQuery(query)
    .addAttributes(attributesSet)
    .setReturnWithRecords(returnWithRecords)
    .setWithSelect(withSelect);

  return processQuery(core, queryDriver);
}

/**
 * runObjUpdate - processes updates against indices in mainCursor
 * @param {object} core
 * @param {array} records
 * @param {string} [matchColumnName]
 * @param {string} [matchAttributeName]
 * @param {boolean} [matchUnique]
 */
export function runObjUpdate(core, records, matchColumnName, matchAttributeName) {
  const matchColName = matchColumnName || core.instanceOptions.idColumnName;
  const matchColIndex = core.sheetAccessor.getColumnIndex(matchColName);
  if (matchColIndex === -1) {
    throw new Error(`update failed: ${matchColumnName} is an invalid column name.`);
  }
  const matchAttrName = matchAttributeName || core.instanceOptions.idAttributeName;
  if (!inArray(matchAttrName, SUPPORTED_ATTRIBUTES)) {
    throw new Error(`update failed: ${matchAttrName} is an invalid attribute name.`);
  }

  const queryDriver = new QueryDriver(OP_WRITE_RECORDS)
    .setReturnWithRecords(true)
    .setMatchColumnName(matchColName)
    .setMatchAttributeName(matchAttrName)
    .setRecordObjectsToWrite(records);

  return processQuery(core, queryDriver);
}

/**
 * unique - finds unique values for a columnName, attribute combination
 * @param {object} core
 * @param {string} columnName
 * @param {string} [attribute]
 */
export function getUnique(core, columnName, attribute) {
  if (!core.sheetAccessor.columnExists(columnName)) {
    throw new Error(`unique method failed: invalid columnName ${columnName}`);
  }
  if (attribute && !inArray(attribute, SUPPORTED_ATTRIBUTES)) {
    throw new Error(`unique method failed: invalid attribute: ${attribute}`);
  }

  const attr = attribute || DEFAULT_ATTRIBUTE;
  const aggregator = new UniqueSet();
  const query = r => {
    aggregator.push(r[columnName][attr]);
  };

  const queryDriver = new QueryDriver(OP_UNIQUE, `column:"${columnName}",attribute:"${attr}"`)
    .setQuery(query)
    .addAttribute(attr);
  processQuery(core, queryDriver);

  return aggregator.values;
}

/**
 * getExportObject - builds object for export
 * @param {object} core
 * @param {boolean} [withRawData]
 */
export function getExportObject(core, withRawData) {
  let records;
  if (
    core.mainCursor.isDirty ||
    !core.mainCursor.attributesSet.hasSame(core.instanceOptions.exportAttributes)
  ) {
    records = runQuery(
      core,
      () => true,
      true,
      true,
      core.instanceOptions.exportAttributes
    ).resultSet.values();
  } else {
    records = clone(core.mainCursor.values());
  }

  return {
    records,
    rawData: withRawData
      ? clone(core.sheetAccessor.getDataPayload(core.instanceOptions.exportAttributes))
      : false
  };
}
