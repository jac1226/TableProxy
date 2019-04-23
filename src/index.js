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
import { isString, isNumeric, inArray, getTimeStamp } from './utilities';

import {
  TOP,
  BOTTOM,
  WRITE_LEVEL_CELL,
  WRITE_LEVEL_ROW,
  WRITE_LEVEL_TABLE,
  COLORS,
  SUPPORTED_ATTRIBUTES
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
            throw new Error(`invalid data attribute specified: ${attribute}`);
          }

          const attr = attribute || 'value';
          const aggregator = new UniqueSet();
          const queryDriver = new QueryDriver(r => {
            aggregator.push(r[columnName][attr]);
          }, 'unique');
          queryDriver.requestedAttributesSet.push(attr);

          processQuery(queryDriver, sheetAccessor, rowIndexCursor, instanceOptions);
          return aggregator.values;
        }
      });

      Object.defineProperty(api, 'setUniqueIdColumn', {
        enumerable:true,
        configurable:false,
        value: columnName => {
          const setUniqueIdColumnStartTime=getTimeStamp();

          if(!isString(columnName) && !isNumeric(columnName)){
            throw new Error(`setUniqueId method requires a string or number columnName`);
          }
  
          var zeroIndexedColumnPosition=headerRowRetriever().indexOf(columnName);
          if(zeroIndexedColumnPosition==-1){throw 'setUniqueId requires a valid column name';}
  
          /** Grab data from that column - map 2d array to 1d */
          var columnData=sheetDataAccessor.value.getColumnByZeroIndex(zeroIndexedColumnPosition)
          .map(function(item){return item[0];});
  
          /**
          * Begin testing of column data
          * 1. Must be of ONLY one data type or indexing will not work - throw exception if not.
          * 2. Non-null values MUST be unique or indexing will be ambiguous - throw exception if not.
          */
  
          /** get unique values minus blank, throw exception if set does not have pure datatype*/
          var uniqueValues=(new UniqueSet(columnData)).remove('');
          //uniqueColumnValues.remove('');//**
          if(!uniqueValues.pure){throw 'setUniqueId requires that the column have either all string or all integer data types';}
  
          /** get non null set of values including duplicates */
          var nonBlankValueCount=columnData.filter(function(item){if(item!==''){return true;}}).length;
  
          /** throw exception if nonNullValueCount is not the same length as uniqueValues - implies duplicates*/
          if(uniqueValues.length!==nonBlankValueCount){
            throw 'setUniqueId requires that non-blank values are unique';
          }
  
          /** set uniqueIdColumn in instanceOptions */
          instanceOptions.uniqueIdColumn=columnName;
  
          /** stop timer */
          Logger.log('setUniqueIdColumn for sheet "'+instanceOptions.sheetName+'" completed in '+getTimeDiff(setUniqueIdColumnStartTime)+'ms');
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
        setUniqueColumnId: {
          value: input => {
            instanceOptions.uniqueColumnId = input;
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
