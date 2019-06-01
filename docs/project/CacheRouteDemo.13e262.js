webpackJsonp(
  ['CacheRouteDemo'],
  {
    DuR2: function(e, l, t) {
      e.exports = t('ldvi')('DuR2')
    },
    GiK3: function(e, l, t) {
      e.exports = t('ldvi')('GiK3')
    },
    KSGD: function(e, l, t) {
      e.exports = t('ldvi')('KSGD')
    },
    O27J: function(e, l, t) {
      e.exports = t('ldvi')('O27J')
    },
    ldvi: function(e, l) {
      e.exports = react_6869fe7fa65021e0953a
    },
    qUpI: function(e, l, t) {
      'use strict'
      var n = i(t('GiK3')),
        a = t('O27J'),
        u = t('KXFW'),
        c = t('G7FX'),
        r = i(c)
      function i(e) {
        return e && e.__esModule ? e : { default: e }
      }
      ;(window.React = n.default),
        console.log('React Version', n.default.version)
      var f = function() {
          return n.default.createElement(
            'div',
            { style: { height: '100vh', overflow: 'auto' } },
            n.default.createElement(
              'ul',
              null,
              n.default.createElement('li', null, '1'),
              n.default.createElement('li', null, '2'),
              n.default.createElement('li', null, '3'),
              n.default.createElement('li', null, '4'),
              n.default.createElement('li', null, '5'),
              n.default.createElement('li', null, '6'),
              n.default.createElement('li', null, '7'),
              n.default.createElement('li', null, '8'),
              n.default.createElement('li', null, '9'),
              n.default.createElement('li', null, '10'),
              n.default.createElement('li', null, '11'),
              n.default.createElement('li', null, '12'),
              n.default.createElement('li', null, '13'),
              n.default.createElement('li', null, '14'),
              n.default.createElement('li', null, '15'),
              n.default.createElement('li', null, '16'),
              n.default.createElement('li', null, '17'),
              n.default.createElement('li', null, '18'),
              n.default.createElement('li', null, '19'),
              n.default.createElement('li', null, '20'),
              n.default.createElement('li', null, '21'),
              n.default.createElement('li', null, '22'),
              n.default.createElement('li', null, '23'),
              n.default.createElement('li', null, '24'),
              n.default.createElement('li', null, '25'),
              n.default.createElement('li', null, '26'),
              n.default.createElement('li', null, '27'),
              n.default.createElement('li', null, '28'),
              n.default.createElement('li', null, '29'),
              n.default.createElement('li', null, '30'),
              n.default.createElement('li', null, '31'),
              n.default.createElement('li', null, '32'),
              n.default.createElement('li', null, '33'),
              n.default.createElement('li', null, '34'),
              n.default.createElement('li', null, '35'),
              n.default.createElement('li', null, '36'),
              n.default.createElement('li', null, '37'),
              n.default.createElement('li', null, '38'),
              n.default.createElement('li', null, '39'),
              n.default.createElement('li', null, '40'),
              n.default.createElement('li', null, '41'),
              n.default.createElement('li', null, '42'),
              n.default.createElement('li', null, '43'),
              n.default.createElement('li', null, '44'),
              n.default.createElement('li', null, '45'),
              n.default.createElement('li', null, '46'),
              n.default.createElement('li', null, '47'),
              n.default.createElement('li', null, '48'),
              n.default.createElement('li', null, '49'),
              n.default.createElement('li', null, '50'),
              n.default.createElement(
                'li',
                null,
                n.default.createElement(u.Link, { to: 'item' }, 'To Detail')
              )
            )
          )
        },
        d = function(e) {
          var l = e.history
          return n.default.createElement(
            'div',
            null,
            n.default.createElement(
              'button',
              {
                onClick: function() {
                  l.goBack()
                }
              },
              'Go Back'
            )
          )
        }
      ;(0, a.render)(
        n.default.createElement(function() {
          return n.default.createElement(
            u.HashRouter,
            null,
            n.default.createElement(
              c.CacheSwitch,
              null,
              n.default.createElement(r.default, {
                exact: !0,
                path: '/',
                component: f
              }),
              n.default.createElement(r.default, {
                exact: !0,
                path: '/item',
                component: d
              })
            )
          )
        }, null),
        document.getElementById('root')
      )
    }
  },
  ['qUpI']
)
