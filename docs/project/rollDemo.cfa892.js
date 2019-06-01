webpackJsonp(
  ['rollDemo'],
  {
    '3IRH': function(e, t, n) {
      e.exports = n('RuJ5')('3IRH')
    },
    '5a3U': function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0)
      var r = (function(e) {
        {
          if (e && e.__esModule) return e
          var t = {}
          if (null != e)
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
          return (t.default = e), t
        }
      })(n('+sPD')).random
      t.default = function e(t, n) {
        var o = this
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        })(this, e),
          (this.judge = function(e) {
            return Math.floor((e % o.total) / o.per)
          }),
          (this.knock = function(e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = o.per / 2,
              i = e * o.per + n
            return t ? i : r(i - n, i + n)
          }),
          Object.assign(this, { total: t, count: n }),
          (this.per = t / n)
      }
    },
    '8S4j': function(e, t, n) {
      'use strict'
      ;(function(e) {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = void 0)
        var r,
          o,
          i = (function() {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n]
                ;(r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r)
              }
            }
            return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
            }
          })(),
          a = n('GiK3'),
          l = (o = a) && o.__esModule ? o : { default: o },
          u = (function(e) {
            {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e)
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
              return (t.default = e), t
            }
          })(n('+sPD'))
        n('CHtH')
        var s =
          u.hot(e)(
            (r = (function(e) {
              function t() {
                return (
                  (function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, t),
                  (function(e, t) {
                    if (!e)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !t ||
                      ('object' != typeof t && 'function' != typeof t)
                      ? e
                      : t
                  })(
                    this,
                    (t.__proto__ || Object.getPrototypeOf(t)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function(e, t) {
                  if ('function' != typeof t && null !== t)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof t
                    )
                  ;(e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0
                    }
                  })),
                    t &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(e, t)
                        : (e.__proto__ = t))
                })(t, a.Component),
                i(t, [
                  {
                    key: 'render',
                    value: function() {
                      return l.default.createElement(
                        'div',
                        { className: 'content' },
                        l.default.createElement('div', {
                          className: 'roll',
                          style: {
                            transform:
                              'rotate(' + (22.5 - this.props.deg) + 'deg)'
                          }
                        }),
                        l.default.createElement('div', {
                          className: 'line',
                          style: {
                            transform:
                              'rotate(' + (this.props.deg + 22.5) + 'deg)'
                          }
                        })
                      )
                    }
                  }
                ]),
                t
              )
            })())
          ) || r
        t.default = s
      }.call(t, n('3IRH')(e)))
    },
    BXar: function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0)
      var r = n('+sPD')
      t.default = function e() {
        var t = this,
          n = (arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : {}
          ).speed,
          o = void 0 === n ? 0 : n
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        })(this, e),
          (this.__distance__reach__listener__info = {}),
          (this.onDistanceReach = function(e, n) {
            t.__distance__reach__listener__info = { value: e, listener: n }
          }),
          (this.__running__listener = []),
          (this.onRunning = function(e) {
            t.__running__listener.push(e)
          }),
          (this.setDistance = function(e) {
            var n = t.distance
            ;(t.distance = e),
              t.distance !== n &&
                (t.distance >=
                  (0, r.get)(t.__distance__reach__listener__info, 'value', 0) &&
                  setTimeout(function() {
                    ;(0,
                    r.run)(t.__distance__reach__listener__info, 'listener', t.distance)
                    try {
                      delete t.__distance__reach__listener__info.listener
                    } catch (e) {}
                  }),
                t.__running__listener.forEach(function(e) {
                  return (0, r.run)(e, void 0, t.distance)
                }))
          }),
          (this.__is__running = !1),
          (this.__run = function() {
            var e = Date.now()
            t.__stop = r.defaultFrameProcess.start(function() {
              var n = Date.now()
              if (t.speed > 0) {
                var r = t.speed * (n - e) / 1e3
                t.setDistance(t.distance + r)
              }
              e = n
            })
          }),
          (this.start = function() {
            ;(t.__is__running = !0), t.__run()
          }),
          (this.stop = function() {
            ;(t.__is__running = !1), (0, r.run)(t.__stop)
          }),
          Object.assign(this, { speed: o }),
          (this.distance = 0)
      }
    },
    CHtH: function(e, t) {},
    DuR2: function(e, t, n) {
      e.exports = n('ldvi')('DuR2')
    },
    Eacs: function(e, t, n) {
      e.exports = n('RuJ5')('Eacs')
    },
    'FZ+f': function(e, t, n) {
      e.exports = n('RuJ5')('FZ+f')
    },
    FwUZ: function(e, t, n) {
      e.exports = n('a+K2')('FwUZ')
    },
    GiK3: function(e, t, n) {
      e.exports = n('ldvi')('GiK3')
    },
    KSGD: function(e, t, n) {
      e.exports = n('ldvi')('KSGD')
    },
    MTIv: function(e, t, n) {
      e.exports = n('RuJ5')('MTIv')
    },
    O27J: function(e, t, n) {
      e.exports = n('ldvi')('O27J')
    },
    RuJ5: function(e, t) {
      e.exports = polyfill_7040c53544f95c7ea1ff
    },
    TSMP: function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0)
      var r,
        o = (function(e) {
          {
            if (e && e.__esModule) return e
            var t = {}
            if (null != e)
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
            return (t.default = e), t
          }
        })(n('+sPD')),
        i = n('BXar'),
        a = (r = i) && r.__esModule ? r : { default: r }
      var l = o.run,
        u = (o.get, o.value, o.Tween)
      t.default = function e() {
        var t = this
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        })(this, e),
          (this.__runner = new a.default()),
          (this.onRolling = function(e) {
            t.__runner.onRunning(function(t) {
              l(e, void 0, t % 360, t)
            })
          }),
          (this.__rolling = !1),
          (this.roll = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 1080,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              r = n.duration,
              o = void 0 === r ? 2e3 : r,
              i = n.ease
            t.__rolling ||
              ((t.__rolling = !0),
              t.__runner.start(),
              new u({ from: 0, to: e, duration: o, ease: i })
                .on('update', function(e) {
                  t.__runner.speed = e
                })
                .start())
          }),
          (this.stop = function(e) {
            for (
              var n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                r = n.duration,
                o = void 0 === r ? 1e4 : r,
                i = n.ease,
                a =
                  void 0 === i
                    ? function(e) {
                        return Math.pow(e - 1, 3) + 1
                      }
                    : i,
                s = n.onEnd,
                c = 5 * o / 5,
                f = a(1e-4) / 1e-4,
                _ = c * t.__runner.speed / 1e3 / f,
                d = e - _;
              d < t.__runner.distance;

            )
              d += 360
            t.__runner.onDistanceReach(d, function(e) {
              ;(t.__runner.speed = 0),
                new u({ from: e, to: d + _, ease: a, duration: c })
                  .on('update', t.__runner.setDistance)
                  .on('end', function() {
                    l(s, void 0), t.__runner.stop(), (t.__rolling = !1)
                  })
                  .start()
            })
          })
      }
    },
    'a+K2': function(e, t) {
      e.exports = helpers_c66fb19f003fc0979f45
    },
    aqeD: function(e, t, n) {
      'use strict'
      n('kQ6M'), n('FZ+f'), n('MTIv')
      var r = a(n('GiK3')),
        o = n('O27J'),
        i = a(n('oBI5'))
      function a(e) {
        return e && e.__esModule ? e : { default: e }
      }
      ;(document.getElementsByTagName('title')[0].innerHTML = 'Roll Demo'),
        (0, o.render)(
          r.default.createElement(i.default, null),
          document.getElementById('root')
        )
    },
    cIrB: function(e, t, n) {
      e.exports = n('RuJ5')('cIrB')
    },
    cTlZ: function(e, t) {},
    gttC: function(e, t) {},
    j1ja: function(e, t, n) {
      e.exports = n('RuJ5')('j1ja')
    },
    ldvi: function(e, t) {
      e.exports = react_6869fe7fa65021e0953a
    },
    oBI5: function(e, t, n) {
      'use strict'
      ;(function(e) {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default = void 0)
        var r,
          o = (function() {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n]
                ;(r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r)
              }
            }
            return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
            }
          })(),
          i = n('GiK3'),
          a = d(i),
          l = (function(e) {
            {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e)
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
              return (t.default = e), t
            }
          })(n('+sPD')),
          u = n('bD/M'),
          s = (d(u), d(n('8S4j'))),
          c = d(n('zEw8')),
          f = d(n('TSMP')),
          _ = d(n('5a3U'))
        function d(e) {
          return e && e.__esModule ? e : { default: e }
        }
        function p(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          return !t || ('object' != typeof t && 'function' != typeof t) ? e : t
        }
        n('cTlZ'),
          (window.Roller = f.default),
          (window.Divider = _.default),
          (window.helpers = l)
        var h = l.random,
          v =
            l.hot(e)(
              (r = (function(e) {
                function t() {
                  var e, n, r
                  !(function(e, t) {
                    if (!(e instanceof t))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, t)
                  for (
                    var o = arguments.length, i = Array(o), a = 0;
                    a < o;
                    a++
                  )
                    i[a] = arguments[a]
                  return (
                    (n = r = p(
                      this,
                      (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                        e,
                        [this].concat(i)
                      )
                    )),
                    (r.state = { deg: 0, stopAt: void 0 }),
                    (r.__roller = new f.default()),
                    (r.__divider = new _.default(360, 8)),
                    (r.__roller__stopping = !1),
                    (r.roll = function() {
                      r.__roller.__rolling ||
                        r.setState({ stopAt: void 0 }, function() {
                          return r.__roller.roll()
                        })
                    }),
                    (r.stop = function() {
                      r.__roller__stopping ||
                        ((r.__roller__stopping = !0),
                        r.setState({ stopAt: h(0, 360) }, function() {
                          r.__roller.stop(r.state.stopAt, {
                            onEnd: function() {
                              r.__roller__stopping = !1
                            }
                          })
                        }))
                    }),
                    p(r, n)
                  )
                }
                return (
                  (function(e, t) {
                    if ('function' != typeof t && null !== t)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof t
                      )
                    ;(e.prototype = Object.create(t && t.prototype, {
                      constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                      }
                    })),
                      t &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(e, t)
                          : (e.__proto__ = t))
                  })(t, i.Component),
                  o(t, [
                    {
                      key: 'componentDidMount',
                      value: function() {
                        var e = this
                        this.__roller.onRolling(function(t) {
                          return e.setState({ deg: t })
                        }),
                          this.roll(),
                          (window.roller = this.__roller)
                      }
                    },
                    {
                      key: 'render',
                      value: function() {
                        return a.default.createElement(
                          u.View,
                          null,
                          a.default.createElement(
                            u.ScrollView,
                            null,
                            a.default.createElement(s.default, {
                              deg: this.state.deg
                            }),
                            a.default.createElement(c.default, {
                              deg: this.state.deg
                            }),
                            a.default.createElement(
                              'button',
                              { onClick: this.roll },
                              'Roll'
                            ),
                            a.default.createElement(
                              'button',
                              { onClick: this.stop },
                              'Stop'
                            ),
                            a.default.createElement(
                              'div',
                              null,
                              'Now At Block ',
                              this.__divider.judge(this.state.deg),
                              ' (',
                              (this.state.deg + 292.5) % 360,
                              ')'
                            ),
                            this.state.stopAt &&
                              a.default.createElement(
                                'div',
                                null,
                                'Stop At Block ',
                                this.__divider.judge(this.state.stopAt),
                                ' (',
                                (this.state.stopAt + 292.5) % 360,
                                ')'
                              )
                          )
                        )
                      }
                    }
                  ]),
                  t
                )
              })())
            ) || r
        t.default = v
      }.call(t, n('3IRH')(e)))
    },
    'w/50': function(e, t, n) {
      e.exports = n('RuJ5')('w/50')
    },
    zEw8: function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0)
      var r = (function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        })(),
        o = n('GiK3'),
        i = u(o),
        a = (function(e) {
          {
            if (e && e.__esModule) return e
            var t = {}
            if (null != e)
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
            return (t.default = e), t
          }
        })(n('+sPD'))
      n('gttC')
      var l = u(n('5a3U'))
      function u(e) {
        return e && e.__esModule ? e : { default: e }
      }
      function s(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          )
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t
      }
      var c = a.classnames,
        f = (function(e) {
          function t() {
            var e, n, r
            !(function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function')
            })(this, t)
            for (var o = arguments.length, i = Array(o), a = 0; a < o; a++)
              i[a] = arguments[a]
            return (
              (n = r = s(
                this,
                (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                  e,
                  [this].concat(i)
                )
              )),
              (r.__divider = new l.default(360, 8)),
              s(r, n)
            )
          }
          return (
            (function(e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof t
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0
                }
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t))
            })(t, o.Component),
            r(t, [
              {
                key: 'render',
                value: function() {
                  var e = this.__divider.judge(this.props.deg)
                  return i.default.createElement(
                    'ul',
                    { className: 'grid-content' },
                    i.default.createElement(
                      'li',
                      { className: c({ active: 0 === e }) },
                      '0'
                    ),
                    i.default.createElement(
                      'li',
                      { className: c({ active: 1 === e }) },
                      '1'
                    ),
                    i.default.createElement(
                      'li',
                      { className: c({ active: 2 === e }) },
                      '2'
                    ),
                    i.default.createElement(
                      'li',
                      { className: c({ active: 7 === e }) },
                      '7'
                    ),
                    i.default.createElement(
                      'li',
                      { className: 'hidden' },
                      'empty'
                    ),
                    i.default.createElement(
                      'li',
                      { className: c({ active: 3 === e }) },
                      '3'
                    ),
                    i.default.createElement(
                      'li',
                      { className: c({ active: 6 === e }) },
                      '6'
                    ),
                    i.default.createElement(
                      'li',
                      { className: c({ active: 5 === e }) },
                      '5'
                    ),
                    i.default.createElement(
                      'li',
                      { className: c({ active: 4 === e }) },
                      '4'
                    )
                  )
                }
              }
            ]),
            t
          )
        })()
      t.default = f
    }
  },
  ['aqeD']
)
