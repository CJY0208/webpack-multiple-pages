const { get, isRegExp } = require('lodash')

const cacheController = require('./cache')
const cacheableConfig = require('./cache/cacheable.config')

const helpers = require('./helpers')

const { parseEntries, dllCache, queryChunkDependencies } = helpers

module.exports = class AutoInjectPlugin {
  constructor({ entries, dllPath, cacheable }) {
    const { lib, project, dll } = entries

    this.__dllPath = dllPath
    this.__cacheable = cacheable || cacheableConfig
    this.__lib = parseEntries(lib)

    const allLib = Object.keys(this.__lib)

    this.__dll = parseEntries(dll)

    helpers.set.__is__dll(value => value in this.__dll)
    helpers.set.__is__lib(value => value in this.__lib)
    helpers.set.__lib__mapper(value => {
      let libName = value
      return allLib.some(__libName => {
        libName = __libName
        return value.startsWith(__libName) // new RegExp(`^${__libName}`).test(value)
      })
        ? libName
        : value
    })

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
      Promise.all(
        compilation.chunks
          .filter(chunk => __project.includes(chunk.name))
          .map(chunk => {
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

                  if (dllName in dllCache) {
                    return dllCache[dllName]
                      .split(' ')
                      .pop()
                      .replace('_', '.')
                      .concat('.js')
                  }

                  return item
                })

                //console.timeEnd(chunk.name)
                return Promise.resolve({
                  name: chunk.name,
                  dependencies: cache
                })
              } catch (error) {
                // nothing
              }
            }

            return new Promise(resolve => {
              const dependencies = queryChunkDependencies(chunk, __lib)

              resolve({
                name: chunk.name,
                dependencies
              })
            })

            // console.timeEnd(chunk.name)
          })
      ).then(allData => {
        allData.filter(res => !!res).forEach(({ name, dependencies }) => {
          cacheController.save(name, JSON.stringify(dependencies))
          this.recordDependencies(name, dependencies)
        })

        if (typeof this.__record !== 'undefined') {
          // cacheController.write()
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
