'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mkdirp = undefined

var _bluebird = require('bluebird')

var _bluebird2 = _interopRequireDefault(_bluebird)

var _fs = require('fs')

var _fs2 = _interopRequireDefault(_fs)

var _mkdirp2 = require('mkdirp')

var _mkdirp3 = _interopRequireDefault(_mkdirp2)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var mkdirp = (exports.mkdirp = _bluebird2.default.promisify(_mkdirp3.default))
exports.default = _bluebird2.default.promisifyAll(_fs2.default)
