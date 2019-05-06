/**
 * Main
 */
import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import MainCursor from './main-cursor';
import { Map, UniqueSet } from './map-unique';
import { getUnique, runQuery, runUpdate, getExportObject } from './operations';
import Timer from './timer';
import {
  TOP,
  BOTTOM,
  WRITE_LEVEL_CELL,
  WRITE_LEVEL_ROW,
  WRITE_LEVEL_TABLE,
  COLORS
} from './CONSTANTS';

const TableProxy = () => {
  function mount(sheetNameOrOptions, headerAnchorToken) {
    try {
      const instanceOptions = new InstanceOptions(sheetNameOrOptions, headerAnchorToken);
      const sheetAccessor = new SheetAccessor(instanceOptions);
      const mainCursor = new MainCursor(sheetAccessor);
      const lastResults = new Map();

      const core = {
        instanceOptions,
        sheetAccessor,
        mainCursor
      };

      if (!instanceOptions.uniqueIdColumnName) {
        instanceOptions.idColumnName = sheetAccessor.getDefaultIdColumn();
      }

      const api = {};

      Object.defineProperty(api, 'query', {
        enumerable: true,
        value: (query, withRecords) => {
          const timer = new Timer(`API query`);
          const queryReturn = runQuery(core, query, withRecords);
          mainCursor.consumeReturn(queryReturn);
          lastResults
            .clear()
            .set('operation', 'query')
            .set('completed', true)
            .set('count', queryReturn.count)
            .set('duration', timer.stop());

          return this;
        }
      });

      Object.defineProperty(api, 'update', {
        enumerable: true,
        value: (records, matchColumnName, matchAttributeName, matchUnique) => {
          const timer = new Timer(`API update`);
          const queryReturn = runUpdate(
            core,
            records,
            matchColumnName,
            matchAttributeName,
            matchUnique
          );
          lastResults
            .clear()
            .set('operation', 'update')
            .set('completed', true)
            .set('updated', queryReturn.resultSet.entries())
            .set('warnings', queryReturn.warnings.entries())
            .set('errors', queryReturn.errors.entries())
            .set('duration', timer.stop());

          return this;
        }
      });

      Object.defineProperty(api, 'write', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API write`);
          const queryReturn = runUpdate(core, this.records());
          lastResults
            .clear()
            .set('operation', 'write')
            .set('completed', true)
            .set('updated', queryReturn.resultSet.entries())
            .set('warnings', queryReturn.warnings.entries())
            .set('errors', queryReturn.errors.entries())
            .set('duration', timer.stop());

          return this;
        }
      });

      Object.defineProperty(api, 'records', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API records`);
          if (mainCursor.isDirty) {
            const queryReturn = runQuery(core, () => true, true, mainCursor.attributesSet);
            mainCursor.consumeReturn(queryReturn);
          }
          lastResults
            .clear()
            .set('operation', 'records')
            .set('completed', true)
            .set('count', mainCursor.length)
            .set('duration', timer.stop());

          return mainCursor.values();
        }
      });

      Object.defineProperty(api, 'unique', {
        enumerable: true,
        value: (columnName, attribute) => {
          const timer = new Timer(`API unique`);
          const uniqueValues = getUnique(core, columnName, attribute);
          lastResults
            .clear()
            .set('operation', 'unique')
            .set('completed', true)
            .set('count', uniqueValues.length)
            .set('duration', timer.stop());

          return uniqueValues;
        }
      });

      Object.defineProperty(api, 'flush', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API flush`);
          mainCursor.flush();
          lastResults
            .clear()
            .set('operation', 'flush')
            .set('completed', true)
            .set('duration', timer.stop());

          return this;
        }
      });

      Object.defineProperty(api, 'getExportObject', {
        enumerable: true,
        value: withRawData => {
          const timer = new Timer(`API getExportObject`);
          const exportObject = getExportObject(core, withRawData);
          lastResults
            .clear()
            .set('operation', 'getExportObject')
            .set('completed', true)
            .set('duration', timer.stop());

          return exportObject;
        }
      });

      Object.defineProperty(api, 'getLastResults', {
        enumerable: true,
        value: () => {
          return lastResults.entries();
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
        exportWithAllAttributes: {
          enumerable: true,
          value: () => {
            instanceOptions.exportWithAllAttributes();
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
    COLORS,
    Map,
    UniqueSet
  };
};

const $initTableProxy = function $initTableProxy(asName) {
  if (asName) {
    global[asName] = TableProxy();
  } else {
    global.TableProxy = TableProxy();
  }
};

global.$initTableProxy = $initTableProxy;
