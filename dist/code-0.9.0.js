function doGet() {
}!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 8);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return UniqueSet;
    });
    var UniqueSet = function() {
        function UniqueSet() {
            for (var _this = this, _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, UniqueSet), this.strings = {}, this.numbers = {}, this.dates = {}, Object.keys(args).forEach(function(i) {
                _this.push(args[i]);
            });
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(UniqueSet, [ {
            key: "push",
            value: function(input) {
                var _this2 = this, inputType = toString.call(input);
                return ("[object Array]" === inputType ? input : [ input ]).forEach(function(i, index) {
                    switch (toString.call(i)) {
                      case "[object Number]":
                        _this2.numbers[i] = Number;
                        break;

                      case "[object String]":
                        _this2.strings[i] = String;
                        break;

                      case "[object Date]":
                        _this2.dates[i] = Date;
                        break;

                      default:
                        throw new TypeError("UniqueSet can only store strings, numbers, dates. Received ".concat(inputType, " at index ").concat(index));
                    }
                }), this;
            }
        }, {
            key: "remove",
            value: function(input) {
                var _this3 = this, inputType = toString.call(input);
                return ("[object Array]" === inputType ? input : [ input ]).forEach(function(i, index) {
                    switch (toString.call(i)) {
                      case "[object Number]":
                        delete _this3.numbers[i];
                        break;

                      case "[object String]":
                        delete _this3.strings[i];
                        break;

                      case "[object Date]":
                        delete _this3.dates[i];
                        break;

                      default:
                        throw new TypeError("UniqueSet can only store strings, numbers, dates. Received ".concat(inputType, " at index ").concat(index));
                    }
                }), this;
            }
        }, {
            key: "flush",
            value: function() {
                return this.strings = {}, this.numbers = {}, this.dates = {}, this;
            }
        }, {
            key: "copyItems",
            value: function(uniqueSet) {
                if (!(uniqueSet instanceof UniqueSet)) throw new TypeError("copyIndices accepts only UniqueSet input.");
                return this.flush().push(uniqueSet.values);
            }
        }, {
            key: "values",
            get: function() {
                var _this4 = this;
                return [].concat(Object.keys(this.numbers).map(function(i) {
                    return _this4.numbers[i](i);
                })).concat(Object.keys(this.strings).map(function(i) {
                    return _this4.strings[i](i);
                })).concat(Object.keys(this.dates).map(function(i) {
                    return _this4.dates[i](i);
                }));
            }
        }, {
            key: "contains",
            get: function() {
                return {
                    numbers: Object.keys(this.numbers).length,
                    strings: Object.keys(this.strings).length,
                    dates: Object.keys(this.dates).length
                };
            }
        }, {
            key: "holds",
            get: function() {
                var returnArray = [], _this$contains = this.contains, numbers = _this$contains.numbers, strings = _this$contains.strings, dates = _this$contains.dates;
                return 0 < numbers && returnArray.push("numbers"), 0 < strings && returnArray.push("strings"), 
                0 < dates && returnArray.push("dates"), returnArray;
            }
        }, {
            key: "pure",
            get: function() {
                return this.holds.length < 2;
            }
        }, {
            key: "isEmpty",
            get: function() {
                return 0 === this.values.length;
            }
        }, {
            key: "length",
            get: function() {
                return this.values.length;
            }
        } ]), UniqueSet;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return DEFAULT_HEADER_ANCHOR;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return COLORS;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return SUPPORTED_ATTRIBUTES;
    });
    var DEFAULT_HEADER_ANCHOR = "HEADER_ANCHOR", COLORS = {
        SUCCESS: "#DFFFB4",
        FAILURE: "#FFB4B4",
        WARNING: "#FFDDB4",
        RED: "red",
        red: "red",
        WHITE: "white",
        BLUE: "blue",
        GREEN: "green",
        ORANGE: "orange",
        BLACK: "black",
        GREY: "grey",
        YELLOW: "yellow",
        LIGHT_GREY: "#E5DEDE"
    }, SUPPORTED_ATTRIBUTES = [ "value", "background", "fontcolor", "note", "fontsize", "fontstyle", "fontfamily", "fontweight" ];
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return getTimeStamp;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return getTimeDiff;
    });
    __webpack_require__(1), function isString(input) {
        return "[object String]" === toString.call(input);
    };
    var getTimeStamp = function getTimeStamp(precision) {
        var time = new Date().getTime();
        return precision ? time.toFixed(precision) : time;
    }, getTimeDiff = function getTimeDiff(oldTime, precision) {
        var newTime = getTimeStamp();
        return precision ? (newTime - oldTime).toFixed(precision) : newTime - oldTime;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return SheetAccessor;
    });
    var _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
    function _toConsumableArray(arr) {
        return function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
        }(arr) || function _iterableToArray(iter) {
            if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter);
        }(arr) || function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance");
        }();
    }
    var SheetAccessor = function SheetAccessor(sheet, headerAnchorToken) {
        var _this = this;
        !function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }(this, SheetAccessor), this.range = {}, this.value = {}, this.background = {}, 
        this.fontcolor = {}, this.note = {}, this.fontfamily = {}, this.fontsize = {}, this.fontstyle = {}, 
        this.fontweight = {}, this.headerAnchorToken = _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["b"], 
        this.headerRowIndex = 0, this.headerColumnIndex = 0, this.getHeaderRow = null, this.getAllRecordIndices = null, 
        "[object String]" === toString.call(headerAnchorToken) && (this.headerAnchorToken = headerAnchorToken);
        for (var notesData = sheet.getDataRange().getNotes(), rowCount = notesData.length, columnCount = notesData[0].length, rowIndex = 0; rowIndex < rowCount; rowIndex += 1) if (-1 !== notesData[rowIndex].join("").indexOf(this.headerAnchorToken)) {
            this.headerRowIndex = rowIndex;
            break;
        }
        for (var columnIndex = 0; columnIndex < columnCount; columnIndex += 1) if (-1 !== notesData[this.headerRowIndex][columnIndex].indexOf(this.headerAnchorToken)) {
            this.headerColumnIndex = columnIndex;
            break;
        }
        this.range = {
            getCell: function(rowIndex, columnIndex) {
                return sheet.getRange(rowIndex + 1, columnIndex + 1);
            },
            getRow: function(rowIndex) {
                return sheet.getRange(rowIndex + 1, 1, 1);
            },
            getColumn: function(columnIndex, startRowIndex) {
                var dataRange = sheet.getDataRange(), startRowIndx = "[object Number]" === toString.call(startRowIndex) ? startRowIndex : 0;
                return sheet.getRange(startRowIndx + 1, columnIndex + 1, dataRange.getNumRows() - startRowIndx, 1);
            },
            getAll: function(startRowIndex, startColumnIndex) {
                var dataRange = sheet.getDataRange(), startRowIndx = "[object Number]" === toString.call(startRowIndex) ? startRowIndex : 0, startColumnIndx = "[object Number]" === toString.call(startColumnIndex) ? startColumnIndex : 0;
                return sheet.getRange(startRowIndx + 1, startColumnIndx + 1, dataRange.getNumRows() - startRowIndx, dataRange.getNumColumns() - startColumnIndx);
            },
            getAllRecords: function() {
                return _this.range.getAll(_this.headerRowIndex, 0);
            }
        };
        var mapping = {
            value: {
                get: "getValues",
                set: "setValues"
            },
            background: {
                get: "getBackgrounds",
                set: "setBackgrounds"
            },
            fontcolor: {
                get: "getFontColors",
                set: "setFontColors"
            },
            note: {
                get: "getNotes",
                set: "setNotes"
            },
            fontfamily: {
                get: "getFontFamilies",
                set: "setFontFamilies"
            },
            fontsize: {
                get: "getFontSizes",
                set: "setFontSizes"
            },
            fontstyle: {
                get: "getFontStyles",
                set: "setFontStyles"
            },
            fontweight: {
                get: "getFontWeights",
                set: "setFontWeights"
            }
        };
        Object.keys(mapping).forEach(function(attribute) {
            _this[attribute] = {};
            var getSetMapping = mapping[attribute];
            Object.keys(getSetMapping).forEach(function(getSet) {
                Object.keys(_this.range).forEach(function(rangeMethodName) {
                    _this[attribute][getSet + rangeMethodName.substr(3)] = function() {
                        for (var rangeMethod = _this.range[rangeMethodName], _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                        var range = rangeMethod.apply(void 0, args);
                        return 0 !== args.length ? range[getSetMapping[getSet]].apply(range, _toConsumableArray(args.splice(rangeMethod.length, args.length))) : range[getSetMapping[getSet]]();
                    };
                });
            });
        }), this.getHeaderRow = function() {
            return _this.value.getRow(_this.headerRowIndex);
        }, this.getAllRecordIndices = function() {
            var indices = [], numRows = _this.range.getAllRecords().getNumRows();
            Browser.msgBox(numRows);
            for (var i = _this.headerRowIndex + 1; i < numRows; ) indices.push(i), i += 1;
            return indices;
        };
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return QueryDriver;
    });
    var _unique_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var QueryDriver = function() {
        function QueryDriver(query, type) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, QueryDriver), this.query = null, this.type = type.toUpperCase(), this.writeToCursor = !1, 
            this.withRecords = !1, this.requestedAttributes = new _unique_set__WEBPACK_IMPORTED_MODULE_0__["a"](), 
            this.loadQuery(query);
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(QueryDriver, [ {
            key: "loadQuery",
            value: function(query) {
                var _this = this;
                if ("[object Function]" !== toString.call(query)) throw new TypeError("loadQuery requires accepts a function callback");
                var queryAsString = (this.query = query).toString();
                _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__["c"].forEach(function(attribute) {
                    var reString = ".{0,1}['|\"|[]{0,1}' ".concat(attribute, " '[['|\"]{0,1}");
                    new RegExp(reString, "g").test(queryAsString) && _this.requestedAttributes.push(attribute);
                });
            }
        } ]), QueryDriver;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
        Constructor;
    }
    var values = [ [ "1-1 Value", "1-2 Value", "1-3 Value", "1-4 Value", "1-5 Value" ], [ "2-1 Value", "2-2 Value", "2-3 Value", "2-4 Value", "2-5 Value" ], [ "3-1 Value", "3-2 Value", "3-3 Value", "3-4 Value", "3-5 Value" ], [ "4-1 Value", "4-2 Value", "4-3 Value", "4-4 Value", "4-5 Value" ], [ "5-1 Value", "5-2 Value", "5-3 Value", "5-4 Value", "5-5 Value" ], [ "6-1 Value", "6-2 Value", "6-3 Value", "6-4 Value", "6-5 Value" ] ], backgrounds = [ [ "#E5E5E5", "#E5E5E5", "#E5E5E5", "#E5E5E5", "#E5E5E5" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ] ], fontcolors = [ [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ] ], notes = [ [ "", "", "", "", "" ], [ "", "", "HEADER_ANCHOR", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ] ], fontweights = [ [ "bold", "bold", "bold", "bold", "bold" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ] ], fontstyles = [ [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ] ], fontsizes = [ [ 12, 12, 12, 12, 12 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ] ], fontfamilies = [ [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ] ], isInteger = function isInteger(input) {
        return input === parseInt(input, 10);
    }, DataContainer = function() {
        function DataContainer() {
            _classCallCheck(this, DataContainer), this.values = values, this.backgrounds = backgrounds, 
            this.fontcolors = fontcolors, this.notes = notes, this.fontweights = fontweights, 
            this.fontstyles = fontstyles, this.fontsizes = fontsizes, this.fontfamilies = fontfamilies;
        }
        return _createClass(DataContainer, [ {
            key: "filterDataArray",
            value: function(dataArrayName, startRow, startColumn, numRows, numColumns) {
                if (this[dataArrayName] === undefined) throw new Error('invalid dataset: "'.concat(dataArrayName, '"'));
                if (!isInteger(startRow)) throw new Error("startRow must be an integer - received ".concat(startRow, "."));
                if (!isInteger(startColumn)) throw new Error("startColumn must be an integer - received ".concat(startColumn, "."));
                if (numRows === undefined && numColumns !== undefined) throw new Error("numRows must be specified if numColumns is specified.");
                var dataArray = this[dataArrayName], numRowsClean = numRows === undefined ? 1 : numRows, numColumnsClean = numColumns === undefined ? 1 : numColumns;
                if (startRow < 1 || startRow > dataArray.length) throw new Error("startRow out of range for ".concat(dataArrayName, ". Requested startRow ").concat(startRow, " - must be between 1 and ").concat(dataArray.length, "."));
                if (startColumn < 1 || startColumn > dataArray[0].length) throw new Error("startColumn out of range for ".concat(dataArrayName, ". Requested startColumn ").concat(startColumn, " - must be between 1 and ").concat(dataArray[0].length, "."));
                if (startRow + numRowsClean - 1 > dataArray.length) throw new Error("numRows out of range for ".concat(dataArrayName, ". For startRow ").concat(startRow, ", numRows must be  between 1 and ").concat(dataArray.length - startRow + 1));
                if (startColumn + numColumnsClean - 1 > dataArray[0].length) throw new Error("numColumns out of range for ".concat(dataArrayName, ". For startColumn ").concat(startColumn, ", numColumns must be between 1 and ").concat(dataArray[0].length - startColumn + 1));
                return dataArray.filter(function(row, rowIndex) {
                    return startRow <= rowIndex + 1 && rowIndex <= startRow + numRowsClean - 2;
                }).map(function(row) {
                    return row.filter(function(column, columnIndex) {
                        return startColumn <= columnIndex + 1 && columnIndex <= startColumn + numColumnsClean - 2;
                    });
                });
            }
        }, {
            key: "getChunk",
            value: function(startRow, startColumn, numRows, numColumns) {
                return {
                    values: this.filterDataArray("values", startRow, startColumn, numRows, numColumns),
                    backgrounds: this.filterDataArray("backgrounds", startRow, startColumn, numRows, numColumns),
                    fontcolors: this.filterDataArray("fontcolors", startRow, startColumn, numRows, numColumns),
                    notes: this.filterDataArray("notes", startRow, startColumn, numRows, numColumns),
                    fontweights: this.filterDataArray("fontweights", startRow, startColumn, numRows, numColumns),
                    fontstyles: this.filterDataArray("fontstyles", startRow, startColumn, numRows, numColumns),
                    fontsizes: this.filterDataArray("fontsizes", startRow, startColumn, numRows, numColumns),
                    fontfamilies: this.filterDataArray("fontfamilies", startRow, startColumn, numRows, numColumns)
                };
            }
        }, {
            key: "setChunk",
            value: function(dataAttribute, dataChunk, startRow, startColumn) {
                var _this = this;
                return this[dataAttribute] && dataChunk[dataAttribute].forEach(function(row, rowIndex) {
                    row.forEach(function(columnValue, columnIndex) {
                        _this[dataAttribute][startRow - 1 + rowIndex][startColumn - 1 + columnIndex] = columnValue;
                    });
                }), this;
            }
        }, {
            key: "getNumRows",
            value: function() {
                return this.values.length;
            }
        }, {
            key: "getNumColumns",
            value: function() {
                return this.values[0].length;
            }
        } ]), DataContainer;
    }(), Range = function() {
        function Range(sheet, startRow, startColumn, numRows, numColumns) {
            _classCallCheck(this, Range), this.sheet = sheet, this.dataContainer = sheet.dataContainer, 
            this.dataChunk = this.dataContainer.getChunk(startRow, startColumn, numRows, numColumns), 
            this.startRow = startRow, this.startColumn = startColumn, this.numRows = numRows, 
            this.numColumns = numColumns, this.shape = "".concat(this.dataChunk.values.length, "x").concat(this.dataChunk.values[0].length);
        }
        return _createClass(Range, [ {
            key: "validateInputShape",
            value: function(input, type) {
                var inputShape = "".concat(input.length, "x").concat(input[0].length);
                if (inputShape !== this.shape) throw new Error("".concat(type, " failed: range shape is ").concat(this.shape, " and input is ").concat(inputShape));
            }
        }, {
            key: "getSheet",
            value: function() {
                return this.sheet;
            }
        }, {
            key: "getRow",
            value: function() {
                return this.startRow;
            }
        }, {
            key: "getRowIndex",
            value: function() {
                return this.startRow - 1;
            }
        }, {
            key: "getColumn",
            value: function() {
                return this.startColumn;
            }
        }, {
            key: "getColumnIndex",
            value: function() {
                return this.startColumn - 1;
            }
        }, {
            key: "getNumRows",
            value: function() {
                return this.numRows;
            }
        }, {
            key: "getNumColumns",
            value: function() {
                return this.numColumns;
            }
        }, {
            key: "getValues",
            value: function() {
                return this.dataChunk.values;
            }
        }, {
            key: "setValues",
            value: function(input) {
                return this.validateInputShape(input, "setValues"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("values", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        }, {
            key: "getBackgrounds",
            value: function() {
                return this.dataChunk.backgrounds;
            }
        }, {
            key: "setBackgrounds",
            value: function(input) {
                return this.validateInputShape(input, "setBackgrounds"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("backgrounds", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        }, {
            key: "getFontColors",
            value: function() {
                return this.dataChunk.fontcolors;
            }
        }, {
            key: "setFontColors",
            value: function(input) {
                return this.validateInputShape(input, "setFontColors"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("fontcolors", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        }, {
            key: "getNotes",
            value: function() {
                return this.dataChunk.notes;
            }
        }, {
            key: "setNotes",
            value: function(input) {
                return this.validateInputShape(input, "setNotes"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("notes", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        }, {
            key: "getFontFamilies",
            value: function() {
                return this.dataChunk.fontfamilies;
            }
        }, {
            key: "setFontFamilies",
            value: function(input) {
                return this.validateInputShape(input, "setFontFamilies"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("fontfamilies", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        }, {
            key: "getFontSizes",
            value: function() {
                return this.dataChunk.fontsizes;
            }
        }, {
            key: "setFontSizes",
            value: function(input) {
                return this.validateInputShape(input, "setFontSizes"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("fontsizes", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        }, {
            key: "getFontStyles",
            value: function() {
                return this.dataChunk.fontstyles;
            }
        }, {
            key: "setFontStyles",
            value: function(input) {
                return this.validateInputShape(input, "setFontStyles"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("fontstyles", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        }, {
            key: "getFontWeights",
            value: function() {
                return this.dataChunk.fontweights;
            }
        }, {
            key: "setFontWeights",
            value: function(input) {
                return this.validateInputShape(input, "setFontWeights"), this.dataChunk.values = input, 
                this.dataContainer.setChunk("fontweights", this.dataChunk, this.startRow, this.startColumn), 
                this;
            }
        } ]), Range;
    }(), Sheet = function() {
        function Sheet(name) {
            _classCallCheck(this, Sheet), this.name = name, this.dataContainer = new DataContainer();
        }
        return _createClass(Sheet, [ {
            key: "getRange",
            value: function(startRow, startColumn, numRows, numColumns) {
                try {
                    return new Range(this, startRow, startColumn, numRows, numColumns);
                } catch (e) {
                    throw new Error("getRange failed because of invalid inputs: ".concat(e));
                }
            }
        }, {
            key: "getName",
            value: function() {
                return this.name;
            }
        }, {
            key: "getDataRange",
            value: function() {
                return new Range(this, 1, 1, this.dataContainer.getNumRows(), this.dataContainer.getNumColumns());
            }
        } ]), Sheet;
    }(), ActiveSpreadsheet = function() {
        function ActiveSpreadsheet() {
            _classCallCheck(this, ActiveSpreadsheet), this.sheets = {
                Test: new Sheet("Test")
            };
        }
        return _createClass(ActiveSpreadsheet, [ {
            key: "getSheetByName",
            value: function(name) {
                if (-1 === Object.keys(this.sheets).indexOf(name)) throw new Error('sheet named "'.concat(name, '" does not exist.'));
                return this.sheets[name];
            }
        } ]), ActiveSpreadsheet;
    }(), SpreadsheetAppFake = {
        getActiveSpreadsheet: function() {
            return new ActiveSpreadsheet();
        }
    };
    __webpack_exports__["a"] = SpreadsheetAppFake;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return QueryReturn;
    });
    var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _unique_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _query_driver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var QueryReturn = function() {
        function QueryReturn(queryDriver) {
            if (function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, QueryReturn), !(queryDriver instanceof _query_driver__WEBPACK_IMPORTED_MODULE_2__["a"])) throw new TypeError("QueryResult constructor requires QueryDriver input.");
            this.query = queryDriver.query, this.type = queryDriver.type, this.resultSet = new _unique_set__WEBPACK_IMPORTED_MODULE_1__["a"](), 
            this.queryStartTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["b"])(), this.queryDuration = null, 
            this.returnContainer = {
                records: {},
                errors: []
            };
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(QueryReturn, [ {
            key: "push",
            value: function(input) {
                this.resultSet.push(input);
            }
        }, {
            key: "done",
            value: function() {
                this.queryDuration = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["a"])(this.queryStartTime), 
                Logger.log("".concat(this.type, " operation completed in ").concat(this.queryDuration, " ms.\n ").concat(this.query.toString()));
            }
        }, {
            key: "count",
            get: function() {
                return this.resultSet.length;
            }
        } ]), QueryReturn;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return RowIndexCursor;
    });
    var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _unique_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _sheet_accessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var RowIndexCursor = function() {
        function RowIndexCursor(sheetAccessor) {
            if (function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, RowIndexCursor), !(sheetAccessor instanceof _sheet_accessor__WEBPACK_IMPORTED_MODULE_2__["a"])) throw new TypeError("RowIndexCursor constructor accepts a SheetAccessor instance");
            this.sheetAccessor = sheetAccessor, this.allRowIndexer = new _unique_set__WEBPACK_IMPORTED_MODULE_1__["a"](), 
            this.selectedRowIndexer = new _unique_set__WEBPACK_IMPORTED_MODULE_1__["a"](), this.lastResetDataPullDuration = null, 
            this.flush();
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(RowIndexCursor, [ {
            key: "flush",
            value: function() {
                return this.refreshSheetIndices(), this.selectedRowIndexer.flush().copyItems(this.allRowIndexer), 
                this;
            }
        }, {
            key: "refreshSheetIndices",
            value: function() {
                var dataPullStartTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["b"])(), sheetRecordIndices = this.sheetAccessor.getAllRecordIndices();
                return this.lastResetDataPullDuration = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["a"])(dataPullStartTime), 
                this.allRowIndexer.flush().push(sheetRecordIndices), this;
            }
        }, {
            key: "consumeSelection",
            value: function(selectionSet) {
                if (!(selectionSet instanceof _unique_set__WEBPACK_IMPORTED_MODULE_1__["a"])) throw new TypeError("consumeSelections accepts only UniqueSet input.");
                return this.selectedRowIndexer.flush().copyItems(selectionSet), this;
            }
        }, {
            key: "indices",
            get: function() {
                return this.selectedRowIndexer.values;
            }
        }, {
            key: "isEmpty",
            get: function() {
                return this.selectedRowIndexer.isEmpty;
            }
        }, {
            key: "length",
            get: function() {
                return this.selectedRowIndexer.length;
            }
        }, {
            key: "lastResetDataPullDuration",
            get: function() {
                return this.lastResetDataPullDuration;
            }
        }, {
            key: "lastResetDataProcessingDuration",
            get: function() {
                return this.lastResetDataPullDuration;
            }
        }, {
            key: "push",
            get: function() {
                return this.selectedRowIndexer.push;
            }
        } ]), RowIndexCursor;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _spreadsheet_simulator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5), _sheet_accessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3), _query_driver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4), _query_return__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6), _row_index_cursor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7), doGet = function doGet() {
            var sheet = _spreadsheet_simulator__WEBPACK_IMPORTED_MODULE_0__["a"].getActiveSpreadsheet().getSheetByName("Test"), sheetAccessor = new _sheet_accessor__WEBPACK_IMPORTED_MODULE_1__["a"](sheet), rowIndexCursor = new _row_index_cursor__WEBPACK_IMPORTED_MODULE_4__["a"](sheetAccessor), query = function query(r) {
                var balls = 1;
                return r.nuggets.value === r.nuggets.fontcolor && (balls = 5), balls;
            }, queryDriver = new _query_driver__WEBPACK_IMPORTED_MODULE_2__["a"](query, "test"), queryReturn = new _query_return__WEBPACK_IMPORTED_MODULE_3__["a"](queryDriver), output = {
                sheet: sheet,
                sheetAccessor: sheetAccessor,
                indices: rowIndexCursor.indices,
                queryDriver: queryDriver,
                queryReturn: queryReturn
            }, json = JSON.stringify(output);
            return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
        };
        global.doGet = doGet;
    }.call(this, __webpack_require__(9));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
} ]));