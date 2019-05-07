/**
 * Utils - Utilities
 * @desc Various utilities
 */

import { F } from './CONSTANTS';

export const isDate1 = input => {
  return toString.call(input) === '[object Date]';
};

export const isArray = input => {
  return toString.call(input) === '[object Array]';
};

export const isString = input => {
  return toString.call(input) === '[object String]';
};

export const isNumeric = input => {
  return toString.call(input) === '[object Number]';
};

export const isFunction = input => {
  return toString.call(input) === '[object Function]';
};

export const isObject = input => {
  return toString.call(input) === '[object Object]' && input !== null && input !== undefined;
};

export const isBoolean = input => {
  return toString.call(input) === '[object Boolean]';
};

export const isNull = input => {
  return input === null;
};

export const isUndefined = input => {
  return input === undefined;
};

export const inArray = (needle, haystack) => {
  return haystack.indexOf(needle) !== -1;
};

export const getType = input => {
  const ts = toString.call(input);
  let type;
  switch (ts) {
    case '[object Boolean]':
    case '[object String]':
    case '[object Number]':
    case '[object Array]':
    case '[object Function]':
    case '[object Date]':
    case '[object Undefined]':
    case '[object Null]':
      type = ts;
      break;
    case '[object Object]':
      if (isNull(input)) {
        type = '[object Null]';
      } else if (isUndefined(input)) {
        type = '[object Undefined]';
      } else {
        type = '[object Object]';
      }
      break;
    default:
      throw new Error(`getType resolved to unknown for ${input}`);
  }
  return type;
};

export const toBool = value => {
  switch (isString(value) ? value.toLowerCase() : value) {
    case true:
    case 'true':
    case 1:
    case '1':
    case 'on':
    case 'yes':
      return true;
    default:
      return false;
  }
};

export const firstToUpper = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getTimeStamp = precision => {
  const time = new Date().getTime();
  return precision ? time.toFixed(precision) : time;
};

export const getTimeDiff = (oldTime, precision) => {
  const newTime = getTimeStamp();
  return precision ? (newTime - oldTime).toFixed(precision) : newTime - oldTime;
};

export const isValidColor = input => {
  if (F.C[input]) {
    return true;
  }
  if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(input)) {
    return true;
  }
  return false;
};

export const strContains = (string, test) => {
  if (!isArray(test) && !isString(test) && !isNumeric(test)) {
    throw new TypeError(`strContains accepts arrays, strings, numbers.`);
  }
  let contains = false;
  (isArray(test) ? test : [test]).forEach(t => {
    if (string.indexOf(t) !== -1) {
      contains = true;
    }
  });
  return contains;
};
