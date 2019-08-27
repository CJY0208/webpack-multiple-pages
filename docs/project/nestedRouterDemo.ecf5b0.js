webpackJsonp(
  ['nestedRouterDemo'],
  {
    '+KGf': function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n = i(u('GiK3')),
        o = u('KXFW'),
        a = i(u('Cxxy')),
        l = i(u('MF6G')),
        r = i(u('ADAQ'))
      function i(e) {
        return e && e.__esModule ? e : { default: e }
      }
      t.default = function() {
        return n.default.createElement(
          'div',
          null,
          n.default.createElement(
            'div',
            { className: 'nav' },
            n.default.createElement(
              o.NavLink,
              { to: '/position/route1/sub1' },
              'sub1'
            ),
            n.default.createElement(
              o.NavLink,
              { to: '/position/route1/sub2' },
              'sub2'
            ),
            n.default.createElement(
              o.NavLink,
              { to: '/position/route1/sub3' },
              'sub3'
            )
          ),
          n.default.createElement(
            o.Switch,
            null,
            n.default.createElement(o.Route, {
              path: '/position/route1/sub1',
              component: a.default
            }),
            n.default.createElement(o.Route, {
              path: '/position/route1/sub2',
              component: l.default
            }),
            n.default.createElement(o.Route, {
              path: '/position/route1/sub3',
              component: r.default
            }),
            n.default.createElement(o.Redirect, { to: '/position/route1/sub1' })
          )
        )
      }
    },
    ADAQ: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route1/sub3'
        )
      }
    },
    Cxxy: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route1/sub1'
        )
      }
    },
    DuR2: function(e, t, u) {
      e.exports = u('ldvi')('DuR2')
    },
    Eacs: function(e, t, u) {
      e.exports = u('RuJ5')('Eacs')
    },
    'FZ+f': function(e, t, u) {
      e.exports = u('RuJ5')('FZ+f')
    },
    GiK3: function(e, t, u) {
      e.exports = u('ldvi')('GiK3')
    },
    KSGD: function(e, t, u) {
      e.exports = u('ldvi')('KSGD')
    },
    'MC+a': function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n },
        l = u('KXFW')
      t.default = (0, l.withRouter)(function(e) {
        var t = e.history,
          u = e.location,
          n = e.to,
          o = e.children
        return a.default.createElement(
          'a',
          {
            className: u.pathname.startsWith(n) ? 'active' : '',
            onClick: function() {
              var e = n.split('/')
              t.push(
                u.pathname
                  .split('/')
                  .map(function(t) {
                    return e.shift() || t
                  })
                  .join('/')
              )
            }
          },
          o
        )
      })
    },
    MF6G: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route1/sub2'
        )
      }
    },
    MTIv: function(e, t, u) {
      e.exports = u('RuJ5')('MTIv')
    },
    O27J: function(e, t, u) {
      e.exports = u('ldvi')('O27J')
    },
    RuJ5: function(e, t) {
      e.exports = polyfill_7040c53544f95c7ea1ff
    },
    UHLw: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0)
      var n = (function() {
          function e(e, t) {
            for (var u = 0; u < t.length; u++) {
              var n = t[u]
              ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
          }
          return function(t, u, n) {
            return u && e(t.prototype, u), n && e(t, n), t
          }
        })(),
        o = u('GiK3'),
        a = s(o),
        l = u('KXFW')
      u('lbrt')
      var r = s(u('+KGf')),
        i = s(u('vi6K')),
        c = s(u('jZlU')),
        f = s(u('MC+a'))
      function s(e) {
        return e && e.__esModule ? e : { default: e }
      }
      var d = (function(e) {
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
              return !t || ('object' != typeof t && 'function' != typeof t)
                ? e
                : t
            })(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
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
          })(t, o.Component),
          n(t, [
            {
              key: 'render',
              value: function() {
                return a.default.createElement(
                  'div',
                  { className: 'wrapper' },
                  a.default.createElement(
                    'div',
                    { className: 'content' },
                    a.default.createElement(
                      'div',
                      { className: 'nav' },
                      a.default.createElement(
                        f.default,
                        { to: '/position/route1' },
                        'route1'
                      ),
                      a.default.createElement(
                        f.default,
                        { to: '/position/route2' },
                        'route2'
                      ),
                      a.default.createElement(
                        f.default,
                        { to: '/position/route3' },
                        'route3'
                      )
                    ),
                    a.default.createElement(
                      l.Switch,
                      null,
                      a.default.createElement(l.Route, {
                        path: '/position/route1',
                        component: r.default
                      }),
                      a.default.createElement(l.Route, {
                        path: '/position/route2',
                        component: i.default
                      }),
                      a.default.createElement(l.Route, {
                        path: '/position/route3',
                        component: c.default
                      }),
                      a.default.createElement(l.Redirect, {
                        to: '/position/route1'
                      })
                    )
                  ),
                  a.default.createElement(
                    'div',
                    { className: 'footer' },
                    a.default.createElement(
                      'ul',
                      null,
                      a.default.createElement('li', null, '1'),
                      a.default.createElement('li', null, '2'),
                      a.default.createElement('li', null, '3'),
                      a.default.createElement(
                        'li',
                        { className: 'active' },
                        '4'
                      ),
                      a.default.createElement('li', null, '5')
                    )
                  )
                )
              }
            }
          ]),
          t
        )
      })()
      t.default = d
    },
    'YL/G': function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route3/sub1'
        )
      }
    },
    cIrB: function(e, t, u) {
      e.exports = u('RuJ5')('cIrB')
    },
    e7vq: function(e, t) {},
    hzvi: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route3/sub2'
        )
      }
    },
    j1ja: function(e, t, u) {
      e.exports = u('RuJ5')('j1ja')
    },
    jZlU: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n = i(u('GiK3')),
        o = u('KXFW'),
        a = i(u('YL/G')),
        l = i(u('hzvi')),
        r = i(u('jmDZ'))
      function i(e) {
        return e && e.__esModule ? e : { default: e }
      }
      t.default = function() {
        return n.default.createElement(
          'div',
          null,
          n.default.createElement(
            'div',
            { className: 'nav' },
            n.default.createElement(
              o.NavLink,
              { to: '/position/route3/sub1' },
              'sub1'
            ),
            n.default.createElement(
              o.NavLink,
              { to: '/position/route3/sub2' },
              'sub2'
            ),
            n.default.createElement(
              o.NavLink,
              { to: '/position/route3/sub3' },
              'sub3'
            )
          ),
          n.default.createElement(
            o.Switch,
            null,
            n.default.createElement(o.Route, {
              path: '/position/route3/sub1',
              component: a.default
            }),
            n.default.createElement(o.Route, {
              path: '/position/route3/sub2',
              component: l.default
            }),
            n.default.createElement(o.Route, {
              path: '/position/route3/sub3',
              component: r.default
            }),
            n.default.createElement(o.Redirect, { to: '/position/route3/sub1' })
          )
        )
      }
    },
    jmDZ: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route3/sub3'
        )
      }
    },
    kMhf: function(e, t, u) {
      u('kQ6M'), u('FZ+f'), u('MTIv')
      var n = l(u('GiK3')),
        o = u('O27J')
      u('e7vq')
      var a = l(u('sq+N'))
      function l(e) {
        return e && e.__esModule ? e : { default: e }
      }
      ;(0, o.render)(
        n.default.createElement(a.default, null),
        document.getElementById('root')
      )
    },
    lbrt: function(e, t) {},
    ldvi: function(e, t) {
      e.exports = react_6869fe7fa65021e0953a
    },
    nBAt: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route2/sub1'
        )
      }
    },
    qpMt: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route2/sub3'
        )
      }
    },
    'sq+N': function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n = l(u('GiK3')),
        o = u('KXFW'),
        a = l(u('UHLw'))
      function l(e) {
        return e && e.__esModule ? e : { default: e }
      }
      t.default = function() {
        return n.default.createElement(
          o.HashRouter,
          null,
          n.default.createElement(
            o.Switch,
            null,
            n.default.createElement(o.Route, {
              path: '/position',
              component: a.default
            }),
            n.default.createElement(o.Redirect, { to: '/position' })
          )
        )
      }
    },
    vi6K: function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n = r(u('GiK3')),
        o = u('KXFW'),
        a = r(u('nBAt')),
        l = r(u('yW+x'))
      r(u('qpMt'))
      function r(e) {
        return e && e.__esModule ? e : { default: e }
      }
      t.default = function() {
        return n.default.createElement(
          'div',
          null,
          n.default.createElement(
            'div',
            { className: 'nav' },
            n.default.createElement(
              o.NavLink,
              { to: '/position/route2/sub1' },
              'sub1'
            ),
            n.default.createElement(
              o.NavLink,
              { to: '/position/route2/sub2' },
              'sub2'
            )
          ),
          n.default.createElement(
            o.Switch,
            null,
            n.default.createElement(o.Route, {
              path: '/position/route2/sub1',
              component: a.default
            }),
            n.default.createElement(o.Route, {
              path: '/position/route2/sub2',
              component: l.default
            }),
            n.default.createElement(o.Redirect, { to: '/position/route2/sub1' })
          )
        )
      }
    },
    'w/50': function(e, t, u) {
      e.exports = u('RuJ5')('w/50')
    },
    'yW+x': function(e, t, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var n,
        o = u('GiK3'),
        a = (n = o) && n.__esModule ? n : { default: n }
      t.default = function() {
        return a.default.createElement(
          'div',
          { className: 'box' },
          'route2/sub2'
        )
      }
    }
  },
  ['kMhf']
)
