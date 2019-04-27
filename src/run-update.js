/**
 * update
 */

import clone from './clone';
import { isString, isNumeric, inArray, isObject } from './utilities';
import UniqueSet from './unique-handling';
import QueryDriver from './query-driver';
import processQuery from './process-query';
import { DEFAULT_ATTRIBUTE, SUPPORTED_ATTRIBUTES } from './CONSTANTS';

export default function update(core, data, matchColumnName, matchAttribute) {
  if (!isArray(data)) {
    throw new TypeError(`update expects an array data input.`);
  }
  if (!isString(matchColumnName) || !isNumeric(matchColumnName)) {
    throw new TypeError(`update expects a string or numeric columnName input.`);
  }
  const attr = matchAttribute === undefined ? DEFAULT_ATTRIBUTE : matchAttribute;
  if (!inArray(attr, SUPPORTED_ATTRIBUTES)) {
    throw new TypeError(`update expects a valid supported attribute input.`);
  }
  
  const colIndex = core.sheetAccessor.getHeaderRow().indexOf(matchColumnName);
  if (columnIndex === -1) {
    throw new Error(`update can't match on columnName ${matchColumnName}.`);
  }

  const columnData = sheetAccessor[attr]
  .getRecordsColumn(columnIndex)
  .map(i => {
    return i[0];
  });

  /**
   * Test column data
   * 1. Must be of ONLY one data type or indexing will not work - throw exception if not.
   * 2. Non-null values MUST be unique or indexing will be ambiguous - throw exception if not.
   */
  const uniqueNonBlankValues = new UniqueSet(columnData).remove('');
  if (!uniqueNonBlankValues.pure) {
    throw new Error(
      `update can't match because multiple data types exist in ${
        uniqueId.columnName
      }: ${uniqueNonBlankValues.holds.toString()}`
    );
  }
  const nonBlankValueCount = columnData.filter(item => {
    return item !== '';
  }).length;

  if (uniqueNonBlankValues.length !== nonBlankValueCount) {
    throw new Error(`update can't match because non-blank values are not unique.`);
  }

}
