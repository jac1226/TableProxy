/**
 * Operations
 */

import { UniqueSet } from './map-unique';
import QueryDriver from './query-driver';
import processQuery from './process-query';
import { inArray } from './utilities';
import { DEFAULT_ATTRIBUTE, SUPPORTED_ATTRIBUTES } from './CONSTANTS';
// import { AttributesSet } from './data-payload';

/**
 * query
 */
export function runQuery(core, query, returnWithRecords, attributesSet) {
  if (attributesSet) {
    console.log('export');
    console.log(attributesSet.values);
  }
  const queryDriver = new QueryDriver('query')
    .setQuery(query)
    .setRequestedAttributes(attributesSet)
    .setReturnWithRecords(returnWithRecords);
  return processQuery(core, queryDriver);
}

/**
 * getExportObject
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

/**
 * unique
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
  const queryDriver = new QueryDriver('unique').setQuery(query).addAttribute(attr);
  processQuery(core, queryDriver);

  return aggregator.values;
}
