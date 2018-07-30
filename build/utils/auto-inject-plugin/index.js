const { get, isRegExp, isUndefined } = require('lodash')
const cacheController = require('./cache')
const cacheableConfig = require('./cacheable.config')

let isDll = () => false
let isLib = () => false
let libMapper = value => value

const __dll__cache = {}

const isNotFromNodeModules = path => !/node_modules/.test(path)
const isDllReference = value => {
  const isDll = /^dll-reference/.test(value)

  if (isDll) {
    const __dll__name = value.split(' ')[1].split('_')[0]
    __dll__cache[__dll__name] = value
  }

  return isDll
}
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

const __cache = {}
const queryDependencies = dep => {
  let result = []
  const { userRequest, module } = dep
  const {
    dependencies = [],
    fileDependencies: [filepath = ''] = [],
    id,
    variables,
    resource
  } =
    module || {}

  if (!isUndefined(resource)) {
    const cache = __cache[resource]

    if (!isUndefined(cache)) {
      return cache
    }
  }

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

  if (!isUndefined(resource) && !isUndefined(result)) {
    __cache[resource] = result
  }

  return result
}

const collect = (arr, collector) =>
  arr.reduce((res, item) => [...res, ...collector(item)], [])

const queryChunkDependencies = chunk => [
  ...new Set(
    collect(chunk, queryDependencies)
      .map(libMapper)
      .filter(dep => isLib(dep) || isDllReference(dep) || isVendor(dep))
  )
]

const dependenciesGenerator = (dependencies, __lib) =>
  [...new Set(dependencies)].reduce(
    (res, dep) => {
      if (isDllReference(dep))
        res.dll.push(
          dep
            .split(' ')
            .pop()
            .replace('_', '.')
            .concat('.js')
        )
      if (isVendor(dep)) res.vendor.push(`v-${dep.replace('@', '')}`)
      if (isLib(dep)) res.lib.push(`l-${__lib[dep]}`)
      return res
    },
    {
      dll: [],
      lib: [],
      vendor: []
    }
  )

module.exports = class autoInjectPlugin {
  constructor({ entries, dllPath, cacheable }) {
    this.__dllPath = dllPath
    this.__cacheable = cacheable || cacheableConfig

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
        return value.startsWith(__libName) // new RegExp(`^${__libName}`).test(value)
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
        // console.time(chunk.name)

        if (
          (this.__cacheable.length > 0 &&
            this.__cacheable.includes(chunk.name)) ||
          this.__cacheable
            .filter(isRegExp)
            .some(item => item.test(get(chunk, 'entryModule.context')))
        ) {
          try {
            let cache = JSON.parse(cacheController.find(chunk.name))

            cache.dll = cache.dll.map(item => {
              const dllName = item.split('.')[0]

              if (dllName in __dll__cache) {
                return __dll__cache[dllName]
                  .split(' ')
                  .pop()
                  .replace('_', '.')
                  .concat('.js')
              }

              return item
            })

            this.recordDependencies(chunk.name, cache)
            // console.timeEnd(chunk.name)
            return cache
          } catch (error) {
            // nothing
          }
        }

        // 收集同步入口依赖
        const originDependencies = queryChunkDependencies(chunk.origins)

        // 收集异步入口依赖
        const chunksDependencies = collect(chunk.chunks, chunk =>
          collect(chunk.blocks, block =>
            queryChunkDependencies(block.dependencies)
          )
        )

        const dependencies = dependenciesGenerator(
          [...originDependencies, ...chunksDependencies],
          __lib
        )

        this.recordDependencies(chunk.name, dependencies)

        cacheController.save(chunk.name, JSON.stringify(dependencies))
        // console.timeEnd(chunk.name)
      })

      cacheController.write()

      if (typeof this.__record !== 'undefined') {
        // debugger
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
          this.__record[key].assetsCss = [
            ...value.lib.reduce(getCss, []),
            ...value.vendor.reduce(getCss, [])
          ]
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
