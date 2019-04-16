function doGet() {
}
function sendmail() {
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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 1);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", function() {
        return doGet;
    });
    var doGet = function doGet() {
        return HtmlService.createHtmlOutputFromFile("index.html").setTitle("Google Apps Script").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _server_webapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        __webpack_require__(11);
        global.doGet = _server_webapp__WEBPACK_IMPORTED_MODULE_0__["a"], global.sendmail = function() {
            var email = 0 < arguments.length && arguments[0] !== undefined ? arguments[0] : "amit@labnol.org";
            GmailApp.sendEmail(email, "It works!", "Hello Google Apps Script");
        };
    }.call(this, __webpack_require__(2));
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
}, function(module, exports) {
    var _this = this, add = function add(a, b) {
        return a + b;
    };
    Logger.log("The sum of 2 and 3 is ".concat(add(2, 3)));
    var max = function max(a, b) {
        return b < a ? a : b;
    };
    Logger.log("The bigger of 10 and 12 is ".concat(max(10, 12)));
    var multiply = function multiply(value) {
        return value * (1 < arguments.length && arguments[1] !== undefined ? arguments[1] : 2);
    };
    Logger.log("2*10 = ".concat(multiply(2, 10))), Logger.log("3*2 = ".concat(multiply(3, 2)));
    var a = {
        b: [ 1, 2, 3 ].map(function(item) {
            return Logger.log(item), Logger.log(Object.keys(_this)), item;
        })
    };
    Logger.log(JSON.stringify(a));
}, function(module, exports) {
    Logger.log("".concat("Amit Agarwal", " lives in ").concat("India"));
}, function(module, exports) {
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
    var Person = function() {
        function Person() {
            var name = 0 < arguments.length && arguments[0] !== undefined ? arguments[0] : "Anonymous", gender = 1 < arguments.length && arguments[1] !== undefined ? arguments[1] : "Unknown";
            _classCallCheck(this, Person), this.name = name, this.gender = gender;
        }
        return _createClass(Person, [ {
            key: "printDetails",
            value: function() {
                return "".concat(this.name, " is ").concat(this.gender);
            }
        } ]), Person;
    }(), person = new Person("Amit Agarwal", "male");
    Logger.log(person.printDetails());
    var employee = new (function(_Person) {
        function Employee(name, gender, role) {
            var _this;
            return _classCallCheck(this, Employee), (_this = _possibleConstructorReturn(this, _getPrototypeOf(Employee).call(this, name, gender))).role = role, 
            _this;
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
        }(Employee, Person), _createClass(Employee, [ {
            key: "printRole",
            value: function() {
                return "".concat(this.name, " is ").concat(this.role);
            }
        } ]), Employee;
    }())("Amit", "male", "Google Developer");
    Logger.log(employee.printDetails()), Logger.log(employee.printRole());
}, function(module, exports) {
    function _slicedToArray(arr, i) {
        return function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }(arr) || function _iterableToArrayLimit(arr, i) {
            var _arr = [], _n = !0, _d = !1, _e = undefined;
            try {
                for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
                !i || _arr.length !== i); _n = !0) ;
            } catch (err) {
                _d = !0, _e = err;
            } finally {
                try {
                    _n || null == _i["return"] || _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }(arr, i) || function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }();
    }
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var Person = function Person() {
        var _this = this;
        !function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }(this, Person), _defineProperty(this, "name", "Amit Agarwal"), _defineProperty(this, "greet", function() {
            return "Hello ".concat(_this.name, "!!");
        }), _defineProperty(this, "getFirstName", function() {
            return _slicedToArray(_this.name.split(" "), 1)[0];
        });
    };
    _defineProperty(Person, "country", "India"), _defineProperty(Person, "sayHello", function() {
        Logger.log("Hello World!!");
    });
    var person = new Person();
    Logger.log(person.getFirstName()), Logger.log(Person.country), Person.sayHello();
}, function(module, exports) {
    var numbers = [ 10, 20, 30 ];
    numbers.forEach(function(number) {
        Logger.log(number);
    });
    var doubleIt = numbers.map(function(number) {
        return 2 * number;
    });
    Logger.log(doubleIt);
    var bigNumbers = numbers.filter(function(number) {
        return 10 < number;
    });
    Logger.log(bigNumbers);
    var sum = numbers.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    Logger.log("The sum of ".concat(numbers.join(", "), " is ").concat(sum));
    var result = [ 1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4 ].sort().reduce(function(accumulator, current) {
        var length = accumulator.length;
        return 0 !== length && accumulator[length - 1] === current || accumulator.push(current), 
        accumulator;
    }, []);
    Logger.log(result);
}, function(module, exports) {
    Logger.log("The name is ".concat("Amit Agarwal"));
    for (var i = 0; i < 5; i += 1) Logger.log("The count is ".concat(i));
}, function(module, exports) {
    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {}, ownKeys = Object.keys(source);
            "function" == typeof Object.getOwnPropertySymbols && (ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }))), ownKeys.forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        }
        return target;
    }
    function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : obj[key] = value, obj;
    }
    var species = [].concat([ "Monkey", "Lion", "Zebra" ], [ "Sparrow", "Pigeon", "Parrot" ]);
    Logger.log(species);
    var personDetails = _objectSpread({}, {
        name: "Amit Agarwal",
        email: "amit@labnol.org"
    }, {
        url: "https://digitalinspiration.com/"
    }, {
        twitter: "@labnol"
    });
    Logger.log(personDetails);
    var emailUpdated = _objectSpread({}, personDetails, {
        email: "email@example.com"
    });
    Logger.log(emailUpdated);
    var stack = [ "Google Apps Script", "JavaScript", "Firebase", "Node.js", "Webpack", "Babel" ], gas = stack[0], js = stack[1], others = stack.slice(2);
    Logger.log("".concat(gas, " is similar to ").concat(js)), Logger.log(others);
    var newPerson = {
        name: "Amit Agarwal",
        email: "amit@labnol.org",
        website: "https://digitalinspiration.com/"
    }, name = newPerson.name, _newPerson$age = newPerson.age, age = void 0 === _newPerson$age ? "unknown" : _newPerson$age;
    Logger.log("".concat(name, " is ").concat(age, " years old"));
}, function(module, exports) {
    var name = "Amit Agarwal";
    Logger.log("".concat(name, " has ").concat(name.length, " characters")), Logger.log("".concat(name, " in uppercase is  ").concat(name.toUpperCase())), 
    Logger.log("The date is ".concat(new Date().toUTCString()));
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__(3), __webpack_require__(4);
    var person = {
        name: "Amit Agarwal",
        website: "https://digitalinspiration.com/",
        email: "amit@labnol.org"
    }, destructuring_name = person.name, email = person.email, _person$country = person.country, country = void 0 === _person$country ? "unknown" : _person$country;
    Logger.log("".concat(destructuring_name, "'s email address is ").concat(email, ". Their country is ").concat(country));
    var destructuring = person;
    __webpack_require__(5), __webpack_require__(6);
    Logger.log(destructuring);
    __webpack_require__(7), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10);
} ]));