function SpreadsheetApp() {
}
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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 12);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "g", function() {
        return IS_TEST_MODE;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return DEFAULT_HEADER_ANCHOR;
    }), __webpack_require__.d(__webpack_exports__, "m", function() {
        return TOP;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return BOTTOM;
    }), __webpack_require__.d(__webpack_exports__, "o", function() {
        return WRITE_LEVEL_CELL;
    }), __webpack_require__.d(__webpack_exports__, "p", function() {
        return WRITE_LEVEL_ROW;
    }), __webpack_require__.d(__webpack_exports__, "q", function() {
        return WRITE_LEVEL_TABLE;
    }), __webpack_require__.d(__webpack_exports__, "n", function() {
        return VALID_WRITE_LEVELS;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return DEFAULT_WRITE_LEVEL;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return COLORS;
    }), __webpack_require__.d(__webpack_exports__, "k", function() {
        return SUPPORTED_ATTRIBUTES;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return OP_UNIQUE;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return OP_QUERY;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return OP_UPDATE;
    }), __webpack_require__.d(__webpack_exports__, "l", function() {
        return SUPPORTED_OPS;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return DEFAULT_ATTRIBUTE;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return INDEX;
    });
    var IS_TEST_MODE = !0, DEFAULT_HEADER_ANCHOR = "HEADER_ANCHOR", TOP = "TOP", BOTTOM = "BOTTOM", WRITE_LEVEL_CELL = "WRITE_LEVEL_CELL", WRITE_LEVEL_ROW = "WRITE_LEVEL_ROW", WRITE_LEVEL_TABLE = "WRITE_LEVEL_TABLE", VALID_WRITE_LEVELS = [ WRITE_LEVEL_CELL, WRITE_LEVEL_ROW, WRITE_LEVEL_TABLE ], DEFAULT_WRITE_LEVEL = WRITE_LEVEL_TABLE, COLORS = {
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
    }, SUPPORTED_ATTRIBUTES = [ "value", "background", "fontcolor", "note", "fontsize", "fontstyle", "fontfamily", "fontweight" ], OP_UNIQUE = "UNIQUE", OP_QUERY = "QUERY", OP_UPDATE = "UPDATE", SUPPORTED_OPS = [ OP_UNIQUE, OP_QUERY, OP_UPDATE ], DEFAULT_ATTRIBUTE = "value", INDEX = " ";
}, function(module, __webpack_exports__, __webpack_require__) {
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
    __webpack_require__(0);
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
    function _typeof(obj) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
            return typeof obj;
        } : function _typeof(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        })(obj);
    }
    function _possibleConstructorReturn(self, call) {
        return !call || "object" !== _typeof(call) && "function" != typeof call ? function _assertThisInitialized(self) {
            if (void 0 !== self) return self;
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }(self) : call;
    }
    function _getPrototypeOf(o) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        })(o);
    }
    function _setPrototypeOf(o, p) {
        return (_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            return o.__proto__ = p, o;
        })(o, p);
    }
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
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return Map;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return UniqueSet;
    });
    var Map = function() {
        function Map(input) {
            var _this = this;
            _classCallCheck(this, Map), Object.defineProperties(this, {
                pvt_strings: {
                    enumerable: !1,
                    writable: !0,
                    value: {}
                },
                pvt_numbers: {
                    enumerable: !1,
                    writable: !0,
                    value: {}
                },
                pvt_dates: {
                    enumerable: !1,
                    writable: !0,
                    value: {}
                },
                pvt_keys: {
                    enumerable: !1,
                    writable: !0,
                    value: []
                },
                pvt_get_container: {
                    enumerable: !1,
                    writable: !1,
                    value: function(key) {
                        var result;
                        switch (toString.call(key)) {
                          case "[object Number]":
                            result = _this.pvt_numbers;
                            break;

                          case "[object String]":
                            result = _this.pvt_strings;
                            break;

                          case "[object Date]":
                            result = _this.pvt_dates;
                            break;

                          default:
                            throw new TypeError("Map can't accept ".concat(toString.call(key), " keys."));
                        }
                        return result;
                    }
                }
            });
            var entries = [];
            if (input instanceof Map) entries = input.entries(); else switch (toString.call(input)) {
              case "[object Array]":
                entries = input;
                break;

              case "[object Object]":
                Object.keys(input).forEach(function(key) {
                    entries.push([ key, input[key] ]);
                });
                break;

              case "[object Undefined]":
                break;

              default:
                throw new Error("".concat(toString.call(input), " not valid for Map constructor."));
            }
            entries.forEach(function(entry) {
                _this.set(entry[0], entry[1]);
            });
        }
        return _createClass(Map, [ {
            key: "has",
            value: function(key) {
                return Object.prototype.hasOwnProperty.call(this.pvt_get_container(key), key);
            }
        }, {
            key: "set",
            value: function(key, value) {
                return this.has(key) || this.pvt_keys.push(key), this.pvt_get_container(key)[key] = value, 
                this;
            }
        }, {
            key: "get",
            value: function(key) {
                return this.pvt_get_container(key)[key];
            }
        }, {
            key: "delete",
            value: function(key) {
                var indexOf = this.pvt_keys.indexOf(key);
                return -1 !== indexOf && (this.pvt_keys.splice(indexOf, 1), delete this.pvt_get_container(key)[key]), 
                -1 !== indexOf;
            }
        }, {
            key: "keys",
            value: function() {
                return this.pvt_keys;
            }
        }, {
            key: "values",
            value: function() {
                var _this2 = this, result = [];
                return this.pvt_keys.forEach(function(key) {
                    result.push(_this2.get(key));
                }), result;
            }
        }, {
            key: "entries",
            value: function() {
                var _this3 = this, result = [];
                return this.pvt_keys.forEach(function(key) {
                    result.push([ key, _this3.get(key) ]);
                }), result;
            }
        }, {
            key: "clear",
            value: function() {
                return this.pvt_strings = {}, this.pvt_numbers = {}, this.pvt_dates = {}, this.pvt_keys = [], 
                this;
            }
        }, {
            key: "forEach",
            value: function(callback) {
                var _this4 = this;
                this.pvt_keys.forEach(function(key) {
                    callback(_this4.get(key), key, _this4);
                });
            }
        }, {
            key: "copyItems",
            value: function(map) {
                var _this5 = this;
                if (!(map instanceof Map)) throw new TypeError("copyItems accepts only Map input.");
                return map.entries().forEach(function(entry) {
                    _this5.set(entry[0], entry[1]);
                }), this;
            }
        }, {
            key: "stringKeyCount",
            get: function() {
                return Object.keys(this.pvt_strings).length;
            }
        }, {
            key: "numberKeyCount",
            get: function() {
                return Object.keys(this.pvt_numbers).length;
            }
        }, {
            key: "dateKeyCount",
            get: function() {
                return Object.keys(this.pvt_dates).length;
            }
        }, {
            key: "keyTypes",
            get: function() {
                var result = [];
                return 0 < this.stringKeyCount && result.push("strings"), 0 < this.numberKeyCount && result.push("numbers"), 
                0 < this.dateKeyCount && result.push("dates"), result;
            }
        }, {
            key: "keyTypesPure",
            get: function() {
                return this.keyTypes.length < 2;
            }
        }, {
            key: "empty",
            get: function() {
                return 0 === this.length;
            }
        }, {
            key: "length",
            get: function() {
                return this.pvt_keys.length;
            }
        } ]), Map;
    }(), UniqueSet = function(_Map) {
        function UniqueSet() {
            return _classCallCheck(this, UniqueSet), _possibleConstructorReturn(this, _getPrototypeOf(UniqueSet).apply(this, arguments));
        }
        return function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }(UniqueSet, Map), _createClass(UniqueSet, [ {
            key: "push",
            value: function(item) {
                return this.set(item), this;
            }
        }, {
            key: "remove",
            value: function(item) {
                return this["delete"](item), this;
            }
        }, {
            key: "flush",
            value: function() {
                return this.clear();
            }
        }, {
            key: "forEach",
            value: function(callback) {
                this.pvt_keys.forEach(function(key) {
                    callback(key);
                });
            }
        }, {
            key: "values",
            get: function() {
                return this.keys();
            }
        } ]), UniqueSet;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return SheetAccessor;
    });
    var _instance_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4), _map_unique__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2), _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1), _data_payload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5), _CONSTANTS__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
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
        this.sheet = instanceOptions.sheet, this.range = {}, this.value = {}, this.background = {}, 
        this.fontcolor = {}, this.note = {}, this.fontfamily = {}, this.fontsize = {}, this.fontstyle = {}, 
        this.fontweight = {}, this.headerRowIndex = 0, this.headerColumnIndex = 0, this.getHeaderRow = null, 
        this.getColumnIndex = null, this.columnExists = null, this.getAllRecordIndices = null, 
        this.resizeColumns = null, this.getDataPayload = null;
        for (var notesData = this.sheet.getDataRange().getNotes(), rowCount = notesData.length, columnCount = notesData[0].length, rowIndex = 0; rowIndex < rowCount; rowIndex += 1) if (-1 !== notesData[rowIndex].join("").indexOf(instanceOptions.headerAnchorToken)) {
            this.headerRowIndex = rowIndex;
            break;
        }
        for (var columnIndex = 0; columnIndex < columnCount; columnIndex += 1) if (-1 !== notesData[this.headerRowIndex][columnIndex].indexOf(instanceOptions.headerAnchorToken)) {
            this.headerColumnIndex = columnIndex;
            break;
        }
        this.range = {
            getCell: function(rowIndex, columnIndex) {
                return _this.sheet.getRange(rowIndex + 1, columnIndex + 1);
            },
            getRow: function(rowIndex) {
                return _this.sheet.getRange(rowIndex + 1, 1, 1, _this.sheet.getDataRange().getNumColumns());
            },
            getColumn: function(columnIndex, startRowIndex) {
                var dataRange = _this.sheet.getDataRange(), startRowIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["g"])(startRowIndex) ? startRowIndex : 0;
                return _this.sheet.getRange(startRowIndx + 1, columnIndex + 1, dataRange.getNumRows() - startRowIndx, 1);
            },
            getAll: function(startRowIndex, startColumnIndex) {
                var dataRange = _this.sheet.getDataRange(), startRowIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["g"])(startRowIndex) ? startRowIndex : 0, startColumnIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["g"])(startColumnIndex) ? startColumnIndex : 0;
                return _this.sheet.getRange(startRowIndx + 1, startColumnIndx + 1, dataRange.getNumRows() - startRowIndx, dataRange.getNumColumns() - startColumnIndx);
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
        }, this.getColumnIndex = function(columnName) {
            return _this.getHeaderRow().indexOf(columnName);
        }, this.columnExists = function(columnName) {
            return -1 !== _this.getColumnIndex(columnName);
        }, this.getAllRecordIndexer = function() {
            for (var indexer = new _map_unique__WEBPACK_IMPORTED_MODULE_1__["a"](), numRows = _this.range.getAllRecords().getNumRows(), i = _this.headerRowIndex + 1; i <= numRows; ) indexer.set(i), 
            i += 1;
            return indexer;
        }, this.resizeColumns = function() {
            _this.getHeaderRow().forEach(function(columnName, index) {
                _this.sheet.autoResizeColumn(index + 1);
            });
        }, this.getDataPayload = function(requestedAttributesSet) {
            if (!(requestedAttributesSet instanceof _data_payload__WEBPACK_IMPORTED_MODULE_3__["a"])) throw new TypeError("getDataPayload expects a AttributesSet instance.");
            return requestedAttributesSet.push(_CONSTANTS__WEBPACK_IMPORTED_MODULE_4__["c"]), 
            new _data_payload__WEBPACK_IMPORTED_MODULE_3__["b"](requestedAttributesSet.values.reduce(function(dataObject, attribute) {
                return dataObject[attribute] = _this[attribute].getAll(), dataObject;
            }, {}), _this.headerRowIndex, _this.headerColumnIndex);
        };
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return InstanceOptions;
    });
    var _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _sheets_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8), _clone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6), _utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var InstanceOptions = function() {
        function InstanceOptions(sheetNameOrOptions) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, InstanceOptions), this.pvt_sheetName = null, this.pvt_headerAnchorToken = _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["d"], 
            this.pvt_columnFilter = [], this.pvt_exportAttributes = [ _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["c"] ], 
            this.pvt_exportOnlySelected = !0, this.pvt_writeLevel = _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["e"], 
            this.pvt_autoResizeColumns = !1, this.pvt_computedProperties = {}, this.pvt_spreadsheet = SpreadsheetApp.getActiveSpreadsheet(), 
            this.pvt_sheet = null, this.processInput(sheetNameOrOptions);
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(InstanceOptions, [ {
            key: "sheetIsSet",
            value: function() {
                return !!_CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] || Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_1__["a"])(this.pvt_sheet);
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
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["i"])(input)) throw new TypeError("sheetName must be a string.");
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
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["i"])(input)) throw new TypeError("headerAnchorToken must be a string.");
                return this.pvt_headerAnchorToken = input, this.pvt_headerAnchorToken;
            }
        }, {
            key: "columnFilter",
            get: function() {
                return this.pvt_columnFilter;
            },
            set: function(input) {
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["d"])(input)) throw new TypeError("columnFilter must be an array.");
                return this.pvt_columnFilter = Object(_clone__WEBPACK_IMPORTED_MODULE_2__["a"])(input), 
                this.pvt_columnFilter;
            }
        }, {
            key: "exportAttributes",
            get: function() {
                return this.pvt_exportAttributes;
            },
            set: function(input) {
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["d"])(input)) throw new TypeError("exportAttributes must be an array.");
                return this.pvt_exportAttributes = Object(_clone__WEBPACK_IMPORTED_MODULE_2__["a"])(input), 
                this.pvt_exportAttributes;
            }
        }, {
            key: "exportOnlySelected",
            get: function() {
                return this.pvt_exportOnlySelected;
            },
            set: function(input) {
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["e"])(input)) throw new TypeError("exportOnlySelected must be a boolean.");
                return this.pvt_exportOnlySelected = input, this.pvt_exportOnlySelected;
            }
        }, {
            key: "writeLevel",
            get: function() {
                return this.pvt_writeLevel;
            },
            set: function(input) {
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["i"])(input)) throw new TypeError("exportOnlySelected must be a string.");
                if (-1 === _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["n"].indexOf(input)) throw new Error("writeLevel must be one of ".concat(_CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["n"].toString(), " received ").concat(input));
                return this.pvt_writeLevel = input, this.pvt_writeLevel;
            }
        }, {
            key: "autoResizeColumns",
            get: function() {
                return this.pvt_autoResizeColumns;
            },
            set: function(input) {
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["e"])(input)) throw new TypeError("autoResizeColumns must be a boolean.");
                return this.pvt_autoResizeColumns = input, this.pvt_autoResizeColumns;
            }
        }, {
            key: "computedProperties",
            get: function() {
                return this.pvt_computedProperties;
            },
            set: function(input) {
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["h"])(input)) throw new TypeError("computedProperties must be a property descriptor object.");
                return this.pvt_computedProperties = input, this.pvt_computedProperties;
            }
        }, {
            key: "spreadsheet",
            set: function(input) {
                if (!_CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] && !Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_1__["b"])(input)) throw new TypeError("spreadsheet must be a spreadsheet object.");
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
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return DataPayload;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return AttributesSet;
    });
    var _map_unique__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
    function _typeof(obj) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
            return typeof obj;
        } : function _typeof(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        })(obj);
    }
    function _possibleConstructorReturn(self, call) {
        return !call || "object" !== _typeof(call) && "function" != typeof call ? function _assertThisInitialized(self) {
            if (void 0 !== self) return self;
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }(self) : call;
    }
    function _getPrototypeOf(o) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        })(o);
    }
    function _setPrototypeOf(o, p) {
        return (_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            return o.__proto__ = p, o;
        })(o, p);
    }
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
    var DataPayload = function() {
        function DataPayload(dataObject, headerRowIndex, headerColumnIndex) {
            _classCallCheck(this, DataPayload), this.headerRowIndex = headerRowIndex, this.headerColumnIndex = headerColumnIndex, 
            this.headerRow = dataObject[_CONSTANTS__WEBPACK_IMPORTED_MODULE_1__["c"]][headerRowIndex], 
            this.dataObject = dataObject;
        }
        return _createClass(DataPayload, [ {
            key: "getIndexOn",
            value: function(columnName, attribute) {
                var indexer = new _map_unique__WEBPACK_IMPORTED_MODULE_0__["a"]();
                if (columnName === undefined && attribute === undefined) this.dataObject[_CONSTANTS__WEBPACK_IMPORTED_MODULE_1__["c"]].forEach(function(row, index) {
                    indexer.set(index, index);
                }); else {
                    var attr = attribute === undefined ? Object.keys(this.dataObject)[0] : attribute, columnIndex = this.headerRow.indexOf(columnName);
                    if (-1 === columnIndex) throw new Error("getIndexOn failed: column ".concat(columnName, " does not exist in this TableProxy instance."));
                    if (-1 === _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__["k"].indexOf(attr)) throw new Error("getIndexOn failed: attribute ".concat(attribute, " is not supported."));
                    for (var length = this.dataObject[attr].length, i = this.headerRowIndex; i < length; i += 1) indexer.set(this.dataObject[attr][i][columnIndex], i);
                }
                return indexer;
            }
        } ]), DataPayload;
    }(), AttributesSet = function(_UniqueSet) {
        function AttributesSet() {
            return _classCallCheck(this, AttributesSet), _possibleConstructorReturn(this, _getPrototypeOf(AttributesSet).apply(this, arguments));
        }
        return function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }(AttributesSet, _map_unique__WEBPACK_IMPORTED_MODULE_0__["b"]), _createClass(AttributesSet, [ {
            key: "push",
            value: function(attribute) {
                if (-1 === _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__["k"].indexOf(attribute)) throw new Error("".concat(attribute, " is not a supported attribute."));
                return this.set(attribute);
            }
        }, {
            key: "withAll",
            value: function() {
                var _this = this;
                return _CONSTANTS__WEBPACK_IMPORTED_MODULE_1__["k"].forEach(function(attribute) {
                    _this.push(attribute);
                }), this;
            }
        } ]), AttributesSet;
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
        return Timer;
    });
    var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), _sheets_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var Timer = function() {
        function Timer(text) {
            if (function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Timer), !Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["i"])(text)) throw new Error("Timer requires text.");
            this.text = text, this.startTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["b"])(), 
            this.duration = null;
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(Timer, [ {
            key: "stop",
            value: function(text) {
                var endText = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["i"])(text) ? "\n".concat(text) : "";
                this.duration = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["a"])(this.startTime, 0), 
                Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_1__["c"])("".concat(this.text, " operation completed in ").concat(this.duration, "ms").concat(endText));
            }
        } ]), Timer;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return isSpreadsheet;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return isSheet;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return log;
    });
    var _simulation_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
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
    function isSpreadsheet(input) {
        return "Spreadsheet" === getSheetsObjectType(input);
    }
    function isSheet(input) {
        return "Sheet" === getSheetsObjectType(input);
    }
    function log(input) {
        _simulation_utils__WEBPACK_IMPORTED_MODULE_0__["a"].log(input);
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return expSpreadsheetApp;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return expLogger;
    });
    var _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
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
    var defaults = {
        values: ""
    }, values = [ [ "1-1 Value", "1-2 Value", "1-3 Value", "1-4 Value", "1-5 Value" ], [ "2-1 Value", "2-2 Value", "2-3 Value", "2-4 Value", "2-5 Value" ], [ "3-1 Value", "3-2 Value", "3-3 Value", "3-4 Value", "3-5 Value" ], [ "4-1 Value", "4-2 Value", "4-3 Value", "4-4 Value", "4-5 Value" ], [ "5-1 Value", "5-2 Value", "5-3 Value", "5-4 Value", "5-5 Value" ], [ "6-1 Value", "6-2 Value", "6-3 Value", "6-4 Value", "6-5 Value" ] ], backgrounds = [ [ "#E5E5E5", "#E5E5E5", "#E5E5E5", "#E5E5E5", "#E5E5E5" ], [ defaults.backgrounds = "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ] ], fontcolors = [ [ defaults.fontcolors = "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ] ], notes = [ [ defaults.notes = "", "", "", "", "" ], [ "", "", "HEADER_ANCHOR", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ] ], fontweights = [ [ "bold", "bold", "bold", "bold", "bold" ], [ defaults.fontweights = "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ] ], fontstyles = [ [ defaults.fontstyles = "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ] ], fontsizes = [ [ 12, 12, 12, 12, 12 ], [ defaults.fontsizes = 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ] ], fontfamilies = [ [ defaults.fontfamilies = "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ] ], isInteger = function isInteger(input) {
        return input === parseInt(input, 10);
    }, DataContainer = function() {
        function DataContainer() {
            _classCallCheck(this, DataContainer), this.values = values, this.backgrounds = backgrounds, 
            this.fontcolors = fontcolors, this.notes = notes, this.fontweights = fontweights, 
            this.fontstyles = fontstyles, this.fontsizes = fontsizes, this.fontfamilies = fontfamilies;
        }
        return _createClass(DataContainer, [ {
            key: "filterDataArray",
            value: function(dataAttribute, startRow, startColumn, numRows, numColumns) {
                var _this = this;
                if (this[dataAttribute] === undefined) throw new Error('invalid dataset: "'.concat(dataAttribute, '"'));
                if (!isInteger(startRow)) throw new Error("startRow must be an integer - received ".concat(startRow, "."));
                if (!isInteger(startColumn)) throw new Error("startColumn must be an integer - received ".concat(startColumn, "."));
                if (numRows === undefined && numColumns !== undefined) throw new Error("numRows must be specified if numColumns is specified.");
                var dataArray = this[dataAttribute], numRowsClean = numRows === undefined ? 1 : numRows, numColumnsClean = numColumns === undefined ? 1 : numColumns;
                if (startRow < 1) throw new Error("startRow out of range for ".concat(dataAttribute, ". Requested startRow ").concat(startRow, " - must be >= 1."));
                if (startColumn < 1) throw new Error("startColumn out of range for ".concat(dataAttribute, ". Requested startColumn ").concat(startColumn, " - must be >= 1."));
                if (startRow - 1 + numRowsClean > dataArray.length) for (var rowDelta = startRow - 1 + numRowsClean - dataArray.length, columnCount = this[dataAttribute][0].length, i = 0; i < rowDelta; i += 1) {
                    for (var defaultRow = [], j = 0; j < columnCount; j += 1) defaultRow.push(defaults[dataAttribute]);
                    this[dataAttribute].push(defaultRow);
                }
                if (startColumn - 1 + numColumnsClean > dataArray[0].length) {
                    var columnDelta = startColumn - 1 + numColumnsClean - dataArray[0].length;
                    this[dataAttribute].forEach(function(row, rowIndex) {
                        for (var _i = 0; _i < columnDelta; _i += 1) _this[dataAttribute][rowIndex].push(defaults[dataAttribute]);
                    });
                }
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
                var _this2 = this;
                return this[dataAttribute] && dataChunk[dataAttribute].forEach(function(row, rowIndex) {
                    row.forEach(function(columnValue, columnIndex) {
                        _this2[dataAttribute][startRow - 1 + rowIndex][startColumn - 1 + columnIndex] = columnValue;
                    });
                }), this.trim();
            }
        }, {
            key: "trim",
            value: function() {
                var _this3 = this, maxRowIndex = 0, maxColumnIndex = 0;
                return Object.keys(this).forEach(function(dataAttribute) {
                    _this3[dataAttribute].forEach(function(row, rowIndex) {
                        row.forEach(function(columnValue, columnIndex) {
                            "" !== columnValue && (maxRowIndex = Math.max(rowIndex, maxRowIndex), maxColumnIndex = Math.max(columnIndex, maxColumnIndex));
                        });
                    });
                }), Object.keys(this).forEach(function(dataAttribute) {
                    _this3[dataAttribute] = _this3[dataAttribute].filter(function(row, rowIndex) {
                        return rowIndex <= maxRowIndex;
                    }), _this3[dataAttribute] = _this3[dataAttribute].map(function(row) {
                        return row.filter(function(columnValue, columnIndex) {
                            return columnIndex <= maxColumnIndex;
                        });
                    });
                }), this;
            }
        }, {
            key: "insertRows",
            value: function(rowPosition, numRows, withDefaults) {
                var _this4 = this;
                return Object.keys(this).forEach(function(dataAttribute) {
                    for (var columnCount = _this4[dataAttribute][0].length, argArray = [ rowPosition - 1, 0 ], i = 0; i < numRows; i += 1) {
                        for (var newRow = [], j = 0; j < columnCount; j += 1) !0 === withDefaults && newRow.push(defaults[dataAttribute]), 
                        !0 !== withDefaults && ("notes" !== dataAttribute && "values" !== dataAttribute ? newRow.push(_this4[dataAttribute][rowPosition - 1][j]) : newRow.push(defaults[dataAttribute]));
                        argArray.push(newRow);
                    }
                    Array.prototype.splice.apply(_this4[dataAttribute], argArray);
                }), this;
            }
        }, {
            key: "deleteRows",
            value: function(startRow, numRows) {
                var _this5 = this;
                if (startRow < 1) throw new Error("try deleting rows with position greater than 1...");
                return Object.keys(this).forEach(function(dataAttribute) {
                    _this5[dataAttribute].splice(startRow - 1, numRows);
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
                return this.startRow;
            }
        }, {
            key: "getColumn",
            value: function() {
                return this.startColumn;
            }
        }, {
            key: "getColumnIndex",
            value: function() {
                return this.startColumn;
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
                this.sheet.writeHtml(), this;
            }
        }, {
            key: "getBackgrounds",
            value: function() {
                return this.dataChunk.backgrounds;
            }
        }, {
            key: "setBackgrounds",
            value: function(input) {
                return this.validateInputShape(input, "setBackgrounds"), this.dataChunk.backgrounds = input, 
                this.dataContainer.setChunk("backgrounds", this.dataChunk, this.startRow, this.startColumn), 
                this.sheet.writeHtml(), this;
            }
        }, {
            key: "getFontColors",
            value: function() {
                return this.dataChunk.fontcolors;
            }
        }, {
            key: "setFontColors",
            value: function(input) {
                return this.validateInputShape(input, "setFontColors"), this.dataChunk.fontcolors = input, 
                this.dataContainer.setChunk("fontcolors", this.dataChunk, this.startRow, this.startColumn), 
                this.sheet.writeHtml(), this;
            }
        }, {
            key: "getNotes",
            value: function() {
                return this.dataChunk.notes;
            }
        }, {
            key: "setNotes",
            value: function(input) {
                return this.validateInputShape(input, "setNotes"), this.dataChunk.notes = input, 
                this.dataContainer.setChunk("notes", this.dataChunk, this.startRow, this.startColumn), 
                this.sheet.writeHtml(), this;
            }
        }, {
            key: "getFontFamilies",
            value: function() {
                return this.dataChunk.fontfamilies;
            }
        }, {
            key: "setFontFamilies",
            value: function(input) {
                return this.validateInputShape(input, "setFontFamilies"), this.dataChunk.fontfamilies = input, 
                this.dataContainer.setChunk("fontfamilies", this.dataChunk, this.startRow, this.startColumn), 
                this.sheet.writeHtml(), this;
            }
        }, {
            key: "getFontSizes",
            value: function() {
                return this.dataChunk.fontsizes;
            }
        }, {
            key: "setFontSizes",
            value: function(input) {
                return this.validateInputShape(input, "setFontSizes"), this.dataChunk.fontsizes = input, 
                this.dataContainer.setChunk("fontsizes", this.dataChunk, this.startRow, this.startColumn), 
                this.sheet.writeHtml(), this;
            }
        }, {
            key: "getFontStyles",
            value: function() {
                return this.dataChunk.fontstyles;
            }
        }, {
            key: "setFontStyles",
            value: function(input) {
                return this.validateInputShape(input, "setFontStyles"), this.dataChunk.fontstyles = input, 
                this.dataContainer.setChunk("fontstyles", this.dataChunk, this.startRow, this.startColumn), 
                this.sheet.writeHtml(), this;
            }
        }, {
            key: "getFontWeights",
            value: function() {
                return this.dataChunk.fontweights;
            }
        }, {
            key: "setFontWeights",
            value: function(input) {
                return this.validateInputShape(input, "setFontWeights"), this.dataChunk.fontweights = input, 
                this.dataContainer.setChunk("fontweights", this.dataChunk, this.startRow, this.startColumn), 
                this.sheet.writeHtml(), this;
            }
        } ]), Range;
    }(), Sheet = function() {
        function Sheet(name) {
            _classCallCheck(this, Sheet), this.name = name, this.dataContainer = new DataContainer(), 
            this.div = null;
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
        }, {
            key: "deleteRows",
            value: function(rowPosition, numRows) {
                return this.dataContainer.deleteRows(rowPosition, numRows), this.writeHtml(), this;
            }
        }, {
            key: "insertRows",
            value: function(rowPosition, numRows) {
                return this.dataContainer.insertRows(rowPosition, numRows), this.writeHtml(), this;
            }
        }, {
            key: "setDiv",
            value: function(div) {
                if ("[object HTMLDivElement]" !== toString.call(div)) throw new TypeError("setDiv requires a div element.");
                return this.div = div, this.writeHtml();
            }
        }, {
            key: "writeHtml",
            value: function() {
                return "[object HTMLDivElement]" === toString.call(this.div) && (this.div.innerHTML = this.getHtml()), 
                this;
            }
        }, {
            key: "getHtml",
            value: function() {
                for (var html = '<table style="border-collapse:collapse;border:1px solid black;">', rowCount = this.dataContainer.values.length, columnCount = this.dataContainer.values[0].length, i = 0; i < rowCount; i += 1) {
                    html += "<tr>";
                    for (var j = 0; j < columnCount; j += 1) html += '<td style="padding:5px;text-align:center;border:1px solid black;', 
                    html += "background-color:".concat(this.dataContainer.backgrounds[i][j], ";"), html += "color:".concat(this.dataContainer.fontcolors[i][j], ";"), 
                    html += "font-family:".concat(this.dataContainer.fontfamilies[i][j], ";"), html += "font-size:".concat(this.dataContainer.fontsizes[i][j], "px;"), 
                    html += "font-style:".concat(this.dataContainer.fontstyles[i][j], ";"), html += "font-weight:".concat(this.dataContainer.fontweights[i][j], ";"), 
                    html += '">'.concat(this.dataContainer.values[i][j], " "), "" !== this.dataContainer.notes[i][j] && (html += '<a href=" " title="'.concat(this.dataContainer.notes[i][j], '">X</a>')), 
                    html += "</td>";
                    html += "</tr>";
                }
                return html += "</table>";
            }
        } ]), Sheet;
    }(), ActiveSpreadsheet = function() {
        function ActiveSpreadsheet() {
            _classCallCheck(this, ActiveSpreadsheet), this.sheets = {
                Test: new Sheet("Test")
            };
        }
        return _createClass(ActiveSpreadsheet, [ {
            key: "getActiveSheet",
            value: function() {
                return this.sheets.Test;
            }
        }, {
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
    }, expSpreadsheetApp = _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] ? SpreadsheetAppFake : SpreadsheetApp, BrowserFake = {
        msgBox: function(note) {
            console.log("Browser.msgBox----\x3e"), console.log(note), console.log("<----Browser.msgBox");
        }
    }, LoggerFake = (_CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] || Browser, {
        log: function(note) {
            console.log("Logger.log----\x3e"), console.log(note), console.log("<----Logger.log");
        }
    }), expLogger = _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] ? LoggerFake : Logger;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return MainCursor;
    });
    var _map_unique__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _sheet_accessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
    function _typeof(obj) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
            return typeof obj;
        } : function _typeof(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        })(obj);
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _possibleConstructorReturn(self, call) {
        return !call || "object" !== _typeof(call) && "function" != typeof call ? function _assertThisInitialized(self) {
            if (void 0 !== self) return self;
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }(self) : call;
    }
    function _getPrototypeOf(o) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        })(o);
    }
    function _setPrototypeOf(o, p) {
        return (_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            return o.__proto__ = p, o;
        })(o, p);
    }
    var MainCursor = function(_Map) {
        function MainCursor(sheetAccessor) {
            var _this;
            if (function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, MainCursor), _this = _possibleConstructorReturn(this, _getPrototypeOf(MainCursor).call(this)), 
            !(sheetAccessor instanceof _sheet_accessor__WEBPACK_IMPORTED_MODULE_1__["a"])) throw new TypeError("MainCursor constructor requires a SheetAccessor.");
            return _this.sheetAccessor = sheetAccessor, _this.dirty = !0, _this.flush(), _this;
        }
        return function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && _setPrototypeOf(subClass, superClass);
        }(MainCursor, _map_unique__WEBPACK_IMPORTED_MODULE_0__["a"]), function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(MainCursor, [ {
            key: "setDirty",
            value: function() {
                return this.dirty = !0, this;
            }
        }, {
            key: "setClean",
            value: function() {
                return this.dirty = !1, this;
            }
        }, {
            key: "flush",
            value: function() {
                return this.clear().setDirty().copyItems(this.sheetAccessor.getAllRecordIndexer());
            }
        }, {
            key: "consumeSelection",
            value: function(selectionSet) {
                if (!(selectionSet instanceof _map_unique__WEBPACK_IMPORTED_MODULE_0__["a"])) throw new TypeError("consumeSelections accepts only Map input.");
                return this.clear().copyItems(selectionSet), this;
            }
        }, {
            key: "indices",
            get: function() {
                return this.keys();
            }
        } ]), MainCursor;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var map_unique = __webpack_require__(2), CONSTANTS = __webpack_require__(0), data_payload = __webpack_require__(5), utilities = __webpack_require__(1);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var query_driver_QueryDriver = function() {
        function QueryDriver(type) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, QueryDriver), this.type = type.toUpperCase(), this.query = null, this.returnWithRecords = !1, 
            this.requestedAttributesSet = new data_payload["a"](), this.writeIndexColumnName = null, 
            this.writeIndexAttribute = null, this.recordsToWrite = null, this.writeIffIndexUnique = !0;
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(QueryDriver, [ {
            key: "setQuery",
            value: function(query) {
                var _this = this;
                if (!Object(utilities["f"])(query)) throw new TypeError("loadQuery requires accepts a function callback");
                var queryAsString = (this.query = query).toString();
                return CONSTANTS["k"].forEach(function(attribute) {
                    var re1 = new RegExp("[[]{1}['|\"]{1}".concat(attribute, "['|\"]{1}[]]{1}"), "g"), re2 = new RegExp("[.]{1}".concat(attribute, "[^a-zA-Z0-9]"), "g");
                    (re1.test(queryAsString) || re2.test(queryAsString)) && _this.requestedAttributesSet.push(attribute);
                }), this;
            }
        }, {
            key: "setReturnWithRecords",
            value: function(bool) {
                return this.returnWithRecords = !0 === bool, this;
            }
        }, {
            key: "setRecordsToWrite",
            value: function(arrayOfRecords) {
                var _this2 = this;
                if ("[object Array]" !== toString.call(arrayOfRecords)) throw new TypeError("setRecordsToWrite expects an array.");
                return CONSTANTS["k"].forEach(function(attribute) {
                    _this2.requestedAttributesSet.push(attribute);
                }), this.recordsToWrite = arrayOfRecords, this;
            }
        }, {
            key: "addAttribute",
            value: function(attribute) {
                if (-1 === CONSTANTS["k"].indexOf(attribute)) throw new TypeError("invalid attribute ".concat(attribute));
                return this.requestedAttributeSet.push(attribute), this;
            }
        }, {
            key: "setWriteIndexColumnName",
            value: function(columnName) {
                return this.indexColumnName = columnName.trim(), this;
            }
        }, {
            key: "setWriteIndexAttribute",
            value: function(attribute) {
                return this.indexAttribute = attribute.trim(), this;
            }
        }, {
            key: "setWriteIffIndexUnique",
            value: function(bool) {
                return this.writeIffIndexUnique = !0 === bool, this;
            }
        } ]), QueryDriver;
    }(), sheet_accessor = __webpack_require__(3), instance_options = __webpack_require__(4);
    function data_controller_defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var data_controller_DataController = function() {
        function DataController(sheetAccessor, instanceOptions, requestedAttributesSet) {
            if (function data_controller_classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, DataController), !(sheetAccessor instanceof sheet_accessor["a"])) throw new TypeError("DataController requires an instance of InstanceOptions object.");
            if (!(instanceOptions instanceof instance_options["a"])) throw new TypeError("DataController requires an instance of InstanceOptions object.");
            if (!(requestedAttributesSet instanceof data_payload["a"]) || requestedAttributesSet.length < 1) throw new TypeError("DataController requires a RequestedAttributesSet instance containing at least one attribute.");
            this.sheetAccessor = sheetAccessor, this.instanceOptions = instanceOptions, this.rowIndex = null, 
            this.changedAttributes = new data_payload["a"](), this.dataPayload = sheetAccessor.getDataPayload(requestedAttributesSet);
        }
        return function data_controller_createClass(Constructor, protoProps, staticProps) {
            return protoProps && data_controller_defineProperties(Constructor.prototype, protoProps), 
            staticProps && data_controller_defineProperties(Constructor, staticProps), Constructor;
        }(DataController, [ {
            key: "getColumnByIndex",
            value: function(attribute, columnIndex) {
                return this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex];
            }
        }, {
            key: "updateColumnByIndex",
            value: function(attribute, columnIndex, updatedValue) {
                return console.log("updateColumnByIndex"), this.dataPayload[attribute][this.rowIndex][columnIndex] = updatedValue, 
                this.instanceOptions.writeLevel === CONSTANTS["o"] ? this.sheetAccessor[attribute].setCell(this.rowIndex, columnIndex, [ [ updatedValue ] ]) : this.changedAttributes.push(attribute), 
                this;
            }
        }, {
            key: "setRowIndex",
            value: function(rowIndex) {
                return console.log("setRowIndex"), this.instanceOptions.writeLevel === CONSTANTS["p"] && null !== this.rowIndex && this.writeCurrentRow(), 
                this.rowIndex = rowIndex, this;
            }
        }, {
            key: "getRowIndex",
            value: function() {
                return console.log("getRowIndex"), this.rowIndex;
            }
        }, {
            key: "writeCurrentRow",
            value: function() {
                var _this = this;
                return console.log("writeCurrentRow"), this.changedAttributes.forEach(function(attribute) {
                    _this.sheetAccessor[attribute].setRow(_this.rowIndex, [ _this.dataPayload[attribute][_this.rowIndex] ]);
                }), this.changedAttributes.flush(), this;
            }
        }, {
            key: "capWrite",
            value: function() {
                var _this2 = this;
                console.log("capWrite"), this.instanceOptions.writeLevel === CONSTANTS["q"] && (this.changedAttributes.forEach(function(attribute) {
                    _this2.sheetAccessor[attribute].setAllRecords(_this2.dataPayload[attribute]);
                }), this.changedAttributes.flush()), this.instanceOptions.writeLevel === CONSTANTS["p"] && this.writeCurrentRow();
            }
        } ]), DataController;
    }(), main_cursor = __webpack_require__(10), timer = __webpack_require__(7);
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
            }(this, QueryReturn), !(queryDriver instanceof query_driver_QueryDriver)) throw new TypeError("QueryResult constructor requires QueryDriver input.");
            this.type = queryDriver.type, this.query = queryDriver.query, this.timer = new timer["a"]("".concat(queryDriver.type)), 
            this.resultSet = new map_unique["a"](), this.otherResults = new map_unique["a"]();
        }
        return function query_return_createClass(Constructor, protoProps, staticProps) {
            return protoProps && query_return_defineProperties(Constructor.prototype, protoProps), 
            staticProps && query_return_defineProperties(Constructor, staticProps), Constructor;
        }(QueryReturn, [ {
            key: "push",
            value: function(index, record) {
                return this.resultSet.set(index, record), this;
            }
        }, {
            key: "has",
            value: function(index) {
                return this.resultSet.has(index);
            }
        }, {
            key: "done",
            value: function() {
                return this.timer.stop(this.query.toString()), this;
            }
        }, {
            key: "count",
            get: function() {
                return this.resultSet.length;
            }
        } ]), QueryReturn;
    }();
    function getRecordProxy(core, dataController, requestedAttributesSet) {
        if (!(core.sheetAccessor instanceof sheet_accessor["a"])) throw new Error("getRecordProxy requires a SheetAccessor instance.");
        if (!(core.instanceOptions instanceof instance_options["a"])) throw new Error("getRecordProxy requires an InstanceOptions instance.");
        if (!(dataController instanceof data_controller_DataController)) throw new Error("getRecordProxy requires a DataController instance.");
        if (!(requestedAttributesSet instanceof map_unique["b"])) throw new Error("getRecordProxy requires an UniqueSet instance for input parameter requestedAttributesSet.");
        var columnFilter = core.instanceOptions.columnFilter;
        var recordProxy = {};
        Object.defineProperty(recordProxy, CONSTANTS["f"], {
            enumerable: !0,
            get: function() {
                return dataController.getRowIndex();
            }
        }), core.sheetAccessor.getHeaderRow().forEach(function(column, columnIndex) {
            if (function columnIsValid(column) {
                return null !== column && column !== undefined && !(0 < columnFilter.length && -1 === columnFilter.indexOf(column));
            }(column)) {
                var columnProxy = {};
                requestedAttributesSet.forEach(function(attribute) {
                    Object.defineProperty(columnProxy, attribute, {
                        enumerable: !0,
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
            Object.keys(core.instanceOptions.computedProperties).forEach(function(key) {
                recordProxy[key] = Object.defineProperty({}, "value", {
                    enumerable: !0,
                    get: core.instanceOptions.computedProperties[key].bind(recordProxy)
                });
            });
        } catch (e) {
            throw new Error("there was a problem creating a record proxy with the specified computedProperties: ".concat(e));
        }
        return recordProxy;
    }
    var clone = __webpack_require__(6);
    function processQuery(core, queryDriver) {
        if (!(queryDriver instanceof query_driver_QueryDriver)) throw new Error("queryProcessor requires a QueryDriver instance.");
        if (!(core.sheetAccessor instanceof sheet_accessor["a"])) throw new Error("queryProcessor requires a SheetAccessor instance.");
        if (!(core.mainCursor instanceof main_cursor["a"])) throw new Error("queryProcessor requires a MainCursor instance.");
        if (-1 === CONSTANTS["l"].indexOf(queryDriver.type)) throw new Error('queryDriver had invalid type "'.concat(queryDriver.type, '"'));
        var queryReturn = new query_return_QueryReturn(queryDriver), dataController = new data_controller_DataController(core.sheetAccessor, core.instanceOptions, queryDriver.requestedAttributesSet), recordProxy = getRecordProxy(core, dataController, queryDriver.requestedAttributesSet), query = queryDriver.query.bind(recordProxy);
        if (-1 !== [ CONSTANTS["i"], CONSTANTS["h"] ].indexOf(queryDriver.type) && core.mainCursor.indices.forEach(function(index) {
            console.log("shit ".concat(index)), dataController.setRowIndex(index), console.log(recordProxy), 
            query(recordProxy, index) && (queryDriver.returnWithRecords ? queryReturn.resultSet.push(index, Object(clone["a"])(recordProxy)) : queryReturn.push(index));
        }), -1 === [ CONSTANTS["j"] ].indexOf(queryDriver.type)) return dataController.capWrite(), 
        core.instanceOptions.autoResizeColumns && core.sheetAccessor.resizeColumns(), queryReturn.done();
        var indexer = dataController.getIndexOn(queryDriver.writeIndexColumnName, queryDriver.writeIndexAttribute);
        return core.mainCursor.forEach(function(index) {
            dataController.setRowIndex(index), query(recordProxy, index) && (queryDriver.withRecords ? queryReturn.recordsContainer.push(index, Object(clone["a"])(recordProxy)) : queryReturn.push(index));
        }), indexer;
    }
    function runQuery(core, query, returnWithRecords) {
        var queryDriver = new query_driver_QueryDriver("query").setQuery(query).setReturnWithRecords(returnWithRecords);
        return !0 !== returnWithRecords && core.mainCursor.setDirty(), processQuery(core, queryDriver);
    }
    function getUnique(core, columnName, attribute) {
        if (!Object(utilities["i"])(columnName) && !Object(utilities["g"])(columnName)) throw new Error("unique method requires a string or number columnName");
        if (attribute && !Object(utilities["c"])(attribute, CONSTANTS["k"])) throw new Error("unique method receieved invalid attribute: ".concat(attribute));
        var attr = attribute || CONSTANTS["c"], aggregator = new map_unique["b"]();
        return processQuery(core, new query_driver_QueryDriver("unique").setQuery(function(r) {
            aggregator.push(r[columnName][attr]);
        }).addAttribute(attr));
    }
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return runQuery;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return getUnique;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _simulation_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9), _instance_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4), _sheet_accessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3), _main_cursor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10), _timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7), _operations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11), _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
        global.SpreadsheetApp = _simulation_utils__WEBPACK_IMPORTED_MODULE_0__["b"];
        var TableProxy = function TableProxy() {
            return {
                mount: function mount(sheetNameOrOptions) {
                    var _this = this;
                    try {
                        var instanceOptions = new _instance_options__WEBPACK_IMPORTED_MODULE_1__["a"](sheetNameOrOptions), sheetAccessor = new _sheet_accessor__WEBPACK_IMPORTED_MODULE_2__["a"](instanceOptions), mainCursor = new _main_cursor__WEBPACK_IMPORTED_MODULE_3__["a"](sheetAccessor), core = {
                            instanceOptions: instanceOptions,
                            sheetAccessor: sheetAccessor,
                            mainCursor: mainCursor
                        }, api = {};
                        return Object.defineProperty(api, "query", {
                            enumerable: !0,
                            configurable: !1,
                            writable: !1,
                            value: function(query, withRecords) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_4__["a"]("API query call"), queryReturn = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["b"])(core, query, withRecords);
                                return console.log(queryReturn), mainCursor.consumeSelection(queryReturn.resultSet), 
                                timer.stop(), _this;
                            }
                        }), Object.defineProperty(api, "unique", {
                            enumerable: !0,
                            configurable: !1,
                            writable: !1,
                            value: function(columnName, attribute) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_4__["a"]("API unique call"), queryReturn = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["a"])(core, columnName, attribute);
                                return timer.stop(), queryReturn.resultSet.values;
                            }
                        }), Object.defineProperty(api, "flush", {
                            enumerable: !0,
                            configurable: !1,
                            writable: !1,
                            value: function() {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_4__["a"]("API flush call");
                                return mainCursor.flush(), timer.stop(), _this;
                            }
                        }), Object.defineProperty(api, "records", {
                            enumerable: !0,
                            get: function() {
                                return mainCursor.getRecords();
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
                            }
                        }), api;
                    } catch (e) {
                        throw new Error("TableProxy.mount failed: ".concat(e));
                    }
                },
                TOP: _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__["m"],
                BOTTOM: _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__["a"],
                WRITE_LEVEL_CELL: _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__["o"],
                WRITE_LEVEL_ROW: _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__["p"],
                WRITE_LEVEL_TABLE: _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__["q"],
                COLORS: _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__["b"]
            };
        };
        global.TableProxy = TableProxy();
    }.call(this, __webpack_require__(13));
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