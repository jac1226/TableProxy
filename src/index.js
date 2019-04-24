/**
 * DataController sheetAccessor, instanceOptions, requestedAttributesSet
 * QueryDriver query,type
 */

import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import RowIndexCursor from './row-index-cursor';
import RecordsContainer from './records-container';
import getUniqueDescriptor from './get-unique';
import getQueryDescriptor from './run-query';

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
      const core = {
        instanceOptions: new InstanceOptions(sheetNameOrOptions),
        sheetAccessor: new SheetAccessor(instanceOptions),
        rowIndexCursor: new RowIndexCursor(sheetAccessor),
        mainRecordsContainer: new RecordsContainer()
      };

      const api = {};

      Object.defineProperty(api, 'query', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: (query, withRecords) => {
          const queryReturn = runQuery(core, query, withRecords);
          core.mainRecordsContainer.absorb(queryReturn.recordsContainer);
          core.rowIndexCursor.consumeSelection(queryReturn.resultSet);
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
          core.rowIndexCursor.flush();
          core.mainRecordsContainer.flush();
          return this;
        }
      });

      Object.defineProperty(api, 'records', {
        enumerable: true,
        get: () => {
          return core.mainRecordsContainer;
        }
      });

      /**
       * Establish options setters
       */
      Object.defineProperties(api, {
        setSheetName: {
          value: input => {
            core.instanceOptions.sheetName = input;
            return api;
          }
        },
        setHeaderAnchorToken: {
          value: input => {
            core.instanceOptions.headerAnchorToken = input;
            return api;
          }
        },
        setColumnFilter: {
          value: input => {
            core.instanceOptions.columnFilter = input;
            return api;
          }
        },
        setExportAttributes: {
          value: input => {
            core.instanceOptions.exportAttributes = input;
            return api;
          }
        },
        setExportOnlySelected: {
          value: input => {
            core.instanceOptions.exportOnlySelected = input;
            return api;
          }
        },
        setWriteLevel: {
          value: input => {
            core.instanceOptions.writeLevel = input;
            return api;
          }
        },
        setAutoResizeColumns: {
          value: input => {
            core.instanceOptions.autoResizeColumns = input;
            return api;
          }
        },
        setComputedProperties: {
          value: input => {
            core.instanceOptions.computedProperties = input;
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
