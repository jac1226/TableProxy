/**
 * InstanceOptions - instance options class
 * @return {InstanceOptions}
 */

import {
  DEFAULT_HEADER_ANCHOR,
  VALID_WRITE_LEVELS,
  DEFAULT_WRITE_LEVEL,
  IS_TEST_MODE,
  DEFAULT_ATTRIBUTE
} from './CONSTANTS';
import { isSpreadsheet, isSheet } from './sheets-utilities';
import clone from './clone';
import { isString, isArray, isBoolean, isObject } from './utilities';

export default class InstanceOptions {
  constructor(sheetNameOrOptions) {
    this.pvt_sheetName = null;
    this.pvt_headerAnchorToken = DEFAULT_HEADER_ANCHOR;
    this.pvt_columnFilter = [];
    this.pvt_exportAttributes = [DEFAULT_ATTRIBUTE];
    this.pvt_exportOnlySelected = true;
    this.pvt_writeLevel = DEFAULT_WRITE_LEVEL;
    this.pvt_autoResizeColumns = false;
    this.pvt_computedProperties = {};

    this.pvt_spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    this.pvt_sheet = null;

    this.processInput(sheetNameOrOptions);
  }

  get sheetName() {
    return this.pvt_sheetName;
  }

  set sheetName(input) {
    if (!isString(input)) {
      throw new TypeError(`sheetName must be a string.`);
    }
    if (this.pvt_sheet) {
      throw new Error(`sheetName was already set to ${this.pvt_sheetName} and cannot be changed.`);
    }
    try {
      this.pvt_sheet = this.pvt_spreadsheet.getSheetByName(input);
    } catch (e) {
      throw new Error(`set sheetName exception: ${e}.`);
    }
    this.pvt_sheetName = input;
    return this.pvt_sheetName;
  }

  get headerAnchorToken() {
    return this.pvt_headerAnchorToken;
  }

  set headerAnchorToken(input) {
    if (!isString(input)) {
      throw new TypeError(`headerAnchorToken must be a string.`);
    }
    this.pvt_headerAnchorToken = input;
    return this.pvt_headerAnchorToken;
  }

  get columnFilter() {
    return this.pvt_columnFilter;
  }

  set columnFilter(input) {
    if (!isArray(input)) {
      throw new TypeError(`columnFilter must be an array.`);
    }
    this.pvt_columnFilter = clone(input);
    return this.pvt_columnFilter;
  }

  get exportAttributes() {
    return this.pvt_exportAttributes;
  }

  set exportAttributes(input) {
    if (!isArray(input)) {
      throw new TypeError(`exportAttributes must be an array.`);
    }
    this.pvt_exportAttributes = clone(input);
    return this.pvt_exportAttributes;
  }

  get exportOnlySelected() {
    return this.pvt_exportOnlySelected;
  }

  set exportOnlySelected(input) {
    if (!isBoolean(input)) {
      throw new TypeError(`exportOnlySelected must be a boolean.`);
    }
    this.pvt_exportOnlySelected = input;
    return this.pvt_exportOnlySelected;
  }

  get writeLevel() {
    return this.pvt_writeLevel;
  }

  set writeLevel(input) {
    if (!isString(input)) {
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
    if (!isBoolean(input)) {
      throw new TypeError(`autoResizeColumns must be a boolean.`);
    }
    this.pvt_autoResizeColumns = input;
    return this.pvt_autoResizeColumns;
  }

  get computedProperties() {
    return this.pvt_computedProperties;
  }

  set computedProperties(input) {
    if (!isObject(input)) {
      throw new TypeError(`computedProperties must be a property descriptor object.`);
    }
    this.pvt_computedProperties = input;
    return this.pvt_computedProperties;
  }

  set spreadsheet(input) {
    if (!IS_TEST_MODE) {
      if (!isSpreadsheet(input)) {
        throw new TypeError(`spreadsheet must be a spreadsheet object.`);
      }
    }
    this.pvt_spreadsheet = input;
    return this.pvt_spreadsheet;
  }

  get sheet() {
    return this.pvt_sheet;
  }

  sheetIsSet() {
    return IS_TEST_MODE ? true : isSheet(this.pvt_sheet);
  }

  processInput(sheetNameOrOptions) {
    const errMsg =
      'requires a string sheetName or an options object which at least define a valid sheetName';

    if (sheetNameOrOptions === undefined || sheetNameOrOptions === null) {
      throw new Error(errMsg);
    }

    switch (toString.call(sheetNameOrOptions)) {
      case '[object String]':
        this.sheetName = sheetNameOrOptions;
        break;
      case '[object Object]':
        Object.keys(sheetNameOrOptions).forEach(key => {
          if (key.indexOf('pvt_') === -1) {
            this[key] = sheetNameOrOptions[key];
          }
        });
        break;
      default:
        throw new Error(errMsg);
    }

    if (!this.sheetIsSet()) {
      throw new Error(errMsg);
    }

    return this;
  }
}
