!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.LazyLoadImg = e()
}(this, function () {
    "use strict";
    var t = function (t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = t.getBoundingClientRect(), r = t.offsetWidth, n = t.offsetHeight, i = window.innerWidth, a = window.innerHeight, s = !(o.right - e.left <= 0 && o.left + r - e.left <= 0 || o.left + e.right >= i && o.right + e.right >= r + i), c = !(o.bottom - e.top <= 0 && o.top + n - e.top <= 0 || o.top + e.bottom >= a && o.bottom + e.bottom >= n + a);
        return 0 != t.width && 0 != t.height && s && c
    }, e = document.createElement("canvas");
    e.getContext("2d").globalAlpha = 0;
    var o = {}, r = function (t, r, n) {
        if (o[t])return o[t];
        e.width = r, e.height = n;
        var i = e.toDataURL("image/png");
        return o[t] = i, i
    }, n = function (t, e) {
        if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
    }, i = function () {
        function t(t, e) {
            for (var o = 0; o < e.length; o++) {
                var r = e[o];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
            }
        }

        return function (e, o, r) {
            return o && t(e.prototype, o), r && t(e, r), e
        }
    }(), a = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                for (var r in o)Object.prototype.hasOwnProperty.call(o, r) && (t[r] = o[r])
            }
            return t
        }, s = function () {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            n(this, e);
            var o = 0, r = 0;
            this.options = {
                el: document.querySelector("body"),
                mode: "default",
                time: 300,
                resolve: !0,
                diy: {backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center center"},
                errorImage: "./images/error.png",
                position: {top: 0, right: 0, bottom: 0, left: 0},
                before: function () {
                },
                success: function () {
                    o++
                },
                error: function (t) {
                    r++, t.src = this.options.errorImage
                },
                complete: function () {
                    console.log("complete"), console.log("success " + o), console.log("failed " + r)
                }
            }, t.position = a({}, this.options.position, t.position), t.diy = a({}, this.options.diy, t.diy), a(this.options, t), this._timer = !0, this.start()
        }

        return i(e, [{
            key: "start", value: function () {
                var e = this, o = this.options;
                clearTimeout(this._timer), this._timer && (this._timer = setTimeout(function () {
                    var r = Array.prototype.slice.apply(o.el.querySelectorAll("[data-src]"));
                    return !r.length && o.resolve ? (clearTimeout(e._timer), o.complete.call()) : (r.forEach(function (r) {
                        !r.dataset.LazyLoadImgState && t(r, o.position) && e.loadImg(r)
                    }), void e.start())
                }, o.time))
            }
        }, {
            key: "loadImg", value: function (t) {
                var e = this, o = this.options;
                t.dataset.LazyLoadImgState = "start", o.before.call(this, t);
                var n = new Image;
                n.src = t.dataset.src, n.addEventListener("load", function () {
                    return "diy" == o.mode ? (t.src = r(t.src, t.width, t.height), o.diy.backgroundImage = "url(" + n.src + ")", a(t.style, o.diy)) : t.src = n.src, delete t.dataset.src, t.dataset.LazyLoadImgState = "success", o.success.call(e, t)
                }, !1), n.addEventListener("error", function () {
                    delete t.dataset.src, t.dataset.LazyLoadImgState = "error", o.error.call(e, t)
                }, !1)
            }
        }, {
            key: "destroy", value: function () {
                delete this._timer
            }
        }]), e
    }();
    return s
});
