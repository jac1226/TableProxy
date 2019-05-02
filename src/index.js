/**
 * Main
 */
import { expSpreadsheetApp as SpreadsheetApp } from './simulation-utils';
import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import MainCursor from './main-cursor';
import Timer from './timer';
import { getUnique, runQuery } from './operations';
import {
  TOP,
  BOTTOM,
  WRITE_LEVEL_CELL,
  WRITE_LEVEL_ROW,
  WRITE_LEVEL_TABLE,
  COLORS
} from './CONSTANTS';

global.SpreadsheetApp = SpreadsheetApp;

const TableProxy = () => {
  function mount(sheetNameOrOptions) {
    try {
      const instanceOptions = new InstanceOptions(sheetNameOrOptions);
      const sheetAccessor = new SheetAccessor(instanceOptions);
      const mainCursor = new MainCursor(sheetAccessor);

      const core = {
        instanceOptions,
        sheetAccessor,
        mainCursor
      };

      const api = {};

      Object.defineProperty(api, 'query', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: (query, withRecords) => {
          const timer = new Timer(`API query call`);
          const queryReturn = runQuery(core, query, withRecords);
          console.log(queryReturn);
          // mainRecordsContainer.absorb(queryReturn.recordsContainer);
          mainCursor.consumeSelection(queryReturn.resultSet);
          timer.stop();

          return this;
        }
      });

      Object.defineProperty(api, 'unique', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: (columnName, attribute) => {
          const timer = new Timer(`API unique call`);
          const queryReturn = getUnique(core, columnName, attribute);
          timer.stop();

          return queryReturn.resultSet.values;
        }
      });

      Object.defineProperty(api, 'flush', {
        enumerable: true,
        configurable: false,
        writable: false,
        value: () => {
          const timer = new Timer(`API flush call`);
          mainCursor.flush();
          timer.stop();

          return this;
        }
      });

      Object.defineProperty(api, 'records', {
        enumerable: true,
        get: () => {
          return mainCursor.getRecords();
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
