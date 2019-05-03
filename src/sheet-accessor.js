/**
 * SheetAccessor - a class used to access ranges, and get/set attributes
 * @return {SheetAccessor}
 */

import InstanceOptions from './instance-options';
import { Map } from './map-unique';
import { isNumeric } from './utilities';
import { DataPayload, AttributesSet } from './data-payload';
import { DEFAULT_ATTRIBUTE } from './CONSTANTS';

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
    this.headerRowIndex = 0;
    this.headerColumnIndex = 0;
    this.headerRow = null;
    this.getColumnIndex = null;
    this.columnExists = null;
    this.getAllRecordIndices = null;
    this.resizeColumns = null;
    this.getDataPayload = null;

    /**
     * flesh out headerRowIndex, headerColumnIndex, headerRow
     */
    const notesData = this.sheet.getDataRange().getNotes();
    const rowCount = notesData.length;
    const columnCount = notesData[0].length;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      if (notesData[rowIndex].join('').indexOf(instanceOptions.headerAnchorToken) !== -1) {
        this.headerRowIndex = rowIndex;
        break;
      }
    }
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      if (
        notesData[this.headerRowIndex][columnIndex].indexOf(instanceOptions.headerAnchorToken) !==
        -1
      ) {
        this.headerColumnIndex = columnIndex;
        break;
      }
    }
    this.headerRow = this.value.getRow(this.headerRowIndex)[0];

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
      fontweight: { get: 'getFontWeights', set: 'setFontWeights' }
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
     * flesh out getColumnIndex, columnExists methods
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

    /**
     * flesh out getAllRecordIndices method
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
    this.getDataPayload = requestedAttributesSet => {
      if (!(requestedAttributesSet instanceof AttributesSet)) {
        throw new TypeError(`getDataPayload expects a AttributesSet instance.`);
      }
      if (requestedAttributesSet.length === 0) {
        requestedAttributesSet.push(DEFAULT_ATTRIBUTE);
      }
      console.log('out');
      console.log(requestedAttributesSet.values);
      return new DataPayload(
        requestedAttributesSet.values.reduce((dataObject, attribute) => {
          console.log(`shit ${JSON.stringify(dataObject)}`);
          // eslint-disable-next-line no-param-reassign
          dataObject[attribute] = this[attribute].getAll();
          console.log(`shit ${JSON.stringify(dataObject)}`);
          return dataObject;
        }, {}),
        this.headerRowIndex,
        this.headerColumnIndex,
        this.headerRow
      );
    };
  }
}
