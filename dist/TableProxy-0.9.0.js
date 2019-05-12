function $initTableProxy() {
}
function $initUtils() {
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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 14);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "i", function() {
        return isDate1;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return isArray;
    }), __webpack_require__.d(__webpack_exports__, "p", function() {
        return isString;
    }), __webpack_require__.d(__webpack_exports__, "n", function() {
        return isNumeric;
    }), __webpack_require__.d(__webpack_exports__, "k", function() {
        return isFunction;
    }), __webpack_require__.d(__webpack_exports__, "o", function() {
        return isObject;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return isBoolean;
    }), __webpack_require__.d(__webpack_exports__, "m", function() {
        return isNull;
    }), __webpack_require__.d(__webpack_exports__, "q", function() {
        return isUndefined;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return inArray;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return getType;
    }), __webpack_require__.d(__webpack_exports__, "t", function() {
        return toBool;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return firstToUpper;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getTimeStamp;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return getTimeDiff;
    }), __webpack_require__.d(__webpack_exports__, "s", function() {
        return strContains;
    }), __webpack_require__.d(__webpack_exports__, "r", function() {
        return objAssign;
    }), __webpack_require__.d(__webpack_exports__, "l", function() {
        return isJson;
    }), __webpack_require__.d(__webpack_exports__, "u", function() {
        return toJson;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return isEmail;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return getTokens;
    }), __webpack_require__.d(__webpack_exports__, "v", function() {
        return tokenInterpolate;
    });
    var isDate1 = function isDate1(input) {
        return "[object Date]" === toString.call(input);
    }, isArray = function isArray(input) {
        return "[object Array]" === toString.call(input);
    }, isString = function isString(input) {
        return "[object String]" === toString.call(input);
    }, isNumeric = function isNumeric(input) {
        return "[object Number]" === toString.call(input);
    }, isFunction = function isFunction(input) {
        return "[object Function]" === toString.call(input);
    }, isObject = function isObject(input) {
        return "[object Object]" === toString.call(input) && null !== input && input !== undefined;
    }, isBoolean = function isBoolean(input) {
        return "[object Boolean]" === toString.call(input);
    }, isNull = function isNull(input) {
        return null === input;
    }, isUndefined = function isUndefined(input) {
        return input === undefined;
    }, inArray = function inArray(needle, haystack) {
        return -1 !== haystack.indexOf(needle);
    }, getType = function getType(input) {
        var type, ts = toString.call(input);
        switch (ts) {
          case "[object Boolean]":
          case "[object String]":
          case "[object Number]":
          case "[object Array]":
          case "[object Function]":
          case "[object Date]":
          case "[object Undefined]":
          case "[object Null]":
            type = ts;
            break;

          case "[object Object]":
            type = isNull(input) ? "[object Null]" : isUndefined(input) ? "[object Undefined]" : "[object Object]";
            break;

          default:
            throw new Error("getType resolved to unknown for ".concat(input));
        }
        return type;
    }, toBool = function toBool(value) {
        switch (isString(value) ? value.toLowerCase() : value) {
          case !0:
          case "true":
          case 1:
          case "1":
          case "on":
          case "yes":
            return !0;

          default:
            return !1;
        }
    }, firstToUpper = function firstToUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }, getTimeStamp = function getTimeStamp(precision) {
        var time = new Date().getTime();
        return precision ? time.toFixed(precision) : time;
    }, getTimeDiff = function getTimeDiff(oldTime, precision) {
        var newTime = getTimeStamp();
        return precision ? (newTime - oldTime).toFixed(precision) : newTime - oldTime;
    }, strContains = function strContains(string, test) {
        var contains = !1;
        return (isArray(test) ? test : [ test ]).forEach(function(t) {
            -1 !== string.indexOf(t) && (contains = !0);
        }), contains;
    }, objAssign = function objAssign(target, source, propsWritable) {
        var writable = !0 === propsWritable;
        return Object.keys(source).forEach(function(sProp) {
            Object.defineProperty(target, sProp, {
                enumerable: !0,
                configurable: !1,
                writable: writable,
                value: source[sProp]
            });
        }), target;
    }, isJson = function isJson(str) {
        if (!isString(str)) return !1;
        try {
            JSON.parse(str);
        } catch (e) {
            return !1;
        }
        return !0;
    }, toJson = function toJson(obj) {
        return JSON.stringify(obj).replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
    }, isEmail = function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
    }, getTokens = function getTokens(tokenizedString, onlyFieldNames) {
        var tokenList = tokenizedString.match(/({{![^{}]*}})/gm);
        if (!0 === onlyFieldNames) for (var i = 0; i < tokenList.length; i += 1) tokenList[i] = tokenList[i].replace("{{!", "").replace("}}", "");
        return tokenList;
    }, tokenInterpolate = function tokenInterpolate(tokenizedString, record) {
        for (var tokenList = getTokens(tokenizedString), result = tokenizedString, i = 0; i < tokenList.length; i += 1) {
            var replacementValue = record[tokenList[i].replace("{{!", "").replace("}}", "")];
            if (replacementValue === undefined) throw Error("Interpolation failed for: ".concat(JSON.stringify(record)));
            result = result.replace(tokenList[i], replacementValue);
        }
        return result;
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "g", function() {
        return IS_TEST_MODE;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return C;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return INDEX_PROP;
    }), __webpack_require__.d(__webpack_exports__, "m", function() {
        return READ_LEVEL_TABLE;
    }), __webpack_require__.d(__webpack_exports__, "l", function() {
        return READ_LEVEL_ROW;
    }), __webpack_require__.d(__webpack_exports__, "q", function() {
        return VALID_READ_LEVELS;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return DEFAULT_READ_LEVEL;
    }), __webpack_require__.d(__webpack_exports__, "s", function() {
        return WRITE_LEVEL_CELL;
    }), __webpack_require__.d(__webpack_exports__, "t", function() {
        return WRITE_LEVEL_ROW;
    }), __webpack_require__.d(__webpack_exports__, "u", function() {
        return WRITE_LEVEL_TABLE;
    }), __webpack_require__.d(__webpack_exports__, "r", function() {
        return VALID_WRITE_LEVELS;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return DEFAULT_WRITE_LEVEL;
    }), __webpack_require__.d(__webpack_exports__, "n", function() {
        return SUPPORTED_ATTRIBUTES;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return DEFAULT_ATTRIBUTE;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return ATTR_NOTE;
    }), __webpack_require__.d(__webpack_exports__, "p", function() {
        return TOP;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return OP_UNIQUE;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return OP_SELECT;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return OP_UPDATE;
    }), __webpack_require__.d(__webpack_exports__, "k", function() {
        return OP_WRITE_RECORDS;
    }), __webpack_require__.d(__webpack_exports__, "o", function() {
        return SUPPORTED_OPS;
    });
    var IS_TEST_MODE = !1, C = {
        $: " index ",
        RT: "READ_LEVEL_TABLE",
        RR: "READ_LEVEL_ROW",
        WC: "WRITE_LEVEL_CELL",
        WR: "WRITE_LEVEL_ROW",
        WT: "WRITE_LEVEL_TABLE",
        T: "TOP",
        B: "BOTTOM",
        AV: "value",
        AB: "background",
        AC: "fontcolor",
        AN: "note",
        AZ: "fontsize",
        AS: "fontstyle",
        AF: "fontfamily",
        AW: "fontweight",
        AD: "numberformat",
        DS: "mm/dd/yy",
        DST: "mm/dd/yy h:mm",
        NINT: "#,##0",
        NP1: "#,##0.0",
        NP2: "#,##0.00",
        SUCCESS: "#DFFFB4",
        FAILURE: "#FFB4B4",
        WARNING: "#FFDDB4",
        RED: "red",
        WHITE: "white",
        BLUE: "blue",
        GREEN: "green",
        ORANGE: "orange",
        BLACK: "black",
        GREY: "grey",
        YELLOW: "yellow",
        LIGHT_GREY: "#E5DEDE"
    }, INDEX_PROP = C.$, READ_LEVEL_TABLE = C.RT, READ_LEVEL_ROW = C.RR, VALID_READ_LEVELS = [ C.RT, C.RR ], DEFAULT_READ_LEVEL = C.RT, WRITE_LEVEL_CELL = C.WC, WRITE_LEVEL_ROW = C.WR, WRITE_LEVEL_TABLE = C.WT, VALID_WRITE_LEVELS = [ C.WC, C.WR, C.WT ], DEFAULT_WRITE_LEVEL = C.WC, SUPPORTED_ATTRIBUTES = [ C.AV, C.AB, C.AC, C.AN, C.AZ, C.AS, C.AF, C.AW, C.AD ], DEFAULT_ATTRIBUTE = C.AV, ATTR_NOTE = C.AN, TOP = C.T, OP_UNIQUE = (C.B, 
    "UNIQUE"), OP_SELECT = "SELECT", OP_UPDATE = "UPDATE", OP_WRITE_RECORDS = "WRITE_RECORDS", SUPPORTED_OPS = [ OP_UNIQUE, OP_SELECT, OP_UPDATE, OP_WRITE_RECORDS ];
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
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return removeDuplicates;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getDuplicates;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return testUnique;
    });
    var Map = function() {
        function Map(input) {
            var _this = this;
            if (_classCallCheck(this, Map), Object.defineProperties(this, {
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
                pvt_booleans: {
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

                          case "[object Boolean]":
                            result = _this.pvt_booleans;
                            break;

                          default:
                            throw new TypeError("Map can't accept ".concat(toString.call(key), " keys."));
                        }
                        return result;
                    }
                }
            }), input !== undefined && null !== input) {
                var entries;
                if ("[object Array]" === toString.call(input)) entries = input; else if ("[object Object]" === toString.call(input)) Object.keys(input).forEach(function(key) {
                    entries.push([ key, input[key] ]);
                }); else {
                    if (!(input instanceof Map)) throw new Error("".concat(toString.call(input), " not valid input for Map constructor."));
                    entries = input.entries();
                }
                entries.forEach(function(entry) {
                    _this.set(entry[0], entry[1]);
                });
            }
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
            value: function keys() {
                var keys = [];
                return this.pvt_keys.forEach(function(key) {
                    keys.push(key);
                }), keys;
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
                return this.pvt_strings = {}, this.pvt_numbers = {}, this.pvt_dates = {}, this.pvt_booleans = {}, 
                this.pvt_keys = [], this;
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
            key: "getShallowClone",
            value: function() {
                var _this6 = this, clone = Object.create(this);
                return this.pvt_keys.forEach(function(key) {
                    clone.set(key, _this6.get(key));
                }), clone;
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
            key: "booleanKeyCount",
            get: function() {
                return Object.keys(this.pvt_booleans).length;
            }
        }, {
            key: "keyTypes",
            get: function() {
                var result = [];
                return 0 < this.stringKeyCount && result.push("strings"), 0 < this.numberKeyCount && result.push("numbers"), 
                0 < this.dateKeyCount && result.push("dates"), 0 < this.booleanKeyCount && result.push("boolean"), 
                result;
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
                var ret = !0;
                return this.has(item) ? ret = !1 : this.set(item), ret;
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
            key: "copyValues",
            value: function(input) {
                var _this7 = this;
                if (!(input instanceof UniqueSet)) throw new TypeError("copyValues accepts only UniqueSet input.");
                return input.keys().forEach(function(key) {
                    _this7.push(key);
                }), this;
            }
        }, {
            key: "hasSame",
            value: function hasSame(input) {
                if (!(input instanceof UniqueSet)) throw new TypeError("hasSame expects a UniqueSet instance.");
                var hasSame = !0;
                this.length !== input.length && (hasSame = !1);
                var thisValues = this.values.sort(), inputValues = input.values.sort();
                return thisValues.forEach(function(value, index) {
                    value !== inputValues[index] && (hasSame = !1);
                }), hasSame;
            }
        }, {
            key: "getClone",
            value: function() {
                var clone = Object.create(this);
                return this.pvt_keys.forEach(function(key) {
                    clone.push(key);
                }), clone;
            }
        }, {
            key: "values",
            get: function() {
                return this.keys();
            }
        } ]), UniqueSet;
    }();
    function removeDuplicates(array) {
        var c = new Map();
        return array.forEach(function(v) {
            c.set(v);
        }), c.keys();
    }
    function getDuplicates() {
        for (var d = new Map(), _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
        var i = "[object Array]" === toString.call(args[0]) ? args[0] : args, t = new Map();
        return i.forEach(function(v) {
            t.has(v) ? d.set(v) : t.set(v);
        }), d.keys();
    }
    function testUnique() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
        return "[object Array]" === toString.call(args[0]) ? 0 === getDuplicates(args[0]).length : 0 === getDuplicates(args).length;
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return DataPayload;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return AttributesSet;
    });
    var _map_unique__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
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
        function DataPayload(dataObject, headerRowIndex, headerColumnIndex, headerRow) {
            _classCallCheck(this, DataPayload), this.dataObject = dataObject, this.headerRowIndex = headerRowIndex, 
            this.headerColumnIndex = headerColumnIndex, this.headerRow = headerRow;
        }
        return _createClass(DataPayload, [ {
            key: "getDataIndex",
            value: function(columnName, attribute) {
                var dataIndex = new _map_unique__WEBPACK_IMPORTED_MODULE_0__["a"]();
                if (columnName === undefined && attribute === undefined) this.dataObject[_CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["c"]].forEach(function(row, index) {
                    dataIndex.set(index, index);
                }), dataIndex.isUnique = !0; else {
                    var attr = attribute === undefined ? Object.keys(this.dataObject)[0] : attribute, columnIndex = this.headerRow.indexOf(columnName);
                    if (-1 === columnIndex) throw new Error("failed to get dataIndex on invalid column ".concat(columnName, "."));
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["f"])(attr, Object.keys(this.dataObject))) throw new Error("failed to get dataIndex on invalid attribute ".concat(attribute, "."));
                    for (var dataLength = this.dataObject[attr].length, i = this.headerRowIndex + 1; i < dataLength; i += 1) dataIndex.set(this.dataObject[attr][i][columnIndex], i);
                    dataIndex.isUnique = dataIndex.length === dataLength - this.headerRowIndex - 1;
                }
                return dataIndex;
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
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["f"])(attribute, _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["n"])) throw new Error("".concat(attribute, " is not a supported attribute."));
                return this.set(attribute);
            }
        }, {
            key: "withAll",
            value: function() {
                var _this = this;
                return _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["n"].forEach(function(attribute) {
                    _this.push(attribute);
                }), this;
            }
        } ]), AttributesSet;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return Timer;
    });
    var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _sheets_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var Timer = function() {
        function Timer(text, suppressLogStart) {
            if (function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, Timer), !Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["p"])(text)) throw new Error("Timer requires text.");
            this.text = text, this.startTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["c"])(), 
            !(this.duration = null) !== suppressLogStart && Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_1__["d"])("".concat(this.text, " operation started"));
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(Timer, [ {
            key: "getStartTime",
            value: function() {
                return this.startTime;
            }
        }, {
            key: "getDuration",
            value: function() {
                return this.duration;
            }
        }, {
            key: "getText",
            value: function() {
                return this.text;
            }
        }, {
            key: "stop",
            value: function(text) {
                var endText = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["p"])(text) ? "\n".concat(text) : "";
                return this.duration = Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["b"])(this.startTime, 0), 
                Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_1__["d"])("".concat(this.text, " operation completed in ").concat(this.duration, "ms").concat(endText)), 
                this.duration;
            }
        } ]), Timer;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", function() {
        return isSupportedType;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return log;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return getSelectedRowIndices;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return Utils;
    });
    var _simulation_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10), _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0), _map_unique__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
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
    function isSheet(input) {
        return "Sheet" === getSheetsObjectType(input);
    }
    function isRange(input) {
        return "Range" === getSheetsObjectType(input);
    }
    function isSupportedType(input) {
        return -1 !== [ "[object String]", "[object Number]", "[object Date]", "[object Boolean]" ].indexOf(toString.call(input));
    }
    function log(input) {
        _simulation_utils__WEBPACK_IMPORTED_MODULE_0__["a"].log(input);
    }
    var getSelectedRowIndices = function getSelectedRowIndices() {
        return Object.keys(SpreadsheetApp.getActiveSheet().getSelection().getActiveRangeList().getRanges().reduce(function(a, r) {
            for (var sr = r.getRow() - 1, er = sr + r.getNumRows(), i = sr; i < er; i += 1) a[i] = !0;
            return a;
        }, {})).map(function(k) {
            return Number(k);
        });
    }, getSheetByName = function getSheetByName(sheetName) {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        if (!sheet) throw new Error('getSheetByName was unable to find a sheet with name "'.concat(sheetName, '"'));
        return sheet;
    }, getSheet = function getSheet(sheetOrSheetName) {
        if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["p"])(sheetOrSheetName)) {
            if (isSheet(sheetOrSheetName)) return sheetOrSheetName;
            throw new Error('getSheet called with invalid sheetOrSheetName data type: "'.concat(getSheetsObjectType(sheetOrSheetName), '".'));
        }
        try {
            return getSheetByName(sheetOrSheetName);
        } catch (e) {
            throw new Error('getSheet could not retrieve sheet with name "'.concat(sheetOrSheetName, '".'));
        }
    }, getShape = function getShape(input) {
        if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["g"])(input)) {
            if (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["g"])(input[0])) return "".concat(input.length, "x").concat(input[0].length);
            throw new Error("getShape called on non-2d array");
        }
        if (isRange(input)) return "".concat(input.getNumRows(), "x").concat(input.getNumColumns());
        throw new Error("getShape called on data with type which does not have meaningful 2d shape.");
    }, getValueByName = function getValueByName(namedRange) {
        var range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange);
        if (!range) throw new Error('getValueByName failed because the namedRange "'.concat(namedRange, '" does not exist.'));
        return "1x1" === getShape(range) ? range.getValues()[0][0] : range.getValues();
    }, Utils = {
        getSheetsObjectType: getSheetsObjectType,
        isSpreadsheet: function isSpreadsheet(input) {
            return "Spreadsheet" === getSheetsObjectType(input);
        },
        isSheet: isSheet,
        isRange: isRange,
        isSupportedType: isSupportedType,
        getSelectedRowIndices: getSelectedRowIndices,
        sendEmail: function sendEmail(toAddress, subject, message) {
            return MailApp.sendEmail(toAddress, subject, message);
        },
        getSheetIndex: function getSheetIndex(sheetName) {
            for (var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets(), i = 0; i < sheets.length; i += 1) if (sheets[i] === sheetName) return i;
            return -1;
        },
        getSheet: getSheet,
        getShape: getShape,
        namedRangeExists: function namedRangeExists(namedRange) {
            return SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange) !== undefined;
        },
        getValueByName: getValueByName,
        updateValueByName: function updateValueByName(namedRange, value) {
            var range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange);
            if (!range) throw new Error('getValueByName failed because the namedRange "'.concat(namedRange, '" does not exist.'));
            if (!range.isPartOfMerge()) {
                var updVal = value;
                switch (Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["e"])(value)) {
                  case "[object String]":
                  case "[object Number]":
                  case "[object Boolean]":
                  case "[object Date]":
                    updVal = [ [ value ] ];
                    break;

                  case "[object Array]":
                    break;

                  default:
                    throw new Error("updateValueByName - input value is neither an array or a string");
                }
                if (updVal.length !== range.getNumRows()) throw new Error("value is not of the same size as the namedRange: row count incorrect");
                if (updVal[0].length !== range.getNumColumns()) throw new Error("value is not of the same size as the namedRange: column count problem");
                return range.setValues(updVal);
            }
            if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["p"])(value)) throw new Error("updateValueByName - range to update is merged, update value must be a string.");
            return range.setValue(value), !0;
        },
        getCoordinatesByName: function getCoordinatesByName(namedRange) {
            var range = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(namedRange);
            if (!range) throw new Error("getCoordinatesByName failed - input range does not exist.");
            return {
                startRow: range.getRow(),
                endRow: range.getLastRow(),
                startCol: range.getColumn(),
                endCol: range.getLastColumn()
            };
        },
        isDate1: _utilities__WEBPACK_IMPORTED_MODULE_1__["i"],
        isArray: _utilities__WEBPACK_IMPORTED_MODULE_1__["g"],
        isString: _utilities__WEBPACK_IMPORTED_MODULE_1__["p"],
        isNumeric: _utilities__WEBPACK_IMPORTED_MODULE_1__["n"],
        isFunction: _utilities__WEBPACK_IMPORTED_MODULE_1__["k"],
        isObject: _utilities__WEBPACK_IMPORTED_MODULE_1__["o"],
        isBoolean: _utilities__WEBPACK_IMPORTED_MODULE_1__["h"],
        isNull: _utilities__WEBPACK_IMPORTED_MODULE_1__["m"],
        isUndefined: _utilities__WEBPACK_IMPORTED_MODULE_1__["q"],
        inArray: _utilities__WEBPACK_IMPORTED_MODULE_1__["f"],
        getType: _utilities__WEBPACK_IMPORTED_MODULE_1__["e"],
        toBool: _utilities__WEBPACK_IMPORTED_MODULE_1__["t"],
        firstToUpper: _utilities__WEBPACK_IMPORTED_MODULE_1__["a"],
        getTimeStamp: _utilities__WEBPACK_IMPORTED_MODULE_1__["c"],
        getTimeDiff: _utilities__WEBPACK_IMPORTED_MODULE_1__["b"],
        isJson: _utilities__WEBPACK_IMPORTED_MODULE_1__["l"],
        toJson: _utilities__WEBPACK_IMPORTED_MODULE_1__["u"],
        isEmail: _utilities__WEBPACK_IMPORTED_MODULE_1__["j"],
        tokenInterpolate: _utilities__WEBPACK_IMPORTED_MODULE_1__["v"],
        getTokens: _utilities__WEBPACK_IMPORTED_MODULE_1__["d"],
        removeDuplicates: _map_unique__WEBPACK_IMPORTED_MODULE_2__["d"],
        getDuplicates: _map_unique__WEBPACK_IMPORTED_MODULE_2__["c"],
        testUnique: _map_unique__WEBPACK_IMPORTED_MODULE_2__["e"]
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return SheetAccessor;
    });
    var _instance_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9), _map_unique__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2), _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0), _sheets_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5), _data_payload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3), _clone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7), _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
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
        this.fontweight = {}, this.numberformat = {}, this.headerRowIndex = 0, this.headerColumnIndex = 0, 
        this.headerRow = null, this.getColumnIndex = null, this.columnExists = null, this.getAllRecordIndexer = null, 
        this.getSelectedRecordIndexer = null, this.resizeColumns = null, this.getDataPayload = null, 
        this.insertRows = null, this.deleteRows = null, this.getHeaderRow = null, instanceOptions.headerAnchorToken && function() {
            for (var dataRange = _this.sheet.getDataRange(), rowCount = dataRange.getNumRows(), columnCount = dataRange.getNumColumns(), _loop = function _loop(_rowIndex) {
                _this.sheet.getRange(_rowIndex + 1, 1, 1, columnCount).getNotes()[0].forEach(function(note, columnIndex) {
                    -1 !== note.indexOf(instanceOptions.headerAnchorToken) && (_this.headerRowIndex = _rowIndex, 
                    _this.headerColumnIndex = columnIndex, _rowIndex = rowCount);
                }), rowIndex = _rowIndex;
            }, rowIndex = 0; rowIndex < rowCount; rowIndex += 1) _loop(rowIndex);
        }(), this.headerRow = this.sheet.getDataRange().getValues()[this.headerRowIndex];
        var duplicates = Object(_map_unique__WEBPACK_IMPORTED_MODULE_1__["c"])(this.headerRow);
        if (0 < duplicates.length) {
            var msg = null;
            throw duplicates.forEach(function(d) {
                msg += msg ? ", ".concat(d) : d;
            }), new Error('Sheet "'.concat(this.sheet.getName(), '" has duplicate column headers... ').concat(msg));
        }
        this.range = {
            getCell: function(rowIndex, columnIndex) {
                return _this.sheet.getRange(rowIndex + 1, columnIndex + 1);
            },
            getRow: function(rowIndex) {
                return _this.sheet.getRange(rowIndex + 1, 1, 1, _this.sheet.getDataRange().getNumColumns());
            },
            getColumn: function(columnIndex, startRowIndex) {
                var dataRange = _this.sheet.getDataRange(), startRowIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["n"])(startRowIndex) ? startRowIndex : 0;
                return _this.sheet.getRange(startRowIndx + 1, columnIndex + 1, dataRange.getNumRows() - startRowIndx, 1);
            },
            getAll: function(startRowIndex, startColumnIndex) {
                var dataRange = _this.sheet.getDataRange(), startRowIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["n"])(startRowIndex) ? startRowIndex : 0, startColumnIndx = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["n"])(startColumnIndex) ? startColumnIndex : 0;
                return _this.sheet.getRange(startRowIndx + 1, startColumnIndx + 1, dataRange.getNumRows() - startRowIndx, dataRange.getNumColumns() - startColumnIndx);
            },
            getAllRecords: function() {
                return _this.range.getAll(_this.headerRowIndex + 1, 0);
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
            },
            numberformat: {
                get: "getNumberFormats",
                set: "setNumberFormats"
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
        }), this.getColumnIndex = function(columnName) {
            return _this.headerRow.indexOf(columnName);
        }, this.columnExists = function(columnName) {
            return -1 !== _this.getColumnIndex(columnName);
        }, this.getDefaultIdColumn = function() {
            return _this.headerRow[_this.headerColumnIndex];
        }, this.getHeaderRow = function() {
            return Object(_clone__WEBPACK_IMPORTED_MODULE_5__["a"])(_this.headerRow);
        }, this.getAllRecordIndexer = function() {
            for (var indexer = new _map_unique__WEBPACK_IMPORTED_MODULE_1__["a"](), numRows = _this.range.getAll().getNumRows(), i = _this.headerRowIndex + 1; i < numRows; ) indexer.set(i), 
            i += 1;
            return indexer;
        }, this.getSelectedRecordIndexer = function() {
            return Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_3__["b"])().reduce(function(indexer, i) {
                return indexer.set(i), indexer;
            }, new _map_unique__WEBPACK_IMPORTED_MODULE_1__["a"]());
        }, this.resizeColumns = function() {
            _this.headerRow.forEach(function(columnName, index) {
                _this.sheet.autoResizeColumn(index + 1);
            });
        }, this.getDataPayload = function(requestedAttributesSet, rowIndex) {
            if (!(requestedAttributesSet instanceof _data_payload__WEBPACK_IMPORTED_MODULE_4__["a"])) throw new TypeError("getDataPayload expects an AttributesSet instance.");
            return new _data_payload__WEBPACK_IMPORTED_MODULE_4__["b"](requestedAttributesSet.values.reduce(function(dataObject, attribute) {
                return Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["n"])(rowIndex) ? dataObject[attribute] = _this[attribute].getRow(rowIndex) : dataObject[attribute] = _this[attribute].getAll(), 
                dataObject;
            }, {}), _this.headerRowIndex, _this.headerColumnIndex, _this.headerRow);
        }, this.insertRow = function(topOrBottom) {
            var position = topOrBottom === _CONSTANTS__WEBPACK_IMPORTED_MODULE_6__["p"] ? _this.headerRowIndex + 1 : _this.sheet.getDataRange().getNumRows();
            return _this.sheet.insertRowAfter(position), position;
        }, this.deleteRow = function(rowPosition) {
            var position = rowPosition === undefined ? _this.sheet.getDataRange().getNumRows() : rowPosition;
            return _this.sheet.deleteRow(position), position;
        };
    };
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
            input === undefined || null === input ? copy = input : (copy = {}, Object.keys(input).forEach(function(property) {
                copy[property] = clone(input[property]);
            }));
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
    var map_unique = __webpack_require__(2), query_driver = __webpack_require__(11), sheet_accessor = __webpack_require__(6), instance_options = __webpack_require__(9), data_payload = __webpack_require__(3), CONSTANTS = __webpack_require__(1);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var data_controller_DataController = function() {
        function DataController(sheetAccessor, instanceOptions, requestedAttributesSet) {
            if (function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, DataController), !(sheetAccessor instanceof sheet_accessor["a"])) throw new TypeError("DataController requires an instance of SheetAccessor.");
            if (!(instanceOptions instanceof instance_options["a"])) throw new TypeError("DataController requires an instance of InstanceOptions.");
            if (!(requestedAttributesSet instanceof data_payload["a"])) throw new TypeError("DataController requires an instance of AttributesSet.");
            this.readLevel = instanceOptions.readLevel, this.writeLevel = instanceOptions.writeLevel, 
            this.headerAnchorToken = instanceOptions.headerAnchorToken, this.sheetAccessor = sheetAccessor, 
            this.rowIndex = null, this.requestedAttributesSet = requestedAttributesSet, this.changedAttributes = new data_payload["a"](), 
            this.dataPayload = null, this.rowUpdated = !1, this.setRowIndex = null, this.readLevel === CONSTANTS["l"] && this.writeLevel === CONSTANTS["t"] ? this.setRowIndex = this.setRowIndex1 : this.readLevel === CONSTANTS["l"] && this.writeLevel !== CONSTANTS["t"] ? this.setRowIndex = this.setRowIndex2 : this.readLevel !== CONSTANTS["l"] && this.writeLevel === CONSTANTS["t"] ? this.setRowIndex = this.setRowIndex3 : this.setRowIndex = this.setRowIndexBase, 
            this.updateColumnByIndex = null, this.headerAnchorToken && this.writeLevel === CONSTANTS["s"] ? this.updateColumnByIndex = this.updateColumnByIndex1 : this.headerAnchorToken && this.writeLevel !== CONSTANTS["s"] ? this.updateColumnByIndex = this.updateColumnByIndex2 : this.headerAnchorToken || this.writeLevel !== CONSTANTS["s"] ? this.updateColumnByIndex = this.updateColumnByIndex4 : this.updateColumnByIndex = this.updateColumnByIndex3, 
            this.getColumnByIndex = null, this.readLevel === CONSTANTS["l"] ? this.getColumnByIndex = this.getColumnByIndex1 : this.getColumnByIndex = this.getColumnByIndex2, 
            this.readLevel === CONSTANTS["m"] && (this.dataPayload = sheetAccessor.getDataPayload(requestedAttributesSet));
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(DataController, [ {
            key: "getColumnByIndex1",
            value: function(attribute, columnIndex) {
                return this.dataPayload.dataObject[attribute][0][columnIndex];
            }
        }, {
            key: "getColumnByIndex2",
            value: function(attribute, columnIndex) {
                return this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex];
            }
        }, {
            key: "updateColumnByIndex1",
            value: function(attribute, columnIndex, updatedValue) {
                if (attribute === CONSTANTS["a"] && -1 !== updatedValue.indexOf(this.headerAnchorToken)) throw new Error("".concat(updatedValue, " is a reserved value row ").concat(this.rowIndex + 1, ", column ").concat(columnIndex + 1, "."));
                return this.rowUpdated = !0, this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex] = updatedValue, 
                this.sheetAccessor[attribute].setCell(this.rowIndex, columnIndex, [ [ updatedValue ] ]), 
                this;
            }
        }, {
            key: "updateColumnByIndex2",
            value: function(attribute, columnIndex, updatedValue) {
                if (attribute === CONSTANTS["a"] && -1 !== updatedValue.indexOf(this.headerAnchorToken)) throw new Error("".concat(updatedValue, " is a reserved value row ").concat(this.rowIndex + 1, ", column ").concat(columnIndex + 1, "."));
                return this.rowUpdated = !0, this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex] = updatedValue, 
                this.changedAttributes.push(attribute), this;
            }
        }, {
            key: "updateColumnByIndex3",
            value: function(attribute, columnIndex, updatedValue) {
                return this.rowUpdated = !0, this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex] = updatedValue, 
                this.sheetAccessor[attribute].setCell(this.rowIndex, columnIndex, [ [ updatedValue ] ]), 
                this;
            }
        }, {
            key: "updateColumnByIndex4",
            value: function(attribute, columnIndex, updatedValue) {
                return this.rowUpdated = !0, this.dataPayload.dataObject[attribute][this.rowIndex][columnIndex] = updatedValue, 
                this.changedAttributes.push(attribute), this;
            }
        }, {
            key: "setRowIndex1",
            value: function(rowIndex) {
                return this.dataPayload = this.sheetAccessor.getDataPayload(this.requestedAttributesSet, rowIndex), 
                null !== this.rowIndex && this.writeCurrentRow(), this.setRowIndexBase(rowIndex);
            }
        }, {
            key: "setRowIndex2",
            value: function(rowIndex) {
                return this.dataPayload = this.sheetAccessor.getDataPayload(this.requestedAttributesSet, rowIndex), 
                this.setRowIndexBase(rowIndex);
            }
        }, {
            key: "setRowIndex3",
            value: function(rowIndex) {
                return null !== this.rowIndex && this.writeCurrentRow(), this.setRowIndexBase(rowIndex);
            }
        }, {
            key: "setRowIndexBase",
            value: function(rowIndex) {
                return this.rowUpdated = !1, this.rowIndex = rowIndex, this;
            }
        }, {
            key: "getRowIndex",
            value: function() {
                return this.rowIndex;
            }
        }, {
            key: "wasRowUpdated",
            value: function() {
                return this.rowUpdated;
            }
        }, {
            key: "writeCurrentRow",
            value: function() {
                var _this = this;
                return this.changedAttributes.forEach(function(attribute) {
                    _this.sheetAccessor[attribute].setRow(_this.rowIndex, [ _this.dataPayload.dataObject[attribute][_this.rowIndex] ]);
                }), this.changedAttributes.flush(), this;
            }
        }, {
            key: "capWrite",
            value: function() {
                var _this2 = this;
                this.rowUpdated = !1, this.writeLevel === CONSTANTS["u"] && (this.changedAttributes.forEach(function(attribute) {
                    _this2.dataPayload.dataObject[attribute].splice(0, _this2.sheetAccessor.headerRowIndex + 1), 
                    _this2.sheetAccessor[attribute].setAllRecords(_this2.dataPayload.dataObject[attribute]);
                }), this.changedAttributes.flush()), this.writeLevel === CONSTANTS["t"] && this.writeCurrentRow();
            }
        }, {
            key: "getDataIndex",
            value: function(columnName, attribute) {
                return this.dataPayload.getDataIndex(columnName, attribute);
            }
        } ]), DataController;
    }(), main_cursor = __webpack_require__(12), utilities = __webpack_require__(0);
    function _extends() {
        return (_extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }).apply(this, arguments);
    }
    function writeToRecordProxy(recordProxy, updateObject) {
        return Object.keys(recordProxy).forEach(function(columnName) {
            Object.prototype.hasOwnProperty.call(updateObject, columnName) && _extends(recordProxy[columnName], updateObject[columnName]);
        }), recordProxy;
    }
    var clone = __webpack_require__(7);
    function processQuery(core, queryDriver) {
        if (!(queryDriver instanceof query_driver["a"])) throw new Error("queryProcessor requires a QueryDriver instance.");
        if (!(core.sheetAccessor instanceof sheet_accessor["a"])) throw new Error("queryProcessor requires a SheetAccessor instance.");
        if (!(core.mainCursor instanceof main_cursor["a"])) throw new Error("queryProcessor requires a MainCursor instance.");
        if (!Object(utilities["f"])(queryDriver.type, CONSTANTS["o"])) throw new Error('queryDriver had invalid type "'.concat(queryDriver.type, '"'));
        var dataController = new data_controller_DataController(core.sheetAccessor, core.instanceOptions, queryDriver.requestedAttributesSet), recordProxy = function getRecordProxy(core, dataController, requestedAttributesSet) {
            if (!(core.sheetAccessor instanceof sheet_accessor["a"])) throw new Error("getRecordProxy requires a SheetAccessor instance.");
            if (!(core.instanceOptions instanceof instance_options["a"])) throw new Error("getRecordProxy requires an InstanceOptions instance.");
            if (!(dataController instanceof data_controller_DataController)) throw new Error("getRecordProxy requires a DataController instance.");
            if (!(requestedAttributesSet instanceof data_payload["a"])) throw new Error("getRecordProxy requires an UniqueSet instance for input parameter requestedAttributesSet.");
            var columnIsValid, _core$instanceOptions = core.instanceOptions, columnFilter = _core$instanceOptions.columnFilter, applyColumnFilter = _core$instanceOptions.applyColumnFilter;
            columnIsValid = applyColumnFilter ? function(column) {
                return null !== column && column !== undefined && !!Object(utilities["f"])(column, columnFilter);
            } : function(column) {
                return null !== column && column !== undefined;
            };
            var recordProxy = {};
            Object.defineProperty(recordProxy, CONSTANTS["f"], {
                enumerable: !0,
                get: function() {
                    return dataController.getRowIndex();
                }
            }), core.sheetAccessor.headerRow.forEach(function(column, columnIndex) {
                if (columnIsValid(column)) {
                    var columnProxy = {};
                    requestedAttributesSet.forEach(function(attribute) {
                        Object.defineProperty(columnProxy, attribute, {
                            enumerable: !0,
                            get: function() {
                                return dataController.getColumnByIndex(attribute, columnIndex);
                            },
                            set: function(input) {
                                return dataController.updateColumnByIndex(attribute, columnIndex, input);
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
        }(core, dataController, queryDriver.requestedAttributesSet), query = queryDriver.query.bind(recordProxy);
        if (Object(utilities["f"])(queryDriver.type, [ CONSTANTS["i"], CONSTANTS["h"], CONSTANTS["j"] ])) {
            var evaluator = queryDriver.withSelect ? queryDriver.returnWithRecords ? function e(index) {
                dataController.setRowIndex(index), query(recordProxy, index) && (queryDriver.pushResult(index, Object(clone["a"])(recordProxy)), 
                dataController.wasRowUpdated() && queryDriver.updatedRecordIndices.push(index));
            } : function e(index) {
                dataController.setRowIndex(index), query(recordProxy, index) && (queryDriver.pushResult(index), 
                dataController.wasRowUpdated() && queryDriver.updatedRecordIndices.push(index));
            } : function e(index) {
                dataController.setRowIndex(index), query(recordProxy, index), dataController.wasRowUpdated() && queryDriver.updatedRecordIndices.push(index);
            };
            core.mainCursor.indices.forEach(function(index) {
                evaluator(index);
            });
        }
        if (Object(utilities["f"])(queryDriver.type, [ CONSTANTS["k"] ])) {
            var matchCol, matchAttr, dataIndex;
            if (queryDriver.usesIndexProp) Logger.log(JSON.stringify(queryDriver.recordObjectsToWrite)), 
            matchCol = CONSTANTS["f"], matchAttr = null, dataIndex = dataController.getDataIndex(); else if (matchCol = queryDriver.matchColumnName, 
            matchAttr = queryDriver.matchAttributeName, !(dataIndex = dataController.getDataIndex(matchCol, matchAttr)).isUnique) throw new Error("update failed because ".concat(matchCol, ".").concat(matchAttr, " is not a unique index."));
            queryDriver.recordObjectsToWrite.forEach(function(record, index) {
                var localIndex;
                if (Object.prototype.hasOwnProperty.call(record, matchCol)) {
                    if (matchAttr) {
                        if (!Object.prototype.hasOwnProperty.call(record[matchCol], matchAttr)) return void queryDriver.pushError("input at index ".concat(index, ' missing "').concat(matchAttr, '" attribute.'));
                        localIndex = dataIndex.get(record[matchCol][matchAttr]);
                    } else localIndex = dataIndex.get(record[matchCol]);
                    localIndex ? (dataController.setRowIndex(localIndex), queryDriver.returnWithRecords ? queryDriver.pushResult(localIndex, Object(clone["a"])(writeToRecordProxy(recordProxy, record))) : (writeToRecordProxy(recordProxy, record), 
                    queryDriver.pushResult(localIndex))) : queryDriver.pushWarning("input at index ".concat(index, " had no match."));
                } else queryDriver.pushError("input at index ".concat(index, ' missing "').concat(matchCol, '" column.'));
            });
        }
        return dataController.capWrite(), core.instanceOptions.autoResizeColumns && core.sheetAccessor.resizeColumns(), 
        queryDriver.done();
    }
    function runQuery(core, query, withSelect, returnWithRecords, attributesSet) {
        return processQuery(core, new query_driver["a"](CONSTANTS["h"]).setQuery(query).addAttributes(attributesSet).setReturnWithRecords(returnWithRecords).setWithSelect(withSelect));
    }
    function runObjUpdate(core, records, matchColumnName, matchAttributeName) {
        var matchColName = matchColumnName || core.instanceOptions.idColumnName;
        if (-1 === core.sheetAccessor.getColumnIndex(matchColName)) throw new Error("update failed: ".concat(matchColumnName, " is an invalid column name."));
        var matchAttrName = matchAttributeName || core.instanceOptions.idAttributeName;
        if (!Object(utilities["f"])(matchAttrName, CONSTANTS["n"])) throw new Error("update failed: ".concat(matchAttrName, " is an invalid attribute name."));
        return processQuery(core, new query_driver["a"](CONSTANTS["k"]).setReturnWithRecords(!0).setMatchColumnName(matchColName).setMatchAttributeName(matchAttrName).setRecordObjectsToWrite(records));
    }
    function getUnique(core, columnName, attribute) {
        if (!core.sheetAccessor.columnExists(columnName)) throw new Error("unique method failed: invalid columnName ".concat(columnName));
        if (attribute && !Object(utilities["f"])(attribute, CONSTANTS["n"])) throw new Error("unique method failed: invalid attribute: ".concat(attribute));
        var attr = attribute || CONSTANTS["c"], aggregator = new map_unique["b"](), query = function query(r) {
            aggregator.push(r[columnName][attr]);
        };
        return processQuery(core, new query_driver["a"](CONSTANTS["i"], 'column:"'.concat(columnName, '",attribute:"').concat(attr, '"')).setQuery(query).addAttribute(attr)), 
        aggregator.values;
    }
    function getExportObject(core, rawDataOnly) {
        return {
            selected: !0 === rawDataOnly ? core.mainCursor.keys() : core.mainCursor.isDirty || !core.mainCursor.attributesSet.hasSame(core.instanceOptions.exportAttributes) ? runQuery(core, function() {
                return !0;
            }, !0, !0, core.instanceOptions.exportAttributes).resultSet.values() : Object(clone["a"])(core.mainCursor.values()),
            rawData: !!rawDataOnly && core.sheetAccessor.getDataPayload(core.instanceOptions.exportAttributes)
        };
    }
    function insertRow(core, topOrBottom, dataObject) {
        if (dataObject && !Object(utilities["o"])(dataObject)) throw new TypeError("insertRow only accepts objects. Type ".concat(Object(utilities["e"])(dataObject), " invalid"));
        var position = core.sheetAccessor.insertRow(topOrBottom);
        return core.mainCursor.flush(), dataObject && (dataObject[CONSTANTS["f"]] = position, 
        runObjUpdate(core, [ dataObject ])), position;
    }
    function deleteRow(core, rowPosition) {
        if (rowPosition - 1 <= core.sheetAccessor.headerRowIndex) throw new Error("unable to delete the header row.");
        return core.sheetAccessor.deleteRow(rowPosition);
    }
    __webpack_require__.d(__webpack_exports__, "f", function() {
        return runQuery;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return runObjUpdate;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return getUnique;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return getExportObject;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return insertRow;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return deleteRow;
    });
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    (function(global) {
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return InstanceOptions;
        });
        var _data_payload__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3), _simulation_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10), _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1), _utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0), _sheets_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5), _clone__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["g"] && (global.SpreadsheetApp = _simulation_utils__WEBPACK_IMPORTED_MODULE_1__["b"]);
        var InstanceOptions = function() {
            function InstanceOptions(sheetNameOrOptions, headerAnchorToken) {
                !function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }(this, InstanceOptions), this.pvt_spreadsheetId = null, this.pvt_sheetName = null, 
                this.pvt_headerAnchorToken = null, this.pvt_exportAttributes = new _data_payload__WEBPACK_IMPORTED_MODULE_0__["a"](), 
                this.pvt_readLevel = _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["d"], this.pvt_writeLevel = _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["e"], 
                this.pvt_autoResizeColumns = !1, this.pvt_computedProperties = {}, this.pvt_idColumnName = null, 
                this.pvt_idAttributeName = _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["c"], this.pvt_columnFilter = [], 
                this.pvt_applyColumnFilter = !1, this.pvt_spreadsheet = null, this.pvt_sheet = null, 
                this.headerAnchorToken = headerAnchorToken, this.processInput(sheetNameOrOptions);
            }
            return function _createClass(Constructor, protoProps, staticProps) {
                return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
                Constructor;
            }(InstanceOptions, [ {
                key: "exportWithAllAttributes",
                value: function() {
                    return this.pvt_exportAttributes.withAll();
                }
            }, {
                key: "processInput",
                value: function(sheetNameOrOptions) {
                    var _this = this;
                    this.pvt_exportAttributes.push(_CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["c"]);
                    var errMsg = "requires a string sheetName or an options object which at least define a valid sheetName";
                    if (sheetNameOrOptions === undefined || null === sheetNameOrOptions) throw new Error(errMsg);
                    if (Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(sheetNameOrOptions)) this.spreadsheetId = "TPACTIVE", 
                    this.sheetName = sheetNameOrOptions; else {
                        if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["o"])(sheetNameOrOptions)) throw new Error(errMsg);
                        sheetNameOrOptions.spreadsheetId ? this.spreadsheetId = sheetNameOrOptions.spreadsheetId : this.spreadsheetId = "TPACTIVE", 
                        Object.keys(sheetNameOrOptions).forEach(function(key) {
                            -1 === key.indexOf("pvt_") && -1 === key.indexOf("spreadsheetId") && (_this[key] = sheetNameOrOptions[key]);
                        }), this.sheet || (this.sheetName = this.pvt_spreadsheet.getActiveSheet().getName());
                    }
                    return this;
                }
            }, {
                key: "getSettingsExport",
                value: function() {
                    var retObj = {};
                    return retObj.spreadsheetId = this.spreadsheetId, retObj.sheetName = this.sheetName, 
                    retObj.headerAnchorToken = this.headerAnchorToken, retObj.exportAttributes = this.exportAttributes.values, 
                    retObj.writeLevel = this.writeLevel, retObj.autoResizeColumns = this.autoResizeColumns, 
                    retObj.computedProperties = this.computedProperties, retObj.idColumnName = this.idColumnName, 
                    retObj.idAttributeName = this.idAttributeName, this.applyColumnFilter && (retObj.columnFilter = Object(_clone__WEBPACK_IMPORTED_MODULE_5__["a"])(this.columnFilter)), 
                    retObj;
                }
            }, {
                key: "headerAnchorToken",
                set: function(input) {
                    if (null !== this.pvt_headerAnchorToken) throw new Error("headerAnchorToken can only be once.");
                    if (input && !Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(input)) throw new TypeError("headerAnchorToken must be a string.");
                    return this.pvt_headerAnchorToken = input || null, this.pvt_headerAnchorToken;
                },
                get: function() {
                    return this.pvt_headerAnchorToken;
                }
            }, {
                key: "spreadsheetId",
                get: function() {
                    return this.pvt_spreadsheetId;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(input) && !Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["n"])(input)) throw new TypeError("invalid spreadsheetId.");
                    if (this.pvt_spreadsheet) throw new Error("spreadsheetId was already set to ".concat(this.pvt_spreadsheetId, " and cannot be changed."));
                    this.pvt_spreadsheet = "TPACTIVE" === input ? _simulation_utils__WEBPACK_IMPORTED_MODULE_1__["b"].getActiveSpreadsheet().getId() : _simulation_utils__WEBPACK_IMPORTED_MODULE_1__["b"].openById(input), 
                    this.pvt_spreadsheetId = input;
                }
            }, {
                key: "sheetName",
                get: function() {
                    return this.pvt_sheetName;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(input)) throw new TypeError("sheetName must be a string.");
                    if (this.pvt_sheet) throw new Error("sheetName was already set to ".concat(this.pvt_sheetName, " and cannot be changed."));
                    try {
                        Browser.msgBox(JSON.stringify(Object.keys(this.pvt_sheet))), this.pvt_sheet = this.pvt_spreadsheet.getSheetByName(input);
                    } catch (e) {
                        throw new Error("set sheetName exception: ".concat(e, "."));
                    }
                    return this.pvt_sheetName = input, this.pvt_sheetName;
                }
            }, {
                key: "columnFilter",
                get: function() {
                    return this.pvt_columnFilter;
                },
                set: function(input) {
                    var _this2 = this;
                    return Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["g"])(input) ? Object(_clone__WEBPACK_IMPORTED_MODULE_5__["a"])(input).filter(function(i) {
                        return Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_4__["c"])(i);
                    }).map(function(i) {
                        return Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(i) ? i.trim() : i;
                    }).forEach(function(i) {
                        _this2.pvt_columnFilter.push(i);
                    }) : Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_4__["c"])(input) && (this.pvt_columnFilter = [ Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(input) ? input.trim() : input ]), 
                    this.pvt_applyColumnFilter = 0 < this.pvt_columnFilter.length, this.pvt_columnFilter;
                }
            }, {
                key: "applyColumnFilter",
                get: function() {
                    return this.pvt_applyColumnFilter;
                }
            }, {
                key: "exportAttributes",
                get: function() {
                    return this.pvt_exportAttributes;
                },
                set: function(input) {
                    var _this3 = this, attributes = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["g"])(input) ? input : [ input ];
                    return this.pvt_exportAttributes.flush(), attributes.forEach(function(attribute) {
                        attribute !== undefined && _this3.pvt_exportAttributes.push(attribute);
                    }), this.pvt_exportAttributes;
                }
            }, {
                key: "readLevel",
                get: function() {
                    return this.pvt_readLevel;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["f"])(input, _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["q"])) throw new Error("readLevel must be one of ".concat(_CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["q"].toString(), " received ").concat(input));
                    return this.pvt_readLevel = input, this.pvt_readLevel;
                }
            }, {
                key: "writeLevel",
                get: function() {
                    return this.pvt_readLevel === _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["l"] && this.pvt_writeLevel === _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["u"] && (Object(_sheets_utilities__WEBPACK_IMPORTED_MODULE_4__["d"])("Note: write level changed to row from table because read level is row."), 
                    this.pvt_writeLevel = _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["t"]), this.pvt_writeLevel;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["f"])(input, _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["r"])) throw new Error("writeLevel must be one of ".concat(_CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["r"].toString(), " received ").concat(input));
                    return this.pvt_writeLevel = input, this.pvt_writeLevel;
                }
            }, {
                key: "autoResizeColumns",
                get: function() {
                    return this.pvt_autoResizeColumns;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["h"])(input)) throw new TypeError("autoResizeColumns must be a boolean.");
                    return this.pvt_autoResizeColumns = input, this.pvt_autoResizeColumns;
                }
            }, {
                key: "computedProperties",
                get: function() {
                    return this.pvt_computedProperties;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["o"])(input)) throw new TypeError("computedProperties must be an object.");
                    return Object.keys(input).forEach(function(key) {
                        if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["k"])(input[key])) throw new Error("non-function provided for computedProperty value.");
                    }), this.pvt_computedProperties = input, this.pvt_computedProperties;
                }
            }, {
                key: "idColumnName",
                get: function() {
                    return this.pvt_idColumnName;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(input) && !Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["n"])(input) && !Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["i"])(input)) throw new TypeError("idColumnName value must be string, number, date.");
                    return this.pvt_idColumnName = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(input) ? input.trim() : input, 
                    this;
                }
            }, {
                key: "idAttributeName",
                get: function() {
                    return this.pvt_idAttributeName;
                },
                set: function(input) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["p"])(input)) throw new TypeError("idAttributeName must be a string.");
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["f"])(input, _CONSTANTS__WEBPACK_IMPORTED_MODULE_2__["n"])) throw new Error("".concat(input, " is not a valid idAttributeName."));
                    return this.pvt_idAttributeName = input, this;
                }
            }, {
                key: "sheet",
                get: function() {
                    return this.pvt_sheet;
                }
            }, {
                key: "spreadsheet",
                get: function() {
                    return this.pvt_spreadsheet;
                }
            } ]), InstanceOptions;
        }();
    }).call(this, __webpack_require__(13));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return expSpreadsheetApp;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return expLogger;
    });
    var _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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
    }, values = [ [ "C1", "C2", "C3", "C4", "C5" ], [ "2-1 Value", "2-2 Value", "2-3 Value", "2-4 Value", "2-5 Value" ], [ "3-1 Value", "3-2 Value", "3-3 Value", "3-4 Value", "3-5 Value" ], [ "4-1 Value", "4-2 Value", "4-3 Value", "4-4 Value", "4-5 Value" ], [ "5-1 Value", "5-2 Value", "5-3 Value", "5-4 Value", "5-5 Value" ], [ "6-1 Value", "6-2 Value", "6-3 Value", "6-4 Value", "6-5 Value" ] ], backgrounds = [ [ "#E5E5E5", "#E5E5E5", "#E5E5E5", "#E5E5E5", "#E5E5E5" ], [ defaults.backgrounds = "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ], [ "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ] ], fontcolors = [ [ defaults.fontcolors = "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ], [ "#000000", "#000000", "#000000", "#000000", "#000000" ] ], notes = [ [ defaults.notes = "", "", "", "", "" ], [ "HEADER_ANCHOR", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ], [ "", "", "", "", "" ] ], fontweights = [ [ "bold", "bold", "bold", "bold", "bold" ], [ defaults.fontweights = "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ] ], fontstyles = [ [ defaults.fontstyles = "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ], [ "normal", "normal", "normal", "normal", "normal" ] ], fontsizes = [ [ 12, 12, 12, 12, 12 ], [ defaults.fontsizes = 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ], [ 10, 10, 10, 10, 10 ] ], fontfamilies = [ [ defaults.fontfamilies = "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ], [ "Arial", "Arial", "Arial", "Arial", "Arial" ] ], isInteger = function isInteger(input) {
        return input === parseInt(input, 10);
    }, DataContainer = function() {
        function DataContainer(fakeData) {
            _classCallCheck(this, DataContainer), this.values = fakeData ? fakeData.value : values, 
            this.backgrounds = fakeData ? fakeData.background : backgrounds, this.fontcolors = fakeData ? fakeData.fontcolor : fontcolors, 
            this.notes = fakeData ? fakeData.note : notes, this.fontweights = fakeData ? fakeData.fontweight : fontweights, 
            this.fontstyles = fakeData ? fakeData.fontstyle : fontstyles, this.fontsizes = fakeData ? fakeData.fontsize : fontsizes, 
            this.fontfamilies = fakeData ? fakeData.fontfamily : fontfamilies, console.log(this);
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
        function Sheet(name, fakeData) {
            _classCallCheck(this, Sheet), this.name = name, this.dataContainer = new DataContainer(fakeData), 
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
            key: "insertRowAfter",
            value: function(rowPosition) {
                return this.dataContainer.insertRows(rowPosition, 1), this.writeHtml(), this;
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
        function ActiveSpreadsheet(div, fakeData) {
            _classCallCheck(this, ActiveSpreadsheet), this.div = div, this.id = 123, this.sheets = {
                Test: new Sheet("Test", fakeData)
            };
        }
        return _createClass(ActiveSpreadsheet, [ {
            key: "getId",
            value: function() {
                return this.id;
            }
        }, {
            key: "getActiveSheet",
            value: function() {
                return this.sheets.Test;
            }
        }, {
            key: "getSheetByName",
            value: function(name) {
                if (-1 === Object.keys(this.sheets).indexOf(name)) throw new Error('sheet named "'.concat(name, '" does not exist.'));
                var sheet = this.sheets[name];
                return "[object HTMLDivElement]" === toString.call(this.div) && sheet.setDiv(this.div), 
                sheet;
            }
        } ]), ActiveSpreadsheet;
    }(), SpreadsheetAppFake = {
        div: null,
        data: null,
        setFakeData: function(data) {
            SpreadsheetAppFake.data = data;
        },
        getActiveSpreadsheet: function() {
            return new ActiveSpreadsheet(SpreadsheetAppFake.div, SpreadsheetAppFake.data);
        },
        openById: function(id) {
            if (123 !== id) throw new Error("can't find spreadsheet with id ".concat(id));
            return new ActiveSpreadsheet(SpreadsheetAppFake.div, SpreadsheetAppFake.data);
        }
    }, expSpreadsheetApp = _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] ? SpreadsheetAppFake : SpreadsheetApp, BrowserFake = (function noop() {
        return null;
    }, {
        msgBox: function(note) {
            console.log(note);
        }
    }), LoggerFake = (_CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] || Browser, {
        log: function(note) {
            console.log(note);
        }
    }), expLogger = _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["g"] ? LoggerFake : Logger;
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return QueryDriver;
    });
    var _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1), _map_unique__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2), _data_payload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3), _timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4), _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    var QueryDriver = function() {
        function QueryDriver(type, noteForLogging) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }(this, QueryDriver), this.type = type.toUpperCase(), this.query = function() {
                return !0;
            }, this.returnWithRecords = !1, this.withSelect = !1, this.requestedAttributesSet = new _data_payload__WEBPACK_IMPORTED_MODULE_2__["a"](), 
            this.matchColumnName = null, this.matchAttributeName = null, this.recordObjectsToWrite = null, 
            this.usesIndexProp = !1, this.otherResults = new _map_unique__WEBPACK_IMPORTED_MODULE_1__["a"](), 
            this.noteForLogging = noteForLogging, this.timer = new _timer__WEBPACK_IMPORTED_MODULE_3__["a"]("".concat(this.getTimerText())), 
            this.resultSet = new _map_unique__WEBPACK_IMPORTED_MODULE_1__["a"](), this.errors = new _map_unique__WEBPACK_IMPORTED_MODULE_1__["a"](), 
            this.warnings = new _map_unique__WEBPACK_IMPORTED_MODULE_1__["a"](), this.updatedRecordIndices = [];
        }
        return function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }(QueryDriver, [ {
            key: "getTimerText",
            value: function() {
                var text = this.type;
                return text += this.noteForLogging ? " (".concat(this.noteForLogging, ")") : "";
            }
        }, {
            key: "setQuery",
            value: function(query) {
                var _this = this;
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_4__["k"])(query)) throw new TypeError("query must be a function.");
                var queryAsString = (this.query = query).toString();
                return _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["n"].forEach(function(attribute) {
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
            key: "setWithSelect",
            value: function(bool) {
                return this.withSelect = !0 === bool, this;
            }
        }, {
            key: "setRecordObjectsToWrite",
            value: function(arrayOfRecords) {
                var _this2 = this;
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_4__["g"])(arrayOfRecords)) throw new TypeError("expecting an array of record objects.");
                Object.prototype.hasOwnProperty.call(arrayOfRecords[0], _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["f"]) && (this.usesIndexProp = !0), 
                arrayOfRecords.forEach(function(record, index) {
                    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_4__["o"])(record)) throw new TypeError("record object array contained ".concat(toString.call(record), " at index ").concat(index, "."));
                });
                var json = JSON.stringify(arrayOfRecords);
                return _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["n"].forEach(function(attribute) {
                    new RegExp('"'.concat(attribute, '":'), "g").test(json) && _this2.requestedAttributesSet.push(attribute);
                }), this.recordObjectsToWrite = arrayOfRecords, this;
            }
        }, {
            key: "getRecordObjectsToWrite",
            value: function() {
                return this.recordObjectsToWrite;
            }
        }, {
            key: "addAttributes",
            value: function(attributesSet) {
                if (attributesSet) {
                    if (!(attributesSet instanceof _data_payload__WEBPACK_IMPORTED_MODULE_2__["a"])) throw new TypeError("setRequestedAttributes accepts AttributeSet instances.");
                    this.requestedAttributesSet.copyValues(attributesSet);
                }
                return this;
            }
        }, {
            key: "addAttribute",
            value: function(attribute) {
                if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_4__["f"])(attribute, _CONSTANTS__WEBPACK_IMPORTED_MODULE_0__["n"])) throw new TypeError("invalid attribute ".concat(attribute));
                return this.requestedAttributesSet.push(attribute), this;
            }
        }, {
            key: "setMatchColumnName",
            value: function(columnName) {
                return this.matchColumnName = columnName.trim(), this;
            }
        }, {
            key: "setMatchAttributeName",
            value: function(attribute) {
                return this.matchAttributeName = attribute.trim(), this;
            }
        }, {
            key: "pushResult",
            value: function(index, record) {
                return this.resultSet.set(index, record), this;
            }
        }, {
            key: "pushWarning",
            value: function(index, content) {
                return this.warnings.set(index, content), this;
            }
        }, {
            key: "pushError",
            value: function(index, content) {
                return this.errors.set(index, content), this;
            }
        }, {
            key: "done",
            value: function() {
                return this.timer.stop(this.query.toString()), this;
            }
        }, {
            key: "resultCount",
            get: function() {
                return this.resultSet.length;
            }
        }, {
            key: "updatedCount",
            get: function() {
                return this.updatedRecordIndices.length;
            }
        }, {
            key: "updatedIndices",
            get: function() {
                return this.updatedRecordIndices.map(function(i) {
                    return i;
                });
            }
        } ]), QueryDriver;
    }();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return MainCursor;
    });
    var _map_unique__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2), _sheet_accessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6), _data_payload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3), _query_driver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
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
            return _this.sheetAccessor = sheetAccessor, _this.attributesSet = new _data_payload__WEBPACK_IMPORTED_MODULE_2__["a"](), 
            _this.dirty = !0, _this.flush(), _this;
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
            key: "flush",
            value: function() {
                return this.attributesSet.flush(), this.dirty = !0, this.clear().copyItems(this.sheetAccessor.getAllRecordIndexer());
            }
        }, {
            key: "setToSelected",
            value: function() {
                return this.attributesSet.flush(), this.dirty = !0, this.clear().copyItems(this.sheetAccessor.getSelectedRecordIndexer());
            }
        }, {
            key: "consumeReturn",
            value: function(queryReturn) {
                if (!(queryReturn instanceof _query_driver__WEBPACK_IMPORTED_MODULE_3__["a"])) throw new TypeError("consumeSelections accepts QueryDriver input.");
                return this.dirty = !queryReturn.returnWithRecords, this.attributesSet.copyValues(queryReturn.requestedAttributesSet), 
                this.clear().copyItems(queryReturn.resultSet), this;
            }
        }, {
            key: "indices",
            get: function() {
                return this.keys();
            }
        }, {
            key: "isDirty",
            get: function() {
                return this.dirty;
            }
        } ]), MainCursor;
    }();
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
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _simulation_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10), _instance_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9), _sheet_accessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6), _main_cursor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12), _map_unique__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2), _operations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8), _utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0), _timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4), _sheets_utilities__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5), _CONSTANTS__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1);
        _CONSTANTS__WEBPACK_IMPORTED_MODULE_9__["g"] && (global.SpreadsheetApp = _simulation_utils__WEBPACK_IMPORTED_MODULE_0__["b"]);
        var TableProxy = function TableProxy() {
            return Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["r"])({
                mount: function mount(sheetNameOrOptions, headerAnchorToken) {
                    try {
                        var instanceOptions = new _instance_options__WEBPACK_IMPORTED_MODULE_1__["a"](sheetNameOrOptions, headerAnchorToken), sheetAccessor = new _sheet_accessor__WEBPACK_IMPORTED_MODULE_2__["a"](instanceOptions), mainCursor = new _main_cursor__WEBPACK_IMPORTED_MODULE_3__["a"](sheetAccessor), lastResults = new _map_unique__WEBPACK_IMPORTED_MODULE_4__["a"](), core = {
                            instanceOptions: instanceOptions,
                            sheetAccessor: sheetAccessor,
                            mainCursor: mainCursor
                        };
                        instanceOptions.uniqueIdColumnName || (instanceOptions.idColumnName = sheetAccessor.getDefaultIdColumn());
                        var api = {};
                        return Object.defineProperty(api, "select", {
                            enumerable: !0,
                            value: function(query, withRecords) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API select"), queryReturn = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["f"])(core, query, !0, withRecords);
                                return mainCursor.consumeReturn(queryReturn), lastResults.clear().set("operation", "select").set("completed", !0).set("selected count", queryReturn.resultCount).set("updated row count", queryReturn.updatedCount).set("updated row indices", queryReturn.updatedIndices).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "update", {
                            enumerable: !0,
                            value: function(query, withRecords) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API update"), queryReturn = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["f"])(core, query, !1, withRecords);
                                return lastResults.clear().set("operation", "update").set("completed", !0).set("updated row count", queryReturn.updatedCount).set("updated row indices", queryReturn.updatedIndices).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "writeRecords", {
                            enumerable: !0,
                            value: function(records, matchColumnName, matchAttributeName) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API writeRecords"), queryReturn = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["e"])(core, records, matchColumnName, matchAttributeName);
                                return lastResults.clear().set("operation", "writeRecords").set("completed", !0).set("updated", queryReturn.resultSet.entries()).set("warnings", queryReturn.warnings.entries()).set("errors", queryReturn.errors.entries()).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "writeCursor", {
                            enumerable: !0,
                            value: function() {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API writeCursor"), queryReturn = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["e"])(core, api.records());
                                return lastResults.clear().set("operation", "writeCursor").set("completed", !0).set("updated", queryReturn.resultSet.entries()).set("warnings", queryReturn.warnings.entries()).set("errors", queryReturn.errors.entries()).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "records", {
                            enumerable: !0,
                            value: function() {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API records");
                                if (mainCursor.isDirty) {
                                    var queryReturn = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["f"])(core, function() {
                                        return !0;
                                    }, !0, !0, mainCursor.attributesSet);
                                    mainCursor.consumeReturn(queryReturn);
                                }
                                return lastResults.clear().set("operation", "records").set("completed", !0).set("count", mainCursor.length).set("duration", timer.stop()), 
                                mainCursor.values();
                            }
                        }), Object.defineProperty(api, "unique", {
                            enumerable: !0,
                            value: function(columnName, attribute) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API unique"), uniqueValues = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["c"])(core, columnName, attribute);
                                return lastResults.clear().set("operation", "unique").set("completed", !0).set("count", uniqueValues.length).set("duration", timer.stop()), 
                                uniqueValues;
                            }
                        }), Object.defineProperty(api, "flush", {
                            enumerable: !0,
                            value: function() {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API flush");
                                return mainCursor.flush(), lastResults.clear().set("operation", "flush").set("completed", !0).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "insertRow", {
                            enumerable: !0,
                            value: function(topOrBottom, dataObject) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API insertRow"), position = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["d"])(core, topOrBottom, dataObject);
                                return lastResults.clear().set("operation", "insertRow").set("@ position", position).set("completed", !0).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "deleteRow", {
                            enumerable: !0,
                            value: function(rowPosition) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API insertRow"), position = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["a"])(core, rowPosition);
                                return mainCursor.flush(), lastResults.clear().set("operation", "deleteRow").set("@ position", position).set("completed", !0).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "getExportObject", {
                            enumerable: !0,
                            value: function(rawDataOnly) {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API getExportObject"), exportObject = Object(_operations__WEBPACK_IMPORTED_MODULE_5__["b"])(core, rawDataOnly);
                                return lastResults.clear().set("operation", "getExportObject").set("completed", !0).set("duration", timer.stop()), 
                                exportObject;
                            }
                        }), Object.defineProperty(api, "loadSelectedRows", {
                            enumerable: !0,
                            value: function() {
                                var timer = new _timer__WEBPACK_IMPORTED_MODULE_7__["a"]("API loadSelectedRows");
                                return mainCursor.setToSelected(), lastResults.clear().set("operation", "loadSelectedRows").set("count", mainCursor.length).set("res", mainCursor.entries()).set("completed", !0).set("duration", timer.stop()), 
                                api;
                            }
                        }), Object.defineProperty(api, "getHeaderRow", {
                            enumerable: !0,
                            value: function() {
                                return sheetAccessor.getHeaderRow();
                            }
                        }), Object.defineProperty(api, "getOptions", {
                            enumerable: !0,
                            value: function() {
                                return instanceOptions.getSettingsExport();
                            }
                        }), Object.defineProperty(api, "getLastResults", {
                            enumerable: !0,
                            value: function() {
                                return lastResults.entries();
                            }
                        }), Object.defineProperties(api, {
                            setSheetName: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.sheetName = input, api;
                                }
                            },
                            setColumnFilter: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.columnFilter = input, api;
                                }
                            },
                            setExportAttributes: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.exportAttributes = input, api;
                                }
                            },
                            exportWithAllAttributes: {
                                enumerable: !0,
                                value: function() {
                                    return instanceOptions.exportWithAllAttributes(), api;
                                }
                            },
                            setReadLevel: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.readLevel = input, api;
                                }
                            },
                            setWriteLevel: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.writeLevel = input, api;
                                }
                            },
                            setAutoResizeColumns: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.autoResizeColumns = input, api;
                                }
                            },
                            setComputedProperties: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.computedProperties = input, api;
                                }
                            },
                            setIdColumnName: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.idColumnName = input, api;
                                }
                            },
                            setIdAttributeName: {
                                enumerable: !0,
                                value: function(input) {
                                    return instanceOptions.idAttributeName = input, api;
                                }
                            }
                        }), api;
                    } catch (e) {
                        throw new Error("TableProxy.mount failed: ".concat(e));
                    }
                },
                Map: _map_unique__WEBPACK_IMPORTED_MODULE_4__["a"],
                UniqueSet: _map_unique__WEBPACK_IMPORTED_MODULE_4__["b"],
                Timer: _timer__WEBPACK_IMPORTED_MODULE_7__["a"],
                strContains: _utilities__WEBPACK_IMPORTED_MODULE_6__["s"]
            }, _CONSTANTS__WEBPACK_IMPORTED_MODULE_9__["b"]);
        }, $initTableProxy = function $initTableProxy(asName) {
            asName && !global[asName] ? global[asName] = TableProxy() : global.TableProxy || (global.TableProxy = TableProxy());
        };
        global.$initTableProxy = $initTableProxy;
        var $initUtils = function $initUtils(asName) {
            asName ? global[asName] = _sheets_utilities__WEBPACK_IMPORTED_MODULE_8__["a"] : global.TableProxy = _sheets_utilities__WEBPACK_IMPORTED_MODULE_8__["a"];
        };
        global.$initUtils = $initUtils;
    }.call(this, __webpack_require__(13));
} ]));