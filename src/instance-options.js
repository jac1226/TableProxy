/**
 * InstanceOptions - instance options class
 * @return {InstanceOptions}
 */

import { AttributesSet } from './data-payload';
import {
  DEFAULT_HEADER_ANCHOR,
  VALID_WRITE_LEVELS,
  DEFAULT_WRITE_LEVEL,
  IS_TEST_MODE,
  DEFAULT_ATTRIBUTE,
  SUPPORTED_ATTRIBUTES
} from './CONSTANTS';
import { isSpreadsheet, isSheet } from './sheets-utilities';
import { isString, isArray, isBoolean, isObject, inArray, isFunction } from './utilities';
import clone from './clone';

export default class InstanceOptions {
  constructor(sheetNameOrOptions, headerAnchorToken) {
    this.pvt_sheetName = null;
    this.pvt_headerAnchorToken = null;
    this.pvt_columnFilter = [];
    this.pvt_exportAttributes = new AttributesSet().push(DEFAULT_ATTRIBUTE);
    this.pvt_exportOnlySelected = true;
    this.pvt_writeLevel = DEFAULT_WRITE_LEVEL;
    this.pvt_autoResizeColumns = false;
    this.pvt_computedProperties = {};
    this.pvt_idColumnName = null;
    this.pvt_idAttributeName = DEFAULT_ATTRIBUTE;
    this.pvt_spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    this.pvt_sheet = null;

    this.setHeaderAnchorToken(headerAnchorToken);
    this.processInput(sheetNameOrOptions);
  }

  setHeaderAnchorToken(input) {
    if (isString(this.pvt_headerAnchorToken)) {
      throw new Error(`headerAnchorToken can only be set at mount.`);
    }
    if (input !== undefined && !isString(input)) {
      throw new TypeError(`headerAnchorToken must be a string.`);
    }
    this.pvt_headerAnchorToken = input === undefined ? DEFAULT_HEADER_ANCHOR : input;
    return this;
  }

  get headerAnchorToken() {
    return this.pvt_headerAnchorToken;
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
    this.pvt_exportAttributes.flush().push(DEFAULT_ATTRIBUTE);
    input.forEach(attribute => {
      this.pvt_exportAttributes.push(attribute);
    });
    return this.pvt_exportAttributes;
  }

  get writeLevel() {
    return this.pvt_writeLevel;
  }

  set writeLevel(input) {
    if (!isString(input)) {
      throw new TypeError(`exportOnlySelected must be a string.`);
    }
    if (!inArray(input, VALID_WRITE_LEVELS)) {
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
      throw new TypeError(`computedProperties must be an object.`);
    }
    Object.keys(input).forEach(key => {
      if (!isFunction(input[key])) {
        throw new Error(`non-function provided for computedProperty value.`);
      }
    });
    this.pvt_computedProperties = input;
    return this.pvt_computedProperties;
  }

  get idColumnName() {
    return this.pvt_idColumnName;
  }

  set idColumnName(input) {
    if (!isString(input)) {
      throw new TypeError(`idColumnName must be a string.`);
    }
    this.pvt_idColumnName = input.trim();
    return this;
  }

  get idAttributeName() {
    return this.pvt_idAttributeName;
  }

  set idAttributeName(input) {
    if (!isString(input)) {
      throw new TypeError(`idAttributeName must be a string.`);
    }
    if (!inArray(input, SUPPORTED_ATTRIBUTES)) {
      throw new Error(`${input} is not a valid idAttributeName.`);
    }
    this.pvt_idAttributeName = input;
    return this;
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
