webpackJsonp(['v-commonDemo'], {
  'Yu5+': function(n, e, o) {
    'use strict'
    Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.Test = e.fn3 = e.fn2 = e.fn1 = void 0)
    var t,
      r = (function() {
        function n(n, e) {
          for (var o = 0; o < e.length; o++) {
            var t = e[o]
            ;(t.enumerable = t.enumerable || !1),
              (t.configurable = !0),
              'value' in t && (t.writable = !0),
              Object.defineProperty(n, t.key, t)
          }
        }
        return function(e, o, t) {
          return o && n(e.prototype, o), t && n(e, t), e
        }
      })()
    o('AADv')
    ;(e.fn1 = function() {
      console.log('common fn1')
    }),
      (e.fn2 = function() {
        console.log('common fn2')
      }),
      (e.fn3 = function() {
        console.log('common fn3')
      })
    var c,
      u = function(n) {
        return new Promise(function(e) {
          return setTimeout(e, n)
        })
      },
      i = (e.Test =
        new (t = (function() {
          function n() {
            !(function(n, e) {
              if (!(n instanceof e))
                throw new TypeError('Cannot call a class as a function')
            })(this, n)
          }
          var e, o
          return (
            r(n, [
              {
                key: 'test',
                value: ((e = regeneratorRuntime.mark(function n() {
                  return regeneratorRuntime.wrap(
                    function(n) {
                      for (;;)
                        switch ((n.prev = n.next)) {
                          case 0:
                            return (
                              console.log('common Test'), (n.next = 3), u(2e3)
                            )
                          case 3:
                            console.log('common Test class after 2000 ms ')
                          case 4:
                          case 'end':
                            return n.stop()
                        }
                    },
                    n,
                    this
                  )
                })),
                (o = function() {
                  var n = e.apply(this, arguments)
                  return new Promise(function(e, o) {
                    return (function t(r, c) {
                      try {
                        var u = n[r](c),
                          i = u.value
                      } catch (n) {
                        return void o(n)
                      }
                      if (!u.done)
                        return Promise.resolve(i).then(
                          function(n) {
                            t('next', n)
                          },
                          function(n) {
                            t('throw', n)
                          }
                        )
                      e(i)
                    })('next')
                  })
                }),
                function() {
                  return o.apply(this, arguments)
                })
              }
            ]),
            n
          )
        })())(c) || t)
    console.log(i), i.test()
  }
})
