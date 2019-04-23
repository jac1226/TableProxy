/**
 * SheetAccessor - a class used to access ranges, and get/set attributes
 * @return {SheetAccessor}
 */

import InstanceOptions from './instance-options';
import { isNumeric } from './utilities';

export default class SheetAccessor {
  constructor(instanceOptions) {
    if (!(instanceOptions instanceof InstanceOptions)) {
      throw new TypeError(`DataController requires an instance of InstanceOptions object.`);
    }

    this.pvt_instanceOptions = instanceOptions;
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
    this.getHeaderRow = null;
    this.getAllRecordIndices = null;
    this.resizeColumns = null;

    /**
     * flesh out headerRowIndex, headerColumnIndex
     */
    const notesData = this.pvt_instanceOptions.sheet.getDataRange().getNotes();
    const rowCount = notesData.length;
    const columnCount = notesData[0].length;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      if (notesData[rowIndex].join('').indexOf(this.pvt_instanceOptions.headerAnchorToken) !== -1) {
        this.headerRowIndex = rowIndex;
        break;
      }
    }
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      if (
        notesData[this.headerRowIndex][columnIndex].indexOf(
          this.pvt_instanceOptions.headerAnchorToken
        ) !== -1
      ) {
        this.headerColumnIndex = columnIndex;
        break;
      }
    }

    /**
     * flesh out range retrievers
     */
    this.range = {
      getCell: (rowIndex, columnIndex) => {
        return this.pvt_instanceOptions.sheet.getRange(rowIndex + 1, columnIndex + 1);
      },
      getRow: rowIndex => {
        const dataRange = this.pvt_instanceOptions.sheet.getDataRange();
        return this.pvt_instanceOptions.sheet.getRange(
          rowIndex + 1,
          1,
          1,
          dataRange.getNumColumns()
        );
      },
      getColumn: (columnIndex, startRowIndex) => {
        const dataRange = this.pvt_instanceOptions.sheet.getDataRange();
        const startRowIndx = isNumeric(startRowIndex) ? startRowIndex : 0;
        return this.pvt_instanceOptions.sheet.getRange(
          startRowIndx + 1,
          columnIndex + 1,
          dataRange.getNumRows() - startRowIndx,
          1
        );
      },
      getAll: (startRowIndex, startColumnIndex) => {
        const dataRange = this.pvt_instanceOptions.sheet.getDataRange();
        const startRowIndx = isNumeric(startRowIndex) ? startRowIndex : 0;

        const startColumnIndx = isNumeric(startColumnIndex) ? startColumnIndex : 0;

        return this.pvt_instanceOptions.sheet.getRange(
          startRowIndx + 1,
          startColumnIndx + 1,
          dataRange.getNumRows() - startRowIndx,
          dataRange.getNumColumns() - startColumnIndx
        );
      },
      getAllRecords: () => {
        return this.range.getAll(this.headerRowIndex, 0);
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
     * flesh out getHeaderRow, getAllRecordIndices methods
     */
    this.getHeaderRow = () => {
      return this.value.getRow(this.headerRowIndex)[0];
    };
    this.getAllRecordIndices = () => {
      const indices = [];
      const numRows = this.range.getAllRecords().getNumRows();
      let i = this.headerRowIndex + 1;
      while (i < numRows) {
        indices.push(i);
        i += 1;
      }
      return indices;
    };

    /**
     * flesh out autoResizeColumns method
     */
    this.resizeColumns = () => {
      this.getHeaderRow().forEach((columnName, index) => {
        this.pvt_instanceOptions.sheet.autoResizeColumn(index + 1);
      });
    };
  }
}
