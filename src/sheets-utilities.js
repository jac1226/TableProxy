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

export const getSheetsObjectType = input => {
  let returnType;
  if (typeof input === 'object') {
    try {
      returnType = input.getGibberish(); // dummy method, throws error
    } catch (e) {
      returnType = e.message.split(' object ')[1].replace('.', ''); // extract type from error
    }
  }
  return returnType;
};

export const isSpreadsheet = input => {
  return getSheetsObjectType(input) === 'Spreadsheet';
};

export const isSheet = input => {
  return getSheetsObjectType(input) === 'Sheet';
};

export const isRange = input => {
  return getSheetsObjectType(input) === 'Range';
};

export const isSupportedType = input => {
  return (
    ['[object String]', '[object Number]', '[object Date]', '[object Boolean]'].indexOf(
      toString.call(input)
    ) !== -1
  );
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

export const log = input => {
  Logger.log(input);
};

export const getSelectedRowIndices = () => {
  return Object.keys(
    SpreadsheetApp.getActiveSheet()
      .getSelection()
      .getActiveRangeList()
      .getRanges()
      .reduce((a, r) => {
        const sr = r.getRow() - 1;
        const er = sr + r.getNumRows();
        for (let i = sr; i < er; i += 1) {
          // eslint-disable-next-line no-param-reassign
          a[i] = true;
        }
        return a;
      }, {})
  ).map(k => Number(k));
};

export const getSpreadsheet = spreadsheetId => {
  return spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
};

export const getSheetIndex = (sheetName, spreadsheetId) => {
  const sheets = getSpreadsheet(spreadsheetId).getSheets();
  for (let i = 0; i < sheets.length; i += 1) {
    if (sheets[i] === sheetName) {
      return i;
    }
  }
  return -1;
};

export const getSheetByName = (sheetName, spreadsheetId) => {
  const sheet = getSpreadsheet(spreadsheetId).getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`getSheetByName was unable to find a sheet with name "${sheetName}"`);
  }
  return sheet;
};

export const namedRangeExists = (namedRange, spreadsheetId) => {
  return getSpreadsheet(spreadsheetId).getRangeByName(namedRange) !== undefined;
};

export const getValueByName = (namedRange, spreadsheetId) => {
  const range = getSpreadsheet(spreadsheetId).getRangeByName(namedRange);
  if (!range) {
    throw new Error(`getValueByName failed because the namedRange "${namedRange}" does not exist.`);
  }
  return getShape(range) === '1x1' ? range.getValues()[0][0] : range.getValues();
};

export const updateValueByName = (namedRange, value, spreadsheetId) => {
  const range = getSpreadsheet(spreadsheetId).getRangeByName(namedRange);
  if (!range) {
    throw new Error(
      `updateValueByName failed because the namedRange "${namedRange}" does not exist.`
    );
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

export const getCoordinatesByName = (namedRange, spreadsheetId) => {
  const range = getSpreadsheet(spreadsheetId).getRangeByName(namedRange);
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

export const getNamedRangesObject = spreadsheetId => {
  return getSpreadsheet(spreadsheetId)
    .getNamedRanges()
    .reduce((retObj, namedRange) => {
      const range = namedRange.getRange();
      let getter;
      let setter;
      if (getShape(range) === '1x1' || range.isPartOfMerge()) {
        getter = () => {
          return range.getValue();
        };
        setter = input => {
          return range.setValue(input);
        };
      } else {
        getter = () => {
          return range.getValues();
        };
        setter = input => {
          return range.setValues(input);
        };
      }
      Object.defineProperty(retObj, namedRange.getName(), {
        enumerable: true,
        configurable: false,
        get: getter,
        set: setter
      });
      return retObj;
    }, {});
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

export const sendEmail = (to, subject, body, htmlBody) => {
  const msgObj = {
    to: isArray(to) ? to.join(',') : to,
    subject,
    body
  };
  if (htmlBody !== undefined) {
    msgObj.htmlBody = htmlBody;
  }
  return MailApp.sendEmail(msgObj);
};

export const Utils = {
  getSheetsObjectType,
  isSpreadsheet,
  isSheet,
  isRange,
  isSupportedType,
  getSelectedRowIndices,
  sendEmail,
  getSpreadsheet,
  getSheetIndex,
  getSheet,
  getShape,
  namedRangeExists,
  getValueByName,
  updateValueByName,
  getCoordinatesByName,
  getNamedRangesObject,
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
