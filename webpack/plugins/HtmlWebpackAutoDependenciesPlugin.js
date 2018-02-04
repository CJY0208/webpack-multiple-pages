const queryDependencies = dep => {
  let result = []

  if (typeof dep.userRequest !== 'undefined') {
    result.push(dep.userRequest)
    // console.log(dep.userRequest)
  }

  if (dep.module && dep.module.dependencies) {
    result = dep.module.dependencies.reduce(
      (res, dep) => [...res, ...queryDependencies(dep)],
      result
    )
  }

  return result
}
const isDll = value => /^dll-reference/.test(value)
const isThird = (third, value) => value in third
const isVendor = value => /^@/.test(value)

module.exports = class HtmlWebpackAutoDependenciesPlugin {
  constructor({ entries, dllPath }) {
    this.__dllPath = dllPath

    const { vendor, project, dll } = entries
    this.__third = Object.entries(vendor).reduce((res, [key, value]) => {
      if (!Array.isArray(value)) return res
      value.forEach(module =>
        Object.assign(res, {
          [module]: key
        })
      )
      return res
    }, {})

    this.__project = Object.keys(project)
  }

  recordDependencies(projectName, dependencies) {
    this.__record = this.__record || {}

    dependencies.third = [...new Set(dependencies.third)]
    this.__record[`${projectName}.html`] = dependencies
  }

  apply(compiler) {
    const { __project, __third } = this

    compiler.plugin('after-compile', (compilation, cb) => {
      compilation.chunks.forEach(chunk => {
        if (!__project.includes(chunk.name)) return

        this.recordDependencies(
          chunk.name,
          [
            ...new Set(
              chunk.origins
                .reduce((res, dep) => [...res, ...queryDependencies(dep)], [])
                .filter(
                  dep => isThird(__third, dep) || isDll(dep) || isVendor(dep)
                )
            )
          ].reduce(
            (res, dep) => {
              if (isDll(dep))
                res.dll.push(
                  dep
                    .split(' ')
                    .pop()
                    .replace('_', '.')
                    .concat('.js')
                )
              if (isVendor(dep)) res.common.push(dep.replace('@', ''))
              if (isThird(__third, dep)) res.third.push(__third[dep])
              return res
            },
            {
              dll: [],
              third: [],
              common: []
            }
          )
        )
      })

      console.log(this.__record)

      if (typeof this.__record !== 'undefined') {
        const allChunks = compilation.getStats().toJson().chunks
        const chunkFilesMap = allChunks.reduce((res, chunk) => {
          return Object.assign(res, {
            [chunk.names[0]]: chunk.files[0]
          })
        }, {})
        // console.log(chunkFilesMap)
        // console.log(JSON.stringify(this.__record, null, '  '))
        Object.entries(this.__record).forEach(([key, value]) => {
          this.__record[key].assetsDll = [
            ...value.dll.map(dll => `${this.__dllPath}${dll}`)
          ]
          this.__record[key].assets = [
            ...value.third.map(third => chunkFilesMap[third]),
            ...value.common.map(common => chunkFilesMap[common])
          ]
        })
        // console.log(this.__record)
      }

      cb()
    })

    compiler.plugin('compilation', compilation => {
      compilation.plugin(
        'html-webpack-plugin-before-html-generation',
        (htmlPluginData, cb) => {
          // console.log('html-webpack-plugin-before-html-generation')
          // console.log(Object.keys(htmlPluginData))
          // console.log(htmlPluginData.outputName)
          htmlPluginData.assets.js.splice(
            1,
            0,
            ...this.__record[htmlPluginData.outputName].assets
          )
          htmlPluginData.assets.js = [
            ...this.__record[htmlPluginData.outputName].assetsDll,
            ...htmlPluginData.assets.js
          ]
          // return htmlPluginData
          cb(null, htmlPluginData)
        }
      )
    })
  }
}
