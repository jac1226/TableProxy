/**
 * InstanceOptions - instance options class
 * @return {InstanceOptions}
 */

import { AttributesSet } from './data-payload';
import { expSpreadsheetApp as SpreadsheetApp } from './simulation-utils';
import {
  VALID_READ_LEVELS,
  DEFAULT_READ_LEVEL,
  VALID_WRITE_LEVELS,
  DEFAULT_WRITE_LEVEL,
  DEFAULT_ATTRIBUTE,
  SUPPORTED_ATTRIBUTES,
  IS_TEST_MODE
} from './CONSTANTS';
import {
  isString,
  isArray,
  isBoolean,
  isObject,
  inArray,
  isFunction,
  isNumeric,
  isDate1
} from './utilities';
import clone from './clone';

if (IS_TEST_MODE) {
  global.SpreadsheetApp = SpreadsheetApp;
}

export default class InstanceOptions {
  constructor(sheetNameOrOptions, headerAnchorToken) {
    this.pvt_spreadsheetId = null;
    this.pvt_sheetName = null;
    this.pvt_headerAnchorToken = null;
    this.pvt_exportAttributes = new AttributesSet();
    this.pvt_readLevel = DEFAULT_READ_LEVEL;
    this.pvt_writeLevel = DEFAULT_WRITE_LEVEL;
    this.pvt_autoResizeColumns = false;
    this.pvt_computedProperties = {};
    this.pvt_idColumnName = null;
    this.pvt_idAttributeName = DEFAULT_ATTRIBUTE;
    this.pvt_columnFilter = null;
    this.pvt_applyColumnFilter = false;
    this.pvt_spreadsheet = null;
    this.pvt_sheet = null;

    this.headerAnchorToken = headerAnchorToken;
    this.processInput(sheetNameOrOptions);
  }

  set headerAnchorToken(input) {
    if (this.pvt_headerAnchorToken !== null) {
      throw new Error(`headerAnchorToken can only be once.`);
    }
    if (input && !isString(input)) {
      throw new TypeError(`headerAnchorToken must be a string.`);
    }
    this.pvt_headerAnchorToken = input || null;
    return this.pvt_headerAnchorToken;
  }

  get headerAnchorToken() {
    return this.pvt_headerAnchorToken;
  }

  get spreadsheetId() {
    return this.pvt_spreadsheetId;
  }

  set spreadsheetId(input) {
    if (!isString(input) && !isNumeric(input)) {
      throw new TypeError(`invalid spreadsheetId.`);
    }
    if (this.pvt_spreadsheet) {
      throw new Error(
        `spreadsheetId was already set to ${this.pvt_spreadsheetId} and cannot be changed.`
      );
    }
    this.pvt_spreadsheet = SpreadsheetApp.openById(input);
    this.pvt_spreadsheetId = input;
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
    let columnFilter;
    if (isArray(input)) {
      columnFilter = clone(input);
    } else if (isString(input) || isNumeric(input)) {
      columnFilter = [input];
    } else {
      columnFilter = [];
    }
    this.pvt_applyColumnFilter = true;
    this.pvt_columnFilter = columnFilter;
    return this.pvt_columnFilter;
  }

  get applyColumnFilter() {
    return this.pvt_applyColumnFilter;
  }

  exportWithAllAttributes() {
    return this.pvt_exportAttributes.withAll();
  }

  get exportAttributes() {
    return this.pvt_exportAttributes;
  }

  set exportAttributes(input) {
    const attributes = isArray(input) ? input : [input];
    this.pvt_exportAttributes.flush();
    attributes.forEach(attribute => {
      if (attribute !== undefined) {
        this.pvt_exportAttributes.push(attribute);
      }
    });
    return this.pvt_exportAttributes;
  }

  get readLevel() {
    return this.pvt_readLevel;
  }

  set readLevel(input) {
    if (!inArray(input, VALID_READ_LEVELS)) {
      throw new Error(`readLevel must be one of ${VALID_READ_LEVELS.toString()} received ${input}`);
    }
    this.pvt_readLevel = input;
    return this.pvt_readLevel;
  }

  get writeLevel() {
    return this.pvt_writeLevel;
  }

  set writeLevel(input) {
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
    if (!isString(input) && !isNumeric(input) && !isDate1(input)) {
      throw new TypeError(`idColumnName value must be string, number, date.`);
    }
    this.pvt_idColumnName = isString(input) ? input.trim() : input;
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

  get sheet() {
    return this.pvt_sheet;
  }

  get spreadsheet() {
    return this.pvt_spreadsheet;
  }

  processInput(sheetNameOrOptions) {
    this.pvt_exportAttributes.push(DEFAULT_ATTRIBUTE);
    const errMsg =
      'requires a string sheetName or an options object which at least define a valid sheetName';

    if (sheetNameOrOptions === undefined || sheetNameOrOptions === null) {
      throw new Error(errMsg);
    }

    if (isString(sheetNameOrOptions)) {
      this.spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
      this.sheetName = sheetNameOrOptions;
    } else if (isObject(sheetNameOrOptions)) {
      if (sheetNameOrOptions.spreadsheetId) {
        this.spreadsheetId = sheetNameOrOptions.spreadsheetId;
      } else {
        this.spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
      }
      Object.keys(sheetNameOrOptions).forEach(key => {
        if (key.indexOf('pvt_') === -1 && key.indexOf('spreadsheetId') === -1) {
          this[key] = sheetNameOrOptions[key];
        }
      });
      if (!this.sheet) {
        this.sheetName = this.pvt_spreadsheet.getActiveSheet().getName();
      }
    } else {
      throw new Error(errMsg);
    }

    return this;
  }

  getSettingsExport() {
    const retObj = {};
    retObj.spreadsheetId = this.spreadsheetId;
    retObj.sheetName = this.sheetName;
    retObj.headerAnchorToken = this.headerAnchorToken;
    retObj.exportAttributes = this.exportAttributes.values;
    retObj.writeLevel = this.writeLevel;
    retObj.autoResizeColumns = this.autoResizeColumns;
    retObj.computedProperties = this.computedProperties;
    retObj.idColumnName = this.idColumnName;
    retObj.idAttributeName = this.idAttributeName;
    if (this.applyColumnFilter) {
      retObj.columnFilter = clone(this.columnFilter);
    }
    return retObj;
  }
}
