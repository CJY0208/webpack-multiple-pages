'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _safeClone = require('./safeClone')

Object.defineProperty(exports, 'safeClone', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_safeClone).default
  }
})

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var concat = (exports.concat = Array.prototype.concat.bind([]))
var merge = (exports.merge = function merge() {
  for (
    var _len = arguments.length, args = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    args[_key] = arguments[_key]
  }

  return Object.assign.apply(Object, [{}].concat(args))
})
var keys = (exports.keys = Object.keys)
