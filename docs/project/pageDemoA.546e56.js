webpackJsonp(
  ['pageDemoA'],
  {
    '3IRH': function(e, n, t) {
      e.exports = t('Y5u3')('3IRH')
    },
    DuR2: function(e, n, t) {
      e.exports = t('ldvi')('DuR2')
    },
    Eacs: function(e, n, t) {
      e.exports = t('Y5u3')('Eacs')
    },
    'FZ+f': function(e, n, t) {
      e.exports = t('Y5u3')('FZ+f')
    },
    GiK3: function(e, n, t) {
      e.exports = t('ldvi')('GiK3')
    },
    HjTH: function(e, n) {},
    KSGD: function(e, n, t) {
      e.exports = t('ldvi')('KSGD')
    },
    MTIv: function(e, n, t) {
      e.exports = t('Y5u3')('MTIv')
    },
    O27J: function(e, n, t) {
      e.exports = t('ldvi')('O27J')
    },
    PlVR: function(e, n, t) {
      'use strict'
      Object.defineProperty(n, '__esModule', { value: !0 }),
        (n.shaking = n.test = void 0)
      var o = t('lbQB')
      t('HjTH')
      ;(n.test = o.commonA), (n.shaking = 'shaking ')
    },
    Y5u3: function(e, n) {
      e.exports = polyfill_c9c97520133899186818
    },
    cIrB: function(e, n, t) {
      e.exports = t('Y5u3')('cIrB')
    },
    hW7Q: function(e, n) {},
    j1ja: function(e, n, t) {
      e.exports = t('Y5u3')('j1ja')
    },
    lbQB: function(e, n, t) {
      'use strict'
      Object.defineProperty(n, '__esModule', { value: !0 }),
        console.log('pageA 公共模块')
      ;(n.commonA = 'common A'),
        (n.commonB = 'common B'),
        (n.commonC = 'common C')
    },
    ldvi: function(e, n) {
      e.exports = react_6869fe7fa65021e0953a
    },
    'w/50': function(e, n, t) {
      e.exports = t('Y5u3')('w/50')
    },
    zfe9: function(e, n, t) {
      t('kQ6M'), t('FZ+f'), t('MTIv'), t('kQ6M')
      s(t('GiK3')), s(t('O27J'))
      t('KXFW')
      s(t('L6bb')), s(t('mtWM'))
      var o = s(t('5INz')),
        r = s(t('M4fF')),
        c = t('Yu5+'),
        u = t('NzAI')
      t('PlVR')
      function s(e) {
        return e && e.__esModule ? e : { default: e }
      }
      t('hW7Q'), Object.assign(window, { _: r.default, fp: o.default })
      console.log('pageA 3'), (0, c.fn1)(), (0, u.fnA)()
      var i,
        f = function(e) {
          return new Promise(function(n) {
            return setTimeout(n, e)
          })
        }
      ;((i = regeneratorRuntime.mark(function e() {
        var n, o
        return regeneratorRuntime.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    console.log('test async/await in pageA'),
                    (e.next = 3),
                    f(1e3)
                  )
                case 3:
                  return console.log('after 1000 ms'), (e.next = 6), f(2e3)
                case 6:
                  return (
                    console.log('after 2000 ms'),
                    console.warn('1000ms 后加载 my-test2'),
                    (e.next = 10),
                    f(1e3)
                  )
                case 10:
                  return (
                    (e.next = 12), t.e('my-test2').then(t.bind(null, 'QMd3'))
                  )
                case 12:
                  ;(n = e.sent),
                    (o = n.test),
                    console.log('异步模块 test2'),
                    console.log(o)
                case 16:
                case 'end':
                  return e.stop()
              }
          },
          e,
          void 0
        )
      })),
      function() {
        var e = i.apply(this, arguments)
        return new Promise(function(n, t) {
          return (function o(r, c) {
            try {
              var u = e[r](c),
                s = u.value
            } catch (e) {
              return void t(e)
            }
            if (!u.done)
              return Promise.resolve(s).then(
                function(e) {
                  o('next', e)
                },
                function(e) {
                  o('throw', e)
                }
              )
            n(s)
          })('next')
        })
      })()
    }
  },
  ['zfe9']
)
