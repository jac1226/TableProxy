/**
 * Main
 */
import { expSpreadsheetApp as SpreadsheetApp } from './simulation-utils';
import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import MainCursor from './main-cursor';
import Timer from './timer';
import { getUnique, runQuery, getExportObject } from './operations';
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
  function mount(sheetNameOrOptions, headerAnchorToken) {
    try {
      const instanceOptions = new InstanceOptions(sheetNameOrOptions, headerAnchorToken);
      const sheetAccessor = new SheetAccessor(instanceOptions);
      const mainCursor = new MainCursor(sheetAccessor);

      if (!instanceOptions.uniqueIdColumnName) {
        instanceOptions.idColumnName = sheetAccessor.getDefaultIdColumn();
      }

      const core = {
        instanceOptions,
        sheetAccessor,
        mainCursor
      };

      const api = {};

      Object.defineProperty(api, 'query', {
        enumerable: true,
        value: (query, withRecords) => {
          const timer = new Timer(`API query call`);
          const queryReturn = runQuery(core, query, withRecords);
          mainCursor.consumeReturn(queryReturn);
          timer.stop();

          return this;
        }
      });

      Object.defineProperty(api, 'update', {
        enumerable: true,
        value: (records, matchColumnName, matchAttributeName, matchUnique) => {
          const timer = new Timer(`API update call`);
          const updateReturn = runUpdate(
            core,
            records,
            matchColumnName,
            matchAttributeName,
            matchUnique
          );
          mainCursor.consumeReturn(updateReturn);
          timer.stop();

          return this;
        }
      });

      Object.defineProperty(api, 'records', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API retrieve records`);
          if (mainCursor.isDirty) {
            const queryReturn = runQuery(core, () => true, true, mainCursor.attributesSet);
            mainCursor.consumeReturn(queryReturn);
          }
          timer.stop();

          return mainCursor.values();
        }
      });

      Object.defineProperty(api, 'unique', {
        enumerable: true,
        value: (columnName, attribute) => {
          const timer = new Timer(`API unique call`);
          const uniqueValues = getUnique(core, columnName, attribute);
          timer.stop();

          return uniqueValues;
        }
      });

      Object.defineProperty(api, 'flush', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API flush call`);
          mainCursor.flush();
          timer.stop();

          return this;
        }
      });

      Object.defineProperty(api, 'getExportObject', {
        enumerable: true,
        value: withRawData => {
          const timer = new Timer(`API retrieve exportObject`);
          const exportObject = getExportObject(core, withRawData);
          timer.stop();

          return exportObject;
        }
      });

      /**
       * Establish options setters
       */
      Object.defineProperties(api, {
        setSheetName: {
          enumerable: true,
          value: input => {
            instanceOptions.sheetName = input;
            return api;
          }
        },
        setColumnFilter: {
          enumerable: true,
          value: input => {
            instanceOptions.columnFilter = input;
            return api;
          }
        },
        setExportAttributes: {
          enumerable: true,
          value: input => {
            instanceOptions.exportAttributes = input;
            return api;
          }
        },
        setWriteLevel: {
          enumerable: true,
          value: input => {
            instanceOptions.writeLevel = input;
            return api;
          }
        },
        setAutoResizeColumns: {
          enumerable: true,
          value: input => {
            instanceOptions.autoResizeColumns = input;
            return api;
          }
        },
        setComputedProperties: {
          enumerable: true,
          value: input => {
            instanceOptions.computedProperties = input;
            return api;
          }
        },
        setIdColumnName: {
          enumerable: true,
          value: input => {
            instanceOptions.idColumnName = input;
            return api;
          }
        },
        setIdAttributeName: {
          enumerable: true,
          value: input => {
            instanceOptions.idAttributeName = input;
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
