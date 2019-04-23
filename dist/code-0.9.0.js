function TableProxy() {
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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 10);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "d", function() {
        return isArray;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return isString;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return isNumeric;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return isFunction;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return isObject;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return isBoolean;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return inArray;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return getTimeStamp;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return getTimeDiff;
    });
    __webpack_require__(1);
    var isArray = function isArray(input) {
        return "[object Array]" === toString.call(input);
    }, isString = function isString(input) {
        return "[object String]" === toString.call(input);
    }, isNumeric = function isNumeric(input) {
        return "[object Number]" === toString.call(input);
    }, isFunction = function isFunction(input) {
        return "[object Function]" === toString.call(input);
    }, isObject = function isObject(input) {
        return "[object Object]" === toString.call(input);
    }, isBoolean = function isBoolean(input) {
        return "[object Boolean]" === toString.call(input);
    }, inArray = function inArray(needle, haystack) {
        return -1 !== haystack.indexOf(needle);
    }, getTimeStamp = function getTimeStamp(precision) {
        var time = new Date().getTime();
        return precision ? time.toFixed(precision) : time;
    }, getTimeDiff = function getTimeDiff(oldTime, precision) {
        var newTime = getTimeStamp();
        return precision ? (newTime - oldTime).toFixed(precision) : newTime - oldTime;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "f", function() {
        return IS_TEST_MODE;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return DEFAULT_HEADER_ANCHOR;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return TOP;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return BOTTOM;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return WRITE_LEVEL_CELL;
    }), __webpack_require__.d(__webpack_exports__, "k", function() {
        return WRITE_LEVEL_ROW;
    }), __webpack_require__.d(__webpack_exports__, "l", function() {
        return WRITE_LEVEL_TABLE;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return VALID_WRITE_LEVELS;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return DEFAULT_WRITE_LEVEL;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return COLORS;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return SUPPORTED_ATTRIBUTES;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return DEFAULT_ATTRIBUTE;
    });
    var IS_TEST_MODE = !1, DEFAULT_HEADER_ANCHOR = "HEADER_ANCHOR", TOP = "TOP", BOTTOM = "BOTTOM", WRITE_LEVEL_CELL = "WRITE_LEVEL_CELL", WRITE_LEVEL_ROW = "WRITE_LEVEL_ROW", WRITE_LEVEL_TABLE = "WRITE_LEVEL_TABLE", VALID_WRITE_LEVELS = [ WRITE_LEVEL_CELL, WRITE_LEVEL_ROW, WRITE_LEVEL_TABLE ], DEFAULT_WRITE_LEVEL = WRITE_LEVEL_TABLE, COLORS = {
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
    }, SUPPORTED_ATTRIBUTES = [ "value", "background", "fontcolor", "note", "fontsize", "fontstyle", "fontfamily", "fontweight" ], DEFAULT_ATTRIBUTE = "value";
}, function(module, __webpack_exports__, __webpack_require__) {
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
            }(this, UniqueSet), this.pvt_strings = {}, this.pvt_numbers = {}, this.pvt_dates = {}, 
            Object.keys(args).forEach(function(i) {
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
                        _this2.pvt_numbers[i] = Number;
                        break;

                      case "[object String]":
                        _this2.pvt_strings[i] = String;
                        break;

                      case "[object Date]":
                        _this2.pvt_dates[i] = Date;
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
                        delete _this3.pvt_numbers[i];
                        break;

                      case "[object String]":
                        delete _this3.pvt_strings[i];
                        break;

                      case "[object Date]":
                        delete _this3.pvt_dates[i];
                        break;

                      default:
                        throw new TypeError("UniqueSet can only store strings, numbers, dates. Received ".concat(inputType, " at index ").concat(index));
                    }
                }), this;
            }
        }, {
            key: "flush",
            value: function() {
                return this.pvt_strings = {}, this.pvt_numbers = {}, this.pvt_dates = {}, this;
            }
        }, {
            key: "forEach",
            value: function(callback) {
                return this.values.forEach(callback);
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
                return [].concat(Object.keys(this.pvt_numbers).map(function(i) {
                    return _this4.pvt_numbers[i](i);
                })).concat(Object.keys(this.pvt_strings).map(function(i) {
                    return _this4.pvt_strings[i](i);
                })).concat(Object.keys(this.pvt_dates).map(function(i) {
                    return _this4.pvt_dates[i](i);
                }));
            }
        }, {
            key: "contains",
            get: function() {
                return {
                    numbers: Object.keys(this.pvt_numbers).length,
                    strings: Object.keys(this.pvt_strings).length,
                    dates: Object.keys(this.pvt_dates).length
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
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return SheetAccessor;
    });
    var _instance_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4), _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
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
    var SheetAccessor = function SheetAccessor(instanceOptions) {
        var _this = this;
        if (function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }(this, SheetAccessor), !(instanceOptions instanceof _instance_options__WEBPACK_IMPORTED_MODULE_0__["a"])) throw new TypeError("DataController requires an instance of InstanceOptions object.");
        this.pvt_instanceOptions = instanceOptions, this.range = {}, this.value = {}, this.background = {}, 
        this.fontcolor = {}, this.note = {}, this.fontfamily = {}, this.fontsize = {}, this.fontstyle = {}, 
        this.fontweight = {}, this.headerRowIndex = 0, this.headerColumnIndex = 0, this.getHeaderRow = null, 
        this.getAllRecordIndices = null, this.resizeColumns = null;
        for (var notesData = this.pvt_instanceOptions.sheet.getDataRange().getNotes(), rowCount = notesData.length, columnCount = notesData[0].length, rowIndex = 0; rowIndex < rowCount; rowIndex += 1) if (-1 !== notesData[rowIndex].join("").indexOf(this.pvt_instanceOptions.headerAnchorToken)) {
            this.headerRowIndex = rowIndex;
            break;
        }
        for (var columnIndex = 0; columnIndex < columnCount; columnIndex += 1) if (-1 !== notesData[this.headerRowIndex][columnIndex].indexOf(this.pvt_instanceOptions.headerAnchorToken)) {
            this.headerColumnIndex = columnIndex;
            break;
        }
        this.range = {
            getCell: function(rowIndex, columnIndex) {
                return _this.pvt_instanceOptions.sheet.getRange(rowIndex + 1, columnIndex + 1);
            },
            getRow: function(rowIndex) {
                var dataRange = _this.pvt_instanceOptions.sheet.getDataRange();
                return _this.pvt_instanceOptions.sheet.getRange(rowIndex + 1, 1, 1, dataRange.getNumColumns());
            },
            getColumn: function(columnIndex, startRowIndex) {
                var dataRange = _this.pvt_instanceOptions.sheet.getDataRange(), startRowIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["g"])(startRowIndex) ? startRowIndex : 0;
                return _this.pvt_instanceOptions.sheet.getRange(startRowIndx + 1, columnIndex + 1, dataRange.getNumRows() - startRowIndx, 1);
            },
            getAll: function(startRowIndex, startColumnIndex) {
                var dataRange = _this.pvt_instanceOptions.sheet.getDataRange(), startRowIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["g"])(startRowIndex) ? startRowIndex : 0, startColumnIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["g"])(startColumnIndex) ? startColumnIndex : 0;
                return _this.pvt_instanceOptions.sheet.getRange(startRowIndx + 1, startColumnIndx + 1, dataRange.getNumRows() - startRowIndx, dataRange.getNumColumns() - startColumnIndx);
            },
            getAllRecords: function() {
                return _this.range.getAll(_this.headerRowIndex, 0);
            },
            getRecordsColumn: function(columnIndex) {
                return _this.range.getColumn(columnIndex, _this.headerRowIndex + 1);
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
            return _this.value.getRow(_this.headerRowIndex)[0];
        }, this.getAllRecordIndices = function() {
            for (var indices = [], numRows = _this.range.getAllRecords().getNumRows(), i = _this.headerRowIndex + 1; i < numRows; ) indices.push(i), 
            i += 1;
            return indices;
        }, this.resizeColumns = function() {
            _this.getHeaderRow().forEach(function(columnName, index) {
                _this.pvt_instanceOptions.sheet.autoResizeColumn(index + 1);
            });
        };
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var CONSTANTS = __webpack_require__(1);
    function _typeof(obj) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
            return typeof obj;
        } : function _typeof(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        })(obj);
    }
    function getSheetsObjectType(input) {
        var returnType;
        if ("object" === _typeof(input)) try {
            returnType = input.getGibberish();
        } catch (e) {
            returnType = e.message.split(" object ")[1].replace(".", "");
        }
        return returnType;
    }
    var simple_clone = __webpack_require__(5), process_unique_id = __webpack_require__(7), utilities = __webpack_require__(0);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return instance_options_InstanceOptions;
    });
    var instance_options_InstanceOptions = function() {
        function InstanceOptions(sheetNameOrOptions) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, InstanceOptions), this.pvt_sheetName = null, this.pvt_headerAnchorToken = CONSTANTS["d"], 
            this.pvt_columnFilter = [], this.pvt_exportAttributes = [ CONSTANTS["c"] ], this.pvt_exportOnlySelected = !0, 
            this.pvt_writeLevel = CONSTANTS["e"], this.pvt_autoResizeColumns = !1, this.pvt_computedProperties = {}, 
            this.pvt_uniqueId = null, this.pvt_spreadsheet = SpreadsheetApp.getActiveSpreadsheet(), 
            this.pvt_sheet = null, this.processInput(sheetNameOrOptions);
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(InstanceOptions, [ {
            key: "sheetIsSet",
            value: function() {
                return !!CONSTANTS["f"] || function isSheet(input) {
                    return "Sheet" === getSheetsObjectType(input);
                }(this.pvt_sheet);
            }
        }, {
            key: "processInput",
            value: function(sheetNameOrOptions) {
                var _this = this, errMsg = "requires a string sheetName or an options object which at least define a valid sheetName";
                if (sheetNameOrOptions === undefined || null === sheetNameOrOptions) throw new Error(errMsg);
                switch (toString.call(sheetNameOrOptions)) {
                  case "[object String]":
                    this.sheetName = sheetNameOrOptions;
                    break;

                  case "[object Object]":
                    Object.keys(sheetNameOrOptions).forEach(function(key) {
                        -1 === key.indexOf("pvt_") && (_this[key] = sheetNameOrOptions[key]);
                    });
                    break;

                  default:
                    throw new Error(errMsg);
                }
                if (!this.sheetIsSet()) throw new Error(errMsg);
                return this;
            }
        }, {
            key: "sheetName",
            get: function() {
                return this.pvt_sheetName;
            },
            set: function(input) {
                if (!Object(utilities["i"])(input)) throw new TypeError("sheetName must be a string.");
                if (this.pvt_sheet) throw new Error("sheetName was already set to ".concat(this.pvt_sheetName, " and cannot be changed."));
                try {
                    this.pvt_sheet = this.pvt_spreadsheet.getSheetByName(input);
                } catch (e) {
                    throw new Error("set sheetName exception: ".concat(e, "."));
                }
                return this.pvt_sheetName = input, this.pvt_sheetName;
            }
        }, {
            key: "headerAnchorToken",
            get: function() {
                return this.pvt_headerAnchorToken;
            },
            set: function(input) {
                if (!Object(utilities["i"])(input)) throw new TypeError("headerAnchorToken must be a string.");
                return this.pvt_headerAnchorToken = input, this.pvt_headerAnchorToken;
            }
        }, {
            key: "columnFilter",
            get: function() {
                return this.pvt_columnFilter;
            },
            set: function(input) {
                if (!Object(utilities["d"])(input)) throw new TypeError("columnFilter must be an array.");
                return this.pvt_columnFilter = Object(simple_clone["a"])(input), this.pvt_columnFilter;
            }
        }, {
            key: "exportAttributes",
            get: function() {
                return this.pvt_exportAttributes;
            },
            set: function(input) {
                if (!Object(utilities["d"])(input)) throw new TypeError("exportAttributes must be an array.");
                return this.pvt_exportAttributes = Object(simple_clone["a"])(input), this.pvt_exportAttributes;
            }
        }, {
            key: "exportOnlySelected",
            get: function() {
                return this.pvt_exportOnlySelected;
            },
            set: function(input) {
                if (!Object(utilities["e"])(input)) throw new TypeError("exportOnlySelected must be a boolean.");
                return this.pvt_exportOnlySelected = input, this.pvt_exportOnlySelected;
            }
        }, {
            key: "writeLevel",
            get: function() {
                return this.pvt_writeLevel;
            },
            set: function(input) {
                if (!Object(utilities["i"])(input)) throw new TypeError("exportOnlySelected must be a string.");
                if (-1 === CONSTANTS["i"].indexOf(input)) throw new Error("writeLevel must be one of ".concat(CONSTANTS["i"].toString(), " received ").concat(input));
                return this.pvt_writeLevel = input, this.pvt_writeLevel;
            }
        }, {
            key: "autoResizeColumns",
            get: function() {
                return this.pvt_autoResizeColumns;
            },
            set: function(input) {
                if (!Object(utilities["e"])(input)) throw new TypeError("autoResizeColumns must be a boolean.");
                return this.pvt_autoResizeColumns = input, this.pvt_autoResizeColumns;
            }
        }, {
            key: "uniqueId",
            get: function() {
                return this.pvt_uniqueId;
            },
            set: function(input) {
                return this.pvt_uniqueId = Object(process_unique_id["a"])(input), this.pvt_uniqueId;
            }
        }, {
            key: "computedProperties",
            get: function() {
                return this.pvt_computedProperties;
            },
            set: function(input) {
                if (!Object(utilities["h"])(input)) throw new TypeError("computedProperties must be a property descriptor object.");
                return this.pvt_computedProperties = input, this.pvt_computedProperties;
            }
        }, {
            key: "spreadsheet",
            set: function(input) {
                if (!CONSTANTS["f"] && !function isSpreadsheet(input) {
                    return "Spreadsheet" === getSheetsObjectType(input);
                }(input)) throw new TypeError("spreadsheet must be a spreadsheet object.");
                return this.pvt_spreadsheet = input, this.pvt_spreadsheet;
            }
        }, {
            key: "sheet",
            get: function() {
                return this.pvt_sheet;
            }
        } ]), InstanceOptions;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    function clone(input) {
        var copy, toStringType = toString.call(input);
        switch (toStringType) {
          case "[object Undefined]":
          case "[object Null]":
          case "[object Number]":
          case "[object String]":
          case "[object Boolean]":
            copy = input;
            break;

          case "[object Array]":
            copy = input.map(function(i) {
                return clone(i);
            });
            break;

          case "[object Object]":
            copy = {}, Object.keys(input).forEach(function(property) {
                copy[property] = clone(input[property]);
            });
            break;

          case "[object Date]":
            (copy = new Date()).setTime(input.getTime());
            break;

          default:
            throw new TypeError("Unable to clone: object type ".concat(toStringType, " is unsupported."));
        }
        return copy;
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return clone;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return QueryDriver;
    });
    var _unique_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1), _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
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
            this.withRecords = !1, this.requestedAttributesSet = new _unique_set__WEBPACK_IMPORTED_MODULE_0__["a"](), 
            this.loadQuery(query);
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(QueryDriver, [ {
            key: "loadQuery",
            value: function(query) {
                var _this = this;
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["f"])(query)) throw new TypeError("loadQuery requires accepts a function callback");
                var queryAsString = (this.query = query).toString();
                _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__["g"].forEach(function(attribute) {
                    var re1 = new RegExp("[[]{1}['|\"]{1}".concat(attribute, "['|\"]{1}[]]{1}"), "g"), re2 = new RegExp("[.]{1}".concat(attribute, "[^a-zA-Z0-9]"), "g");
                    (re1.test(queryAsString) || re2.test(queryAsString)) && _this.requestedAttributesSet.push(attribute);
                });
            }
        } ]), QueryDriver;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return processUniqueId;
    });
    var _simple_clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5), _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
    function _extends() {
        return (_extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }).apply(this, arguments);
    }
    function processUniqueId(input) {
        if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["h"])(input)) throw new TypeError("uniqueId must be an object.");
        if (!Object.hasOwnProperty.call(input, "columnName")) throw new TypeError("uniqueId must be an object with columnName property.");
        if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["i"])(input.columnName) && !Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["g"])(input.columnName)) throw new TypeError("uniqueId.columnName must be a string or number.");
        if (Object.hasOwnProperty.call(input, "attribute") && !Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["c"])(input.attribute, _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["g"])) throw new TypeError("uniqueId.attribute must be a supported attribute.");
        return _extends({
            columnName: null,
            attribute: _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["c"]
        }, Object(_simple_clone__WEBPACK_IMPORTED_MODULE_0__["a"])(input));
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return RowIndexCursor;
    });
    var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _unique_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2), _sheet_accessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
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
            this.pvt_sheetAccessor = sheetAccessor, this.pvt_allRowIndexer = new _unique_set__WEBPACK_IMPORTED_MODULE_1__["a"](), 
            this.pvt_selectedRowIndexer = new _unique_set__WEBPACK_IMPORTED_MODULE_1__["a"](), 
            this.pvt_lastResetDataPullDuration = null, this.flush();
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(RowIndexCursor, [ {
            key: "flush",
            value: function() {
                return this.refreshSheetIndices(), this.pvt_selectedRowIndexer.flush().copyItems(this.pvt_allRowIndexer), 
                this;
            }
        }, {
            key: "refreshSheetIndices",
            value: function() {
                var dataPullStartTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["b"])(), sheetRecordIndices = this.pvt_sheetAccessor.getAllRecordIndices();
                return this.pvt_lastResetDataPullDuration = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["a"])(dataPullStartTime), 
                this.pvt_allRowIndexer.flush().push(sheetRecordIndices), this;
            }
        }, {
            key: "consumeSelection",
            value: function(selectionSet) {
                if (!(selectionSet instanceof _unique_set__WEBPACK_IMPORTED_MODULE_1__["a"])) throw new TypeError("consumeSelections accepts only UniqueSet input.");
                return this.pvt_selectedRowIndexer.flush().copyItems(selectionSet), this;
            }
        }, {
            key: "forEach",
            value: function(callback) {
                return this.pvt_selectedRowIndexer.forEach(callback);
            }
        }, {
            key: "indices",
            get: function() {
                return this.pvt_selectedRowIndexer.values;
            }
        }, {
            key: "isEmpty",
            get: function() {
                return this.pvt_selectedRowIndexer.isEmpty;
            }
        }, {
            key: "length",
            get: function() {
                return this.pvt_selectedRowIndexer.length;
            }
        }, {
            key: "lastResetDataPullDuration",
            get: function() {
                return this.pvt_lastResetDataPullDuration;
            }
        }, {
            key: "lastResetDataProcessingDuration",
            get: function() {
                return this.pvt_lastResetDataPullDuration;
            }
        }, {
            key: "push",
            get: function() {
                return this.pvt_selectedRowIndexer.push;
            }
        } ]), RowIndexCursor;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var query_driver = __webpack_require__(6), sheet_accessor = __webpack_require__(3), CONSTANTS = __webpack_require__(1), instance_options = __webpack_require__(4), unique_set = __webpack_require__(2);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var data_controller_DataController = function() {
        function DataController(sheetAccessor, instanceOptions, requestedAttributesSet) {
            var _this = this;
            if (function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, DataController), !(sheetAccessor instanceof sheet_accessor["a"])) throw new TypeError("DataController requires an instance of InstanceOptions object.");
            if (!(instanceOptions instanceof instance_options["a"])) throw new TypeError("DataController requires an instance of InstanceOptions object.");
            if (!(requestedAttributesSet instanceof unique_set["a"]) || requestedAttributesSet.length < 1) throw new TypeError("DataController requires a UniqueSet instance with at least one value for for requestedAttributesSet.");
            this.pvt_sheetAccessor = sheetAccessor, this.pvt_requestedAttributesSet = requestedAttributesSet, 
            this.pvt_instanceOptions = instanceOptions, this.pvt_rowIndex = null, this.pvt_changedAttributes = new unique_set["a"](), 
            this.pvt_dataPayload = {}, this.pvt_requestedAttributesSet.forEach(function(attribute) {
                _this.pvt_dataPayload[attribute] = _this.pvt_sheetAccessor[attribute].getAll();
            });
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(DataController, [ {
            key: "getColumnByIndex",
            value: function(attribute, columnIndex) {
                return this.pvt_dataPayload[attribute][this.pvt_rowIndex][columnIndex];
            }
        }, {
            key: "updateColumnByIndex",
            value: function(attribute, columnIndex, updatedValue) {
                return this.pvt_dataPayload[attribute][this.pvt_rowIndex][columnIndex] = updatedValue, 
                this.pvt_instanceOptions.writeLevel === CONSTANTS["j"] ? this.pvt_sheetAccessor[attribute].setCell(this.pvt_rowIndex, columnIndex, [ [ updatedValue ] ]) : this.pvt_changedAttributes.push(attribute), 
                this;
            }
        }, {
            key: "setRowIndex",
            value: function(rowIndex) {
                return this.pvt_instanceOptions.writeLevel === CONSTANTS["k"] && null !== this.pvt_rowIndex && this.writeCurrentRow(), 
                this.pvt_rowIndex = rowIndex, this;
            }
        }, {
            key: "writeCurrentRow",
            value: function() {
                var _this2 = this;
                return this.pvt_changedAttributes.forEach(function(attribute) {
                    _this2.pvt_sheetAccessor[attribute].setRow(_this2.pvt_rowIndex, [ _this2.pvt_dataPayload[attribute][_this2.pvt_rowIndex] ]);
                }), this.pvt_changedAttributes.flush(), this;
            }
        }, {
            key: "capWrite",
            value: function() {
                var _this3 = this;
                this.pvt_instanceOptions.writeLevel === CONSTANTS["l"] && (this.pvt_changedAttributes.forEach(function(attribute) {
                    _this3.pvt_sheetAccessor[attribute].setAllRecords(_this3.pvt_dataPayload[attribute]);
                }), this.pvt_changedAttributes.flush()), this.pvt_instanceOptions.writeLevel === CONSTANTS["k"] && this.writeCurrentRow();
            }
        } ]), DataController;
    }(), row_index_cursor = __webpack_require__(8), utilities = __webpack_require__(0);
    function query_return_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var query_return_QueryReturn = function() {
        function QueryReturn(queryDriver) {
            if (function query_return_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, QueryReturn), !(queryDriver instanceof query_driver["a"])) throw new TypeError("QueryResult constructor requires QueryDriver input.");
            this.query = queryDriver.query, this.type = queryDriver.type, this.resultSet = new unique_set["a"](), 
            this.queryStartTime = Object(utilities["b"])(), this.queryDuration = null, this.returnContainer = {
                records: {}
            };
        }
        return function query_return_createClass(Constructor, protoProps, staticProps) {
            return protoProps && query_return_defineProperties(Constructor.prototype, protoProps), 
            staticProps && query_return_defineProperties(Constructor, staticProps), Constructor;
        }(QueryReturn, [ {
            key: "push",
            value: function(input) {
                this.resultSet.push(input);
            }
        }, {
            key: "done",
            value: function() {
                return this.queryDuration = Object(utilities["a"])(this.queryStartTime), Logger.log("".concat(this.type, " operation completed in ").concat(this.queryDuration, " ms.\n ").concat(this.query.toString())), 
                this;
            }
        }, {
            key: "count",
            get: function() {
                return this.resultSet.length;
            }
        }, {
            key: "logStamp",
            get: function() {
                return "".concat(this.type, ' query "').concat(this.query.toString(), '" completed in ').concat(this.queryDuration, "ms");
            }
        } ]), QueryReturn;
    }();
    function getRecordProxy(sheetAccessor, dataController, instanceOptions, requestedAttributesSet) {
        if (!(sheetAccessor instanceof sheet_accessor["a"])) throw new Error("getRecordProxy requires a SheetAccessor instance.");
        if (!(dataController instanceof data_controller_DataController)) throw new Error("getRecordProxy requires a DataController instance.");
        if (!(instanceOptions instanceof instance_options["a"])) throw new Error("getRecordProxy requires an InstanceOptions instance.");
        if (!(requestedAttributesSet instanceof unique_set["a"])) throw new Error("getRecordProxy requires an UniqueSet instance for input parameter requestedAttributesSet.");
        var columnFilter = instanceOptions.columnFilter;
        var recordProxy = {};
        sheetAccessor.getHeaderRow().forEach(function(column, columnIndex) {
            if (function columnIsValid(column) {
                return null !== column && column !== undefined && !(0 < columnFilter.length && -1 === columnFilter.indexOf(column));
            }(column)) {
                var columnProxy = {};
                requestedAttributesSet.forEach(function(attribute) {
                    Object.defineProperty(columnProxy, attribute, {
                        enumerable: !0,
                        configurable: !1,
                        get: function() {
                            return dataController.getColumnByIndex(attribute, columnIndex);
                        },
                        set: function(value) {
                            return dataController.updateColumnByIndex(attribute, columnIndex, value);
                        }
                    });
                }), recordProxy[column] = columnProxy;
            }
        });
        try {
            Object.keys(instanceOptions.computedProperties).forEach(function(key) {
                recordProxy[key] = Object.defineProperty({}, "value", {
                    enumerable: !0,
                    get: instanceOptions.computedProperties[key].bind(recordProxy)
                });
            });
        } catch (e) {
            throw new Error("there was a problem creating a record proxy with the specified computedProperties: ".concat(e));
        }
        return recordProxy;
    }
    var simple_clone = __webpack_require__(5);
    function processQuery(queryDriver, sheetAccessor, rowIndexCursor, instanceOptions) {
        if (!(queryDriver instanceof query_driver["a"])) throw new Error("queryProcessor requires a QueryDriver instance.");
        if (!(sheetAccessor instanceof sheet_accessor["a"])) throw new Error("queryProcessor requires a SheetAccessor instance.");
        if (!(rowIndexCursor instanceof row_index_cursor["a"])) throw new Error("queryProcessor requires a RowIndexCursor instance.");
        var queryReturn = new query_return_QueryReturn(queryDriver), dataController = new data_controller_DataController(sheetAccessor, instanceOptions, queryDriver.requestedAttributesSet), recordProxy = getRecordProxy(sheetAccessor, dataController, instanceOptions, queryDriver.requestedAttributesSet), query = queryDriver.query.bind(recordProxy);
        return rowIndexCursor.forEach(function(index) {
            dataController.setRowIndex(index), query(recordProxy) && (queryReturn.push(index), 
            queryDriver.withRecords && (queryReturn.returnContainer.records[index] = Object(simple_clone["a"])(recordProxy)));
        }), dataController.capWrite(), queryDriver.writeToCursor && rowIndexCursor.consumeSelection(queryReturn.resultSet), 
        instanceOptions.autoResizeColumns && sheetAccessor.resizeColumns(), queryReturn.done();
    }
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return processQuery;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _instance_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4), _sheet_accessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3), _row_index_cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8), _query_driver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6), _unique_set__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2), _process_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9), _process_unique_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7), _utilities__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0), _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1), TableProxy = function TableProxy() {
            return {
                mount: function mount(sheetNameOrOptions) {
                    var _this = this;
                    try {
                        var instanceOptions = new _instance_options__WEBPACK_IMPORTED_MODULE_0__["a"](sheetNameOrOptions), sheetAccessor = new _sheet_accessor__WEBPACK_IMPORTED_MODULE_1__["a"](instanceOptions), rowIndexCursor = new _row_index_cursor__WEBPACK_IMPORTED_MODULE_2__["a"](sheetAccessor), recordsContainer = {}, api = {};
                        return Object.defineProperty(api, "query", {
                            enumerable: !0,
                            configurable: !1,
                            writable: !1,
                            value: function(query) {
                                var queryDriver = new _query_driver__WEBPACK_IMPORTED_MODULE_3__["a"](query, "query");
                                queryDriver.writeToCursor = !0, queryDriver.withRecords = !0;
                                var queryReturn = Object(_process_query__WEBPACK_IMPORTED_MODULE_5__["a"])(queryDriver, sheetAccessor, rowIndexCursor, instanceOptions);
                                return recordsContainer = queryReturn.returnContainer.records, Logger.log(queryReturn.logStamp), 
                                _this;
                            }
                        }), Object.defineProperty(api, "unique", {
                            enumerable: !0,
                            configurable: !1,
                            writable: !1,
                            value: function(columnName, attribute) {
                                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_7__["i"])(columnName) && !Object(_utilities__WEBPACK_IMPORTED_MODULE_7__["g"])(columnName)) throw new Error("unique method requires a string or number columnName");
                                if (attribute && !Object(_utilities__WEBPACK_IMPORTED_MODULE_7__["c"])(attribute, _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["g"])) throw new Error("unique method receieved invalid attribute: ".concat(attribute));
                                var attr = attribute || _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["c"], aggregator = new _unique_set__WEBPACK_IMPORTED_MODULE_4__["a"](), queryDriver = new _query_driver__WEBPACK_IMPORTED_MODULE_3__["a"](function(r) {
                                    aggregator.push(r[columnName][attr]);
                                }, "unique");
                                queryDriver.requestedAttributesSet.push(attr);
                                var queryReturn = Object(_process_query__WEBPACK_IMPORTED_MODULE_5__["a"])(queryDriver, sheetAccessor, rowIndexCursor, instanceOptions);
                                return Logger.log(queryReturn.logStamp), aggregator.values;
                            }
                        }), Object.defineProperty(api, "testUniqueId", {
                            enumerable: !0,
                            configurable: !1,
                            value: function(input) {
                                var startTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_7__["b"])(), uniqueId = Object(_process_unique_id__WEBPACK_IMPORTED_MODULE_6__["a"])(input), columnIndex = sheetAccessor.getHeaderRow().indexOf(uniqueId.columnName);
                                if (-1 === columnIndex) throw new Error("uniqueIdColumnName ".concat(uniqueId.columnName, " is invalid."));
                                var columnData = sheetAccessor[uniqueId.attribute].getRecordsColumn(columnIndex).map(function(i) {
                                    return i[0];
                                }), uniqueNonBlankValues = new _unique_set__WEBPACK_IMPORTED_MODULE_4__["a"](columnData).remove("");
                                if (!uniqueNonBlankValues.pure) throw new Error("multiple data types exist in ".concat(uniqueId.columnName, ": ").concat(uniqueNonBlankValues.holds.toString()));
                                var nonBlankValueCount = columnData.filter(function(item) {
                                    return "" !== item;
                                }).length;
                                if (uniqueNonBlankValues.length !== nonBlankValueCount) throw new Error("Duplicates detected: non-blank values are not unique.");
                                return Logger.log("setUniqueIdColumn for sheet ".concat(instanceOptions.sheetName, " completed in ").concat(Object(_utilities__WEBPACK_IMPORTED_MODULE_7__["a"])(startTime), "ms")), 
                                !0;
                            }
                        }), Object.defineProperty(api, "flush", {
                            enumerable: !0,
                            configurable: !1,
                            writable: !1,
                            value: function() {
                                return rowIndexCursor.flush(), recordsContainer = {}, _this;
                            }
                        }), Object.defineProperty(api, "records", {
                            enumerable: !0,
                            get: function() {
                                return recordsContainer;
                            }
                        }), Object.defineProperties(api, {
                            setSheetName: {
                                value: function(input) {
                                    return instanceOptions.sheetName = input, api;
                                }
                            },
                            setHeaderAnchorToken: {
                                value: function(input) {
                                    return instanceOptions.headerAnchorToken = input, api;
                                }
                            },
                            setColumnFilter: {
                                value: function(input) {
                                    return instanceOptions.columnFilter = input, api;
                                }
                            },
                            setExportAttributes: {
                                value: function(input) {
                                    return instanceOptions.exportAttributes = input, api;
                                }
                            },
                            setExportOnlySelected: {
                                value: function(input) {
                                    return instanceOptions.exportOnlySelected = input, api;
                                }
                            },
                            setWriteLevel: {
                                value: function(input) {
                                    return instanceOptions.writeLevel = input, api;
                                }
                            },
                            setAutoResizeColumns: {
                                value: function(input) {
                                    return instanceOptions.autoResizeColumns = input, api;
                                }
                            },
                            setComputedProperties: {
                                value: function(input) {
                                    return instanceOptions.computedProperties = input, api;
                                }
                            },
                            setUniqueId: {
                                value: function(input) {
                                    try {
                                        api.testUniqueId(input);
                                    } catch (e) {
                                        throw new Error("setUniqueId failed: ".concat(e, "."));
                                    }
                                    return instanceOptions.uniqueId = input, api;
                                }
                            }
                        }), instanceOptions.uniqueId && api.setUniqueId(instanceOptions.uniqueId), api;
                    } catch (e) {
                        throw new Error("TableProxy.mount failed: ".concat(e));
                    }
                },
                TOP: _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["h"],
                BOTTOM: _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["a"],
                WRITE_LEVEL_CELL: _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["j"],
                WRITE_LEVEL_ROW: _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["k"],
                WRITE_LEVEL_TABLE: _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["l"],
                COLORS: _CONSTANTS__WEBPACK_IMPORTED_MODULE_8__["b"]
            };
        };
        global.TableProxy = TableProxy();
    }.call(this, __webpack_require__(11));
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