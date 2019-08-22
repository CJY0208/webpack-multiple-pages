webpackJsonp(
  ['reactBaseFrameDemo'],
  {
    '+6hN': function(e, t, n) {
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
          u = n('GiK3'),
          c = f(u),
          i = (function(e) {
            {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e)
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
              return (t.default = e), t
            }
          })(n('+sPD')),
          a = n('OmzJ'),
          l = f(n('N3q8'))
        function f(e) {
          return e && e.__esModule ? e : { default: e }
        }
        ;(0, n('ipgc').getMatcher)(Object.assign({}, l.default), 'local')
        var s =
          i.hot(e)(
            (r =
              (0, a.connectModules)(function(e) {
                return { main: e.main }
              })(
                (r = (function(e) {
                  function t() {
                    return (
                      (function(e, t) {
                        if (!(e instanceof t))
                          throw new TypeError(
                            'Cannot call a class as a function'
                          )
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
                    })(t, u.Component),
                    o(t, [
                      {
                        key: 'render',
                        value: function() {
                          var e = this.props.main
                          return c.default.createElement(
                            'div',
                            null,
                            'Home',
                            c.default.createElement(
                              'div',
                              null,
                              'module counter is: ',
                              e.state.counter,
                              c.default.createElement(
                                'button',
                                {
                                  onClick: function() {
                                    return e.dispatch.counter.add(2)
                                  }
                                },
                                'add'
                              ),
                              c.default.createElement(
                                'button',
                                {
                                  onClick: function() {
                                    return e.dispatch('counter/reduce')
                                  }
                                },
                                'reduce'
                              )
                            ),
                            c.default.createElement('input', {
                              onChange: function(t) {
                                return e.commit('text', t.target.value)
                              }
                            }),
                            c.default.createElement('input', {
                              onChange: function(t) {
                                return e.dispatch('text', t.target.value)
                              }
                            }),
                            c.default.createElement(
                              'div',
                              null,
                              'main text is: ',
                              e.state.text
                            ),
                            c.default.createElement(
                              'div',
                              null,
                              'main getters.text is: ',
                              e.getters.text
                            )
                          )
                        }
                      }
                    ]),
                    t
                  )
                })())
              ) || r)
          ) || r
        t.default = s
      }.call(t, n('3IRH')(e)))
    },
    '28Po': function(e, t, n) {
      'use strict'
      t.a = function(e, t) {
        return function(n) {
          return e(t(n))
        }
      }
    },
    '3IRH': function(e, t, n) {
      e.exports = n('Y5u3')('3IRH')
    },
    '91R6': function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var r = (function(e) {
          {
            if (e && e.__esModule) return e
            var t = {}
            if (null != e)
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
            return (t.default = e), t
          }
        })(n('+sPD')),
        o = a(n('IbVp')),
        u = a(n('Q56i')),
        c = a(n('PhWQ')),
        i = a(n('DCB0'))
      function a(e) {
        return e && e.__esModule ? e : { default: e }
      }
      t.default = {
        en: r.i18n.load([
          o.default,
          function() {
            return n.e('assets/i18n/common/en_US').then(n.bind(null, 'em35'))
          }
        ]),
        in: r.i18n.load([
          u.default,
          function() {
            return n.e('assets/i18n/common/in').then(n.bind(null, 'hUoG'))
          }
        ]),
        ms: r.i18n.load([
          c.default,
          function() {
            return n.e('assets/i18n/common/ms').then(n.bind(null, 'te5V'))
          }
        ]),
        vi: r.i18n.load([
          i.default,
          function() {
            return n.e('assets/i18n/common/vi').then(n.bind(null, '+I6P'))
          }
        ])
      }
    },
    DCB0: function(e, t) {
      e.exports = {}
    },
    DuR2: function(e, t, n) {
      e.exports = n('ldvi')('DuR2')
    },
    'EZG+': function(e, t, n) {
      'use strict'
      var r = n('WlpS').a.Symbol
      t.a = r
    },
    Eacs: function(e, t, n) {
      e.exports = n('Y5u3')('Eacs')
    },
    'FZ+f': function(e, t, n) {
      e.exports = n('Y5u3')('FZ+f')
    },
    GiK3: function(e, t, n) {
      e.exports = n('ldvi')('GiK3')
    },
    IbVp: function(e, t) {
      e.exports = {}
    },
    'J/I/': function(e, t, n) {
      'use strict'
      var r = n('28Po'),
        o = Object(r.a)(Object.getPrototypeOf, Object)
      t.a = o
    },
    KSGD: function(e, t, n) {
      e.exports = n('ldvi')('KSGD')
    },
    LF1K: function(e, t, n) {
      'use strict'
      var r = n('EZG+'),
        o = Object.prototype,
        u = o.hasOwnProperty,
        c = o.toString,
        i = r.a ? r.a.toStringTag : void 0
      t.a = function(e) {
        var t = u.call(e, i),
          n = e[i]
        try {
          e[i] = void 0
          var r = !0
        } catch (e) {}
        var o = c.call(e)
        return r && (t ? (e[i] = n) : delete e[i]), o
      }
    },
    MTIv: function(e, t, n) {
      e.exports = n('Y5u3')('MTIv')
    },
    N3q8: function(e, t) {},
    O27J: function(e, t, n) {
      e.exports = n('ldvi')('O27J')
    },
    'PA2/': function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var r,
        o = n('AyKp'),
        u = n('ersE'),
        c = (r = u) && r.__esModule ? r : { default: r },
        i = n('OmzJ')
      function a(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        )
      }
      var l = function(e) {
          return new Promise(function(t) {
            return setTimeout(t, e)
          })
        },
        f = (0, i.createModule)({
          name: 'main',
          state: { counter: 0, text: '' },
          actions: function(e) {
            var t,
              n,
              r = e.commit,
              o = e.dispatch
            e.getState, e.getStoreState, e.getModules
            return {
              counter: {
                add: function() {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : 1
                  return r('add', e)
                },
                reduce: function() {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : 1
                  return r('reduce', -1 * e)
                }
              },
              text: ((t = regeneratorRuntime.mark(function e(t) {
                return regeneratorRuntime.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), l(1e3)
                        case 2:
                          return r('text', t), (e.next = 5), l(2e3)
                        case 5:
                          r('add', 1), o.counter.reduce(1)
                        case 7:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  void 0
                )
              })),
              (n = function() {
                var e = t.apply(this, arguments)
                return new Promise(function(t, n) {
                  return (function r(o, u) {
                    try {
                      var c = e[o](u),
                        i = c.value
                    } catch (e) {
                      return void n(e)
                    }
                    if (!c.done)
                      return Promise.resolve(i).then(
                        function(e) {
                          r('next', e)
                        },
                        function(e) {
                          r('throw', e)
                        }
                      )
                    t(i)
                  })('next')
                })
              }),
              function(e) {
                return n.apply(this, arguments)
              })
            }
          },
          mutations: function(e) {
            var t
            return (
              a((t = {}), (0, e.combine)('add', 'reduce'), function(e, t) {
                return { counter: e.counter + t }
              }),
              a(t, 'text', function(e, t) {
                return { text: t }
              }),
              t
            )
          },
          getters: {
            text: function(e) {
              return 'computed::' + e.text
            }
          }
        })
      ;(t.default = f),
        (f.persistReducer = (0, o.persistReducer)(
          { key: f.name, storage: c.default },
          f.reducer
        ))
    },
    PhWQ: function(e, t) {
      e.exports = {}
    },
    Q56i: function(e, t) {
      e.exports = {}
    },
    WlpS: function(e, t, n) {
      'use strict'
      var r = n('nSxQ'),
        o = 'object' == typeof self && self && self.Object === Object && self,
        u = r.a || o || Function('return this')()
      t.a = u
    },
    X0mE: function(e, t, n) {
      'use strict'
      var r = Object.prototype.toString
      t.a = function(e) {
        return r.call(e)
      }
    },
    Y5u3: function(e, t) {
      e.exports = polyfill_c9c97520133899186818
    },
    YByk: function(e, t, n) {
      'use strict'
      t.a = function(e) {
        return null != e && 'object' == typeof e
      }
    },
    cIrB: function(e, t, n) {
      e.exports = n('Y5u3')('cIrB')
    },
    cQE8: function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var r = a(n('GiK3')),
        o = n('KXFW'),
        u = n('jgc8'),
        c = a(n('+6hN')),
        i = a(n('uaLq'))
      function a(e) {
        return e && e.__esModule ? e : { default: e }
      }
      t.default = function() {
        return r.default.createElement(
          u.CacheSwitch,
          null,
          r.default.createElement(u.CacheRoute, {
            exact: !0,
            path: '/',
            component: c.default,
            className: '__CacheRoute__wrapper'
          }),
          r.default.createElement(o.Route, {
            exact: !0,
            path: '/sub-page',
            component: i.default
          })
        )
      }
    },
    f1Eh: function(e, t) {
      e.exports = function(e) {
        if (!e.webpackPolyfill) {
          var t = Object.create(e)
          t.children || (t.children = []),
            Object.defineProperty(t, 'loaded', {
              enumerable: !0,
              get: function() {
                return t.l
              }
            }),
            Object.defineProperty(t, 'id', {
              enumerable: !0,
              get: function() {
                return t.i
              }
            }),
            Object.defineProperty(t, 'exports', { enumerable: !0 }),
            (t.webpackPolyfill = 1)
        }
        return t
      }
    },
    j1ja: function(e, t, n) {
      e.exports = n('Y5u3')('j1ja')
    },
    ldvi: function(e, t) {
      e.exports = react_6869fe7fa65021e0953a
    },
    mIxO: function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.persistor = t.store = void 0)
      var r,
        o = n('2KeS'),
        u = n('AyKp'),
        c = n('+sPD'),
        i = n('PA2/'),
        a = (r = i) && r.__esModule ? r : { default: r }
      var l = (t.store = (0, o.createStore)(
        (0, o.combineReducers)({ main: a.default.persistReducer }),
        o.compose.apply(
          void 0,
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, n = Array(e.length); t < e.length; t++)
                n[t] = e[t]
              return n
            }
            return Array.from(e)
          })([void 0].filter(c.isExist))
        )
      ))
      t.persistor = (0, u.persistStore)(l)
    },
    nSxQ: function(e, t, n) {
      'use strict'
      ;(function(e) {
        var n = 'object' == typeof e && e && e.Object === Object && e
        t.a = n
      }.call(t, n('DuR2')))
    },
    p4Dy: function(e, t, n) {
      n('kQ6M'), n('FZ+f'), n('MTIv')
      var r =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }
      n('kQ6M'), n('FZ+f'), n('MTIv'), n('rEIc')
      var o = d(n('GiK3')),
        u = n('O27J'),
        c = n('KXFW'),
        i = n('Z0/c'),
        a = n('OmzJ'),
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
        f = d(n('cQE8')),
        s = (d(n('91R6')), n('mIxO'))
      function d(e) {
        return e && e.__esModule ? e : { default: e }
      }
      n('sAp8'),
        n('p7Az'),
        Object.assign(window, { helpers: l }),
        (0, u.render)(
          o.default.createElement(
            a.ModuleProvider,
            { store: s.store },
            o.default.createElement(
              i.PersistGate,
              r({ persistor: s.persistor }, { Loading: null }),
              o.default.createElement(
                c.HashRouter,
                null,
                o.default.createElement(f.default, null)
              )
            )
          ),
          document.getElementById('root')
        )
    },
    p7Az: function(e, t) {},
    sAp8: function(e, t, n) {
      'use strict'
      var r = (function(e) {
          {
            if (e && e.__esModule) return e
            var t = {}
            if (null != e)
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
            return (t.default = e), t
          }
        })(n('+sPD')).source,
        o = (r = void 0 === r ? {} : r).js,
        u = r.css
      o('//at.alicdn.com/t/font_622014_lyah3ms4ythdunmi.js'),
        u('//at.alicdn.com/t/font_622014_lyah3ms4ythdunmi.css')
    },
    sMP3: function(e, t, n) {
      'use strict'
      var r = n('wqbf'),
        o = n('J/I/'),
        u = n('YByk'),
        c = '[object Object]',
        i = Function.prototype,
        a = Object.prototype,
        l = i.toString,
        f = a.hasOwnProperty,
        s = l.call(Object)
      t.a = function(e) {
        if (!Object(u.a)(e) || Object(r.a)(e) != c) return !1
        var t = Object(o.a)(e)
        if (null === t) return !0
        var n = f.call(t, 'constructor') && t.constructor
        return 'function' == typeof n && n instanceof n && l.call(n) == s
      }
    },
    sRFt: function(e, t) {},
    uaLq: function(e, t, n) {
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
          u = n('GiK3'),
          c = l(u),
          i = (function(e) {
            {
              if (e && e.__esModule) return e
              var t = {}
              if (null != e)
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
              return (t.default = e), t
            }
          })(n('+sPD')),
          a = l(n('sRFt'))
        function l(e) {
          return e && e.__esModule ? e : { default: e }
        }
        ;(0, n('ipgc').getMatcher)(Object.assign({}, a.default), 'local')
        var f =
          i.hot(e)(
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
                })(t, u.Component),
                o(t, [
                  {
                    key: 'render',
                    value: function() {
                      return c.default.createElement('div', null, 'SubPage')
                    }
                  }
                ]),
                t
              )
            })())
          ) || r
        t.default = f
      }.call(t, n('3IRH')(e)))
    },
    'w/50': function(e, t, n) {
      e.exports = n('Y5u3')('w/50')
    },
    wqbf: function(e, t, n) {
      'use strict'
      var r = n('EZG+'),
        o = n('LF1K'),
        u = n('X0mE'),
        c = '[object Null]',
        i = '[object Undefined]',
        a = r.a ? r.a.toStringTag : void 0
      t.a = function(e) {
        return null == e
          ? void 0 === e ? i : c
          : a && a in Object(e) ? Object(o.a)(e) : Object(u.a)(e)
      }
    }
  },
  ['p4Dy']
)
