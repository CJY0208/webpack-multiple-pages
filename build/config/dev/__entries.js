const { project, ...entries } = require('../../entries')

let include = []
let exclude = []

try {
  const config = require('../../../__entry.config.js')
  include = config.include
  exclude = config.exclude
} catch (err) {
  include = []
  exclude = []
}

module.exports = {
  project: Object.entries(project).reduce((project, [name, filepath]) => {
    let pass = true

    if (exclude.some(filter => filter.test(filepath))) {
      pass = false
    }

    if (include.some(filter => filter.test(filepath))) {
      pass = true
    }

    return pass
      ? {
          ...project,
          [name]: filepath
        }
      : project
  }, {}),
  ...entries
}
