/**
 * Utils - Utilities
 * @desc Various utilities
 */

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

export const strContains = (string, test) => {
  let contains = false;
  (isArray(test) ? test : [test]).forEach(t => {
    if (string.indexOf(t) !== -1) {
      contains = true;
    }
  });
  return contains;
};

export const objAssign = (target, source, propsWritable) => {
  const writable = propsWritable === true;
  Object.keys(source).forEach(sProp => {
    Object.defineProperty(target, sProp, {
      enumerable: true,
      configurable: false,
      writable,
      value: source[sProp]
    });
  });
  return target;
};

export const isJson = str => {
  if (!isString(str)) {
    return false;
  }
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const toJson = obj => {
  return JSON.stringify(obj)
    .replace(/\\n/g, '\\n')
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, '\\&')
    .replace(/\\r/g, '\\r')
    .replace(/\\t/g, '\\t')
    .replace(/\\b/g, '\\b')
    .replace(/\\f/g, '\\f');
};

export const isEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getTokens = (tokenizedString, onlyFieldNames) => {
  const tokenList = tokenizedString.match(/({{![^{}]*}})/gm);
  if (onlyFieldNames === true) {
    for (let i = 0; i < tokenList.length; i += 1) {
      tokenList[i] = tokenList[i].replace('{{!', '').replace('}}', '');
    }
  }
  return tokenList;
};

export const tokenInterpolate = (tokenizedString, record) => {
  const tokenList = getTokens(tokenizedString);
  let result = tokenizedString;
  for (let i = 0; i < tokenList.length; i += 1) {
    const replacementValue = record[tokenList[i].replace('{{!', '').replace('}}', '')];
    if (replacementValue === undefined) {
      throw Error(`Interpolation failed for: ${JSON.stringify(record)}`);
    }
    result = result.replace(tokenList[i], replacementValue);
  }
  return result;
};
