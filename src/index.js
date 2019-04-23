/**
 * DataController sheetAccessor, instanceOptions, requestedAttributesSet
 * QueryDriver query,type
 */

import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import RowIndexCursor from './row-index-cursor';
import QueryDriver from './query-driver';
import UniqueSet from './unique-set';
import processQuery from './process-query';
import processUniqueId from './process-unique-id';
import { isString, isNumeric, inArray, getTimeStamp, getTimeDiff } from './utilities';

import {
  TOP,
  BOTTOM,
  WRITE_LEVEL_CELL,
  WRITE_LEVEL_ROW,
  WRITE_LEVEL_TABLE,
  COLORS,
  SUPPORTED_ATTRIBUTES,
  DEFAULT_ATTRIBUTE
} from './CONSTANTS';

const TableProxy = () => {
  function mount(sheetNameOrOptions) {
    try {
      const instanceOptions = new InstanceOptions(sheetNameOrOptions);
      const sheetAccessor = new SheetAccessor(instanceOptions);
      const rowIndexCursor = new RowIndexCursor(sheetAccessor);
      let recordsContainer = {};

      const api = {};

      Object.defineProperty(api, 'query', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: query => {
          const queryDriver = new QueryDriver(query, 'query');
          queryDriver.writeToCursor = true;
          queryDriver.withRecords = true;

          const queryReturn = processQuery(
            queryDriver,
            sheetAccessor,
            rowIndexCursor,
            instanceOptions
          );

          recordsContainer = queryReturn.returnContainer.records;
          Logger.log(queryReturn.logStamp);
          return this;
        }
      });

      Object.defineProperty(api, 'unique', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: (columnName, attribute) => {
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

          const queryReturn = processQuery(
            queryDriver,
            sheetAccessor,
            rowIndexCursor,
            instanceOptions
          );

          Logger.log(queryReturn.logStamp);
          return aggregator.values;
        }
      });

      Object.defineProperty(api, 'testUniqueId', {
        enumerable: true,
        configurable: false,
        value: input => {
          const startTime = getTimeStamp();
          const uniqueId = processUniqueId(input);
          const columnIndex = sheetAccessor.getHeaderRow().indexOf(uniqueId.columnName);
          if (columnIndex === -1) {
            throw new Error(`uniqueIdColumnName ${uniqueId.columnName} is invalid.`);
          }
          const columnData = sheetAccessor[uniqueId.attribute]
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
              `multiple data types exist in ${
                uniqueId.columnName
              }: ${uniqueNonBlankValues.holds.toString()}`
            );
          }
          const nonBlankValueCount = columnData.filter(item => {
            return item !== '';
          }).length;

          if (uniqueNonBlankValues.length !== nonBlankValueCount) {
            throw new Error(`Duplicates detected: non-blank values are not unique.`);
          }

          Logger.log(
            `setUniqueIdColumn for sheet ${instanceOptions.sheetName} completed in ${getTimeDiff(
              startTime
            )}ms`
          );
          return true;
        }
      });

      Object.defineProperty(api, 'flush', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: () => {
          rowIndexCursor.flush();
          recordsContainer = {};
          return this;
        }
      });

      Object.defineProperty(api, 'records', {
        enumerable: true,
        get: () => {
          return recordsContainer;
        }
      });

      /**
       * Establish options setters
       */
      Object.defineProperties(api, {
        setSheetName: {
          value: input => {
            instanceOptions.sheetName = input;
            return api;
          }
        },
        setHeaderAnchorToken: {
          value: input => {
            instanceOptions.headerAnchorToken = input;
            return api;
          }
        },
        setColumnFilter: {
          value: input => {
            instanceOptions.columnFilter = input;
            return api;
          }
        },
        setExportAttributes: {
          value: input => {
            instanceOptions.exportAttributes = input;
            return api;
          }
        },
        setExportOnlySelected: {
          value: input => {
            instanceOptions.exportOnlySelected = input;
            return api;
          }
        },
        setWriteLevel: {
          value: input => {
            instanceOptions.writeLevel = input;
            return api;
          }
        },
        setAutoResizeColumns: {
          value: input => {
            instanceOptions.autoResizeColumns = input;
            return api;
          }
        },
        setComputedProperties: {
          value: input => {
            instanceOptions.computedProperties = input;
            return api;
          }
        },
        setUniqueId: {
          value: input => {
            try {
              api.testUniqueId(input);
            } catch (e) {
              throw new Error(`setUniqueId failed: ${e}.`);
            }
            instanceOptions.uniqueId = input;
            return api;
          }
        }
      });

      /**
       * Force instanceOptions.uniqueId through setUniqueId
       */
      if (instanceOptions.uniqueId) {
        api.setUniqueId(instanceOptions.uniqueId);
      }

      return api;
    } catch (e) {
      throw new Error(`TableProxy.mount failed: ${e}`);
    }
  }

  return {
    mount,
    TOP,
    BOTTOM,
    WRITE_LEVEL_CELL,
    WRITE_LEVEL_ROW,
    WRITE_LEVEL_TABLE,
    COLORS
  };
};

global.TableProxy = TableProxy();
