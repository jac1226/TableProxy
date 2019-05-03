/**
 * Operations
 */

import { UniqueSet } from './map-unique';
import QueryDriver from './query-driver';
import { AttributesSet } from './data-payload';
import processQuery from './process-query';
import { inArray, isObject } from './utilities';
import { DEFAULT_ATTRIBUTE, SUPPORTED_ATTRIBUTES, OP_UNIQUE, OP_QUERY, OP_UPDATE  } from './CONSTANTS';

/**
 * runQuery - processes query against indices in mainCursor
 * @param {object} core 
 * @param {function} query 
 * @param {boolean|undefined} returnWithRecords 
 * @param {AttributesSet} attributesSet 
 */
export function runQuery(core, query, returnWithRecords, attributesSet) {
  if (!(attributesSet instanceof AttributesSet)) {
    throw new TypeError(`runQuery requires an instance of AttributesSet.`);
  }
  const queryDriver = new QueryDriver(OP_QUERY)
    .setQuery(query)
    .setRequestedAttributes(attributesSet)
    .setReturnWithRecords(returnWithRecords);
  return processQuery(core, queryDriver);
}

/**
 * runUpdate - processes updates against indices in mainCursor
 * @param {object} core 
 * @param {array} records 
 * @param {string|undefined} matchColumnName 
 * @param {string|undefined} matchAttributeName 
 * @param {boolean|undefined} matchUnique 
 */
function runUpdate(core, records, matchColumnName, matchAttributeName, matchUnique) {
  const matchColName = matchColumnName || core.instanceOptions.idColumnName;
  const matchColIndex = core.sheetAccessor.getColumnIndex(matchColName);
  if (matchColIndex === -1) {
    throw new Error(`update failed: ${matchColumnName} is an invalid column name.`);
  }
  const matchAttrName = matchAttributeName || core.instanceOptions.idAttributeName;
  if (!inArray(matchAttrName, SUPPORTED_ATTRIBUTES)) {
    throw new Error(`update failed: ${matchAttrName} is an invalid attribute name.`);
  }

  const queryDriver = new QueryDriver(OP_UPDATE)
    .setReturnWithRecords(true)
    .setMatchColumnName(matchColName)
    .setMatchAttributeName(matchAttrName)
    .setMatchUnique(matchUnique)
    .setRecordObjectsToWrite(records);

  return processQuery(queryDriver);
}

/**
 * unique - finds unique values for a columnName, attribute combination
 * @param {object} core 
 * @param {string} columnName 
 * @param {string|undefined} attribute 
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

  const queryDriver = new QueryDriver(OP_UNIQUE).setQuery(query).addAttribute(attr);
  processQuery(core, queryDriver);

  return aggregator.values;
}

/**
 * getExportObject - builds object for export
 * @param {object} core 
 * @param {boolean|undefined} withRawData 
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
      core.instanceOptions.exportAttributes
    ).resultSet.values();
  } else {
    records = core.mainCursor.values();
  }

  return {
    records,
    rawData: withRawData
      ? core.sheetAccessor.getDataPayload(core.instanceOptions.exportAttributes)
      : 'rawData not requested'
  };
}
