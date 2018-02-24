let isDll = () => false
let isLib = () => false
let libMapper = value => value
const isNotFromNodeModules = path => !/node_modules/.test(path)
const isDllReference = value => /^dll-reference/.test(value)
const isVendor = value => /^@/.test(value)
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
  const {
    dependencies = [],
    fileDependencies: [filepath = ''] = [],
    id,
    variables
  } =
    module || {}

  if (typeof userRequest !== 'undefined') {
    result.push(userRequest)
  }

  if (
    typeof userRequest === 'undefined' ||
    isLib(userRequest) ||
    isDll(userRequest) ||
    isVendor(userRequest) ||
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

    const { lib, project, dll } = entries
    this.__lib = parseEntries(lib)
    const allLib = Object.keys(this.__lib)
    this.__dll = parseEntries(dll)
    isDll = value => value in this.__dll
    isLib = value => value in this.__lib
    libMapper = value => {
      let libName = value
      return allLib.some(__libName => {
        libName = __libName
        return new RegExp(`^${__libName}`).test(value)
      })
        ? libName
        : value
    }

    this.__project = Object.keys(project)
  }

  recordDependencies(projectName, dependencies) {
    this.__record = this.__record || {}

    dependencies.lib = [...new Set(dependencies.lib)]
    this.__record[projectName] = dependencies
  }

  apply(compiler) {
    const { __project, __lib } = this

    compiler.plugin('after-compile', (compilation, cb) => {
      compilation.chunks.forEach(chunk => {
        if (!__project.includes(chunk.name)) return

        this.recordDependencies(
          chunk.name,
          [
            ...new Set(
              chunk.origins
                .reduce((res, dep) => [...res, ...queryDependencies(dep)], [])
                .map(libMapper)
                .filter(
                  dep => isLib(dep) || isDllReference(dep) || isVendor(dep)
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
              if (isVendor(dep)) res.vendor.push(dep.replace('@', ''))
              if (isLib(dep)) res.lib.push(__lib[dep])
              return res
            },
            {
              dll: [],
              lib: [],
              vendor: []
            }
          )
        )
      })

      if (typeof this.__record !== 'undefined') {
        const allChunks = compilation.getStats().toJson().chunks
        const chunkFilesMap = allChunks.reduce(
          (res, { id, files }) =>
            Object.assign(res, {
              [id]: files
            }),
          {}
        )
        const getFiles = reg => (files, chunk) => [
          ...files,
          ...(chunkFilesMap[chunk] || []).filter(file => reg.test(file))
        ]
        const getJs = getFiles(/\.js$/)
        const getCss = getFiles(/\.css$/)

        Object.entries(this.__record).forEach(([key, value]) => {
          this.__record[key].assetsDll = [
            ...value.dll.map(dll => `${this.__dllPath}${dll}`)
          ]
          this.__record[key].assetsJs = [
            ...value.lib.reduce(getJs, []),
            ...value.vendor.reduce(getJs, [])
          ]
          this.__record[key].assetsCss = [...value.vendor.reduce(getCss, [])]
        })
      }

      cb()
    })

    compiler.plugin('compilation', compilation => {
      compilation.plugin(
        'html-webpack-plugin-before-html-generation',
        (htmlPluginData, cb) => {
          const projectName = htmlPluginData.outputName.replace(/.html$/, '')
          htmlPluginData.assets.js.splice(
            -1,
            0,
            ...this.__record[projectName].assetsJs
          )
          htmlPluginData.assets.js = [
            ...this.__record[projectName].assetsDll,
            ...htmlPluginData.assets.js
          ]

          htmlPluginData.assets.css = [
            ...this.__record[projectName].assetsCss,
            ...htmlPluginData.assets.css
          ]

          cb(null, htmlPluginData)
        }
      )
    })
  }
}
