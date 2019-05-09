/**
 * Sheets Utilities
 * @desc Various Google Sheets utilities
 */

import { expLogger as Logger } from './simulation-utils';
import {
  isDate1,
  isArray,
  isString,
  isNumeric,
  isFunction,
  isObject,
  isBoolean,
  isNull,
  isUndefined,
  inArray,
  getType,
  toBool,
  firstToUpper,
  getTimeStamp,
  getTimeDiff,
  isJson,
  toJson,
  isEmail,
  tokenInterpolate,
  getTokens
} from './utilities';
import { removeDuplicates, getDuplicates, testUnique } from './map-unique';

export function getSheetsObjectType(input) {
  let returnType;
  if (typeof input === 'object') {
    try {
      returnType = input.getGibberish(); // dummy method, throws error
    } catch (e) {
      returnType = e.message.split(' object ')[1].replace('.', ''); // extract type from error
    }
  }
  return returnType;
}

export function isSpreadsheet(input) {
  return getSheetsObjectType(input) === 'Spreadsheet';
}

export function isSheet(input) {
  return getSheetsObjectType(input) === 'Sheet';
}

export function isRange(input) {
  return getSheetsObjectType(input) === 'Range';
}

export function isSupportedType(input) {
  return (
    ['[object String]', '[object Number]', '[object Date]', '[object Boolean]'].indexOf(
      toString.call(input)
    ) !== -1
  );
}

export function log(input) {
  Logger.log(input);
}

export const getSelectedRowIndices = () => {
  const activeSheet = SpreadsheetApp.getActiveSheet();
  const rowAggregator = {};
  const selectedRanges = activeSheet
    .getSelection()
    .getActiveRangeList()
    .getRanges();
  selectedRanges.forEach(range => {
    rowAggregator[range.getRow()] = true;
  });
  return Object.keys(rowAggregator).map(key => {
    return Number(key);
  });
};

export const sendEmail = (toAddress, subject, message) => {
  return MailApp.sendEmail(toAddress, subject, message);
};

export const getSheetIndex = sheetName => {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  for (let i = 0; i < sheets.length; i += 1) {
    if (sheets[i] === sheetName) {
      return i;
    }
  }
  return -1;
};

export const getSheetByName = sheetName => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`getSheetByName was unable to find a sheet with name "${sheetName}"`);
  }
  return sheet;
};

export const getSheet = sheetOrSheetName => {
  if (isString(sheetOrSheetName)) {
    try {
      return getSheetByName(sheetOrSheetName);
    } catch (e) {
      throw new Error(`getSheet could not retrieve sheet with name "${sheetOrSheetName}".`);
    }
  } else if (isSheet(sheetOrSheetName)) {
    return sheetOrSheetName;
  } else {
    throw new Error(
      `getSheet called with invalid sheetOrSheetName data type: "${getSheetsObjectType(
        sheetOrSheetName
      )}".`
    );
  }
};

export const getShape = input => {
  if (isArray(input)) {
    if (isArray(input[0])) {
      return `${input.length}x${input[0].length}`;
    }
    throw new Error(`getShape called on non-2d array`);
  } else if (isRange(input)) {
    return `${input.getNumRows()}x${input.getNumColumns()}`;
  } else {
    throw new Error(`getShape called on data with type which does not have meaningful 2d shape.`);
  }
};

export const namedRangeExists = namedRange => {
  return SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange) !== undefined;
};

export const getValueByName = namedRange => {
  const range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange);
  if (!range) {
    throw new Error(`getValueByName failed because the namedRange "${namedRange}" does not exist.`);
  }
  return getShape(range) === '1x1' ? range.getValues()[0][0] : range.getValues();
};

export const updateValueByName = (namedRange, value) => {
  const range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange);
  if (!range) {
    throw new Error(`getValueByName failed because the namedRange "${namedRange}" does not exist.`);
  }
  if (range.isPartOfMerge()) {
    if (!isString(value)) {
      throw new Error(
        `updateValueByName - range to update is merged, update value must be a string.`
      );
    }
    range.setValue(value);
  } else {
    let updVal = value;
    switch (getType(value)) {
      case '[object String]':
      case '[object Number]':
      case '[object Boolean]':
      case '[object Date]':
        updVal = [[value]];
        break;
      case '[object Array]':
        break;
      default:
        throw new Error(`updateValueByName - input value is neither an array or a string`);
    }
    if (updVal.length !== range.getNumRows()) {
      throw new Error(`value is not of the same size as the namedRange: row count incorrect`);
    }
    if (updVal[0].length !== range.getNumColumns()) {
      throw new Error(`value is not of the same size as the namedRange: column count problem`);
    }
    return range.setValues(updVal);
  }
  return true;
};

export const getCoordinatesByName = namedRange => {
  const range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange);
  if (!range) {
    throw new Error(`getCoordinatesByName failed - input range does not exist.`);
  }
  return {
    startRow: range.getRow(),
    endRow: range.getLastRow(),
    startCol: range.getColumn(),
    endCol: range.getLastColumn()
  };
};

export const Utils = {
  getSheetsObjectType,
  isSpreadsheet,
  isSheet,
  isRange,
  isSupportedType,
  getSelectedRowIndices,
  sendEmail,
  getSheetIndex,
  getSheet,
  getShape,
  namedRangeExists,
  getValueByName,
  updateValueByName,
  getCoordinatesByName,
  isDate1,
  isArray,
  isString,
  isNumeric,
  isFunction,
  isObject,
  isBoolean,
  isNull,
  isUndefined,
  inArray,
  getType,
  toBool,
  firstToUpper,
  getTimeStamp,
  getTimeDiff,
  isJson,
  toJson,
  isEmail,
  tokenInterpolate,
  getTokens,
  removeDuplicates,
  getDuplicates,
  testUnique
};
