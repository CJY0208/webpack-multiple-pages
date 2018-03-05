const { project, vendor, lib, dll } = require('../../entries')

let __entry_include, __entry_exclude

try {
  const __entry_config = require('../../../__entry.config.js')
  __entry_include = __entry_config.include
  __entry_exclude = __entry_config.exclude
} catch (err) {
  __entry_exclude = []
}

module.exports = {
  project: Object.entries(project).reduce(
    (project, [name, filepath]) =>
      __entry_exclude.some(filter => filter.test(filepath)) ||
      (Array.isArray(__entry_include) &&
        __entry_include.length > 0 &&
        !__entry_include.some(filter => filter.test(filepath)))
        ? project
        : Object.assign(project, {
            [name]: filepath
          }),
    {}
  ),
  vendor,
  lib,
  dll
}
