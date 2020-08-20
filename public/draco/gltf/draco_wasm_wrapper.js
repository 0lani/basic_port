var t = t || {};

t.scope = {}, t.ASSUME_ES5 = !1, t.ASSUME_NO_NATIVE_MAP = !1, t.ASSUME_NO_NATIVE_SET = !1, 
t.defineProperty = t.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, r) {
    t != Array.prototype && t != Object.prototype && (t[e] = r.value);
}, t.getGlobal = function(t) {
    return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t;
}, t.global = t.getGlobal(this), t.polyfill = function(e, r, n, o) {
    if (r) {
        for (n = t.global, e = e.split("."), o = 0; o < e.length - 1; o++) {
            var i = e[o];
            i in n || (n[i] = {}), n = n[i];
        }
        (r = r(o = n[e = e[e.length - 1]])) != o && null != r && t.defineProperty(n, e, {
            configurable: !0,
            writable: !0,
            value: r
        });
    }
}, t.polyfill("Math.imul", (function(t) {
    return t || function(t, e) {
        var r = 65535 & (t = Number(t)), n = 65535 & (e = Number(e));
        return r * n + ((t >>> 16 & 65535) * n + r * (e >>> 16 & 65535) << 16 >>> 0) | 0;
    };
}), "es6", "es3"), t.polyfill("Math.clz32", (function(t) {
    return t || function(t) {
        if (0 === (t = Number(t) >>> 0)) return 32;
        var e = 0;
        return 0 == (4294901760 & t) && (t <<= 16, e += 16), 0 == (4278190080 & t) && (t <<= 8, 
        e += 8), 0 == (4026531840 & t) && (t <<= 4, e += 4), 0 == (3221225472 & t) && (t <<= 2, 
        e += 2), 0 == (2147483648 & t) && e++, e;
    };
}), "es6", "es3"), t.polyfill("Math.trunc", (function(t) {
    return t || function(t) {
        if (t = Number(t), isNaN(t) || 1 / 0 === t || -1 / 0 === t || 0 === t) return t;
        var e = Math.floor(Math.abs(t));
        return 0 > t ? -e : e;
    };
}), "es6", "es3"), t.SYMBOL_PREFIX = "jscomp_symbol_", t.initSymbol = function() {
    t.initSymbol = function() {}, t.global.Symbol || (t.global.Symbol = t.Symbol);
}, t.Symbol = function() {
    var e = 0;
    return function(r) {
        return t.SYMBOL_PREFIX + (r || "") + e++;
    };
}(), t.initSymbolIterator = function() {
    t.initSymbol();
    var e = t.global.Symbol.iterator;
    e || (e = t.global.Symbol.iterator = t.global.Symbol("iterator")), "function" != typeof Array.prototype[e] && t.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function() {
            return t.arrayIterator(this);
        }
    }), t.initSymbolIterator = function() {};
}, t.arrayIterator = function(e) {
    var r = 0;
    return t.iteratorPrototype((function() {
        return r < e.length ? {
            done: !1,
            value: e[r++]
        } : {
            done: !0
        };
    }));
}, t.iteratorPrototype = function(e) {
    return t.initSymbolIterator(), (e = {
        next: e
    })[t.global.Symbol.iterator] = function() {
        return this;
    }, e;
}, t.makeIterator = function(e) {
    t.initSymbolIterator();
    var r = e[Symbol.iterator];
    return r ? r.call(e) : t.arrayIterator(e);
}, t.FORCE_POLYFILL_PROMISE = !1, t.polyfill("Promise", (function(e) {
    function r() {
        this.batch_ = null;
    }
    function n(t) {
        return t instanceof i ? t : new i((function(e, r) {
            e(t);
        }));
    }
    if (e && !t.FORCE_POLYFILL_PROMISE) return e;
    r.prototype.asyncExecute = function(t) {
        return null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_()), this.batch_.push(t), 
        this;
    }, r.prototype.asyncExecuteBatch_ = function() {
        var t = this;
        this.asyncExecuteFunction((function() {
            t.executeBatch_();
        }));
    };
    var o = t.global.setTimeout;
    r.prototype.asyncExecuteFunction = function(t) {
        o(t, 0);
    }, r.prototype.executeBatch_ = function() {
        for (;this.batch_ && this.batch_.length; ) {
            var t = this.batch_;
            this.batch_ = [];
            for (var e = 0; e < t.length; ++e) {
                var r = t[e];
                delete t[e];
                try {
                    r();
                } catch (t) {
                    this.asyncThrow_(t);
                }
            }
        }
        this.batch_ = null;
    }, r.prototype.asyncThrow_ = function(t) {
        this.asyncExecuteFunction((function() {
            throw t;
        }));
    };
    var i = function(t) {
        this.state_ = 0, this.result_ = void 0, this.onSettledCallbacks_ = [];
        var e = this.createResolveAndReject_();
        try {
            t(e.resolve, e.reject);
        } catch (t) {
            e.reject(t);
        }
    };
    i.prototype.createResolveAndReject_ = function() {
        function t(t) {
            return function(n) {
                r || (r = !0, t.call(e, n));
            };
        }
        var e = this, r = !1;
        return {
            resolve: t(this.resolveTo_),
            reject: t(this.reject_)
        };
    }, i.prototype.resolveTo_ = function(t) {
        if (t === this) this.reject_(new TypeError("A Promise cannot resolve to itself")); else if (t instanceof i) this.settleSameAsPromise_(t); else {
            t: switch (typeof t) {
              case "object":
                var e = null != t;
                break t;

              case "function":
                e = !0;
                break t;

              default:
                e = !1;
            }
            e ? this.resolveToNonPromiseObj_(t) : this.fulfill_(t);
        }
    }, i.prototype.resolveToNonPromiseObj_ = function(t) {
        var e = void 0;
        try {
            e = t.then;
        } catch (t) {
            return void this.reject_(t);
        }
        "function" == typeof e ? this.settleSameAsThenable_(e, t) : this.fulfill_(t);
    }, i.prototype.reject_ = function(t) {
        this.settle_(2, t);
    }, i.prototype.fulfill_ = function(t) {
        this.settle_(1, t);
    }, i.prototype.settle_ = function(t, e) {
        if (0 != this.state_) throw Error("Cannot settle(" + t + ", " + e | "): Promise already settled in state" + this.state_);
        this.state_ = t, this.result_ = e, this.executeOnSettledCallbacks_();
    }, i.prototype.executeOnSettledCallbacks_ = function() {
        if (null != this.onSettledCallbacks_) {
            for (var t = this.onSettledCallbacks_, e = 0; e < t.length; ++e) t[e].call(), t[e] = null;
            this.onSettledCallbacks_ = null;
        }
    };
    var _ = new r;
    return i.prototype.settleSameAsPromise_ = function(t) {
        var e = this.createResolveAndReject_();
        t.callWhenSettled_(e.resolve, e.reject);
    }, i.prototype.settleSameAsThenable_ = function(t, e) {
        var r = this.createResolveAndReject_();
        try {
            t.call(e, r.resolve, r.reject);
        } catch (t) {
            r.reject(t);
        }
    }, i.prototype.then = function(t, e) {
        function r(t, e) {
            return "function" == typeof t ? function(e) {
                try {
                    n(t(e));
                } catch (t) {
                    o(t);
                }
            } : e;
        }
        var n, o, _ = new i((function(t, e) {
            n = t, o = e;
        }));
        return this.callWhenSettled_(r(t, n), r(e, o)), _;
    }, i.prototype.catch = function(t) {
        return this.then(void 0, t);
    }, i.prototype.callWhenSettled_ = function(t, e) {
        function r() {
            switch (n.state_) {
              case 1:
                t(n.result_);
                break;

              case 2:
                e(n.result_);
                break;

              default:
                throw Error("Unexpected state: " + n.state_);
            }
        }
        var n = this;
        null == this.onSettledCallbacks_ ? _.asyncExecute(r) : this.onSettledCallbacks_.push((function() {
            _.asyncExecute(r);
        }));
    }, i.resolve = n, i.reject = function(t) {
        return new i((function(e, r) {
            r(t);
        }));
    }, i.race = function(e) {
        return new i((function(r, o) {
            for (var i = t.makeIterator(e), _ = i.next(); !_.done; _ = i.next()) n(_.value).callWhenSettled_(r, o);
        }));
    }, i.all = function(e) {
        var r = t.makeIterator(e), o = r.next();
        return o.done ? n([]) : new i((function(t, e) {
            function i(e) {
                return function(r) {
                    _[e] = r, 0 == --a && t(_);
                };
            }
            var _ = [], a = 0;
            do {
                _.push(void 0), a++, n(o.value).callWhenSettled_(i(_.length - 1), e), o = r.next();
            } while (!o.done);
        }));
    }, i;
}), "es6", "es3");

