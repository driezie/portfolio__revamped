!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = 'undefined' != typeof globalThis ? globalThis : t || self).Lenis =
        e());
})(this, function () {
  'use strict';
  var t = function () {
    return (
      (t =
        Object.assign ||
        function (t) {
          for (var e, i = 1, o = arguments.length; i < o; i++)
            for (var s in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
          return t;
        }),
      t.apply(this, arguments)
    );
  };
  'function' == typeof SuppressedError && SuppressedError;
  function e(t, e, i) {
    return Math.max(t, Math.min(e, i));
  }
  class Animate {
    advance(t) {
      if (!this.isRunning) return;
      let i = !1;
      if (this.lerp)
        (this.value =
          ((o = this.value),
          (s = this.to),
          (n = 60 * this.lerp),
          (r = t),
          (function (t, e, i) {
            return (1 - i) * t + i * e;
          })(o, s, 1 - Math.exp(-n * r)))),
          Math.round(this.value) === this.to &&
            ((this.value = this.to), (i = !0));
      else {
        this.currentTime += t;
        const o = e(0, this.currentTime / this.duration, 1);
        i = o >= 1;
        const s = i ? 1 : this.easing(o);
        this.value = this.from + (this.to - this.from) * s;
      }
      var o, s, n, r;
      this.onUpdate?.(this.value, i), i && this.stop();
    }
    stop() {
      this.isRunning = !1;
    }
    fromTo(
      t,
      e,
      {
        lerp: i = 0.1,
        duration: o = 1,
        easing: s = (t) => t,
        onStart: n,
        onUpdate: r,
      }
    ) {
      (this.from = this.value = t),
        (this.to = e),
        (this.lerp = i),
        (this.duration = o),
        (this.easing = s),
        (this.currentTime = 0),
        (this.isRunning = !0),
        n?.(),
        (this.onUpdate = r);
    }
  }
  class Dimensions {
    constructor({
      wrapper: t,
      content: e,
      autoResize: i = !0,
      debounce: o = 250,
    } = {}) {
      (this.wrapper = t),
        (this.content = e),
        i &&
          ((this.debouncedResize = (function (t, e) {
            let i;
            return function () {
              let o = arguments,
                s = this;
              clearTimeout(i),
                (i = setTimeout(function () {
                  t.apply(s, o);
                }, e));
            };
          })(this.resize, o)),
          this.wrapper === window
            ? window.addEventListener('resize', this.debouncedResize, !1)
            : ((this.wrapperResizeObserver = new ResizeObserver(
                this.debouncedResize
              )),
              this.wrapperResizeObserver.observe(this.wrapper)),
          (this.contentResizeObserver = new ResizeObserver(
            this.debouncedResize
          )),
          this.contentResizeObserver.observe(this.content)),
        this.resize();
    }
    destroy() {
      this.wrapperResizeObserver?.disconnect(),
        this.contentResizeObserver?.disconnect(),
        window.removeEventListener('resize', this.debouncedResize, !1);
    }
    resize = () => {
      this.onWrapperResize(), this.onContentResize();
    };
    onWrapperResize = () => {
      this.wrapper === window
        ? ((this.width = window.innerWidth), (this.height = window.innerHeight))
        : ((this.width = this.wrapper.clientWidth),
          (this.height = this.wrapper.clientHeight));
    };
    onContentResize = () => {
      this.wrapper === window
        ? ((this.scrollHeight = this.content.scrollHeight),
          (this.scrollWidth = this.content.scrollWidth))
        : ((this.scrollHeight = this.wrapper.scrollHeight),
          (this.scrollWidth = this.wrapper.scrollWidth));
    };
    get limit() {
      return {
        x: this.scrollWidth - this.width,
        y: this.scrollHeight - this.height,
      };
    }
  }
  class Emitter {
    constructor() {
      this.events = {};
    }
    emit(t, ...e) {
      let i = this.events[t] || [];
      for (let t = 0, o = i.length; t < o; t++) i[t](...e);
    }
    on(t, e) {
      return (
        this.events[t]?.push(e) || (this.events[t] = [e]),
        () => {
          this.events[t] = this.events[t]?.filter((t) => e !== t);
        }
      );
    }
    off(t, e) {
      this.events[t] = this.events[t]?.filter((t) => e !== t);
    }
    destroy() {
      this.events = {};
    }
  }
  const i = 100 / 6;
  class VirtualScroll {
    constructor(t, { wheelMultiplier: e = 1, touchMultiplier: i = 1 }) {
      (this.element = t),
        (this.wheelMultiplier = e),
        (this.touchMultiplier = i),
        (this.touchStart = { x: null, y: null }),
        (this.emitter = new Emitter()),
        window.addEventListener('resize', this.onWindowResize, !1),
        this.onWindowResize(),
        this.element.addEventListener('wheel', this.onWheel, { passive: !1 }),
        this.element.addEventListener('touchstart', this.onTouchStart, {
          passive: !1,
        }),
        this.element.addEventListener('touchmove', this.onTouchMove, {
          passive: !1,
        }),
        this.element.addEventListener('touchend', this.onTouchEnd, {
          passive: !1,
        });
    }
    on(t, e) {
      return this.emitter.on(t, e);
    }
    destroy() {
      this.emitter.destroy(),
        window.removeEventListener('resize', this.onWindowResize, !1),
        this.element.removeEventListener('wheel', this.onWheel, {
          passive: !1,
        }),
        this.element.removeEventListener('touchstart', this.onTouchStart, {
          passive: !1,
        }),
        this.element.removeEventListener('touchmove', this.onTouchMove, {
          passive: !1,
        }),
        this.element.removeEventListener('touchend', this.onTouchEnd, {
          passive: !1,
        });
    }
    onTouchStart = (t) => {
      const { clientX: e, clientY: i } = t.targetTouches
        ? t.targetTouches[0]
        : t;
      (this.touchStart.x = e),
        (this.touchStart.y = i),
        (this.lastDelta = { x: 0, y: 0 }),
        this.emitter.emit('scroll', { deltaX: 0, deltaY: 0, event: t });
    };
    onTouchMove = (t) => {
      const { clientX: e, clientY: i } = t.targetTouches
          ? t.targetTouches[0]
          : t,
        o = -(e - this.touchStart.x) * this.touchMultiplier,
        s = -(i - this.touchStart.y) * this.touchMultiplier;
      (this.touchStart.x = e),
        (this.touchStart.y = i),
        (this.lastDelta = { x: o, y: s }),
        this.emitter.emit('scroll', { deltaX: o, deltaY: s, event: t });
    };
    onTouchEnd = (t) => {
      this.emitter.emit('scroll', {
        deltaX: this.lastDelta.x,
        deltaY: this.lastDelta.y,
        event: t,
      });
    };
    onWheel = (t) => {
      let { deltaX: e, deltaY: o, deltaMode: s } = t;
      (e *= 1 === s ? i : 2 === s ? this.windowWidth : 1),
        (o *= 1 === s ? i : 2 === s ? this.windowHeight : 1),
        (e *= this.wheelMultiplier),
        (o *= this.wheelMultiplier),
        this.emitter.emit('scroll', { deltaX: e, deltaY: o, event: t });
    };
    onWindowResize = () => {
      (this.windowWidth = window.innerWidth),
        (this.windowHeight = window.innerHeight);
    };
  }
  var o = (function () {
    function i(e) {
      var i = void 0 === e ? {} : e,
        o = i.wrapper,
        s = void 0 === o ? window : o,
        n = i.content,
        r = void 0 === n ? document.documentElement : n,
        l = i.wheelEventsTarget,
        h = void 0 === l ? s : l,
        a = i.eventsTarget,
        c = void 0 === a ? h : a,
        p = i.smoothWheel,
        u = void 0 === p || p,
        d = i.syncTouch,
        m = void 0 !== d && d,
        v = i.syncTouchLerp,
        f = void 0 === v ? 0.075 : v,
        g = i.touchInertiaMultiplier,
        S = void 0 === g ? 35 : g,
        w = i.duration,
        y = i.easing,
        b =
          void 0 === y
            ? function (t) {
                return Math.min(1, 1.001 - Math.pow(2, -10 * t));
              }
            : y,
        _ = i.lerp,
        z = void 0 === _ ? !w && 0.1 : _,
        E = i.infinite,
        T = void 0 !== E && E,
        L = i.orientation,
        M = void 0 === L ? 'vertical' : L,
        R = i.gestureOrientation,
        O = void 0 === R ? 'vertical' : R,
        W = i.touchMultiplier,
        x = void 0 === W ? 1 : W,
        H = i.wheelMultiplier,
        N = void 0 === H ? 1 : H,
        k = i.autoResize,
        C = void 0 === k || k,
        j = i.__experimental__naiveDimensions,
        P = void 0 !== j && j,
        D = this;
      (this.__isSmooth = !1),
        (this.__isScrolling = !1),
        (this.__isStopped = !1),
        (this.__isLocked = !1),
        (this.onVirtualScroll = function (e) {
          var i = e.deltaX,
            o = e.deltaY,
            s = e.event;
          if (!s.ctrlKey) {
            var n = s.type.includes('touch'),
              r = s.type.includes('wheel');
            if (
              D.options.syncTouch &&
              n &&
              'touchstart' === s.type &&
              !D.isStopped &&
              !D.isLocked
            )
              D.reset();
            else {
              var l = 0 === i && 0 === o,
                h =
                  ('vertical' === D.options.gestureOrientation && 0 === o) ||
                  ('horizontal' === D.options.gestureOrientation && 0 === i);
              if (!l && !h) {
                var a = s.composedPath();
                if (
                  !(a = a.slice(0, a.indexOf(D.rootElement))).find(function (
                    t
                  ) {
                    var e, i, o, s, l;
                    return (
                      (null === (e = t.hasAttribute) || void 0 === e
                        ? void 0
                        : e.call(t, 'data-lenis-prevent')) ||
                      (n &&
                        (null === (i = t.hasAttribute) || void 0 === i
                          ? void 0
                          : i.call(t, 'data-lenis-prevent-touch'))) ||
                      (r &&
                        (null === (o = t.hasAttribute) || void 0 === o
                          ? void 0
                          : o.call(t, 'data-lenis-prevent-wheel'))) ||
                      ((null === (s = t.classList) || void 0 === s
                        ? void 0
                        : s.contains('lenis')) &&
                        !(null === (l = t.classList) || void 0 === l
                          ? void 0
                          : l.contains('lenis-stopped')))
                    );
                  })
                )
                  if (D.isStopped || D.isLocked) s.preventDefault();
                  else {
                    if (
                      ((D.isSmooth =
                        (D.options.syncTouch && n) ||
                        (D.options.smoothWheel && r)),
                      !D.isSmooth)
                    )
                      return (D.isScrolling = !1), void D.animate.stop();
                    s.preventDefault();
                    var c = o;
                    'both' === D.options.gestureOrientation
                      ? (c = Math.abs(o) > Math.abs(i) ? o : i)
                      : 'horizontal' === D.options.gestureOrientation &&
                        (c = i);
                    var p = n && D.options.syncTouch,
                      u = n && 'touchend' === s.type && Math.abs(c) > 5;
                    u && (c = D.velocity * D.options.touchInertiaMultiplier),
                      D.scrollTo(
                        D.targetScroll + c,
                        t(
                          { programmatic: !1 },
                          p
                            ? { lerp: u ? D.options.syncTouchLerp : 1 }
                            : {
                                lerp: D.options.lerp,
                                duration: D.options.duration,
                                easing: D.options.easing,
                              }
                        )
                      );
                  }
              }
            }
          }
        }),
        (this.onNativeScroll = function () {
          if (!D.__preventNextScrollEvent && !D.isScrolling) {
            var t = D.animatedScroll;
            (D.animatedScroll = D.targetScroll = D.actualScroll),
              (D.velocity = 0),
              (D.direction = Math.sign(D.animatedScroll - t)),
              D.emit();
          }
        }),
        (window.lenisVersion = '1.0.44'),
        (s !== document.documentElement && s !== document.body) || (s = window),
        (this.options = {
          wrapper: s,
          content: r,
          wheelEventsTarget: h,
          eventsTarget: c,
          smoothWheel: u,
          syncTouch: m,
          syncTouchLerp: f,
          touchInertiaMultiplier: S,
          duration: w,
          easing: b,
          lerp: z,
          infinite: T,
          gestureOrientation: O,
          orientation: M,
          touchMultiplier: x,
          wheelMultiplier: N,
          autoResize: C,
          __experimental__naiveDimensions: P,
        }),
        (this.animate = new Animate()),
        (this.emitter = new Emitter()),
        (this.dimensions = new Dimensions({
          wrapper: s,
          content: r,
          autoResize: C,
        })),
        this.toggleClassName('lenis', !0),
        (this.velocity = 0),
        (this.isLocked = !1),
        (this.isStopped = !1),
        (this.isSmooth = m || u),
        (this.isScrolling = !1),
        (this.targetScroll = this.animatedScroll = this.actualScroll),
        this.options.wrapper.addEventListener(
          'scroll',
          this.onNativeScroll,
          !1
        ),
        (this.virtualScroll = new VirtualScroll(c, {
          touchMultiplier: x,
          wheelMultiplier: N,
        })),
        this.virtualScroll.on('scroll', this.onVirtualScroll);
    }
    return (
      (i.prototype.destroy = function () {
        this.emitter.destroy(),
          this.options.wrapper.removeEventListener(
            'scroll',
            this.onNativeScroll,
            !1
          ),
          this.virtualScroll.destroy(),
          this.dimensions.destroy(),
          this.toggleClassName('lenis', !1),
          this.toggleClassName('lenis-smooth', !1),
          this.toggleClassName('lenis-scrolling', !1),
          this.toggleClassName('lenis-stopped', !1),
          this.toggleClassName('lenis-locked', !1);
      }),
      (i.prototype.on = function (t, e) {
        return this.emitter.on(t, e);
      }),
      (i.prototype.off = function (t, e) {
        return this.emitter.off(t, e);
      }),
      (i.prototype.setScroll = function (t) {
        this.isHorizontal
          ? (this.rootElement.scrollLeft = t)
          : (this.rootElement.scrollTop = t);
      }),
      (i.prototype.resize = function () {
        this.dimensions.resize();
      }),
      (i.prototype.emit = function () {
        this.emitter.emit('scroll', this);
      }),
      (i.prototype.reset = function () {
        (this.isLocked = !1),
          (this.isScrolling = !1),
          (this.animatedScroll = this.targetScroll = this.actualScroll),
          (this.velocity = 0),
          this.animate.stop();
      }),
      (i.prototype.start = function () {
        this.isStopped && ((this.isStopped = !1), this.reset());
      }),
      (i.prototype.stop = function () {
        this.isStopped ||
          ((this.isStopped = !0), this.animate.stop(), this.reset());
      }),
      (i.prototype.raf = function (t) {
        var e = t - (this.time || t);
        (this.time = t), this.animate.advance(0.001 * e);
      }),
      (i.prototype.scrollTo = function (t, i) {
        var o = this,
          s = void 0 === i ? {} : i,
          n = s.offset,
          r = void 0 === n ? 0 : n,
          l = s.immediate,
          h = void 0 !== l && l,
          a = s.lock,
          c = void 0 !== a && a,
          p = s.duration,
          u = void 0 === p ? this.options.duration : p,
          d = s.easing,
          m = void 0 === d ? this.options.easing : d,
          v = s.lerp,
          f = void 0 === v ? !u && this.options.lerp : v,
          g = s.onComplete,
          S = s.force,
          w = void 0 !== S && S,
          y = s.programmatic,
          b = void 0 === y || y;
        if ((!this.isStopped && !this.isLocked) || w) {
          if (['top', 'left', 'start'].includes(t)) t = 0;
          else if (['bottom', 'right', 'end'].includes(t)) t = this.limit;
          else {
            var _ = void 0;
            if (
              ('string' == typeof t
                ? (_ = document.querySelector(t))
                : (null == t ? void 0 : t.nodeType) && (_ = t),
              _)
            ) {
              if (this.options.wrapper !== window) {
                var z = this.options.wrapper.getBoundingClientRect();
                r -= this.isHorizontal ? z.left : z.top;
              }
              var E = _.getBoundingClientRect();
              t = (this.isHorizontal ? E.left : E.top) + this.animatedScroll;
            }
          }
          if ('number' == typeof t) {
            if (
              ((t += r),
              (t = Math.round(t)),
              this.options.infinite
                ? b && (this.targetScroll = this.animatedScroll = this.scroll)
                : (t = e(0, t, this.limit)),
              h)
            )
              return (
                (this.animatedScroll = this.targetScroll = t),
                this.setScroll(this.scroll),
                this.reset(),
                void (null == g || g(this))
              );
            if (!b) {
              if (t === this.targetScroll) return;
              this.targetScroll = t;
            }
            this.animate.fromTo(this.animatedScroll, t, {
              duration: u,
              easing: m,
              lerp: f,
              onStart: function () {
                c && (o.isLocked = !0), (o.isScrolling = !0);
              },
              onUpdate: function (t, e) {
                (o.isScrolling = !0),
                  (o.velocity = t - o.animatedScroll),
                  (o.direction = Math.sign(o.velocity)),
                  (o.animatedScroll = t),
                  o.setScroll(o.scroll),
                  b && (o.targetScroll = t),
                  e || o.emit(),
                  e &&
                    (o.reset(),
                    o.emit(),
                    null == g || g(o),
                    (o.__preventNextScrollEvent = !0),
                    requestAnimationFrame(function () {
                      delete o.__preventNextScrollEvent;
                    }));
              },
            });
          }
        }
      }),
      Object.defineProperty(i.prototype, 'rootElement', {
        get: function () {
          return this.options.wrapper === window
            ? document.documentElement
            : this.options.wrapper;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'limit', {
        get: function () {
          return this.options.__experimental__naiveDimensions
            ? this.isHorizontal
              ? this.rootElement.scrollWidth - this.rootElement.clientWidth
              : this.rootElement.scrollHeight - this.rootElement.clientHeight
            : this.dimensions.limit[this.isHorizontal ? 'x' : 'y'];
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'isHorizontal', {
        get: function () {
          return 'horizontal' === this.options.orientation;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'actualScroll', {
        get: function () {
          return this.isHorizontal
            ? this.rootElement.scrollLeft
            : this.rootElement.scrollTop;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'scroll', {
        get: function () {
          return this.options.infinite
            ? ((t = this.animatedScroll), (e = this.limit), ((t % e) + e) % e)
            : this.animatedScroll;
          var t, e;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'progress', {
        get: function () {
          return 0 === this.limit ? 1 : this.scroll / this.limit;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'isSmooth', {
        get: function () {
          return this.__isSmooth;
        },
        set: function (t) {
          this.__isSmooth !== t &&
            ((this.__isSmooth = t), this.toggleClassName('lenis-smooth', t));
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'isScrolling', {
        get: function () {
          return this.__isScrolling;
        },
        set: function (t) {
          this.__isScrolling !== t &&
            ((this.__isScrolling = t),
            this.toggleClassName('lenis-scrolling', t));
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'isStopped', {
        get: function () {
          return this.__isStopped;
        },
        set: function (t) {
          this.__isStopped !== t &&
            ((this.__isStopped = t), this.toggleClassName('lenis-stopped', t));
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'isLocked', {
        get: function () {
          return this.__isLocked;
        },
        set: function (t) {
          this.__isLocked !== t &&
            ((this.__isLocked = t), this.toggleClassName('lenis-locked', t));
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(i.prototype, 'className', {
        get: function () {
          var t = 'lenis';
          return (
            this.isStopped && (t += ' lenis-stopped'),
            this.isLocked && (t += ' lenis-locked'),
            this.isScrolling && (t += ' lenis-scrolling'),
            this.isSmooth && (t += ' lenis-smooth'),
            t
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (i.prototype.toggleClassName = function (t, e) {
        this.rootElement.classList.toggle(t, e),
          this.emitter.emit('className change', this);
      }),
      i
    );
  })();
  return o;
});
//# sourceMappingURL=lenis.min.js.map
