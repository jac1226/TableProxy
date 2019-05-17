/**
 * SheetAccessor - a class used to access ranges, and get/set attributes
 * @return {SheetAccessor}
 */

import InstanceOptions from './instance-options';
import { Map, getDuplicates } from './map-unique';
import { isNumeric, inArray } from './utilities';
import { getSelectedRowIndices } from './sheets-utilities';
import { DataPayload, AttributesSet } from './data-payload';
import clone from './clone';
import { TOP, DEFAULT_ATTRIBUTE, SUPPORTED_ATTRIBUTES } from './CONSTANTS';

export default class SheetAccessor {
  constructor(instanceOptions) {
    if (!(instanceOptions instanceof InstanceOptions)) {
      throw new TypeError(`DataController requires an instance of InstanceOptions object.`);
    }

    this.sheet = instanceOptions.sheet;
    this.range = {};
    this.value = {};
    this.background = {};
    this.fontcolor = {};
    this.note = {};
    this.fontfamily = {};
    this.fontsize = {};
    this.fontstyle = {};
    this.fontweight = {};
    this.numberformat = {};
    this.headerRowIndex = 0;
    this.headerColumnIndex = 0;
    this.headerRow = null;
    this.getColumnIndex = null;
    this.columnExists = null;
    this.getAllRecordIndexer = null;
    this.getSelectedRecordIndexer = null;
    this.resizeColumns = null;
    this.getDataPayload = null;
    this.insertRows = null;
    this.deleteRows = null;
    this.getHeaderRow = null;
    this.getDataIndex = null;

    /**
     * find headerRowIndex, headerColumnIndex if headerAnchorToken
     */
    if (instanceOptions.headerAnchorToken) {
      const dataRange = this.sheet.getDataRange();
      const rowCount = dataRange.getNumRows();
      const columnCount = dataRange.getNumColumns();
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        this.sheet
          .getRange(rowIndex + 1, 1, 1, columnCount)
          .getNotes()[0]
          .forEach((note, columnIndex) => {
            if (note.indexOf(instanceOptions.headerAnchorToken) !== -1) {
              this.headerRowIndex = rowIndex;
              this.headerColumnIndex = columnIndex;
              rowIndex = rowCount;
            }
          });
      }
    }

    /**
     * set headerRow
     */
    this.headerRow = this.sheet.getDataRange().getValues()[this.headerRowIndex];
    const duplicates = getDuplicates(this.headerRow);
    if (duplicates.length > 0) {
      throw new Error(
        `Sheet "${this.sheet.getName()}" has duplicate column headers... ${duplicates.join(', ')}`
      );
    }

    /**
     * flesh out range retrievers
     */
    this.range = {
      getCell: (rowIndex, columnIndex) => {
        return this.sheet.getRange(rowIndex + 1, columnIndex + 1);
      },
      getRow: rowIndex => {
        return this.sheet.getRange(rowIndex + 1, 1, 1, this.sheet.getDataRange().getNumColumns());
      },
      getColumn: (columnIndex, startRowIndex) => {
        const dataRange = this.sheet.getDataRange();
        const startRowIndx = isNumeric(startRowIndex) ? startRowIndex : 0;
        return this.sheet.getRange(
          startRowIndx + 1,
          columnIndex + 1,
          dataRange.getNumRows() - startRowIndx,
          1
        );
      },
      getAll: (startRowIndex, startColumnIndex) => {
        const dataRange = this.sheet.getDataRange();
        const startRowIndx = isNumeric(startRowIndex) ? startRowIndex : 0;
        const startColumnIndx = isNumeric(startColumnIndex) ? startColumnIndex : 0;

        return this.sheet.getRange(
          startRowIndx + 1,
          startColumnIndx + 1,
          dataRange.getNumRows() - startRowIndx,
          dataRange.getNumColumns() - startColumnIndx
        );
      },
      getAllRecords: () => {
        return this.range.getAll(this.headerRowIndex + 1, 0);
      },
      getRecordsColumn: columnIndex => {
        return this.range.getColumn(columnIndex, this.headerRowIndex + 1);
      }
    };

