/**
 * InstanceOptions - instance options class
 * @return {InstanceOptions}
 */

import SpreadsheetApp from './spreadsheet-simulator';
import { DEFAULT_HEADER_ANCHOR, VALID_WRITE_LEVELS, DEFAULT_WRITE_LEVEL } from './CONSTANTS';
import { isSpreadsheet } from './sheets-utilities';
import simpleClone from './simple-clone';

export default class InstanceOptions {
  constructor() {
    this.pvt_sheetName = null;
    this.pvt_headerAnchorToken = DEFAULT_HEADER_ANCHOR;
    this.pvt_columnFilter = [];
    this.pvt_exportAttributes = ['value'];
    this.pvt_exportOnlySelected = false;
    this.pvt_writeLevel = DEFAULT_WRITE_LEVEL;
    this.pvt_autoResizeColumns = false;
    this.pvt_uniqueColumnId = null;

    this.pvt_spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    this.pvt_sheet = null;
  }

  get sheetName() {
    return this.pvt_sheetName;
  }

  set sheetName(input) {
    if (toString.call(input) !== '[object String]') {
      throw new TypeError(`sheetName must be a string.`);
    }
    if (this.pvt_sheet) {
      throw new Error(`sheetName was alreadys set to ${this.pvt_sheetName} and cannot be changed.`);
    }
    try {
      this.pvt_sheet = this.pvt_spreadsheet.getSheetByName(input);
    } catch (e) {
      throw new Error(`set sheetName exception: ${e}`);
    }
    this.pvt_sheetName = input;
    return this.pvt_sheetName;
  }

  get headerAnchorToken() {
    return this.pvt_headerAnchorToken;
  }

  set headerAnchorToken(input) {
    if (toString.call(input) !== '[object String]') {
      throw new TypeError(`headerAnchorToken must be a string.`);
    }
    this.pvt_headerAnchorToken = input;
    return this.pvt_headerAnchorToken;
  }

  get columnFilter() {
    return this.this.pvt_columnFilter;
  }

  set columnFilter(input) {
    if (toString.call(input) !== '[object Array]') {
      throw new TypeError(`columnFilter must be an array.`);
    }
    this.pvt_columnFilter = simpleClone(input);
    return this.pvt_columnFilter;
  }

  get exportAttributes() {
    return this.pvt_exportAttributes;
  }

  set exportAttributes(input) {
    if (toString.call(input) !== '[object Array]') {
      throw new TypeError(`exportAttributes must be an array.`);
    }
    this.pvt_columnFilter = simpleClone(input);
    return this.pvt_columnFilter;
  }

  get exportOnlySelected() {
    return this.pvt_exportOnlySelected;
  }

  set exportOnlySelected(input) {
    if (toString.call(input) !== '[object Boolean]') {
      throw new TypeError(`exportOnlySelected must be a boolean.`);
    }
    this.pvt_exportOnlySelected = input;
    return this.pvt_exportOnlySelected;
  }

  get writeLevel() {
    return this.pvt_writeLevel;
  }

  set writeLevel(input) {
    if (toString.call(input) !== '[object String]') {
      throw new TypeError(`exportOnlySelected must be a string.`);
    }
    if (VALID_WRITE_LEVELS.indexOf(input) === -1) {
      throw new Error(
        `writeLevel must be one of ${VALID_WRITE_LEVELS.toString()} received ${input}`
      );
    }
    this.pvt_writeLevel = input;
    return this.pvt_writeLevel;
  }

  get autoResizeColumns() {
    return this.pvt_autoResizeColumns;
  }

  set autoResizeColumns(input) {
    if (toString.call(input) !== '[object Boolean]') {
      throw new TypeError(`autoResizeColumns must be a boolean.`);
    }
    this.pvt_autoResizeColumns = input;
    return this.pvt_autoResizeColumns;
  }

  get uniqueColumnId() {
    return this.pvt_uniqueColumnId;
  }

  set uniqueColumnId(input) {
    if (toString.call(input) !== '[object String]' && toString.call(input) !== '[object Number]') {
      throw new TypeError(`uniqueColumnId must be a string or number.`);
    }
    this.pvt_uniqueColumnId = input;
    return this.pvt_uniqueColumnId;
  }

  set spreadsheet(input) {
    if (!isSpreadsheet(input)) {
      throw new TypeError('spreadsheet must be a spreadsheet object.');
    }
    this.pvt_spreadsheet = input;
    return this.pvt_spreadsheet;
  }

  get sheet() {
    return this.pvt_sheet;
  }

  absorb(input) {
    if (toString.call(input) !== '[object Object]') {
      throw new TypeError(`options initialization must be performed with an object.`);
    }
    Object.keys(this).forEach(key => {
      if (['pvt_sheet', 'pvt_spreadsheet'].indexOf(key) === -1) {
        this[key] = input[key];
      }
    });
    return this;
  }
}
