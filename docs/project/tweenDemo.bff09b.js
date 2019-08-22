webpackJsonp(
  ['tweenDemo'],
  {
    '0AeA': function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.history = void 0),
        (t.default = function() {
          return a.default.createElement(
            o.Router,
            { history: s },
            a.default.createElement(
              u.CacheSwitch,
              null,
              a.default.createElement(u.CacheRoute, {
                exact: !0,
                path: '/',
                component: i.default,
                when: 'always'
              }),
              a.default.createElement(u.CacheRoute, {
                exact: !0,
                path: '/Easing',
                component: l.default,
                when: 'always'
              })
            )
          )
        })
      var a = c(n('GiK3')),
        r = n('wrym'),
        o = n('KXFW'),
        u = n('jgc8'),
        i = c(n('puX/')),
        l = c(n('1i7U'))
      function c(e) {
        return e && e.__esModule ? e : { default: e }
      }
      var s = (t.history = (0, r.createHashHistory)())
    },
    '1i7U': function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function() {
          return a.default.createElement(
            r.View,
            { className: c('container') },
            a.default.createElement(
              r.ScrollView,
              null,
              a.default.createElement(
                'ul',
                null,
                Object.keys(o.Tween.easing).map(function(e) {
                  return a.default.createElement(
                    'li',
                    { key: e },
                    a.default.createElement(i.default, { ease: e })
                  )
                })
              )
            )
          )
        })
      var a = l(n('GiK3')),
        r = n('bD/M'),
        o = n('+sPD'),
        u = l(n('4HLJ')),
        i = l(n('UV4U'))
      function l(e) {
        return e && e.__esModule ? e : { default: e }
      }
      var c = (0, n('ipgc').getMatcher)(Object.assign({}, u.default), 'local')
    },
    '3IRH': function(e, t, n) {
      e.exports = n('Y5u3')('3IRH')
    },
    '4HLJ': function(e, t) {
      e.exports = { container: 'container_gDoP' }
    },
    DuR2: function(e, t, n) {
      e.exports = n('ldvi')('DuR2')
    },
    Eacs: function(e, t, n) {
      e.exports = n('Y5u3')('Eacs')
    },
    'FZ+f': function(e, t, n) {
      e.exports = n('Y5u3')('FZ+f')
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
      e.exports = n('Y5u3')('MTIv')
    },
    O27J: function(e, t, n) {
      e.exports = n('ldvi')('O27J')
    },
    UV4U: function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var a = function(e, t) {
        if (Array.isArray(e)) return e
        if (Symbol.iterator in Object(e))
          return (function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              o = void 0
            try {
              for (
                var u, i = e[Symbol.iterator]();
                !(a = (u = i.next()).done) &&
                (n.push(u.value), !t || n.length !== t);
                a = !0
              );
            } catch (e) {
              ;(r = !0), (o = e)
            } finally {
              try {
                !a && i.return && i.return()
              } finally {
                if (r) throw o
              }
            }
            return n
          })(e, t)
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance'
        )
      }
      t.default = function(e) {
        var t = e.ease,
          n = (0, r.useRef)(null),
          l = (0, r.useState)([]),
          c = a(l, 2),
          f = (c[0],
          c[1],
          (0, r.useState)(function() {
            return new u.Tween({ from: 0, to: 1, duration: 500 })
          })),
          d = a(f, 1)[0],
          m = function() {
            var e = new u.Tween({ from: 0, to: 400 }),
              r = new u.Tween({ from: 300, to: 100, ease: t }),
              o = 0,
              i = !1
            d
              .config({ from: 0, to: 1, duration: 500 })
              .off('start')
              .on('start', function() {
                var e = n.current,
                  t = e.getContext('2d')
                function r(e, n) {
                  for (
                    var r = a(e, 2),
                      o = r[0],
                      u = r[1],
                      i = a(n, 2),
                      l = i[0],
                      c = i[1],
                      s = Math.floor(
                        Math.sqrt(Math.pow(o - l, 2) + Math.pow(u - c, 2)) / 2
                      ),
                      f = 0;
                    f < s;
                    f++
                  )
                    t[f % 2 == 0 ? 'moveTo' : 'lineTo'](
                      o + f * (l - o) / s,
                      u + f * (c - u) / s
                    )
                }
                t.moveTo(0, 100),
                  t.lineTo(0, 300),
                  r([0, 300], [400, 300]),
                  t.lineTo(400, 100),
                  r([400, 100], [0, 100]),
                  (t.lineWidth = 0.5),
                  (t.strokeStyle = '#666666'),
                  t.stroke(),
                  t.beginPath()
              })
              .off('update')
              .on('update', function(t, a) {
                var o = n.current,
                  u = o.getContext('2d')
                i
                  ? u.moveTo(e.value(a), r.value(a))
                  : u.moveTo(e.value(t) - 1, r.value(t) - 1),
                  u.lineTo(e.value(t), r.value(t)),
                  (u.lineWidth = 1),
                  (u.strokeStyle = '#fed477'),
                  u.stroke()
              })
              .off('end')
              .on('end', function() {
                o <= 6 && d.reverse().start(),
                  2 === o && d.config({ duration: 1e3 }),
                  5 === o && d.config({ duration: 5e3 }),
                  6 === o && ((i = !0), d.config({ duration: 1e4 })),
                  o++
              })
              .restart()
          }
        return (
          (0, r.useEffect)(function() {
            return m(), d.stop
          }, []),
          o.default.createElement(
            'div',
            { className: s('content') },
            o.default.createElement(
              'h2',
              {
                onClick: function() {
                  i.history.goBack(), (0, u.run)(window, 'changeEasing', t)
                }
              },
              t
            ),
            o.default.createElement(
              'div',
              {
                className: s('line'),
                onClick: function() {
                  var e = n.current,
                    t = e.getContext('2d')
                  t.clearRect(0, 0, e.width, e.height), t.beginPath(), m()
                }
              },
              o.default.createElement('canvas', {
                ref: n,
                width: 400,
                height: 400
              })
            )
          )
        )
      }
      var r = n('GiK3'),
        o = c(r),
        u = n('+sPD'),
        i = n('0AeA'),
        l = c(n('l9Qf'))
      function c(e) {
        return e && e.__esModule ? e : { default: e }
      }
      var s = (0, n('ipgc').getMatcher)(Object.assign({}, l.default), 'local')
    },
    Y5u3: function(e, t) {
      e.exports = polyfill_c9c97520133899186818
    },
    'a+K2': function(e, t) {
      e.exports = helpers_c66fb19f003fc0979f45
    },
    cIrB: function(e, t, n) {
      e.exports = n('Y5u3')('cIrB')
    },
    j1ja: function(e, t, n) {
      e.exports = n('Y5u3')('j1ja')
    },
    l9Qf: function(e, t) {
      e.exports = { content: 'content_LEyg', line: 'line_1ggw' }
    },
    lDVq: function(e, t) {
      e.exports = {
        container: 'container_1YMR',
        view: 'view_3B5A',
        block: 'block_31V1',
        progress: 'progress_1oiH',
        buttons: 'buttons_3naR',
        info: 'info_3wNr',
        'easing-link': 'easing-link_2S6a'
      }
    },
    ldvi: function(e, t) {
      e.exports = react_6869fe7fa65021e0953a
    },
    'puX/': function(e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var a = function(e, t) {
        if (Array.isArray(e)) return e
        if (Symbol.iterator in Object(e))
          return (function(e, t) {
            var n = [],
              a = !0,
              r = !1,
              o = void 0
            try {
              for (
                var u, i = e[Symbol.iterator]();
                !(a = (u = i.next()).done) &&
                (n.push(u.value), !t || n.length !== t);
                a = !0
              );
            } catch (e) {
              ;(r = !0), (o = e)
            } finally {
              try {
                !a && i.return && i.return()
              } finally {
                if (r) throw o
              }
            }
            return n
          })(e, t)
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance'
        )
      }
      t.default = function() {
        var e = (0, r.useRef)(null),
          t = (0, r.useState)({ x: 0, y: 0, scale: 1, rotate: 0 }),
          n = a(t, 2),
          c = n[0],
          s = n[1],
          d = (0, r.useState)(function() {
            var t = (0, l.sample)(Object.keys(l.Tween.easing)),
              n = new l.Tween({ from: 0, to: 335, ease: t }),
              a = new l.Tween({ from: 0, to: -50, ease: t }),
              r = new l.Tween({ from: 1, to: 2.5, ease: t }),
              o = new l.Tween({ from: 0, to: 360, ease: t }),
              u = new l.Tween({ from: 0, to: 1, duration: 1200, loop: !0 })
                .on('update', function(t) {
                  s({
                    x: n.value(t),
                    y: a.value(t),
                    scale: r.value(t),
                    rotate: o.value(t)
                  }),
                    (e.current.value = 100 * t)
                })
                .start()
            return { main: u, x: n, y: a, scale: r, rotate: o }
          }),
          m = a(d, 1)[0],
          v = m.main
        ;(0, r.useEffect)(function() {
          return function() {
            console.log('unmount'), v.stop()
          }
        }, [])
        var p = function(e) {
          Object.entries(m)
            .filter(function(e) {
              var t = a(e, 1),
                n = t[0]
              return !['main'].includes(n)
            })
            .forEach(function(t) {
              var n = a(t, 2),
                r = (n[0], n[1])
              return r.config({ ease: e })
            }),
            v.isEnded() && v.restart()
        }
        return (
          (window.changeEasing = p),
          o.default.createElement(
            i.View,
            { className: f('container') },
            o.default.createElement(
              'div',
              { className: f('view') },
              o.default.createElement('input', {
                className: f('progress'),
                ref: e,
                type: 'range',
                defaultValue: '0',
                min: '0',
                max: '100',
                onInput: function(e) {
                  v.stop(), v.progress(e.target.value / 100)
                },
                onMouseUp: v.start
              }),
              o.default.createElement('div', {
                className: f('block'),
                style: {
                  transform:
                    '\n              translateX(' +
                    c.x +
                    'px)\n              translateY(' +
                    c.y +
                    'px)\n              scale(' +
                    c.scale +
                    ')\n              rotate(' +
                    c.rotate +
                    'deg)\n            '
                }
              }),
              o.default.createElement(
                'div',
                { className: f('info') },
                v.state.config.duration,
                '(ms) / ',
                m.x.state.config.ease
              ),
              o.default.createElement(
                u.Link,
                { to: '/Easing', className: f('easing-link') },
                'View All Easing'
              ),
              o.default.createElement(
                'div',
                { className: f('buttons') },
                o.default.createElement(
                  'button',
                  { onClick: v.start },
                  'Start'
                ),
                o.default.createElement('button', { onClick: v.stop }, 'Stop'),
                o.default.createElement(
                  'button',
                  { onClick: v.reset },
                  'Reset'
                ),
                o.default.createElement(
                  'button',
                  { onClick: v.restart },
                  'Restart'
                )
              ),
              o.default.createElement(
                'div',
                { className: f('buttons') },
                o.default.createElement(
                  'button',
                  {
                    onClick: function() {
                      v.config({
                        duration: (0, l.clamp)(
                          v.state.config.duration - 200,
                          200
                        )
                      }),
                        v.isEnded() && v.restart()
                    }
                  },
                  'Faster'
                ),
                o.default.createElement(
                  'button',
                  {
                    onClick: function() {
                      v.config({ duration: v.state.config.duration + 200 }),
                        v.isEnded() && v.restart()
                    }
                  },
                  'Slow down'
                ),
                o.default.createElement(
                  'button',
                  { onClick: v.reverse },
                  'Reverse'
                )
              ),
              o.default.createElement(
                'div',
                { className: f('buttons') },
                o.default.createElement(
                  'button',
                  {
                    onClick: function() {
                      p((0, l.sample)(Object.keys(l.Tween.easing)))
                    }
                  },
                  'Random Easing'
                ),
                o.default.createElement(
                  'button',
                  {
                    onClick: function() {
                      v.config({ loop: !v.state.config.loop }),
                        v.isEnded() && (v.reverse(), v.restart())
                    }
                  },
                  'Toggle Loop: ',
                  String(v.state.config.loop)
                )
              )
            )
          )
        )
      }
      var r = n('GiK3'),
        o = s(r),
        u = n('KXFW'),
        i = n('bD/M'),
        l = n('+sPD'),
        c = s(n('lDVq'))
      function s(e) {
        return e && e.__esModule ? e : { default: e }
      }
      var f = (0, n('ipgc').getMatcher)(Object.assign({}, c.default), 'local')
    },
    tRHY: function(e, t, n) {
      n('kQ6M'), n('FZ+f'), n('MTIv'), n('kQ6M'), n('FZ+f'), n('MTIv')
      var a = u(n('GiK3')),
        r = n('O27J'),
        o = u(n('0AeA'))
      function u(e) {
        return e && e.__esModule ? e : { default: e }
      }
      ;(0, r.render)(
        a.default.createElement(o.default, null),
        document.getElementById('root')
      )
    },
    'w/50': function(e, t, n) {
      e.exports = n('Y5u3')('w/50')
    }
  },
  ['tRHY']
)