var e = function(t) {
    function e(t, e) {
        return e || (e = 16), Math.ceil(t / e) * e;
    }
    function r(t, e) {
        t || m("Assertion failed: " + e);
    }
    function n(t, e) {
        if (0 === e || !t) return "";
        for (var r, n = 0, i = 0; (n |= r = J[t + i >> 0], 0 != r || e) && (i++, !e || i != e); ) ;
        if (e || (e = i), r = "", 128 > n) {
            for (;0 < e; ) n = String.fromCharCode.apply(String, J.subarray(t, t + Math.min(e, 1024))), 
            r = r ? r + n : n, t += 1024, e -= 1024;
            return r;
        }
        return o(J, t);
    }
    function o(t, e) {
        for (var r = e; t[r]; ) ++r;
        if (16 < r - e && t.subarray && pt) return pt.decode(t.subarray(e, r));
        for (r = ""; ;) {
            var n = t[e++];
            if (!n) return r;
            if (128 & n) {
                var o = 63 & t[e++];
                if (192 == (224 & n)) r += String.fromCharCode((31 & n) << 6 | o); else {
                    var i = 63 & t[e++];
                    if (224 == (240 & n)) n = (15 & n) << 12 | o << 6 | i; else {
                        var _ = 63 & t[e++];
                        if (240 == (248 & n)) n = (7 & n) << 18 | o << 12 | i << 6 | _; else {
                            var a = 63 & t[e++];
                            if (248 == (252 & n)) n = (3 & n) << 24 | o << 18 | i << 12 | _ << 6 | a; else n = (1 & n) << 30 | o << 24 | i << 18 | _ << 12 | a << 6 | 63 & t[e++];
                        }
                    }
                    65536 > n ? r += String.fromCharCode(n) : (n -= 65536, r += String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n));
                }
            } else r += String.fromCharCode(n);
        }
    }
    function i(t, e) {
        return 0 < t % e && (t += e - t % e), t;
    }
    function _() {
        L.HEAP8 = Z = new Int8Array(ft), L.HEAP16 = $ = new Int16Array(ft), L.HEAP32 = tt = new Int32Array(ft), 
        L.HEAPU8 = J = new Uint8Array(ft), L.HEAPU16 = new Uint16Array(ft), L.HEAPU32 = new Uint32Array(ft), 
        L.HEAPF32 = new Float32Array(ft), L.HEAPF64 = new Float64Array(ft);
    }
    function a(t) {
        for (;0 < t.length; ) {
            var e = t.shift();
            if ("function" == typeof e) e(); else {
                var r = e.func;
                "number" == typeof r ? void 0 === e.arg ? L.dynCall_v(r) : L.dynCall_vi(r, e.arg) : r(void 0 === e.arg ? null : e.arg);
            }
        }
    }
    function p(t) {
        return String.prototype.startsWith ? t.startsWith("data:application/octet-stream;base64,") : 0 === t.indexOf("data:application/octet-stream;base64,");
    }
    function u() {
        return !!u.uncaught_exception;
    }
    function c() {
        var t = gt.last;
        if (!t) return 0 | (Zr(0), 0);
        var e = gt.infos[t], r = e.type;
        if (!r) return 0 | (Zr(0), t);
        var n = Array.prototype.slice.call(arguments);
        L.___cxa_is_pointer_type(r), c.buffer || (c.buffer = Kr(4)), tt[c.buffer >> 2] = t, 
        t = c.buffer;
        for (var o = 0; o < n.length; o++) if (n[o] && L.___cxa_can_catch(n[o], r, t)) return t = tt[t >> 2], 
        e.adjusted = t, 0 | (Zr(n[o]), t);
        return t = tt[t >> 2], 0 | (Zr(r), t);
    }
    function s(t, e) {
        St.varargs = e;
        try {
            var n = St.get(), i = St.get(), _ = St.get();
            for (t = 0, s.buffers || (s.buffers = [ null, [], [] ], s.printChar = function(t, e) {
                var n = s.buffers[t];
                r(n), 0 === e || 10 === e ? ((1 === t ? L.print : L.printErr)(o(n, 0)), n.length = 0) : n.push(e);
            }), e = 0; e < _; e++) {
                for (var a = tt[i + 8 * e >> 2], p = tt[i + (8 * e + 4) >> 2], u = 0; u < p; u++) s.printChar(n, J[a + u]);
                t += p;
            }
            return t;
        } catch (t) {
            return "undefined" != typeof FS && t instanceof FS.ErrnoError || m(t), -t.errno;
        }
    }
    function l(t, e) {
        l.seen || (l.seen = {}), t in l.seen || (L.dynCall_v(e), l.seen[t] = 1);
    }
    function y(t) {
        this.name = "ExitStatus", this.message = "Program terminated with exit(" + t + ")", 
        this.status = t;
    }
    function f(t) {
        function e() {
            if (!L.calledRun && (L.calledRun = !0, !at)) {
                if (Tt || (Tt = !0, a(dt)), a(bt), L.onRuntimeInitialized && L.onRuntimeInitialized(), 
                L.postRun) for ("function" == typeof L.postRun && (L.postRun = [ L.postRun ]); L.postRun.length; ) At.unshift(L.postRun.shift());
                a(At);
            }
        }
        if (!(0 < It)) {
            if (L.preRun) for ("function" == typeof L.preRun && (L.preRun = [ L.preRun ]); L.preRun.length; ) mt.unshift(L.preRun.shift());
            a(mt), 0 < It || L.calledRun || (L.setStatus ? (L.setStatus("Running..."), setTimeout((function() {
                setTimeout((function() {
                    L.setStatus("");
                }), 1), e();
            }), 1)) : e());
        }
    }
    function m(t) {
        throw L.onAbort && L.onAbort(t), void 0 !== t ? (L.print(t), L.printErr(t), t = JSON.stringify(t)) : t = "", 
        at = !0, "abort(" + t + "). Build with -s ASSERTIONS=1 for more info.";
    }
    function d() {}
    function b(t) {
        return (t || d).__cache__;
    }
    function h(t, e) {
        var r = b(e), n = r[t];
        return n || ((n = Object.create((e || d).prototype)).ptr = t, r[t] = n);
    }
    function A(t) {
        if ("string" == typeof t) {
            for (var e = 0, r = 0; r < t.length; ++r) {
                var n = t.charCodeAt(r);
                55296 <= n && 57343 >= n && (n = 65536 + ((1023 & n) << 10) | 1023 & t.charCodeAt(++r)), 
                127 >= n ? ++e : e = 2047 >= n ? e + 2 : 65535 >= n ? e + 3 : 2097151 >= n ? e + 4 : 67108863 >= n ? e + 5 : e + 6;
            }
            if (r = 0, 0 < (n = (e = Array(e + 1)).length)) {
                n = r + n - 1;
                for (var o = 0; o < t.length; ++o) {
                    var i = t.charCodeAt(o);
                    if (55296 <= i && 57343 >= i && (i = 65536 + ((1023 & i) << 10) | 1023 & t.charCodeAt(++o)), 
                    127 >= i) {
                        if (r >= n) break;
                        e[r++] = i;
                    } else {
                        if (2047 >= i) {
                            if (r + 1 >= n) break;
                            e[r++] = 192 | i >> 6;
                        } else {
                            if (65535 >= i) {
                                if (r + 2 >= n) break;
                                e[r++] = 224 | i >> 12;
                            } else {
                                if (2097151 >= i) {
                                    if (r + 3 >= n) break;
                                    e[r++] = 240 | i >> 18;
                                } else {
                                    if (67108863 >= i) {
                                        if (r + 4 >= n) break;
                                        e[r++] = 248 | i >> 24;
                                    } else {
                                        if (r + 5 >= n) break;
                                        e[r++] = 252 | i >> 30, e[r++] = 128 | i >> 24 & 63;
                                    }
                                    e[r++] = 128 | i >> 18 & 63;
                                }
                                e[r++] = 128 | i >> 12 & 63;
                            }
                            e[r++] = 128 | i >> 6 & 63;
                        }
                        e[r++] = 128 | 63 & i;
                    }
                }
                e[r] = 0;
            }
            t = Jr.alloc(e, Z), Jr.copy(e, Z, t);
        }
        return t;
    }
    function T() {
        throw "cannot construct a Status, no constructor in IDL";
    }
    function I() {
        this.ptr = we(), b(I)[this.ptr] = this;
    }
    function v() {
        this.ptr = Ir(), b(v)[this.ptr] = this;
    }
    function E() {
        this.ptr = Le(), b(E)[this.ptr] = this;
    }
    function D() {
        this.ptr = Fe(), b(D)[this.ptr] = this;
    }
    function g() {
        this.ptr = Mt(), b(g)[this.ptr] = this;
    }
    function S() {
        this.ptr = sr(), b(S)[this.ptr] = this;
    }
    function R() {
        this.ptr = Lt(), b(R)[this.ptr] = this;
    }
    function G() {
        this.ptr = Ct(), b(G)[this.ptr] = this;
    }
    function O() {
        this.ptr = Ge(), b(O)[this.ptr] = this;
    }
    function M() {
        this.ptr = ir(), b(M)[this.ptr] = this;
    }
    function j() {
        this.ptr = Te(), b(j)[this.ptr] = this;
    }
    function w() {
        this.ptr = de(), b(w)[this.ptr] = this;
    }
    function P() {
        this.ptr = Qe(), b(P)[this.ptr] = this;
    }
    function C() {
        this.ptr = Vt(), b(C)[this.ptr] = this;
    }
    function N() {
        this.ptr = Yt(), b(N)[this.ptr] = this;
    }
    function F() {
        this.ptr = We(), b(F)[this.ptr] = this;
    }
    function U() {
        throw "cannot construct a VoidPtr, no constructor in IDL";
    }
    function B() {
        this.ptr = De(), b(B)[this.ptr] = this;
    }
    function z() {
        this.ptr = pr(), b(z)[this.ptr] = this;
    }
    var L = void 0 !== (t = t || {}) ? t : {}, x = !1, k = !1;
    L.onRuntimeInitialized = function() {
        x = !0, k && "function" == typeof L.onModuleLoaded && L.onModuleLoaded(L);
    }, L.onModuleParsed = function() {
        k = !0, x && "function" == typeof L.onModuleLoaded && L.onModuleLoaded(L);
    }, L.isVersionSupported = function(t) {
        return "string" == typeof t && (!(2 > (t = t.split(".")).length || 3 < t.length) && (1 == t[0] && 0 <= t[1] && 3 >= t[1] || !(0 != t[0] || 10 < t[1])));
    };
    var V, Q = {};
    for (V in L) L.hasOwnProperty(V) && (Q[V] = L[V]);
    L.arguments = [], L.thisProgram = "./this.program", L.quit = function(t, e) {
        throw e;
    }, L.preRun = [], L.postRun = [];
    var H, W, q = !1, Y = !1, X = !1, K = !1;
    if (L.ENVIRONMENT) if ("WEB" === L.ENVIRONMENT) q = !0; else if ("WORKER" === L.ENVIRONMENT) Y = !0; else if ("NODE" === L.ENVIRONMENT) X = !0; else {
        if ("SHELL" !== L.ENVIRONMENT) throw Error("Module['ENVIRONMENT'] value is not valid. must be one of: WEB|WORKER|NODE|SHELL.");
        K = !0;
    } else q = "object" == typeof window, Y = "function" == typeof importScripts, X = "object" == typeof process && "function" == typeof require && !q && !Y, 
    K = !q && !X && !Y;
    X ? (L.read = function(t, e) {
        return H || (H = require("fs")), W || (W = require("path")), t = W.normalize(t), 
        t = H.readFileSync(t), e ? t : t.toString();
    }, L.readBinary = function(t) {
        return (t = L.read(t, !0)).buffer || (t = new Uint8Array(t)), r(t.buffer), t;
    }, 1 < process.argv.length && (L.thisProgram = process.argv[1].replace(/\\/g, "/")), 
    L.arguments = process.argv.slice(2), process.on("uncaughtException", (function(t) {
        if (!(t instanceof y)) throw t;
    })), process.on("unhandledRejection", (function(t, e) {
        process.exit(1);
    })), L.inspect = function() {
        return "[Emscripten Module object]";
    }) : K ? ("undefined" != typeof read && (L.read = function(t) {
        return read(t);
    }), L.readBinary = function(t) {
        return "function" == typeof readbuffer ? new Uint8Array(readbuffer(t)) : (r("object" == typeof (t = read(t, "binary"))), 
        t);
    }, "undefined" != typeof scriptArgs ? L.arguments = scriptArgs : void 0 !== arguments && (L.arguments = arguments), 
    "function" == typeof quit && (L.quit = function(t, e) {
        quit(t);
    })) : (q || Y) && (L.read = function(t) {
        var e = new XMLHttpRequest;
        return e.open("GET", t, !1), e.send(null), e.responseText;
    }, Y && (L.readBinary = function(t) {
        var e = new XMLHttpRequest;
        return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
    }), L.readAsync = function(t, e, r) {
        var n = new XMLHttpRequest;
        n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function() {
            200 == n.status || 0 == n.status && n.response ? e(n.response) : r();
        }, n.onerror = r, n.send(null);
    }, L.setWindowTitle = function(t) {
        document.title = t;
    });
    for (V in L.print = "undefined" != typeof console ? console.log.bind(console) : "undefined" != typeof print ? print : null, 
    L.printErr = "undefined" != typeof printErr ? printErr : "undefined" != typeof console && console.warn.bind(console) || L.print, 
    L.print = L.print, L.printErr = L.printErr, Q) Q.hasOwnProperty(V) && (L[V] = Q[V]);
    Q = void 0;
    var Z, J, $, tt, et, rt, nt, ot, it, _t, at = 0, pt = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
    var ut = et = rt = nt = ot = it = _t = 0, ct = !1;
    L.reallocBuffer || (L.reallocBuffer = function(t) {
        try {
            if (ArrayBuffer.transfer) var e = ArrayBuffer.transfer(ft, t); else {
                var r = Z;
                e = new ArrayBuffer(t), new Int8Array(e).set(r);
            }
        } catch (t) {
            return !1;
        }
        return !!Xr(e) && e;
    });
    try {
        var st = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get);
        st(new ArrayBuffer(4));
    } catch (t) {
        st = function(t) {
            return t.byteLength;
        };
    }
    var lt = L.TOTAL_STACK || 5242880, yt = L.TOTAL_MEMORY || 16777216;
    if (yt < lt && L.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + yt + "! (TOTAL_STACK=" + lt + ")"), 
    L.buffer) var ft = L.buffer; else "object" == typeof WebAssembly && "function" == typeof WebAssembly.Memory ? (L.wasmMemory = new WebAssembly.Memory({
        initial: yt / 65536
    }), ft = L.wasmMemory.buffer) : ft = new ArrayBuffer(yt), L.buffer = ft;
    if (_(), tt[0] = 1668509029, $[1] = 25459, 115 !== J[2] || 99 !== J[3]) throw "Runtime error: expected the system to be little-endian!";
    var mt = [], dt = [], bt = [], ht = [], At = [], Tt = !1, It = 0, vt = null, Et = null;
    L.preloadedImages = {}, L.preloadedAudios = {}, function() {
        function t() {
            try {
                if (L.wasmBinary) return new Uint8Array(L.wasmBinary);
                if (L.readBinary) return L.readBinary(o);
                throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
            } catch (t) {
                m(t);
            }
        }
        function e() {
            return L.wasmBinary || !q && !Y || "function" != typeof fetch ? new Promise((function(e, r) {
                e(t());
            })) : fetch(o, {
                credentials: "same-origin"
            }).then((function(t) {
                if (!t.ok) throw "failed to load wasm binary file at '" + o + "'";
                return t.arrayBuffer();
            })).catch((function() {
                return t();
            }));
        }
        function r(t, r, n) {
            function i(t, e) {
                (c = t.exports).memory && (t = c.memory, e = L.buffer, t.byteLength < e.byteLength && L.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"), 
                e = new Int8Array(e), new Int8Array(t).set(e), L.buffer = ft = t, _()), L.asm = c, 
                L.usingWasm = !0, It--, L.monitorRunDependencies && L.monitorRunDependencies(It), 
                0 == It && (null !== vt && (clearInterval(vt), vt = null), Et && (t = Et, Et = null, 
                t()));
            }
            function a(t) {
                i(t.instance, t.module);
            }
            function s(t) {
                e().then((function(t) {
                    return WebAssembly.instantiate(t, u);
                })).then(t).catch((function(t) {
                    L.printErr("failed to asynchronously prepare wasm: " + t), m(t);
                }));
            }
            if ("object" != typeof WebAssembly) return L.printErr("no native wasm support detected"), 
            !1;
            if (!(L.wasmMemory instanceof WebAssembly.Memory)) return L.printErr("no native wasm Memory in use"), 
            !1;
            if (r.memory = L.wasmMemory, u.global = {
                NaN: NaN,
                Infinity: 1 / 0
            }, u["global.Math"] = Math, u.env = r, It++, L.monitorRunDependencies && L.monitorRunDependencies(It), 
            L.instantiateWasm) try {
                return L.instantiateWasm(u, i);
            } catch (t) {
                return L.printErr("Module.instantiateWasm callback failed with error: " + t), !1;
            }
            return L.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || p(o) || "function" != typeof fetch ? s(a) : WebAssembly.instantiateStreaming(fetch(o, {
                credentials: "same-origin"
            }), u).then(a).catch((function(t) {
                L.printErr("wasm streaming compile failed: " + t), L.printErr("falling back to ArrayBuffer instantiation"), 
                s(a);
            })), {};
        }
        var n = "draco_decoder.wast", o = "draco_decoder.wasm", a = "draco_decoder.temp.asm.js";
        "function" == typeof L.locateFile && (p(n) || (n = L.locateFile(n)), p(o) || (o = L.locateFile(o)), 
        p(a) || (a = L.locateFile(a)));
        var u = {
            global: null,
            env: null,
            asm2wasm: {
                "f64-rem": function(t, e) {
                    return t % e;
                },
                debugger: function() {}
            },
            parent: L
        }, c = null;
        L.asmPreload = L.asm;
        var s = L.reallocBuffer;
        L.reallocBuffer = function(t) {
            if ("asmjs" === l) var e = s(t); else t: {
                t = i(t, L.usingWasm ? 65536 : 16777216);
                var r = L.buffer.byteLength;
                if (L.usingWasm) try {
                    e = -1 !== L.wasmMemory.grow((t - r) / 65536) ? L.buffer = L.wasmMemory.buffer : null;
                    break t;
                } catch (t) {
                    e = null;
                    break t;
                }
                e = void 0;
            }
            return e;
        };
        var l = "";
        L.asm = function(t, e, n) {
            if (!e.table) {
                var o = L.wasmTableSize;
                void 0 === o && (o = 1024);
                var i = L.wasmMaxTableSize;
                e.table = "object" == typeof WebAssembly && "function" == typeof WebAssembly.Table ? void 0 !== i ? new WebAssembly.Table({
                    initial: o,
                    maximum: i,
                    element: "anyfunc"
                }) : new WebAssembly.Table({
                    initial: o,
                    element: "anyfunc"
                }) : Array(o), L.wasmTable = e.table;
            }
            return e.memoryBase || (e.memoryBase = L.STATIC_BASE), e.tableBase || (e.tableBase = 0), 
            (t = r(0, e)) || m("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"), 
            t;
        };
    }(), et = (ut = 1024) + 14480, dt.push(), L.STATIC_BASE = ut, L.STATIC_BUMP = 14480;
    var Dt = et;
    et += 16;
    var gt = {
        last: 0,
        caught: [],
        infos: {},
        deAdjust: function(t) {
            if (!t || gt.infos[t]) return t;
            for (var e in gt.infos) if (gt.infos[e].adjusted === t) return e;
            return t;
        },
        addRef: function(t) {
            t && gt.infos[t].refcount++;
        },
        decRef: function(t) {
            if (t) {
                var e = gt.infos[t];
                r(0 < e.refcount), e.refcount--, 0 !== e.refcount || e.rethrown || (e.destructor && L.dynCall_vi(e.destructor, t), 
                delete gt.infos[t], ___cxa_free_exception(t));
            }
        },
        clearRef: function(t) {
            t && (gt.infos[t].refcount = 0);
        }
    }, St = {
        varargs: 0,
        get: function(t) {
            return St.varargs += 4, tt[St.varargs - 4 >> 2];
        },
        getStr: function() {
            return n(St.get());
        },
        get64: function() {
            var t = St.get(), e = St.get();
            return r(0 <= t ? 0 === e : -1 === e), t;
        },
        getZero: function() {
            r(0 === St.get());
        }
    }, Rt = {}, Gt = 1;
    _t = function(t) {
        r(!ct);
        var e = et;
        return et = et + 4 + 15 & -16, e;
    }(), rt = nt = e(et), it = e(ot = rt + lt), tt[_t >> 2] = it, ct = !0, L.wasmTableSize = 468, 
    L.wasmMaxTableSize = 468, L.asmGlobalArg = {}, L.asmLibraryArg = {
        abort: m,
        assert: r,
        enlargeMemory: function() {
            var t = L.usingWasm ? 65536 : 16777216, e = 2147483648 - t;
            if (tt[_t >> 2] > e) return !1;
            var r = yt;
            for (yt = Math.max(yt, 16777216); yt < tt[_t >> 2]; ) yt = 536870912 >= yt ? i(2 * yt, t) : Math.min(i((3 * yt + 2147483648) / 4, t), e);
            return (t = L.reallocBuffer(yt)) && t.byteLength == yt ? (L.buffer = ft = t, _(), 
            !0) : (yt = r, !1);
        },
        getTotalMemory: function() {
            return yt;
        },
        abortOnCannotGrowMemory: function() {
            m("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + yt + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
        },
        invoke_ii: function(t, e) {
            try {
                return L.dynCall_ii(t, e);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_iii: function(t, e, r) {
            try {
                return L.dynCall_iii(t, e, r);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_iiii: function(t, e, r, n) {
            try {
                return L.dynCall_iiii(t, e, r, n);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_iiiiiii: function(t, e, r, n, o, i, _) {
            try {
                return L.dynCall_iiiiiii(t, e, r, n, o, i, _);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_v: function(t) {
            try {
                L.dynCall_v(t);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_vi: function(t, e) {
            try {
                L.dynCall_vi(t, e);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_vii: function(t, e, r) {
            try {
                L.dynCall_vii(t, e, r);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_viii: function(t, e, r, n) {
            try {
                L.dynCall_viii(t, e, r, n);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_viiii: function(t, e, r, n, o) {
            try {
                L.dynCall_viiii(t, e, r, n, o);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_viiiii: function(t, e, r, n, o, i) {
            try {
                L.dynCall_viiiii(t, e, r, n, o, i);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        invoke_viiiiii: function(t, e, r, n, o, i, _) {
            try {
                L.dynCall_viiiiii(t, e, r, n, o, i, _);
            } catch (t) {
                if ("number" != typeof t && "longjmp" !== t) throw t;
                L.setThrew(1, 0);
            }
        },
        __ZSt18uncaught_exceptionv: u,
        ___cxa_allocate_exception: function(t) {
            return Kr(t);
        },
        ___cxa_begin_catch: function(t) {
            var e = gt.infos[t];
            return e && !e.caught && (e.caught = !0, u.uncaught_exception--), e && (e.rethrown = !1), 
            gt.caught.push(t), gt.addRef(gt.deAdjust(t)), t;
        },
        ___cxa_find_matching_catch: c,
        ___cxa_pure_virtual: function() {
            throw at = !0, "Pure virtual function called!";
        },
        ___cxa_throw: function(t, e, r) {
            throw gt.infos[t] = {
                ptr: t,
                adjusted: t,
                type: e,
                destructor: r,
                refcount: 0,
                caught: !1,
                rethrown: !1
            }, gt.last = t, "uncaught_exception" in u ? u.uncaught_exception++ : u.uncaught_exception = 1, 
            t + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
        },
        ___gxx_personality_v0: function() {},
        ___resumeException: function(t) {
            throw gt.last || (gt.last = t), t + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
        },
        ___setErrNo: function(t) {
            return L.___errno_location && (tt[L.___errno_location() >> 2] = t), t;
        },
        ___syscall140: function(t, e) {
            St.varargs = e;
            try {
                var r = St.getStreamFromFD();
                St.get();
                var n = St.get(), o = St.get(), i = St.get();
                return FS.llseek(r, n, i), tt[o >> 2] = r.position, r.getdents && 0 === n && 0 === i && (r.getdents = null), 
                0;
            } catch (t) {
                return "undefined" != typeof FS && t instanceof FS.ErrnoError || m(t), -t.errno;
            }
        },
        ___syscall146: s,
        ___syscall6: function(t, e) {
            St.varargs = e;
            try {
                var r = St.getStreamFromFD();
                return FS.close(r), 0;
            } catch (t) {
                return "undefined" != typeof FS && t instanceof FS.ErrnoError || m(t), -t.errno;
            }
        },
        _abort: function() {
            L.abort();
        },
        _emscripten_memcpy_big: function(t, e, r) {
            return J.set(J.subarray(e, e + r), t), t;
        },
        _llvm_trap: function() {
            m("trap!");
        },
        _pthread_getspecific: function(t) {
            return Rt[t] || 0;
        },
        _pthread_key_create: function(t, e) {
            return 0 == t ? 22 : (tt[t >> 2] = Gt, Rt[Gt] = 0, Gt++, 0);
        },
        _pthread_once: l,
        _pthread_setspecific: function(t, e) {
            return t in Rt ? (Rt[t] = e, 0) : 22;
        },
        flush_NO_FILESYSTEM: function() {
            var t = L._fflush;
            if (t && t(0), t = s.printChar) {
                var e = s.buffers;
                e[1].length && t(1, 10), e[2].length && t(2, 10);
            }
        },
        DYNAMICTOP_PTR: _t,
        tempDoublePtr: Dt,
        ABORT: at,
        STACKTOP: nt,
        STACK_MAX: ot
    };
    var Ot = L.asm(L.asmGlobalArg, L.asmLibraryArg, ft);
    L.asm = Ot, L.___cxa_can_catch = function() {
        return L.asm.___cxa_can_catch.apply(null, arguments);
    }, L.___cxa_is_pointer_type = function() {
        return L.asm.___cxa_is_pointer_type.apply(null, arguments);
    };
    var Mt = L._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = function() {
        return L.asm._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0.apply(null, arguments);
    }, jt = L._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = function() {
        return L.asm._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1.apply(null, arguments);
    }, wt = L._emscripten_bind_AttributeOctahedronTransform___destroy___0 = function() {
        return L.asm._emscripten_bind_AttributeOctahedronTransform___destroy___0.apply(null, arguments);
    }, Pt = L._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = function() {
        return L.asm._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0.apply(null, arguments);
    }, Ct = L._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = function() {
        return L.asm._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0.apply(null, arguments);
    }, Nt = L._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = function() {
        return L.asm._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1.apply(null, arguments);
    }, Ft = L._emscripten_bind_AttributeQuantizationTransform___destroy___0 = function() {
        return L.asm._emscripten_bind_AttributeQuantizationTransform___destroy___0.apply(null, arguments);
    }, Ut = L._emscripten_bind_AttributeQuantizationTransform_min_value_1 = function() {
        return L.asm._emscripten_bind_AttributeQuantizationTransform_min_value_1.apply(null, arguments);
    }, Bt = L._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = function() {
        return L.asm._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0.apply(null, arguments);
    }, zt = L._emscripten_bind_AttributeQuantizationTransform_range_0 = function() {
        return L.asm._emscripten_bind_AttributeQuantizationTransform_range_0.apply(null, arguments);
    }, Lt = L._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = function() {
        return L.asm._emscripten_bind_AttributeTransformData_AttributeTransformData_0.apply(null, arguments);
    }, xt = L._emscripten_bind_AttributeTransformData___destroy___0 = function() {
        return L.asm._emscripten_bind_AttributeTransformData___destroy___0.apply(null, arguments);
    }, kt = L._emscripten_bind_AttributeTransformData_transform_type_0 = function() {
        return L.asm._emscripten_bind_AttributeTransformData_transform_type_0.apply(null, arguments);
    }, Vt = L._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function() {
        return L.asm._emscripten_bind_DecoderBuffer_DecoderBuffer_0.apply(null, arguments);
    }, Qt = L._emscripten_bind_DecoderBuffer_Init_2 = function() {
        return L.asm._emscripten_bind_DecoderBuffer_Init_2.apply(null, arguments);
    }, Ht = L._emscripten_bind_DecoderBuffer___destroy___0 = function() {
        return L.asm._emscripten_bind_DecoderBuffer___destroy___0.apply(null, arguments);
    }, Wt = L._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function() {
        return L.asm._emscripten_bind_Decoder_DecodeBufferToMesh_2.apply(null, arguments);
    }, qt = L._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = function() {
        return L.asm._emscripten_bind_Decoder_DecodeBufferToPointCloud_2.apply(null, arguments);
    }, Yt = L._emscripten_bind_Decoder_Decoder_0 = function() {
        return L.asm._emscripten_bind_Decoder_Decoder_0.apply(null, arguments);
    }, Xt = L._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeByUniqueId_2.apply(null, arguments);
    }, Kt = L._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3.apply(null, arguments);
    }, Zt = L._emscripten_bind_Decoder_GetAttributeFloat_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeFloat_3.apply(null, arguments);
    }, Jt = L._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3.apply(null, arguments);
    }, $t = L._emscripten_bind_Decoder_GetAttributeIdByName_2 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeIdByName_2.apply(null, arguments);
    }, te = L._emscripten_bind_Decoder_GetAttributeId_2 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeId_2.apply(null, arguments);
    }, ee = L._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3.apply(null, arguments);
    }, re = L._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3.apply(null, arguments);
    }, ne = L._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3.apply(null, arguments);
    }, oe = L._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3.apply(null, arguments);
    }, ie = L._emscripten_bind_Decoder_GetAttributeMetadata_2 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeMetadata_2.apply(null, arguments);
    }, _e = L._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3.apply(null, arguments);
    }, ae = L._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3.apply(null, arguments);
    }, pe = L._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3.apply(null, arguments);
    }, ue = L._emscripten_bind_Decoder_GetAttribute_2 = function() {
        return L.asm._emscripten_bind_Decoder_GetAttribute_2.apply(null, arguments);
    }, ce = L._emscripten_bind_Decoder_GetEncodedGeometryType_1 = function() {
        return L.asm._emscripten_bind_Decoder_GetEncodedGeometryType_1.apply(null, arguments);
    }, se = L._emscripten_bind_Decoder_GetFaceFromMesh_3 = function() {
        return L.asm._emscripten_bind_Decoder_GetFaceFromMesh_3.apply(null, arguments);
    }, le = L._emscripten_bind_Decoder_GetMetadata_1 = function() {
        return L.asm._emscripten_bind_Decoder_GetMetadata_1.apply(null, arguments);
    }, ye = L._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = function() {
        return L.asm._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2.apply(null, arguments);
    }, fe = L._emscripten_bind_Decoder_SkipAttributeTransform_1 = function() {
        return L.asm._emscripten_bind_Decoder_SkipAttributeTransform_1.apply(null, arguments);
    }, me = L._emscripten_bind_Decoder___destroy___0 = function() {
        return L.asm._emscripten_bind_Decoder___destroy___0.apply(null, arguments);
    }, de = L._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = function() {
        return L.asm._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0.apply(null, arguments);
    }, be = L._emscripten_bind_DracoFloat32Array_GetValue_1 = function() {
        return L.asm._emscripten_bind_DracoFloat32Array_GetValue_1.apply(null, arguments);
    }, he = L._emscripten_bind_DracoFloat32Array___destroy___0 = function() {
        return L.asm._emscripten_bind_DracoFloat32Array___destroy___0.apply(null, arguments);
    }, Ae = L._emscripten_bind_DracoFloat32Array_size_0 = function() {
        return L.asm._emscripten_bind_DracoFloat32Array_size_0.apply(null, arguments);
    }, Te = L._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = function() {
        return L.asm._emscripten_bind_DracoInt16Array_DracoInt16Array_0.apply(null, arguments);
    }, Ie = L._emscripten_bind_DracoInt16Array_GetValue_1 = function() {
        return L.asm._emscripten_bind_DracoInt16Array_GetValue_1.apply(null, arguments);
    }, ve = L._emscripten_bind_DracoInt16Array___destroy___0 = function() {
        return L.asm._emscripten_bind_DracoInt16Array___destroy___0.apply(null, arguments);
    }, Ee = L._emscripten_bind_DracoInt16Array_size_0 = function() {
        return L.asm._emscripten_bind_DracoInt16Array_size_0.apply(null, arguments);
    }, De = L._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = function() {
        return L.asm._emscripten_bind_DracoInt32Array_DracoInt32Array_0.apply(null, arguments);
    }, ge = L._emscripten_bind_DracoInt32Array_GetValue_1 = function() {
        return L.asm._emscripten_bind_DracoInt32Array_GetValue_1.apply(null, arguments);
    }, Se = L._emscripten_bind_DracoInt32Array___destroy___0 = function() {
        return L.asm._emscripten_bind_DracoInt32Array___destroy___0.apply(null, arguments);
    }, Re = L._emscripten_bind_DracoInt32Array_size_0 = function() {
        return L.asm._emscripten_bind_DracoInt32Array_size_0.apply(null, arguments);
    }, Ge = L._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function() {
        return L.asm._emscripten_bind_DracoInt8Array_DracoInt8Array_0.apply(null, arguments);
    }, Oe = L._emscripten_bind_DracoInt8Array_GetValue_1 = function() {
        return L.asm._emscripten_bind_DracoInt8Array_GetValue_1.apply(null, arguments);
    }, Me = L._emscripten_bind_DracoInt8Array___destroy___0 = function() {
        return L.asm._emscripten_bind_DracoInt8Array___destroy___0.apply(null, arguments);
    }, je = L._emscripten_bind_DracoInt8Array_size_0 = function() {
        return L.asm._emscripten_bind_DracoInt8Array_size_0.apply(null, arguments);
    }, we = L._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = function() {
        return L.asm._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0.apply(null, arguments);
    }, Pe = L._emscripten_bind_DracoUInt16Array_GetValue_1 = function() {
        return L.asm._emscripten_bind_DracoUInt16Array_GetValue_1.apply(null, arguments);
    }, Ce = L._emscripten_bind_DracoUInt16Array___destroy___0 = function() {
        return L.asm._emscripten_bind_DracoUInt16Array___destroy___0.apply(null, arguments);
    }, Ne = L._emscripten_bind_DracoUInt16Array_size_0 = function() {
        return L.asm._emscripten_bind_DracoUInt16Array_size_0.apply(null, arguments);
    }, Fe = L._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = function() {
        return L.asm._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0.apply(null, arguments);
    }, Ue = L._emscripten_bind_DracoUInt32Array_GetValue_1 = function() {
        return L.asm._emscripten_bind_DracoUInt32Array_GetValue_1.apply(null, arguments);
    }, Be = L._emscripten_bind_DracoUInt32Array___destroy___0 = function() {
        return L.asm._emscripten_bind_DracoUInt32Array___destroy___0.apply(null, arguments);
    }, ze = L._emscripten_bind_DracoUInt32Array_size_0 = function() {
        return L.asm._emscripten_bind_DracoUInt32Array_size_0.apply(null, arguments);
    }, Le = L._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = function() {
        return L.asm._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0.apply(null, arguments);
    }, xe = L._emscripten_bind_DracoUInt8Array_GetValue_1 = function() {
        return L.asm._emscripten_bind_DracoUInt8Array_GetValue_1.apply(null, arguments);
    }, ke = L._emscripten_bind_DracoUInt8Array___destroy___0 = function() {
        return L.asm._emscripten_bind_DracoUInt8Array___destroy___0.apply(null, arguments);
    }, Ve = L._emscripten_bind_DracoUInt8Array_size_0 = function() {
        return L.asm._emscripten_bind_DracoUInt8Array_size_0.apply(null, arguments);
    }, Qe = L._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function() {
        return L.asm._emscripten_bind_GeometryAttribute_GeometryAttribute_0.apply(null, arguments);
    }, He = L._emscripten_bind_GeometryAttribute___destroy___0 = function() {
        return L.asm._emscripten_bind_GeometryAttribute___destroy___0.apply(null, arguments);
    }, We = L._emscripten_bind_Mesh_Mesh_0 = function() {
        return L.asm._emscripten_bind_Mesh_Mesh_0.apply(null, arguments);
    }, qe = L._emscripten_bind_Mesh___destroy___0 = function() {
        return L.asm._emscripten_bind_Mesh___destroy___0.apply(null, arguments);
    }, Ye = L._emscripten_bind_Mesh_num_attributes_0 = function() {
        return L.asm._emscripten_bind_Mesh_num_attributes_0.apply(null, arguments);
    }, Xe = L._emscripten_bind_Mesh_num_faces_0 = function() {
        return L.asm._emscripten_bind_Mesh_num_faces_0.apply(null, arguments);
    }, Ke = L._emscripten_bind_Mesh_num_points_0 = function() {
        return L.asm._emscripten_bind_Mesh_num_points_0.apply(null, arguments);
    }, Ze = L._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_GetDoubleEntry_2.apply(null, arguments);
    }, Je = L._emscripten_bind_MetadataQuerier_GetEntryName_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_GetEntryName_2.apply(null, arguments);
    }, $e = L._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_GetIntEntry_2.apply(null, arguments);
    }, tr = L._emscripten_bind_MetadataQuerier_GetStringEntry_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_GetStringEntry_2.apply(null, arguments);
    }, er = L._emscripten_bind_MetadataQuerier_HasDoubleEntry_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_HasDoubleEntry_2.apply(null, arguments);
    }, rr = L._emscripten_bind_MetadataQuerier_HasEntry_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_HasEntry_2.apply(null, arguments);
    }, nr = L._emscripten_bind_MetadataQuerier_HasIntEntry_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_HasIntEntry_2.apply(null, arguments);
    }, or = L._emscripten_bind_MetadataQuerier_HasStringEntry_2 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_HasStringEntry_2.apply(null, arguments);
    }, ir = L._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_MetadataQuerier_0.apply(null, arguments);
    }, _r = L._emscripten_bind_MetadataQuerier_NumEntries_1 = function() {
        return L.asm._emscripten_bind_MetadataQuerier_NumEntries_1.apply(null, arguments);
    }, ar = L._emscripten_bind_MetadataQuerier___destroy___0 = function() {
        return L.asm._emscripten_bind_MetadataQuerier___destroy___0.apply(null, arguments);
    }, pr = L._emscripten_bind_Metadata_Metadata_0 = function() {
        return L.asm._emscripten_bind_Metadata_Metadata_0.apply(null, arguments);
    }, ur = L._emscripten_bind_Metadata___destroy___0 = function() {
        return L.asm._emscripten_bind_Metadata___destroy___0.apply(null, arguments);
    }, cr = L._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_GetAttributeTransformData_0.apply(null, arguments);
    }, sr = L._emscripten_bind_PointAttribute_PointAttribute_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_PointAttribute_0.apply(null, arguments);
    }, lr = L._emscripten_bind_PointAttribute___destroy___0 = function() {
        return L.asm._emscripten_bind_PointAttribute___destroy___0.apply(null, arguments);
    }, yr = L._emscripten_bind_PointAttribute_attribute_type_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_attribute_type_0.apply(null, arguments);
    }, fr = L._emscripten_bind_PointAttribute_byte_offset_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_byte_offset_0.apply(null, arguments);
    }, mr = L._emscripten_bind_PointAttribute_byte_stride_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_byte_stride_0.apply(null, arguments);
    }, dr = L._emscripten_bind_PointAttribute_data_type_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_data_type_0.apply(null, arguments);
    }, br = L._emscripten_bind_PointAttribute_normalized_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_normalized_0.apply(null, arguments);
    }, hr = L._emscripten_bind_PointAttribute_num_components_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_num_components_0.apply(null, arguments);
    }, Ar = L._emscripten_bind_PointAttribute_size_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_size_0.apply(null, arguments);
    }, Tr = L._emscripten_bind_PointAttribute_unique_id_0 = function() {
        return L.asm._emscripten_bind_PointAttribute_unique_id_0.apply(null, arguments);
    }, Ir = L._emscripten_bind_PointCloud_PointCloud_0 = function() {
        return L.asm._emscripten_bind_PointCloud_PointCloud_0.apply(null, arguments);
    }, vr = L._emscripten_bind_PointCloud___destroy___0 = function() {
        return L.asm._emscripten_bind_PointCloud___destroy___0.apply(null, arguments);
    }, Er = L._emscripten_bind_PointCloud_num_attributes_0 = function() {
        return L.asm._emscripten_bind_PointCloud_num_attributes_0.apply(null, arguments);
    }, Dr = L._emscripten_bind_PointCloud_num_points_0 = function() {
        return L.asm._emscripten_bind_PointCloud_num_points_0.apply(null, arguments);
    }, gr = L._emscripten_bind_Status___destroy___0 = function() {
        return L.asm._emscripten_bind_Status___destroy___0.apply(null, arguments);
    }, Sr = L._emscripten_bind_Status_code_0 = function() {
        return L.asm._emscripten_bind_Status_code_0.apply(null, arguments);
    }, Rr = L._emscripten_bind_Status_error_msg_0 = function() {
        return L.asm._emscripten_bind_Status_error_msg_0.apply(null, arguments);
    }, Gr = L._emscripten_bind_Status_ok_0 = function() {
        return L.asm._emscripten_bind_Status_ok_0.apply(null, arguments);
    }, Or = L._emscripten_bind_VoidPtr___destroy___0 = function() {
        return L.asm._emscripten_bind_VoidPtr___destroy___0.apply(null, arguments);
    }, Mr = L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = function() {
        return L.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM.apply(null, arguments);
    }, jr = L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = function() {
        return L.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM.apply(null, arguments);
    }, wr = L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = function() {
        return L.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM.apply(null, arguments);
    }, Pr = L._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = function() {
        return L.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM.apply(null, arguments);
    }, Cr = L._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function() {
        return L.asm._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE.apply(null, arguments);
    }, Nr = L._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function() {
        return L.asm._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD.apply(null, arguments);
    }, Fr = L._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function() {
        return L.asm._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH.apply(null, arguments);
    }, Ur = L._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function() {
        return L.asm._emscripten_enum_draco_GeometryAttribute_Type_COLOR.apply(null, arguments);
    }, Br = L._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function() {
        return L.asm._emscripten_enum_draco_GeometryAttribute_Type_GENERIC.apply(null, arguments);
    }, zr = L._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function() {
        return L.asm._emscripten_enum_draco_GeometryAttribute_Type_INVALID.apply(null, arguments);
    }, Lr = L._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function() {
        return L.asm._emscripten_enum_draco_GeometryAttribute_Type_NORMAL.apply(null, arguments);
    }, xr = L._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function() {
        return L.asm._emscripten_enum_draco_GeometryAttribute_Type_POSITION.apply(null, arguments);
    }, kr = L._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function() {
        return L.asm._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD.apply(null, arguments);
    }, Vr = L._emscripten_enum_draco_StatusCode_ERROR = function() {
        return L.asm._emscripten_enum_draco_StatusCode_ERROR.apply(null, arguments);
    }, Qr = L._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = function() {
        return L.asm._emscripten_enum_draco_StatusCode_INVALID_PARAMETER.apply(null, arguments);
    }, Hr = L._emscripten_enum_draco_StatusCode_IO_ERROR = function() {
        return L.asm._emscripten_enum_draco_StatusCode_IO_ERROR.apply(null, arguments);
    }, Wr = L._emscripten_enum_draco_StatusCode_OK = function() {
        return L.asm._emscripten_enum_draco_StatusCode_OK.apply(null, arguments);
    }, qr = L._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = function() {
        return L.asm._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION.apply(null, arguments);
    }, Yr = L._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = function() {
        return L.asm._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION.apply(null, arguments);
    }, Xr = L._emscripten_replace_memory = function() {
        return L.asm._emscripten_replace_memory.apply(null, arguments);
    };
    L._free = function() {
        return L.asm._free.apply(null, arguments);
    }, L._llvm_bswap_i32 = function() {
        return L.asm._llvm_bswap_i32.apply(null, arguments);
    };
    var Kr = L._malloc = function() {
        return L.asm._malloc.apply(null, arguments);
    };
    L._memcpy = function() {
        return L.asm._memcpy.apply(null, arguments);
    }, L._memmove = function() {
        return L.asm._memmove.apply(null, arguments);
    }, L._memset = function() {
        return L.asm._memset.apply(null, arguments);
    }, L._sbrk = function() {
        return L.asm._sbrk.apply(null, arguments);
    }, L.establishStackSpace = function() {
        return L.asm.establishStackSpace.apply(null, arguments);
    }, L.getTempRet0 = function() {
        return L.asm.getTempRet0.apply(null, arguments);
    }, L.runPostSets = function() {
        return L.asm.runPostSets.apply(null, arguments);
    };
    var Zr = L.setTempRet0 = function() {
        return L.asm.setTempRet0.apply(null, arguments);
    };
    if (L.setThrew = function() {
        return L.asm.setThrew.apply(null, arguments);
    }, L.stackAlloc = function() {
        return L.asm.stackAlloc.apply(null, arguments);
    }, L.stackRestore = function() {
        return L.asm.stackRestore.apply(null, arguments);
    }, L.stackSave = function() {
        return L.asm.stackSave.apply(null, arguments);
    }, L.dynCall_ii = function() {
        return L.asm.dynCall_ii.apply(null, arguments);
    }, L.dynCall_iii = function() {
        return L.asm.dynCall_iii.apply(null, arguments);
    }, L.dynCall_iiii = function() {
        return L.asm.dynCall_iiii.apply(null, arguments);
    }, L.dynCall_iiiiiii = function() {
        return L.asm.dynCall_iiiiiii.apply(null, arguments);
    }, L.dynCall_v = function() {
        return L.asm.dynCall_v.apply(null, arguments);
    }, L.dynCall_vi = function() {
        return L.asm.dynCall_vi.apply(null, arguments);
    }, L.dynCall_vii = function() {
        return L.asm.dynCall_vii.apply(null, arguments);
    }, L.dynCall_viii = function() {
        return L.asm.dynCall_viii.apply(null, arguments);
    }, L.dynCall_viiii = function() {
        return L.asm.dynCall_viiii.apply(null, arguments);
    }, L.dynCall_viiiii = function() {
        return L.asm.dynCall_viiiii.apply(null, arguments);
    }, L.dynCall_viiiiii = function() {
        return L.asm.dynCall_viiiiii.apply(null, arguments);
    }, L.asm = Ot, L.then = function(t) {
        if (L.calledRun) t(L); else {
            var e = L.onRuntimeInitialized;
            L.onRuntimeInitialized = function() {
                e && e(), t(L);
            };
        }
        return L;
    }, y.prototype = Error(), y.prototype.constructor = y, Et = function t() {
        L.calledRun || f(), L.calledRun || (Et = t);
    }, L.run = f, L.exit = function(t, e) {
        e && L.noExitRuntime && 0 === t || (!L.noExitRuntime && (at = !0, nt = void 0, a(ht), 
        L.onExit) && L.onExit(t), X && process.exit(t), L.quit(t, new y(t)));
    }, L.abort = m, L.preInit) for ("function" == typeof L.preInit && (L.preInit = [ L.preInit ]); 0 < L.preInit.length; ) L.preInit.pop()();
    L.noExitRuntime = !0, f(), d.prototype = Object.create(d.prototype), d.prototype.constructor = d, 
    d.prototype.__class__ = d, d.__cache__ = {}, L.WrapperObject = d, L.getCache = b, 
    L.wrapPointer = h, L.castObject = function(t, e) {
        return h(t.ptr, e);
    }, L.NULL = h(0), L.destroy = function(t) {
        if (!t.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
        t.__destroy__(), delete b(t.__class__)[t.ptr];
    }, L.compare = function(t, e) {
        return t.ptr === e.ptr;
    }, L.getPointer = function(t) {
        return t.ptr;
    }, L.getClass = function(t) {
        return t.__class__;
    };
    var Jr = {
        buffer: 0,
        size: 0,
        pos: 0,
        temps: [],
        needed: 0,
        prepare: function() {
            if (Jr.needed) {
                for (var t = 0; t < Jr.temps.length; t++) L._free(Jr.temps[t]);
                Jr.temps.length = 0, L._free(Jr.buffer), Jr.buffer = 0, Jr.size += Jr.needed, Jr.needed = 0;
            }
            Jr.buffer || (Jr.size += 128, Jr.buffer = L._malloc(Jr.size), r(Jr.buffer)), Jr.pos = 0;
        },
        alloc: function(t, e) {
            return r(Jr.buffer), t = (t = t.length * e.BYTES_PER_ELEMENT) + 7 & -8, Jr.pos + t >= Jr.size ? (r(0 < t), 
            Jr.needed += t, e = L._malloc(t), Jr.temps.push(e)) : (e = Jr.buffer + Jr.pos, Jr.pos += t), 
            e;
        },
        copy: function(t, e, r) {
            switch (e.BYTES_PER_ELEMENT) {
              case 2:
                r >>= 1;
                break;

              case 4:
                r >>= 2;
                break;

              case 8:
                r >>= 3;
            }
            for (var n = 0; n < t.length; n++) e[r + n] = t[n];
        }
    };
    return T.prototype = Object.create(d.prototype), T.prototype.constructor = T, T.prototype.__class__ = T, 
    T.__cache__ = {}, L.Status = T, T.prototype.code = T.prototype.code = function() {
        return Sr(this.ptr);
    }, T.prototype.ok = T.prototype.ok = function() {
        return !!Gr(this.ptr);
    }, T.prototype.error_msg = T.prototype.error_msg = function() {
        return n(Rr(this.ptr));
    }, T.prototype.__destroy__ = T.prototype.__destroy__ = function() {
        gr(this.ptr);
    }, I.prototype = Object.create(d.prototype), I.prototype.constructor = I, I.prototype.__class__ = I, 
    I.__cache__ = {}, L.DracoUInt16Array = I, I.prototype.GetValue = I.prototype.GetValue = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), Pe(e, t);
    }, I.prototype.size = I.prototype.size = function() {
        return Ne(this.ptr);
    }, I.prototype.__destroy__ = I.prototype.__destroy__ = function() {
        Ce(this.ptr);
    }, v.prototype = Object.create(d.prototype), v.prototype.constructor = v, v.prototype.__class__ = v, 
    v.__cache__ = {}, L.PointCloud = v, v.prototype.num_attributes = v.prototype.num_attributes = function() {
        return Er(this.ptr);
    }, v.prototype.num_points = v.prototype.num_points = function() {
        return Dr(this.ptr);
    }, v.prototype.__destroy__ = v.prototype.__destroy__ = function() {
        vr(this.ptr);
    }, E.prototype = Object.create(d.prototype), E.prototype.constructor = E, E.prototype.__class__ = E, 
    E.__cache__ = {}, L.DracoUInt8Array = E, E.prototype.GetValue = E.prototype.GetValue = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), xe(e, t);
    }, E.prototype.size = E.prototype.size = function() {
        return Ve(this.ptr);
    }, E.prototype.__destroy__ = E.prototype.__destroy__ = function() {
        ke(this.ptr);
    }, D.prototype = Object.create(d.prototype), D.prototype.constructor = D, D.prototype.__class__ = D, 
    D.__cache__ = {}, L.DracoUInt32Array = D, D.prototype.GetValue = D.prototype.GetValue = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), Ue(e, t);
    }, D.prototype.size = D.prototype.size = function() {
        return ze(this.ptr);
    }, D.prototype.__destroy__ = D.prototype.__destroy__ = function() {
        Be(this.ptr);
    }, g.prototype = Object.create(d.prototype), g.prototype.constructor = g, g.prototype.__class__ = g, 
    g.__cache__ = {}, L.AttributeOctahedronTransform = g, g.prototype.InitFromAttribute = g.prototype.InitFromAttribute = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), !!jt(e, t);
    }, g.prototype.quantization_bits = g.prototype.quantization_bits = function() {
        return Pt(this.ptr);
    }, g.prototype.__destroy__ = g.prototype.__destroy__ = function() {
        wt(this.ptr);
    }, S.prototype = Object.create(d.prototype), S.prototype.constructor = S, S.prototype.__class__ = S, 
    S.__cache__ = {}, L.PointAttribute = S, S.prototype.size = S.prototype.size = function() {
        return Ar(this.ptr);
    }, S.prototype.GetAttributeTransformData = S.prototype.GetAttributeTransformData = function() {
        return h(cr(this.ptr), R);
    }, S.prototype.attribute_type = S.prototype.attribute_type = function() {
        return yr(this.ptr);
    }, S.prototype.data_type = S.prototype.data_type = function() {
        return dr(this.ptr);
    }, S.prototype.num_components = S.prototype.num_components = function() {
        return hr(this.ptr);
    }, S.prototype.normalized = S.prototype.normalized = function() {
        return !!br(this.ptr);
    }, S.prototype.byte_stride = S.prototype.byte_stride = function() {
        return mr(this.ptr);
    }, S.prototype.byte_offset = S.prototype.byte_offset = function() {
        return fr(this.ptr);
    }, S.prototype.unique_id = S.prototype.unique_id = function() {
        return Tr(this.ptr);
    }, S.prototype.__destroy__ = S.prototype.__destroy__ = function() {
        lr(this.ptr);
    }, R.prototype = Object.create(d.prototype), R.prototype.constructor = R, R.prototype.__class__ = R, 
    R.__cache__ = {}, L.AttributeTransformData = R, R.prototype.transform_type = R.prototype.transform_type = function() {
        return kt(this.ptr);
    }, R.prototype.__destroy__ = R.prototype.__destroy__ = function() {
        xt(this.ptr);
    }, G.prototype = Object.create(d.prototype), G.prototype.constructor = G, G.prototype.__class__ = G, 
    G.__cache__ = {}, L.AttributeQuantizationTransform = G, G.prototype.InitFromAttribute = G.prototype.InitFromAttribute = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), !!Nt(e, t);
    }, G.prototype.quantization_bits = G.prototype.quantization_bits = function() {
        return Bt(this.ptr);
    }, G.prototype.min_value = G.prototype.min_value = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), Ut(e, t);
    }, G.prototype.range = G.prototype.range = function() {
        return zt(this.ptr);
    }, G.prototype.__destroy__ = G.prototype.__destroy__ = function() {
        Ft(this.ptr);
    }, O.prototype = Object.create(d.prototype), O.prototype.constructor = O, O.prototype.__class__ = O, 
    O.__cache__ = {}, L.DracoInt8Array = O, O.prototype.GetValue = O.prototype.GetValue = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), Oe(e, t);
    }, O.prototype.size = O.prototype.size = function() {
        return je(this.ptr);
    }, O.prototype.__destroy__ = O.prototype.__destroy__ = function() {
        Me(this.ptr);
    }, M.prototype = Object.create(d.prototype), M.prototype.constructor = M, M.prototype.__class__ = M, 
    M.__cache__ = {}, L.MetadataQuerier = M, M.prototype.HasEntry = M.prototype.HasEntry = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        !!rr(r, t, e);
    }, M.prototype.HasIntEntry = M.prototype.HasIntEntry = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        !!nr(r, t, e);
    }, M.prototype.GetIntEntry = M.prototype.GetIntEntry = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        $e(r, t, e);
    }, M.prototype.HasDoubleEntry = M.prototype.HasDoubleEntry = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        !!er(r, t, e);
    }, M.prototype.GetDoubleEntry = M.prototype.GetDoubleEntry = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        Ze(r, t, e);
    }, M.prototype.HasStringEntry = M.prototype.HasStringEntry = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        !!or(r, t, e);
    }, M.prototype.GetStringEntry = M.prototype.GetStringEntry = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        n(tr(r, t, e));
    }, M.prototype.NumEntries = M.prototype.NumEntries = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), _r(e, t);
    }, M.prototype.GetEntryName = M.prototype.GetEntryName = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        n(Je(r, t, e));
    }, M.prototype.__destroy__ = M.prototype.__destroy__ = function() {
        ar(this.ptr);
    }, j.prototype = Object.create(d.prototype), j.prototype.constructor = j, j.prototype.__class__ = j, 
    j.__cache__ = {}, L.DracoInt16Array = j, j.prototype.GetValue = j.prototype.GetValue = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), Ie(e, t);
    }, j.prototype.size = j.prototype.size = function() {
        return Ee(this.ptr);
    }, j.prototype.__destroy__ = j.prototype.__destroy__ = function() {
        ve(this.ptr);
    }, w.prototype = Object.create(d.prototype), w.prototype.constructor = w, w.prototype.__class__ = w, 
    w.__cache__ = {}, L.DracoFloat32Array = w, w.prototype.GetValue = w.prototype.GetValue = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), be(e, t);
    }, w.prototype.size = w.prototype.size = function() {
        return Ae(this.ptr);
    }, w.prototype.__destroy__ = w.prototype.__destroy__ = function() {
        he(this.ptr);
    }, P.prototype = Object.create(d.prototype), P.prototype.constructor = P, P.prototype.__class__ = P, 
    P.__cache__ = {}, L.GeometryAttribute = P, P.prototype.__destroy__ = P.prototype.__destroy__ = function() {
        He(this.ptr);
    }, C.prototype = Object.create(d.prototype), C.prototype.constructor = C, C.prototype.__class__ = C, 
    C.__cache__ = {}, L.DecoderBuffer = C, C.prototype.Init = C.prototype.Init = function(t, e) {
        var r = this.ptr;
        if (Jr.prepare(), "object" == typeof t && "object" == typeof t) {
            var n = Jr.alloc(t, Z);
            Jr.copy(t, Z, n), t = n;
        }
        e && "object" == typeof e && (e = e.ptr), Qt(r, t, e);
    }, C.prototype.__destroy__ = C.prototype.__destroy__ = function() {
        Ht(this.ptr);
    }, N.prototype = Object.create(d.prototype), N.prototype.constructor = N, N.prototype.__class__ = N, 
    N.__cache__ = {}, L.Decoder = N, N.prototype.GetEncodedGeometryType = N.prototype.GetEncodedGeometryType = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), ce(e, t);
    }, N.prototype.DecodeBufferToPointCloud = N.prototype.DecodeBufferToPointCloud = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        h(qt(r, t, e), T);
    }, N.prototype.DecodeBufferToMesh = N.prototype.DecodeBufferToMesh = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        h(Wt(r, t, e), T);
    }, N.prototype.GetAttributeId = N.prototype.GetAttributeId = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        te(r, t, e);
    }, N.prototype.GetAttributeIdByName = N.prototype.GetAttributeIdByName = function(t, e) {
        var r = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        $t(r, t, e);
    }, N.prototype.GetAttributeIdByMetadataEntry = N.prototype.GetAttributeIdByMetadataEntry = function(t, e, r) {
        var n = this.ptr;
        return Jr.prepare(), t && "object" == typeof t && (t = t.ptr), e = e && "object" == typeof e ? e.ptr : A(e), 
        r = r && "object" == typeof r ? r.ptr : A(r), Jt(n, t, e, r);
    }, N.prototype.GetAttribute = N.prototype.GetAttribute = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        h(ue(r, t, e), S);
    }, N.prototype.GetAttributeByUniqueId = N.prototype.GetAttributeByUniqueId = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        h(Xt(r, t, e), S);
    }, N.prototype.GetMetadata = N.prototype.GetMetadata = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), h(le(e, t), z);
    }, N.prototype.GetAttributeMetadata = N.prototype.GetAttributeMetadata = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        h(ie(r, t, e), z);
    }, N.prototype.GetFaceFromMesh = N.prototype.GetFaceFromMesh = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!se(n, t, e, r);
    }, N.prototype.GetTriangleStripsFromMesh = N.prototype.GetTriangleStripsFromMesh = function(t, e) {
        var r = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        ye(r, t, e);
    }, N.prototype.GetAttributeFloat = N.prototype.GetAttributeFloat = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!Zt(n, t, e, r);
    }, N.prototype.GetAttributeFloatForAllPoints = N.prototype.GetAttributeFloatForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!Kt(n, t, e, r);
    }, N.prototype.GetAttributeIntForAllPoints = N.prototype.GetAttributeIntForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!oe(n, t, e, r);
    }, N.prototype.GetAttributeInt8ForAllPoints = N.prototype.GetAttributeInt8ForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!ne(n, t, e, r);
    }, N.prototype.GetAttributeUInt8ForAllPoints = N.prototype.GetAttributeUInt8ForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!pe(n, t, e, r);
    }, N.prototype.GetAttributeInt16ForAllPoints = N.prototype.GetAttributeInt16ForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!ee(n, t, e, r);
    }, N.prototype.GetAttributeUInt16ForAllPoints = N.prototype.GetAttributeUInt16ForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!_e(n, t, e, r);
    }, N.prototype.GetAttributeInt32ForAllPoints = N.prototype.GetAttributeInt32ForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!re(n, t, e, r);
    }, N.prototype.GetAttributeUInt32ForAllPoints = N.prototype.GetAttributeUInt32ForAllPoints = function(t, e, r) {
        var n = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), e && "object" == typeof e && (e = e.ptr), 
        r && "object" == typeof r && (r = r.ptr), !!ae(n, t, e, r);
    }, N.prototype.SkipAttributeTransform = N.prototype.SkipAttributeTransform = function(t) {
        var e = this.ptr;
        t && "object" == typeof t && (t = t.ptr), fe(e, t);
    }, N.prototype.__destroy__ = N.prototype.__destroy__ = function() {
        me(this.ptr);
    }, F.prototype = Object.create(d.prototype), F.prototype.constructor = F, F.prototype.__class__ = F, 
    F.__cache__ = {}, L.Mesh = F, F.prototype.num_faces = F.prototype.num_faces = function() {
        return Xe(this.ptr);
    }, F.prototype.num_attributes = F.prototype.num_attributes = function() {
        return Ye(this.ptr);
    }, F.prototype.num_points = F.prototype.num_points = function() {
        return Ke(this.ptr);
    }, F.prototype.__destroy__ = F.prototype.__destroy__ = function() {
        qe(this.ptr);
    }, U.prototype = Object.create(d.prototype), U.prototype.constructor = U, U.prototype.__class__ = U, 
    U.__cache__ = {}, L.VoidPtr = U, U.prototype.__destroy__ = U.prototype.__destroy__ = function() {
        Or(this.ptr);
    }, B.prototype = Object.create(d.prototype), B.prototype.constructor = B, B.prototype.__class__ = B, 
    B.__cache__ = {}, L.DracoInt32Array = B, B.prototype.GetValue = B.prototype.GetValue = function(t) {
        var e = this.ptr;
        return t && "object" == typeof t && (t = t.ptr), ge(e, t);
    }, B.prototype.size = B.prototype.size = function() {
        return Re(this.ptr);
    }, B.prototype.__destroy__ = B.prototype.__destroy__ = function() {
        Se(this.ptr);
    }, z.prototype = Object.create(d.prototype), z.prototype.constructor = z, z.prototype.__class__ = z, 
    z.__cache__ = {}, L.Metadata = z, z.prototype.__destroy__ = z.prototype.__destroy__ = function() {
        ur(this.ptr);
    }, function() {
        function t() {
            L.OK = Wr(), L.ERROR = Vr(), L.IO_ERROR = Hr(), L.INVALID_PARAMETER = Qr(), L.UNSUPPORTED_VERSION = Yr(), 
            L.UNKNOWN_VERSION = qr(), L.INVALID_GEOMETRY_TYPE = Cr(), L.POINT_CLOUD = Nr(), 
            L.TRIANGULAR_MESH = Fr(), L.ATTRIBUTE_INVALID_TRANSFORM = Mr(), L.ATTRIBUTE_NO_TRANSFORM = jr(), 
            L.ATTRIBUTE_QUANTIZATION_TRANSFORM = Pr(), L.ATTRIBUTE_OCTAHEDRON_TRANSFORM = wr(), 
            L.INVALID = zr(), L.POSITION = xr(), L.NORMAL = Lr(), L.COLOR = Ur(), L.TEX_COORD = kr(), 
            L.GENERIC = Br();
        }
        L.calledRun ? t() : bt.unshift(t);
    }(), "function" == typeof L.onModuleParsed && L.onModuleParsed(), t;
};

"object" == typeof exports && "object" == typeof module ? module.exports = e : "function" == typeof define && define.amd ? define([], (function() {
    return e;
})) : "object" == typeof exports && (exports.DracoDecoderModule = e);