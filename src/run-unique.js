/**
 * unique
 */

import UniqueSet from './unique-set';
import QueryDriver from './query-driver';
import processQuery from './process-query';
import { isString, isNumeric, inArray } from './utilities';
import { DEFAULT_ATTRIBUTE, SUPPORTED_ATTRIBUTES } from './CONSTANTS';

export default function getUnique(core, columnName, attribute) {
  if (!isString(columnName) && !isNumeric(columnName)) {
    throw new Error(`unique method requires a string or number columnName`);
  }
  if (attribute && !inArray(attribute, SUPPORTED_ATTRIBUTES)) {
    throw new Error(`unique method receieved invalid attribute: ${attribute}`);
  }

  const attr = attribute || DEFAULT_ATTRIBUTE;
  const aggregator = new UniqueSet();
  const queryDriver = new QueryDriver(r => {
    aggregator.push(r[columnName][attr]);
  }, 'unique');
  queryDriver.requestedAttributesSet.push(attr);

  const queryReturn = processQuery(core, queryDriver);
  queryReturn.resultSet.copyItems(aggregator);

  return queryReturn;
}
