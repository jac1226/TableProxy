/**
 * UniqueSet - ac class used to speed up handling lists which must be unique
 * @desc Using indexOf to prevent duplicates is nearly 100 times slower
 * @desc Using Map shim is approximately 300 times slower
 * @desc Handles String, Number, Date - the types that sheets supports
 * @constructor UniqueSet
 * @return {UniqueSet}
 */

export default class UniqueSet {
    constructor() {
        this._strings = {};
        this._numbers = {};
        this._dates = {};
        for (var i in arguments) {
            this.push(arguments[i]);
        }
    }
    push(input) {
        (toString.call(input) === '[object Array]' ? input : [input]).forEach((item) => {
            switch (toString.call(item)) {
                case '[object Number]':
                    this._numbers[item] = Number;
                    break;
                case '[object String]':
                    this._strings[item] = String;
                    break;
                case '[object Date]':
                    this._dates[item] = Date;
                    break;
                default:
                    throw new TypeError('UniqueSet can only store strings, numbers, dates. Received "' + toString.call(item) + '" at index ' + item);
            }
        });
        return this;
    }
    remove(input) {
        (toString.call(input) === '[object Array]' ? input : [input]).forEach((item) => {
            switch (toString.call(item)) {
                case '[object Number]':
                    delete this._numbers[item];
                    break;
                case '[object String]':
                    delete this._strings[item];
                    break;
                case '[object Date]':
                    delete this._dates[item];
                    break;
                default:
                    throw new TypeError('UniqueSet can only store strings, numbers, dates. Received "' + toString.call(item) + '"');
            }
        });
        return this;
    }
    flush() {
        this._strings = {};
        this._numbers = {};
        this._dates = {};
        return this;
    }
    copyItems(uniqueSet) {
        if (input instanceof UniqueSet) {
            return this.flush().push(uniqueSet.values);
        } else {
            throw new TypeError('copyIndices accepts only UniqueSet input.');
        }
    }
    get values() {
        return []
            .concat(Object.keys(this._numbers).map((item) => {
                return this._numbers[item](item);
            }))
            .concat(Object.keys(this._strings).map((item) => {
                return this._strings[item](item);
            }))
            .concat(Object.keys(this._dates).map((item) => {
                return this._dates[item](item);
            }));
    }
    get contains() {
        return {
            numbers: Object.keys(this._numbers).length,
            strings: Object.keys(this._strings).length,
            dates: Object.keys(this._dates).length
        }
    }
    get holds() {
        var returnArray = [];
        var contains = this.contains;
        if (contains.numbers) {
            returnArray.push('numbers')
        };
        if (contains.strings) {
            returnArray.push('strings')
        };
        if (contains.dates) {
            returnArray.push('dates')
        };
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
