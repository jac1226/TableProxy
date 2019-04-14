/**
 * UniqueSet - an object used to speed up handling lists which must be unique
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
        (toString.call(input) === '[object Array]' ? input : [input]).forEach((index) => {
            switch (toString.call(index)) {
                case '[object Number]':
                    this._numbers[index] = Number;
                    break;
                case '[object String]':
                    this._strings[index] = String;
                    break;
                case '[object Date]':
                    this._dates[index] = Date;
                    break;
                default:
                    throw new TypeError('UniqueSet can only store strings, numbers, dates. Received "' + toString.call(index) + '" at index '+index);
            }
        });
        return this;
    }
    remove() {
        (toString.call(input) === '[object Array]' ? input : [input]).forEach(function (index) {
            switch (toString.call(index)) {
                case '[object Number]':
                    delete this._numbers[index];
                    break;
                case '[object String]':
                    delete this._strings[index];
                    break;
                case '[object Date]':
                    delete this._dates[index];
                    break;
                default:
                    throw new TypeError('UniqueSet can only store strings, numbers, dates. Received "' + toString.call(index) + '"');
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
    copyIndices(input) {
        if (input instanceof UniqueSet) {
            return this.flush().push(input.values);
        } else {
            throw new TypeError('copyIndices accepts only UniqueSet input.');
        }
    }
    get values() {
        return []
            .concat(Object.keys(this._numbers).map((index) => {
                return this._numbers[index](index);
            }))
            .concat(Object.keys(this._strings).map((index) => {
                return this._strings[index](index);
            }))
            .concat(Object.keys(this._dates).map((index) => {
                return this._dates[index](index);
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