/**
 * SheetAccessor - a class used to access ranges, and get/set attributes
 * @return {SheetAccessor}
 */

import { DEFAULT_HEADER_ANCHOR } from './CONSTANTS';

export default class SheetAccessor {
  constructor(sheet, headerAnchorToken) {
    this.range = {};
    this.value = {};
    this.background = {};
    this.fontcolor = {};
    this.note = {};
    this.fontfamily = {};
    this.fontsize = {};
    this.fontstyle = {};
    this.fontweight = {};
    this.headerAnchorToken = DEFAULT_HEADER_ANCHOR;
    this.headerRowIndex = 0;
    this.headerColumnIndex = 0;
    this.getHeaderRow = null;
    this.getAllRecordIndices = null;

    /**
     * set headerAnchorToken input
     */
    if (toString.call(headerAnchorToken) === '[object String]') {
      this.headerAnchorToken = headerAnchorToken;
    }

    /**
     * flesh out headerRowIndex, headerColumnIndex
     */
    const notesData = sheet.getDataRange().getNotes();
    const rowCount = notesData.length;
    const columnCount = notesData[0].length;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      if (notesData[rowIndex].join('').indexOf(this.headerAnchorToken) !== -1) {
        this.headerRowIndex = rowIndex;
        break;
      }
    }
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      if (notesData[this.headerRowIndex][columnIndex].indexOf(this.headerAnchorToken) !== -1) {
        this.headerColumnIndex = columnIndex;
        break;
      }
    }

    /**
     * flesh out range retrievers
     */
    this.range = {
      getCell: (rowIndex, columnIndex) => {
        return sheet.getRange(rowIndex + 1, columnIndex + 1);
      },
      getRow: rowIndex => {
        return sheet.getRange(rowIndex + 1, 1, 1);
      },
      getColumn: (columnIndex, startRowIndex) => {
        const dataRange = sheet.getDataRange();
        const startRowIndx = toString.call(startRowIndex) === '[object Number]' ? startRowIndex : 0;
        return sheet.getRange(
          startRowIndx + 1,
          columnIndex + 1,
          dataRange.getNumRows() - startRowIndx,
          1
        );
      },
      getAll: (startRowIndex, startColumnIndex) => {
        const dataRange = sheet.getDataRange();
        const startRowIndx = toString.call(startRowIndex) === '[object Number]' ? startRowIndex : 0;
        const startColumnIndx = toString.call(startColumnIndex) === '[object Number]' ? startColumnIndex : 0;
        return sheet.getRange(startRowIndx + 1, startColumnIndx + 1, dataRange.getNumRows() - startRowIndx, dataRange.getNumColumns() - startColumnIndx);
      },
      getAllRecords: () => {
        return this.range.getAll(this.headerRowIndex, 0);
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
            const range = rangeMethod.apply(
              null,
              args.splice(0, rangeMethod.length)
            );
            if (args.length !== 0) {
              return range[getSetMapping[getSet]](args[0]);
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
      return this.value.getRow(this.headerRowIndex);
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
  }
}

