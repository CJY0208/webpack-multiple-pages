webpackJsonp(
  ['reactDemo'],
  {
    DuR2: function(e, t, a) {
      e.exports = a('ldvi')('DuR2')
    },
    Eacs: function(e, t, a) {
      e.exports = a('RuJ5')('Eacs')
    },
    'FZ+f': function(e, t, a) {
      e.exports = a('RuJ5')('FZ+f')
    },
    GiK3: function(e, t, a) {
      e.exports = a('ldvi')('GiK3')
    },
    KuLb: function(e, t) {},
    MTIv: function(e, t, a) {
      e.exports = a('RuJ5')('MTIv')
    },
    O27J: function(e, t, a) {
      e.exports = a('ldvi')('O27J')
    },
    RuJ5: function(e, t) {
      e.exports = polyfill_7040c53544f95c7ea1ff
    },
    'VW/4': function(e, t, a) {
      a('kQ6M'), a('FZ+f'), a('MTIv')
      var n,
        o = (function() {
          function e(e, t) {
            for (var a = 0; a < t.length; a++) {
              var n = t[a]
              ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
          }
          return function(t, a, n) {
            return a && e(t.prototype, a), n && e(t, n), t
          }
        })(),
        l = a('GiK3'),
        r = (n = l) && n.__esModule ? n : { default: n },
        u = a('O27J')
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function')
      }
      function s(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          )
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t
      }
      function c(e, t) {
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
      }
      a('KuLb')
      var f = (function(e) {
        function t() {
          return (
            i(this, t),
            s(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          )
        }
        return (
          c(t, r.default.Component),
          o(t, [
            {
              key: 'render',
              value: function() {
                return r.default.createElement(
                  'div',
                  { className: 'margin flex-space' },
                  r.default.createElement(
                    'label',
                    null,
                    'Task',
                    ' ',
                    r.default.createElement('input', {
                      type: 'text',
                      value: this.props.value,
                      placeholder: '你想做点什么',
                      onChange: this.props.onChange
                    })
                  ),
                  r.default.createElement(p, null)
                )
              }
            }
          ]),
          t
        )
      })()
      function p() {
        return r.default.createElement('input', {
          className: 'btn',
          type: 'submit',
          value: 'Add Task'
        })
      }
      var d = (function(e) {
          function t() {
            var e, a, n
            i(this, t)
            for (var o = arguments.length, l = Array(o), r = 0; r < o; r++)
              l[r] = arguments[r]
            return (
              (a = n = s(
                this,
                (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                  e,
                  [this].concat(l)
                )
              )),
              (n.mouseOut = function(e) {
                var t = e.target.lastChild
                null !== t && (t.className = 'hide')
              }),
              s(n, a)
            )
          }
          return (
            c(t, r.default.Component),
            o(t, [
              {
                key: 'mouseOn',
                value: function(e) {
                  var t = e.target.lastChild
                  null !== t && (t.className = 'show')
                }
              },
              {
                key: 'render',
                value: function() {
                  var e = this,
                    t = 0,
                    a = void 0,
                    n = this.props.data,
                    o = { textDecoration: 'line-through', color: 'red' },
                    l = n.map(function(n, l) {
                      return (
                        (a = !!n.complete),
                        (t = n.complete ? t + 1 : t),
                        r.default.createElement(
                          'li',
                          {
                            key: l,
                            className: '',
                            onMouseOver: e.mouseOn,
                            onMouseOut: e.mouseOut
                          },
                          r.default.createElement('input', {
                            type: 'checkbox',
                            checked: a,
                            onChange: function() {
                              return e.props.onChange(l)
                            }
                          }),
                          r.default.createElement(
                            'span',
                            { style: a ? o : {} },
                            n.task
                          ),
                          r.default.createElement(
                            'button',
                            {
                              className: 'hide',
                              type: 'button',
                              onClick: function() {
                                return e.props.onClick(l)
                              }
                            },
                            '删除'
                          )
                        )
                      )
                    })
                  return r.default.createElement(
                    'div',
                    { className: 'taskItems' },
                    r.default.createElement('ol', null, l),
                    r.default.createElement(
                      'div',
                      { className: 'margin' },
                      t,
                      '/',
                      l.length,
                      ' (完成/总数)'
                    )
                  )
                }
              }
            ]),
            t
          )
        })(),
        m = (function(e) {
          function t(e) {
            i(this, t)
            var a = s(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
            )
            return (
              (a.inputChange = function(e) {
                a.setState({ value: e.target.value })
              }),
              (a.submitTask = function(e) {
                e.preventDefault()
                var t = a.state.data,
                  n = t[t.length - 1].id + 1
                ;(t = t.concat([{ id: n, task: a.state.value, complete: !1 }])),
                  a.setState({ data: t, value: '' })
              }),
              (a.state = {
                data: [
                  { id: '0001', task: '吃饭', complete: !1 },
                  { id: '0002', task: '睡觉', complete: !1 },
                  { id: '0003', task: '打豆豆', complete: !0 },
                  { id: '0004', task: 'abc', complete: !0 }
                ],
                value: ''
              }),
              (a.toggleComplete = a.toggleComplete.bind(a)),
              (a.deleTask = a.deleTask.bind(a)),
              a
            )
          }
          return (
            c(t, r.default.Component),
            o(t, [
              {
                key: 'toggleComplete',
                value: function(e) {
                  var t = this.state.data[e],
                    a = !0 !== t.complete
                  ;(t = Object.assign({}, t, { complete: a })),
                    this.state.data.splice(e, 1, t),
                    this.setState({ data: this.state.data })
                }
              },
              {
                key: 'deleTask',
                value: function(e) {
                  this.state.data.splice(e, 1),
                    console.log(this.state.data),
                    this.setState({ data: this.state.data })
                }
              },
              {
                key: 'render',
                value: function() {
                  return r.default.createElement(
                    'div',
                    { className: 'Page' },
                    r.default.createElement('h2', null, 'React Todo Demo'),
                    r.default.createElement(d, {
                      data: this.state.data,
                      onChange: this.toggleComplete,
                      onClick: this.deleTask
                    }),
                    r.default.createElement(
                      'form',
                      { onSubmit: this.submitTask },
                      r.default.createElement(f, {
                        value: this.state.value,
                        onChange: this.inputChange
                      })
                    )
                  )
                }
              }
            ]),
            t
          )
        })()
      ;(0, u.render)(
        r.default.createElement(m, null),
        document.getElementById('root')
      )
    },
    cIrB: function(e, t, a) {
      e.exports = a('RuJ5')('cIrB')
    },
    j1ja: function(e, t, a) {
      e.exports = a('RuJ5')('j1ja')
    },
    ldvi: function(e, t) {
      e.exports = react_6869fe7fa65021e0953a
    },
    'w/50': function(e, t, a) {
      e.exports = a('RuJ5')('w/50')
    }
  },
  ['VW/4']
)