    /**
     * flesh out attribute accessors
     */
    const mapping = {
      value: { get: 'getValues', set: 'setValues' },
      background: { get: 'getBackgrounds', set: 'setBackgrounds' },
      fontcolor: { get: 'getFontColors', set: 'setFontColors' },
      note: { get: 'getNotes', set: 'setNotes' },
      fontfamily: { get: 'getFontFamilies', set: 'setFontFamilies' },
      fontsize: { get: 'getFontSizes', set: 'setFontSizes' },
      fontstyle: { get: 'getFontStyles', set: 'setFontStyles' },
      fontweight: { get: 'getFontWeights', set: 'setFontWeights' },
      numberformat: { get: 'getNumberFormats', set: 'setNumberFormats' }
    };
    Object.keys(mapping).forEach(attribute => {
      this[attribute] = {};
      const getSetMapping = mapping[attribute];
      Object.keys(getSetMapping).forEach(getSet => {
        Object.keys(this.range).forEach(rangeMethodName => {
          this[attribute][getSet + rangeMethodName.substr(3)] = (...args) => {
            const rangeMethod = this.range[rangeMethodName];
            const range = rangeMethod(...args);
            if (args.length !== 0) {
              return range[getSetMapping[getSet]](...args.splice(rangeMethod.length, args.length));
            }
            return range[getSetMapping[getSet]]();
          };
        });
      });
    });

    /**
     * flesh out getColumnIndex, columnExists getDefaultIdColumn getHeaderRow methods
     */
    this.getColumnIndex = columnName => {
      return this.headerRow.indexOf(columnName);
    };
    this.columnExists = columnName => {
      return this.getColumnIndex(columnName) !== -1;
    };
    this.getDefaultIdColumn = () => {
      return this.headerRow[this.headerColumnIndex];
    };
    this.getHeaderRow = () => {
      return clone(this.headerRow);
    };

    /**
     * flesh out getAllRecordIndexer and getSelectedRecordIndexer method
     */
    this.getAllRecordIndexer = () => {
      const indexer = new Map();
      const numRows = this.range.getAll().getNumRows();
      let i = this.headerRowIndex + 1;
      while (i < numRows) {
        indexer.set(i);
        i += 1;
      }
      return indexer;
    };
    this.getSelectedRecordIndexer = () => {
      return getSelectedRowIndices().reduce((indexer, i) => {
        indexer.set(i);
        return indexer;
      }, new Map());
    };

    /**
     * flesh out autoResizeColumns method
     */
    this.resizeColumns = () => {
      this.headerRow.forEach((columnName, index) => {
        this.sheet.autoResizeColumn(index + 1);
      });
    };

    /**
     * flesh out getDataPayload method
     */
    this.getDataPayload = (requestedAttributesSet, rowIndex) => {
      if (!(requestedAttributesSet instanceof AttributesSet)) {
        throw new TypeError(`getDataPayload expects an AttributesSet instance.`);
      }
      return new DataPayload(
        requestedAttributesSet.values.reduce((dataObject, attribute) => {
          if (isNumeric(rowIndex)) {
            // eslint-disable-next-line no-param-reassign
            dataObject[attribute] = this[attribute].getRow(rowIndex);
          } else {
            // eslint-disable-next-line no-param-reassign
            dataObject[attribute] = this[attribute].getAll();
          }
          return dataObject;
        }, {}),
        this.headerRowIndex,
        this.headerColumnIndex,
        this.headerRow
      );
    };

    /**
     * flesh out insertRows and deleteRows
     */
    this.insertRow = topOrBottom => {
      const position =
        topOrBottom === TOP ? this.headerRowIndex + 1 : this.sheet.getDataRange().getNumRows();
      this.sheet.insertRowAfter(position);
      return position;
    };

    this.deleteRow = rowPosition => {
      const position =
        rowPosition === undefined ? this.sheet.getDataRange().getNumRows() : rowPosition;
      this.sheet.deleteRow(position);
      return position;
    };

    /**
     * flesh out getDataIndex
     */

    this.getFullDataIndex = (columnName, attribute, oneIndexed) => {
      let dataIndex;
      const offset = oneIndexed === true ? 1 : 0;

      if (columnName === undefined && attribute === undefined) {
        dataIndex = this.getAllRecordIndexer();
        dataIndex.isUnique = true;
      } else {
        const attr = attribute === undefined ? DEFAULT_ATTRIBUTE : attribute;
        const columnIndex = this.getHeaderRow().indexOf(columnName);

        if (columnIndex === -1) {
          throw new Error(`failed to get dataIndex on invalid column ${columnName}.`);
        }
        if (!inArray(attr, SUPPORTED_ATTRIBUTES)) {
          throw new Error(`failed to get dataIndex on invalid attribute ${attribute}.`);
        }

        const data = this[attr].getRecordsColumn(columnIndex);
        const dataLength = data.length;
        dataIndex = new Map();
        data.forEach((item, rowIndex) => {
          dataIndex.set(item[0], rowIndex + this.headerRowIndex + 1 + offset);
        });
        dataIndex.isUnique = dataIndex.length === dataLength;
      }

      return dataIndex;
    };
  }
}
