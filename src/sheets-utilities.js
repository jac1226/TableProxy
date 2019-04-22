/**
 * Sheets Utilities
 * @desc Various Google Sheets utilities
 */

/**
 * Determines Google Sheet object type
 * @param {Object} input - The object to be tested
 * @return string - Google Sheets type {Sheet,Range... etc}
 */
export function getSheetsObjectType(input) {
  const inputType = typeof input;
  let returnType;
  if (inputType === 'object') {
    try {
      returnType = input.getGibberish(); // dummy method, throws error
    } catch (e) {
      returnType = e.message.split(' object ')[1].replace('.', ''); // extract type from error
    }
  }
  return returnType;
}

/**
 * Tests if input is a Spreadsheet object ytpe
 * @param {Object} input - The object to be tested
 * @return {boolean}
 */
export function isSpreadsheet(input) {
  return getSheetsObjectType(input) === 'Spreadsheet';
}

/**
 * Tests if input is a sheets Sheet object ytpe
 * @param {Object} input - The object to be tested
 * @return {boolean}
 */
export function isSheet(input) {
  return getSheetsObjectType(input) === 'Sheet';
}

/**
 * Tests if input is a sheets Range object ytpe
 * @param {Object} input - The object to be tested
 * @return {boolean}
 */
export function isRange(input) {
  return getSheetsObjectType(input) === 'Range';
}
