/**
 * Main
 */
import { expSpreadsheetApp as SpreadsheetApp } from './simulation-utils';
import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import MainCursor from './main-cursor';
import { Map, UniqueSet } from './map-unique';
import {
  getUnique,
  runQuery,
  runObjUpdate,
  getExportObject,
  insertRow,
  deleteRow
} from './operations';
import { objAssign, strContains, isArray } from './utilities';
import Timer from './timer';
import { Utils } from './sheets-utilities';
import { IS_TEST_MODE, C, DEFAULT_ATTRIBUTE } from './CONSTANTS';
import { AttributesSet } from './data-payload';

if (IS_TEST_MODE) {
  global.SpreadsheetApp = SpreadsheetApp;
}

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

      Object.defineProperty(api, 'select', {
        enumerable: true,
        value: (query, withRecords) => {
          const timer = new Timer(`API select`);
          const queryReturn = runQuery(core, query, true, withRecords);
          mainCursor.consumeReturn(queryReturn);
          lastResults
            .clear()
            .set('operation', 'select')
            .set('completed', true)
            .set('selected count', queryReturn.resultCount)
            .set('updated row count', queryReturn.updatedCount)
            .set('updated row indices', queryReturn.updatedIndices)
            .set('duration', timer.stop());

          return api;
        }
      });

      Object.defineProperty(api, 'update', {
        enumerable: true,
        value: (query, withRecords) => {
          const timer = new Timer(`API update`);
          const queryReturn = runQuery(core, query, false, withRecords);
          mainCursor.isDirty = true;
          lastResults
            .clear()
            .set('operation', 'update')
            .set('completed', true)
            .set('updated row count', queryReturn.updatedCount)
            .set('updated row indices', queryReturn.updatedIndices)
            .set('duration', timer.stop());

          return api;
        }
      });

      // needs enhancement
      Object.defineProperty(api, 'writeRecords', {
        enumerable: true,
        value: (records, matchColumnName, matchAttributeName) => {
          const timer = new Timer(`API writeRecords`);
          const queryReturn = runObjUpdate(core, records, matchColumnName, matchAttributeName);
          mainCursor.isDirty = true;
          lastResults
            .clear()
            .set('operation', 'writeRecords')
            .set('completed', true)
            .set('updated', queryReturn.resultSet.entries())
            .set('warnings', queryReturn.warnings.entries())
            .set('errors', queryReturn.errors.entries())
            .set('duration', timer.stop());

          return api;
        }
      });

      Object.defineProperty(api, 'writeCursor', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API writeCursor`);
          const queryReturn = runObjUpdate(core, api.getRecords());
          lastResults
            .clear()
            .set('operation', 'writeCursor')
            .set('completed', true)
            .set('updated', queryReturn.resultSet.entries())
            .set('warnings', queryReturn.warnings.entries())
            .set('errors', queryReturn.errors.entries())
            .set('duration', timer.stop());

          return api;
        }
      });

      Object.defineProperty(api, 'getRecords', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API getRecords`);
          if (mainCursor.isDirty) {
            const queryReturn = runQuery(core, () => true, true, true, mainCursor.attributesSet);
            mainCursor.consumeReturn(queryReturn);
          }
          lastResults
            .clear()
            .set('operation', 'getRecords')
            .set('completed', true)
            .set('count', mainCursor.length)
            .set('duration', timer.stop());

          return mainCursor.values();
        }
      });

      Object.defineProperty(api, 'getUnique', {
        enumerable: true,
        value: (columnName, attribute) => {
          const timer = new Timer(`API getUnique`);
          const uniqueValues = getUnique(core, columnName, attribute);
          lastResults
            .clear()
            .set('operation', 'getUnique')
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

          return api;
        }
      });

      Object.defineProperty(api, 'insertRow', {
        enumerable: true,
        value: (topOrBottom, dataObject) => {
          const timer = new Timer(`API insertRow`);
          const position = insertRow(core, topOrBottom, dataObject);
          mainCursor.flush();
          lastResults
            .clear()
            .set('operation', 'insertRow')
            .set('@ position', position)
            .set('completed', true)
            .set('duration', timer.stop());

          return api;
        }
      });

      Object.defineProperty(api, 'deleteRow', {
        enumerable: true,
        value: rowPosition => {
          const timer = new Timer(`API insertRow`);
          const position = deleteRow(core, rowPosition);
          mainCursor.flush();
          lastResults
            .clear()
            .set('operation', 'deleteRow')
            .set('@ position', position)
            .set('completed', true)
            .set('duration', timer.stop());

          return api;
        }
      });

      Object.defineProperty(api, 'getExportObject', {
        enumerable: true,
        value: rawDataOnly => {
          const timer = new Timer(`API getExportObject`);
          const exportObject = getExportObject(core, rawDataOnly);
          lastResults
            .clear()
            .set('operation', 'getExportObject')
            .set('completed', true)
            .set('duration', timer.stop());

          return exportObject;
        }
      });

      Object.defineProperty(api, 'loadSelectedRows', {
        enumerable: true,
        value: attrSet => {
          const timer = new Timer(`API loadSelectedRows`);
          const reqAttSet = new AttributesSet().push(DEFAULT_ATTRIBUTE);
          if (attrSet !== undefined) {
            (isArray(attrSet) ? attrSet : [attrSet]).forEach(attr => {
              reqAttSet.push(attr);
            });
          }
          mainCursor.setToSelected();
          mainCursor.updateAttributesSet(reqAttSet);
          lastResults
            .clear()
            .set('operation', 'loadSelectedRows')
            .set('count', mainCursor.length)
            .set('res', mainCursor.entries())
            .set('completed', true)
            .set('duration', timer.stop());

          return api;
        }
      });

      Object.defineProperty(api, 'setRows', {
        enumerable: true,
        value: (indices, oneIndexed) => {
          const offset = oneIndexed === true ? 1 : 0;
          mainCursor.setToIndices(
            (isArray(indices) ? indices : [indices]).map(index => index + offset)
          );
          return api;
        }
      });

      Object.defineProperty(api, 'getSelectedIndices', {
        enumerable: true,
        value: asPos => {
          return asPos === true ? mainCursor.keys().map(i => i + 1) : mainCursor.keys();
        }
      });

      Object.defineProperty(api, 'selectionLength', {
        enumerable: true,
        value: () => {
          return this.getSelectedIndices().length;
        }
      });

      Object.defineProperty(api, 'getFullDataIndex', {
        enumerable: true,
        value: (columnName, attribute, oneIndexed) => {
          const timer = new Timer(`API getDataIndex`);
          const dataIndex = sheetAccessor.getFullDataIndex(columnName, attribute, oneIndexed);
          lastResults
            .clear()
            .set('operation', 'getFullDataIndex')
            .set('oneIndexed', oneIndexed === true)
            .set('length', dataIndex.length)
            .set('unique', dataIndex.isUnique)
            .set('completed', true)
            .set('duration', timer.stop());

          return dataIndex;
        }
      });

      Object.defineProperty(api, 'getHeaderRow', {
        enumerable: true,
        value: () => {
          return sheetAccessor.getHeaderRow();
        }
      });

      Object.defineProperty(api, 'getOptions', {
        enumerable: true,
        value: () => {
          return instanceOptions.getSettingsExport();
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
            mainCursor.isDirty = true;
            instanceOptions.columnFilter = input;
            return api;
          }
        },
        getColumnFilter: {
          enumerable: true,
          value: () => {
            return instanceOptions.columnFilter;
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
        setReadLevel: {
          enumerable: true,
          value: input => {
            instanceOptions.readLevel = input;
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
            mainCursor.isDirty = true;
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
  return objAssign({ mount, Map, UniqueSet, Timer, strContains }, C);
};

const $initTableProxy = function $initTableProxy(asName) {
  if (asName && !global[asName]) {
    global[asName] = TableProxy();
  } else if (!global.TableProxy) {
    global.TableProxy = TableProxy();
  }
};
global.$initTableProxy = $initTableProxy;

const $initUtils = function $initUtils(asName) {
  if (asName) {
    global[asName] = Utils;
  } else {
    global.TableProxy = Utils;
  }
};
global.$initUtils = $initUtils;
