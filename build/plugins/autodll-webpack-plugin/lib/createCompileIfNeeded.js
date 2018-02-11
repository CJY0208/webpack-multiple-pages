'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.runCompile = undefined

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

var _fs = require('./utils/fs')

var _fs2 = _interopRequireDefault(_fs)

var _paths = require('./paths')

var _del = require('del')

var _del2 = _interopRequireDefault(_del)

var _makeDir = require('make-dir')

var _makeDir2 = _interopRequireDefault(_makeDir)

var _validateCache = require('./validateCache')

var _validateCache2 = _interopRequireDefault(_validateCache)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var emptyCacheDir = function emptyCacheDir(settings) {
  return function() {
    // delete all the cached builds of the current instance
    // filter only the current instance build.
    // subdirectory name example: development_instance_0_bc6309c769a8a9d386898f61f8cb35d2
    return _fs2.default
      .readdirAsync(_paths.cacheDir)
      .filter(function(dirname) {
        return dirname.startsWith(`${settings.env}_${settings.id}`)
      })
      .each(function(dirname) {
        return (0, _del2.default)(_path2.default.join(_paths.cacheDir, dirname))
      })
      .catch(function() {
        return (0, _makeDir2.default)(_paths.cacheDir)
      })
  }
}

var runCompile = (exports.runCompile = function runCompile(
  settings,
  getCompiler
) {
  return function() {
    return new Promise(function(resolve, reject) {
      getCompiler().run(function(err, stats) {
        if (err) return reject(err)

        resolve(stats)
      })
    })
  }
})

var createCompileIfNeeded = function createCompileIfNeeded(log, settings) {
  return function(getCompiler) {
    return (0, _validateCache2.default)(settings)
      .then(
        log.tap(function(isValid) {
          return `is valid cache? ${isValid}`
        })
      )
      .then(function(isValid) {
        if (isValid) return null
        return Promise.resolve()
          .then(log.tap('cleanup'))
          .then(emptyCacheDir(settings))
          .then(log.tap('compile'))
          .then(runCompile(settings, getCompiler))
          .then(function(stats) {
            return stats
          })
      })
  }
}

exports.default = createCompileIfNeeded
