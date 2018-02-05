let isDll = () => false
let isVendor = () => false
const isNotFromNodeModules = path => !/node_modules/.test(path)
const isDllReference = value => /^dll-reference/.test(value)
const isCustomizedVendor = value => /^@/.test(value)
const parseEntries = entries =>
  Object.entries(entries).reduce((res, [key, value]) => {
    if (!Array.isArray(value)) return res
    value.forEach(module =>
      Object.assign(res, {
        [module]: key
      })
    )
    return res
  }, {})
const queryDependencies = dep => {
  let result = []
  const { userRequest, module } = dep
  const { dependencies = [], fileDependencies: [filepath = ''] = [] } =
    module || {}

  if (typeof userRequest !== 'undefined') {
    result.push(userRequest)
    // console.log(Object.keys(dep.module))
    // console.log(dep.module.fileDependencies)
    // console.log(userRequest,
    //   isVendor(userRequest) ||
    //   isDll(userRequest) ||
    //   isCustomizedVendor(userRequest) ||
    //   isNotFromNodeModules(filepath)
    // )
  }

  if (
    // true
    typeof userRequest === 'undefined' ||
    isVendor(userRequest) ||
    isDll(userRequest) ||
    isCustomizedVendor(userRequest) ||
    isNotFromNodeModules(filepath)
  ) {
    result = dependencies.reduce(
      (res, dep) => [...res, ...queryDependencies(dep)],
      result
    )
  }

  return result
}

module.exports = class HtmlWebpackAutoDependenciesPlugin {
  constructor({ entries, dllPath }) {
    this.__dllPath = dllPath

    const { vendor, project, dll } = entries
    this.__vendor = parseEntries(vendor)
    this.__dll = parseEntries(dll)
    isDll = value => value in this.__dll
    isVendor = value => value in this.__vendor

    this.__project = Object.keys(project)
  }

  recordDependencies(projectName, dependencies) {
    this.__record = this.__record || {}

    dependencies.vendor = [...new Set(dependencies.vendor)]
    this.__record[`${projectName}.html`] = dependencies
  }

  apply(compiler) {
    const { __project, __vendor } = this

    compiler.plugin('after-compile', (compilation, cb) => {
      compilation.chunks.forEach(chunk => {
        if (!__project.includes(chunk.name)) return
        console.log(chunk.name)
        this.recordDependencies(
          chunk.name,
          [
            ...new Set(
              chunk.origins
                .reduce((res, dep) => [...res, ...queryDependencies(dep)], [])
                .filter(
                  dep =>
                    isVendor(dep) ||
                    isDllReference(dep) ||
                    isCustomizedVendor(dep)
                )
            )
          ].reduce(
            (res, dep) => {
              if (isDllReference(dep))
                res.dll.push(
                  dep
                    .split(' ')
                    .pop()
                    .replace('_', '.')
                    .concat('.js')
                )
              if (isCustomizedVendor(dep))
                res.customizedVendor.push(dep.replace('@', ''))
              if (isVendor(dep)) res.vendor.push(__vendor[dep])
              return res
            },
            {
              dll: [],
              vendor: [],
              customizedVendor: []
            }
          )
        )
      })

      // console.log(this.__record)

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
            ...value.vendor.map(vendor => chunkFilesMap[vendor]),
            ...value.customizedVendor.map(
              customizedVendor => chunkFilesMap[customizedVendor]
            )
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
