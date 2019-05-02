/**
 * Map/Unique Set handling
 * @desc Map originally created to handle creating unique lists.
 * @desc Using indexOf to prevent duplicates is much faster for <3700 items
 * @desc Using Map shim is much slower
 */

/**
 * Map - same functionality as native Map plus some additional features
 * @desc Supports ONLY String, Number, Date - the types that sheets supports
 * @desc Could be enhanced for regexp, null, undefined if needed.
 * @desc Handling objects & arrays keys will be more difficult
 * @desc Is about 10 times slower than native JS Map for about 100,000 elements
 * @desc Suffers indexOf slowness for key deletion
 * @constructor Map
 * @return {Map}
 */
export class Map {
  constructor(input) {
    Object.defineProperties(this, {
      pvt_strings: {
        enumerable: false,
        writable: true,
        value: {}
      },
      pvt_numbers: {
        enumerable: false,
        writable: true,
        value: {}
      },
      pvt_dates: {
        enumerable: false,
        writable: true,
        value: {}
      },
      pvt_keys: {
        enumerable: false,
        writable: true,
        value: []
      },
      pvt_get_container: {
        enumerable: false,
        writable: false,
        value: key => {
          let result;
          switch (toString.call(key)) {
            case '[object Number]':
              result = this.pvt_numbers;
              break;
            case '[object String]':
              result = this.pvt_strings;
              break;
            case '[object Date]':
              result = this.pvt_dates;
              break;
            default:
              throw new TypeError(`Map can't accept ${toString.call(key)} keys.`);
          }
          return result;
        }
      }
    });
    let entries = [];
    if (input instanceof Map) {
      entries = input.entries();
    } else {
      switch (toString.call(input)) {
        case '[object Array]':
          entries = input;
          break;
        case '[object Object]':
          Object.keys(input).forEach(key => {
            entries.push([key, input[key]]);
          });
          break;
        case '[object Undefined]':
          break;
        default:
          throw new Error(`${toString.call(input)} not valid for Map constructor.`);
      }
    }
    entries.forEach(entry => {
      this.set(entry[0], entry[1]);
    });
  }

  has(key) {
    return Object.prototype.hasOwnProperty.call(this.pvt_get_container(key), key);
  }

  set(key, value) {
    if (!this.has(key)) {
      this.pvt_keys.push(key);
    }
    this.pvt_get_container(key)[key] = value;
    return this;
  }

  get(key) {
    return this.pvt_get_container(key)[key];
  }

  delete(key) {
    const indexOf = this.pvt_keys.indexOf(key);
    if (indexOf !== -1) {
      this.pvt_keys.splice(indexOf, 1);
      delete this.pvt_get_container(key)[key];
    }
    return indexOf !== -1;
  }

  keys() {
    return this.pvt_keys;
  }

  values() {
    const result = [];
    this.pvt_keys.forEach(key => {
      result.push(this.get(key));
    });
    return result;
  }

  entries() {
    const result = [];
    this.pvt_keys.forEach(key => {
      result.push([key, this.get(key)]);
    });
    return result;
  }

  clear() {
    this.pvt_strings = {};
    this.pvt_numbers = {};
    this.pvt_dates = {};
    this.pvt_keys = [];
    return this;
  }

  forEach(callback) {
    this.pvt_keys.forEach(key => {
      callback(this.get(key), key, this);
    });
  }

  copyItems(map) {
    if (!(map instanceof Map)) {
      throw new TypeError('copyItems accepts only Map input.');
    }
    this.clear();
    map.entries().forEach(entry => {
      this.set(entry[0], entry[1]);
    });
    return this;
  }

  get stringKeyCount() {
    return Object.keys(this.pvt_strings).length;
  }

  get numberKeyCount() {
    return Object.keys(this.pvt_numbers).length;
  }

  get dateKeyCount() {
    return Object.keys(this.pvt_dates).length;
  }

  get keyTypes() {
    const result = [];
    if (this.stringKeyCount > 0) {
      result.push('strings');
    }
    if (this.numberKeyCount > 0) {
      result.push('numbers');
    }
    if (this.dateKeyCount > 0) {
      result.push('dates');
    }
    return result;
  }

  get keyTypesPure() {
    return this.keyTypes.length < 2;
  }

  get empty() {
    return this.length === 0;
  }

  get length() {
    return this.pvt_keys.length;
  }
}

export class UniqueSet extends Map {
  push(item) {
    this.set(item);
    return this;
  }

  remove(item) {
    this.delete(item);
    return this;
  }

  flush() {
    return this.clear();
  }

  forEach(callback) {
    this.pvt_keys.forEach(key => {
      callback(key);
    });
  }

  get values() {
    return this.keys();
  }
}

/**
 * removeDuplicates - returns an array less its duplicates
 * @desc Uses Map
 * @return {array}
 */
export function removeDuplicates(array) {
  const c = new Map();
  array.forEach(v => {
    c.set(v);
  });
  return c.keys();
}

/**
 * getDuplicates - returns an UniqueSet of duplicates
 * @desc Uses Map
 * @return {Map}
 */
export function getDuplicates(...args) {
  const d = new Map();
  const i = toString.call(args[0]) === '[object Array]' ? args[0] : args;
  const t = new Map();
  i.forEach(v => {
    if (!t.has(v)) {
      t.set(v);
    } else {
      d.set(v);
    }
  });
  return d.keys();
}

/**
 * testUnique - determines if a set of items is unique
 * @desc Uses getDuplicates
 * @return {boolean}
 */
export function testUnique(...args) {
  let r;
  if (toString.call(args[0]) === '[object Array]') {
    r = getDuplicates(args[0]).length === 0;
  } else {
    r = getDuplicates(args).length === 0;
  }
  return r;
}
