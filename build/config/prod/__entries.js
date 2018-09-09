const { project, ...entries } = require('../../entries')

let __entry__include, __entry__exclude

try {
  const __entry__config = require('../../../__entry.config.js')
  __entry__include = __entry__config.include
  __entry__exclude = __entry__config.exclude
} catch (err) {
  const __entry__config = require('./__entry.config.js')
  __entry__include = __entry__config.include
  __entry__exclude = __entry__config.exclude
}

module.exports = {
  project: Object.entries(project).reduce(
    (project, [name, filepath]) =>
      __entry__exclude.some(filter => filter.test(filepath)) ||
      (Array.isArray(__entry__include) &&
        __entry__include.length > 0 &&
        !__entry__include.some(filter => filter.test(filepath)))
        ? project
        : Object.assign(project, {
            [name]: filepath
          }),
    {}
  ),
  ...entries
}
