/**
 * DataController sheetAccessor, instanceOptions, requestedAttributesSet
 * QueryDriver query,type
 */

import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import RowIndexCursor from './row-index-cursor';
import RecordsContainer from './records-container';
import getUnique from './get-unique';
import runQuery from './run-query';

import {
  TOP,
  BOTTOM,
  WRITE_LEVEL_CELL,
  WRITE_LEVEL_ROW,
  WRITE_LEVEL_TABLE,
  COLORS
} from './CONSTANTS';

const TableProxy = () => {
  function mount(sheetNameOrOptions) {
    try {
      const instanceOptions = new InstanceOptions(sheetNameOrOptions);
      const sheetAccessor = new SheetAccessor(instanceOptions);
      const rowIndexCursor = new RowIndexCursor(sheetAccessor);
      const mainRecordsContainer = new RecordsContainer();

      const core = {
        instanceOptions,
        sheetAccessor,
        rowIndexCursor,
        mainRecordsContainer
      };

      const api = {};

      Object.defineProperty(api, 'query', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: (query, withRecords) => {
          const queryReturn = runQuery(core, query, withRecords);
          mainRecordsContainer.absorb(queryReturn.recordsContainer);
          rowIndexCursor.consumeSelection(queryReturn.resultSet);
          return this;
        }
      });

      Object.defineProperty(api, 'unique', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: (columnName, attribute) => {
          const queryReturn = getUnique(core, columnName, attribute);
          return queryReturn.resultSet.values;
        }
      });

      Object.defineProperty(api, 'flush', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: () => {
          rowIndexCursor.flush();
          mainRecordsContainer.flush();
          return this;
        }
      });

      Object.defineProperty(api, 'records', {
        enumerable: true,
        get: () => {
          return mainRecordsContainer;
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
        }
      });

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
