/**
 * Main
 */
import { expSpreadsheetApp as SpreadsheetApp } from './simulation-utils';
import InstanceOptions from './instance-options';
import SheetAccessor from './sheet-accessor';
import MainCursor from './main-cursor';
import { Map, UniqueSet } from './map-unique';
import { getUnique, runQuery, runObjUpdate, getExportObject } from './operations';
import { strContains } from './utilities';
import Timer from './timer';
import {
  IS_TEST_MODE,
  $,
  RT,
  RR,
  WC,
  WR,
  WT,
  T,
  B,
  AV,
  AB,
  AC,
  AN,
  AZ,
  AS,
  AF,
  AW,
  AD,
  DS,
  DST,
  NINT,
  NP1,
  NP2,
  SUCCESS,
  FAILURE,
  WARNING,
  RED,
  WHITE,
  BLUE,
  GREEN,
  ORANGE,
  BLACK,
  GREY,
  YELLOW,
  LIGHT_GREY
} from './CONSTANTS';

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

      Object.defineProperty(api, 'writeRecords', {
        enumerable: true,
        value: (records, matchColumnName, matchAttributeName) => {
          const timer = new Timer(`API writeRecords`);
          const queryReturn = runObjUpdate(core, records, matchColumnName, matchAttributeName);
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
          const queryReturn = runObjUpdate(core, api.records());
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

      Object.defineProperty(api, 'records', {
        enumerable: true,
        value: () => {
          const timer = new Timer(`API records`);
          if (mainCursor.isDirty) {
            const queryReturn = runQuery(core, () => true, true, true, mainCursor.attributesSet);
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

          return api;
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
    Map,
    UniqueSet,
    strContains,
    $,
    RT,
    RR,
    WC,
    WR,
    WT,
    T,
    B,
    AV,
    AB,
    AC,
    AN,
    AZ,
    AS,
    AF,
    AW,
    AD,
    DS,
    DST,
    NINT,
    NP1,
    NP2,
    SUCCESS,
    FAILURE,
    WARNING,
    RED,
    WHITE,
    BLUE,
    GREEN,
    ORANGE,
    BLACK,
    GREY,
    YELLOW,
    LIGHT_GREY
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
