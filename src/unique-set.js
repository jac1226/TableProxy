/**
 * UniqueSet - ac class used to speed up handling lists which must be unique
 * @desc Using indexOf to prevent duplicates is nearly 100 times slower
 * @desc Using Map shim is approximately 300 times slower
 * @desc Handles String, Number, Date - the types that sheets supports
 * @constructor UniqueSet
 * @return {UniqueSet}
 */

export default class UniqueSet {
  constructor(...args) {
    this.strings = {};
    this.numbers = {};
    this.dates = {};

    Object.keys(args).forEach(i => {
      this.push(args[i]);
    });
  }

  push(input) {
    let inputType = toString.call(input);
    (inputType === '[object Array]' ? input : [input]).forEach((item, index) => {
      switch (toString.call(item)) {
        case '[object Number]':
          this.numbers[item] = Number;
          break;
        case '[object String]':
          this.strings[item] = String;
          break;
        case '[object Date]':
          this.dates[item] = Date;
          break;
        default:
          throw new TypeError(
            `UniqueSet can only store strings, numbers, dates. Received ${inputType} at index ${index}`
          );
      }
    });
    return this;
  }

  remove(input) {
    (toString.call(input) === '[object Array]' ? input : [input]).forEach(item => {
      switch (toString.call(item)) {
        case '[object Number]':
          delete this.numbers[item];
          break;
        case '[object String]':
          delete this.strings[item];
          break;
        case '[object Date]':
          delete this.dates[item];
          break;
        default:
          throw new TypeError(
            'UniqueSet can only store strings, numbers, dates. Received "' +
              toString.call(item) +
              '"'
          );
      }
    });
    return this;
  }

  flush() {
    this.strings = {};
    this.numbers = {};
    this.dates = {};
    return this;
  }

  copyItems(uniqueSet) {
    if (!(uniqueSet instanceof UniqueSet)) {
      throw new TypeError('copyIndices accepts only UniqueSet input.');
    }
    return this.flush().push(uniqueSet.values);
  }

  get values() {
    return []
      .concat(
        Object.keys(this.numbers).map(item => {
          return this.numbers[item](item);
        })
      )
      .concat(
        Object.keys(this.strings).map(item => {
          return this.strings[item](item);
        })
      )
      .concat(
        Object.keys(this.dates).map(item => {
          return this.dates[item](item);
        })
      );
  }

  get contains() {
    return {
      numbers: Object.keys(this.numbers).length,
      strings: Object.keys(this.strings).length,
      dates: Object.keys(this.dates).length
    };
  }

  get holds() {
    const returnArray = [];
    const contains = this.contains;
    if (contains.numbers) {
      returnArray.push('numbers');
    }
    if (contains.strings) {
      returnArray.push('strings');
    }
    if (contains.dates) {
      returnArray.push('dates');
    }
    return returnArray;
  }

  get pure() {
    return this.holds.length < 2;
  }

  get isEmpty() {
    return this.values.length === 0;
  }

  get length() {
    return this.values.length;
  }
}

const u = new UniqueSet(1, 2, 3, 4, 5, 5, 5, 5, '1');
Logger.log(JSON.stringify(u));
