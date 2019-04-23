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
    this.pvt_strings = {};
    this.pvt_numbers = {};
    this.pvt_dates = {};

    Object.keys(args).forEach(i => {
      this.push(args[i]);
    });
  }

  push(input) {
    const inputType = toString.call(input);
    (inputType === '[object Array]' ? input : [input]).forEach((i, index) => {
      switch (toString.call(i)) {
        case '[object Number]':
          this.pvt_numbers[i] = Number;
          break;
        case '[object String]':
          this.pvt_strings[i] = String;
          break;
        case '[object Date]':
          this.pvt_dates[i] = Date;
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
    const inputType = toString.call(input);
    (inputType === '[object Array]' ? input : [input]).forEach((i, index) => {
      switch (toString.call(i)) {
        case '[object Number]':
          delete this.pvt_numbers[i];
          break;
        case '[object String]':
          delete this.pvt_strings[i];
          break;
        case '[object Date]':
          delete this.pvt_dates[i];
          break;
        default:
          throw new TypeError(
            `UniqueSet can only store strings, numbers, dates. Received ${inputType} at index ${index}`
          );
      }
    });
    return this;
  }

  flush() {
    this.pvt_strings = {};
    this.pvt_numbers = {};
    this.pvt_dates = {};
    return this;
  }

  forEach(callback) {
    return this.values.forEach(callback);
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
        Object.keys(this.pvt_numbers).map(i => {
          return this.pvt_numbers[i](i);
        })
      )
      .concat(
        Object.keys(this.pvt_strings).map(i => {
          return this.pvt_strings[i](i);
        })
      )
      .concat(
        Object.keys(this.pvt_dates).map(i => {
          return this.pvt_dates[i](i);
        })
      );
  }

  get contains() {
    return {
      numbers: Object.keys(this.pvt_numbers).length,
      strings: Object.keys(this.pvt_strings).length,
      dates: Object.keys(this.pvt_dates).length
    };
  }

  get holds() {
    const returnArray = [];
    const { numbers, strings, dates } = this.contains;
    if (numbers > 0) {
      returnArray.push('numbers');
    }
    if (strings > 0) {
      returnArray.push('strings');
    }
    if (dates > 0) {
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
