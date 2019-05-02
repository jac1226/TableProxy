/**
 * Returns a Record Proxy Object
 * @param {Object} sheetAccessor - SheetAccessor instance
 * @param {Object} dataController - DataController instance
 * @param {Object} instanceOptions - InstanceOptions instance
 * @param {Object} requestedAttributesSet - UniqueSet instance
 * @return {Object} record proxy
 */

import { UniqueSet } from './map-unique';
import SheetAccessor from './sheet-accessor';
import DataController from './data-controller';
import InstanceOptions from './instance-options';
import { INDEX } from './CONSTANTS';

export function getRecordProxy(core, dataController, requestedAttributesSet) {
  if (!(core.sheetAccessor instanceof SheetAccessor)) {
    throw new Error(`getRecordProxy requires a SheetAccessor instance.`);
  }
  if (!(core.instanceOptions instanceof InstanceOptions)) {
    throw new Error(`getRecordProxy requires an InstanceOptions instance.`);
  }
  if (!(dataController instanceof DataController)) {
    throw new Error(`getRecordProxy requires a DataController instance.`);
  }
  if (!(requestedAttributesSet instanceof UniqueSet)) {
    throw new Error(
      `getRecordProxy requires an UniqueSet instance for input parameter requestedAttributesSet.`
    );
  }

  const { columnFilter } = core.instanceOptions;
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

  Object.defineProperty(recordProxy, INDEX, {
    enumerable: true,
    get: () => {
      return dataController.getRowIndex();
    }
  });

  core.sheetAccessor.getHeaderRow().forEach((column, columnIndex) => {
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
    Object.keys(core.instanceOptions.computedProperties).forEach(key => {
      recordProxy[key] = Object.defineProperty({}, 'value', {
        enumerable: true,
        get: core.instanceOptions.computedProperties[key].bind(recordProxy)
      });
    });
  } catch (e) {
    throw new Error(
      `there was a problem creating a record proxy with the specified computedProperties: ${e}`
    );
  }

  return recordProxy;
}

export function writeToRecordProxy(recordProxy, updateObject) {
  Object.keys(recordProxy).forEach(columnName => {
    if (Object.prototype.hasOwnProperty.call(updateObject, columnName)) {
      Object.assign(recordProxy[columnName], updateObject[columnName]);
    }
  });
}
