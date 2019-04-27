function UniqueArray(...args) {
    Object.defineProperties(this, {
        prevented: {
            enumerable: false,
            value: []
        },
        contains: {
            enumerable: false,
            value: {}
        },
        holds: {
            enumerable: false,
            get: function () {
                return Object.keys(this.contains)
            }
        },
        pure: {
            enumerable: false,
            get: function () {
                return this.holds.length <= 1;
            }
        }
    });
    args.forEach(arg => {
        this.push(arg);
    });
}
UniqueArray.prototype = [];
Object.defineProperties(UniqueArray.prototype, {
    has: {
        enumerable: false,
        value: function (v) {
            return this.indexOf(v) !== -1;
        }
    },
    push: {
        enumerable: false,
        value: function (...items) {
            const oldLength = this.length;
            items.forEach((v) => {
                if (!this.has(v)) {
                    const type = toString.call(v);
                    if (this.contains.hasOwnProperty(type)) {
                        this.contains[type] += 1;
                    } else {
                        this.contains[type] = 1;
                    }
                    Array.prototype.push.apply(this, [v])
                } else {
                    if (this.prevented.indexOf(v) === -1) {
                        this.prevented.push(v)
                    }
                }
            });
            return this.length === oldLength ? false : this.length;
        }
    },
    concat: {
        enumerable: false,
        value: function (input) {
            result = new UniqueArray();
            this.forEach(v => {
                result.push(v);
            });
            if (input instanceof Array) {
                input.forEach(v => {
                    result.push(v);
                });
            } else {
                result.push(input);
            }
            return result;
        }
    },
    slice: {
        enumerable: false,
        value: function (...args) {
            const result = new UniqueArray();
            Array.prototype.slice.apply(this, args).forEach(v => {
                result.push(v);
            });
            return result;
        }
    },
    splice: {
        enumerable: false,
        value: function (start, deleteCount, ...items) {
            const result = this.slice(start, deleteCount);
            Array.prototype.splice.apply(this, [start, deleteCount]);
            items.reverse().forEach(v => {
                this.unshift(v);
            });
            result.forEach(v => {
                const type = toString.call(v);
                if (this.contains.hasOwnProperty(type)) {
                    if ((this.contains[type] -= 1) === 0) {
                        delete this.contains[type];
                    }
                }
                const prevIndex = this.prevented.indexOf(v);
                if (prevIndex !== -1) {
                    this.prevented.splice(prevIndex, 1);
                }
            });
            return result;
        }
    },
    unshift: {
        enumerable: false,
        value: function (...items) {
            const oldLength = this.length;
            items.reverse().forEach(v => {
                if (!this.has(v)) {
                    Array.prototype.unshift.apply(this, [v]);
                    const type = toString.call(v);
                    if (this.contains.hasOwnProperty(type)) {
                        this.contains[type] += 1;
                    } else {
                        this.contains[type] = 1;
                    }
                } else {
                    if (this.prevented.indexOf(v) === -1) {
                        this.prevented.push(v)
                    }
                }
            });
            return this.length === oldLength ? false : this.length;
        }
    },
    shift: {
        enumerable: false,
        value: function () {
            const result = Array.prototype.shift.apply(this);
            if (result !== undefined) {
                const type = toString.call(result);
                if (this.contains.hasOwnProperty(type)) {
                    if ((this.contains[type] -= 1) === 0) {
                        delete this.contains[type];
                    }
                }
                const prevIndex = this.prevented.indexOf(result);
                if (prevIndex !== -1) {
                    this.prevented.splice(prevIndex, 1);
                }
            }
            return result;
        }
    },
    pop: {
        enumerable: false,
        value: function () {
            const result = Array.prototype.pop.apply(this);
            if (result !== undefined) {
                const type = toString.call(result);
                if (this.contains.hasOwnProperty(type)) {
                    if ((this.contains[type] -= 1) === 0) {
                        delete this.contains[type];
                    }
                }
                const prevIndex = this.prevented.indexOf(result);
                if (prevIndex !== -1) {
                    this.prevented.splice(prevIndex, 1);
                }
            }
            return result;
        }
    },
    remove: {
        enumerable: false,
        value: function (...items) {
            items.forEach(v => {
                const index = this.indexOf(v);
                if (index !== -1) {
                    this.splice(index, 1);
                    const type = toString.call(v);
                    if (this.contains.hasOwnProperty(type)) {
                        if ((this.contains[type] -= 1) === 0) {
                            delete this.contains[type];
                        }
                    }
                }
                const prevIndex = this.prevented.indexOf(v);
                if (prevIndex !== -1) {
                    this.prevented.splice(prevIndex, 1);
                }
            });
            return this;
        }
    }
});
