/**
 * Sheets Utilities
 * @desc Various Google Sheets utilities
 */

/**
 * Determines Google Sheet object type
 * @param {Object} input - The object to be tested
 * @returns {string} - Google Sheets type {Sheet,Range... etc}
 */
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

/**
 * Tests if input is a Spreadsheet object type
 * @param {Object} input - The object to be tested
 * @returns {boolean}
 */
export function isSpreadsheet(input) {
  return getSheetsObjectType(input) === 'Spreadsheet';
}

/**
 * Tests if input is a sheets Sheet object type
 * @param {Object} input - The object to be tested
 * @returns {boolean}
 */
export function isSheet(input) {
  return getSheetsObjectType(input) === 'Sheet';
}

/**
 * Tests if input is a sheets Range object type
 * @param {Object} input - The object to be tested
 * @returns {boolean}
 */
export function isRange(input) {
  return getSheetsObjectType(input) === 'Range';
}

/**
 * Logger
 * @param {string} input - Logs to Logger
 * @returns {void}
 */
export function log(input) {
  Logger.log(input);
}
