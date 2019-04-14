  export const isArray = (input) => {
    return toString.call(input) === '[object Array]';
  }

  export const isString = (input) => {
    return toString.call(input) === '[object String]';
  }

  export const isNumeric = (input) => {
    return toString.call(input) === '[object Number]';
  }

  export const isFunction = (input) => {
    return toString.call(input) === '[object Function]';
  }

  export const isObject = (input) => {
    return toString.call(input) === '[object Object]';
  }

  export const isBoolean = (input) => {
    return toString.call(input) === '[object Boolean]';
  }

  export const inArray = (needle, haystack) => {
    return haystack.indexOf(needle) !== -1;
  }

  export const toBool = (value) => {
    value = isString(value) ? value.toLowerCase() : value;

    switch (value) {
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
        return true;
      default:
        return false;
    }
  }

  export const firstToUpper = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  export const getTimeStamp = (precision) => {
    var time = new Date().getTime();
    return precision ? time.toFixed(precision) : time;
  }

  export const getTimeDiff = (oldTime, precision) => {
    var newTime = getTimeStamp();
    return precision ? (newTime - oldTime).toFixed(precision) : (newTime - oldTime);
  }

  export const isValidColor = (input) => {
    if (COLORS[input]) {
      return true;
    } else if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(input)) {
      return true;
    } else {
      return false;
    }
  }