/**
 * Returns a Record Proxy Object
 * @param {Object} sheetAccessor - SheetAccessor instance
 * @param {Object} dataController - DataController instance
 * @param {Object} instanceOptions - InstanceOptions instance
 * @param {Object} requestedAttributesSet - UniqueSet instance
 * @return {Object} record proxy
 */

import UniqueSet from './unique-set';
import SheetAccessor from './sheet-accessor';
import DataController from './data-controller';
import InstanceOptions from './instance-options';

export default function getRecordProxy(
  sheetAccessor,
  dataController,
  instanceOptions,
  requestedAttributesSet
) {
  if (!(sheetAccessor instanceof SheetAccessor)) {
    throw new Error(`getRecordProxy requires a SheetAccessor instance.`);
  }
  if (!(dataController instanceof DataController)) {
    throw new Error(`getRecordProxy requires a DataController instance.`);
  }
  if (!(instanceOptions instanceof InstanceOptions)) {
    throw new Error(`getRecordProxy requires an InstanceOptions instance.`);
  }
  if (!(requestedAttributesSet instanceof UniqueSet)) {
    throw new Error(
      `getRecordProxy requires an UniqueSet instance for input parameter requestedAttributesSet.`
    );
  }

  const { columnFilter } = instanceOptions;
  function columnIsValid(column) {
    if (column === null || column === undefined) {
      return false;
    }
    if (columnFilter.length > 0 && columnFilter.indexOf(column) === -1) {
      return false;
    }
    return true;
  }

  const recordProxy = {};

  sheetAccessor.getHeaderRow().forEach((column, columnIndex) => {
    if (columnIsValid(column)) {
      const columnProxy = {};

      requestedAttributesSet.forEach(attribute => {
        Object.defineProperty(columnProxy, attribute, {
          enumerable: true,
          get: () => {
            return dataController.getColumnByIndex(attribute, columnIndex);
          },
          set: value => {
            return dataController.updateColumnByIndex(attribute, columnIndex, value);
          }
        });
      });

      recordProxy[column] = columnProxy;
    }
  });

  try {
    Object.defineProperties(recordProxy, instanceOptions.computedProperties);
  } catch (e) {
    throw new Error(
      `there was a problem creating a record proxy with the specified computedProperties: ${e}`
    );
  }

  return recordProxy;
}
