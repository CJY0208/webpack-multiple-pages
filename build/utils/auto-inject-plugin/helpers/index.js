const { get, isUndefined } = require('lodash')

const cacheController = require('../cache')

let __is__dll = () => false
let __is__lib = () => false
let __lib__mapper = value => value

const dllCache = {}

const __is__not__from__node__modules = path => !/node_modules/.test(path)
const __is__dll__deference = value => {
  const __is__dll = /^dll-reference/.test(value)

  if (__is__dll) {
    const __dll__name = value.split(' ')[1].split('_')[0]
    dllCache[__dll__name] = value
  }

  return __is__dll
}
const __is__vendor = value => /^@/.test(value)
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

const collect = (arr, collector) =>
  arr.reduce((res, item) => [...res, ...collector(item)], [])

const recursiveCollect = (arr, key) =>
  collect(get(arr, key, []), arr => [arr, ...recursiveCollect(arr, key)])

// 当前递归遍历的记录，用以监测循环引用情景
const __query__record = {}

const __cache = {}
const __query__dependencies = dep => {
  let result = []
  const { userRequest, module } = dep
  const {
    dependencies = [],
    fileDependencies: [filepath = ''] = [],
    id,
    variables,
    resource
    // _cachedSource: { hash } = {}
  } =
    module || {}

  if (typeof userRequest !== 'undefined') {
    result.push(userRequest)
  }

  if (!isUndefined(id)) {
    let cache = __cache[id]

    if (!isUndefined(cache)) {
      cache = [...result, ...cache]

      __cache[id] = cache

      return cache
    }

    if (id in __query__record) {
      // 当检测到循环引用时，废除本次遍历
      return []
    }

    // 对当前递归抵达的模块做记录
    __query__record[id] = true
  }

  if (
    typeof userRequest === 'undefined' ||
    __is__lib(userRequest) ||
    __is__dll(userRequest) ||
    __is__vendor(userRequest) ||
    __is__not__from__node__modules(filepath)
  ) {
    result = [
      ...new Set(
        dependencies.reduce(
          (res, dep) => [...res, ...__query__dependencies(dep)],
          result
        )
      )
    ]
  }

  if (!isUndefined(id)) {
    __cache[id] = result

    // 在当前模块递归任务结束时删除记录
    delete __query__record[id]
  }

  return result
}

const __query__chunk__dependencies = chunk => [
  ...new Set(
    collect(
      chunk.mapModules(module => ({
        module,
        userRequest: module.userRequest
      })),
      __query__dependencies
    )
      .map(__lib__mapper)
      .filter(
        dep => __is__lib(dep) || __is__dll__deference(dep) || __is__vendor(dep)
      )
  )
]

const __dependencies__generator = (dependencies, __lib) =>
  [...new Set(dependencies)].reduce(
    (res, dep) => {
      if (__is__dll__deference(dep))
        res.dll.push(
          dep
            .split(' ')
            .pop()
            .replace('_', '.')
            .concat('.js')
        )
      if (__is__vendor(dep)) res.vendor.push(`v-${dep.replace('@', '')}`)
      if (__is__lib(dep)) res.lib.push(`l-${__lib[dep]}`)
      return res
    },
    {
      dll: [],
      lib: [],
      vendor: []
    }
  )

const queryChunkDependencies = (chunk, lib) => {
  // 收集同步入口依赖
  const originDependencies = __query__chunk__dependencies(chunk)

  // 收集异步入口依赖
  const allAsyncChunks = recursiveCollect(chunk, 'chunks')

  const chunksDependencies = collect(allAsyncChunks, chunk =>
    __query__chunk__dependencies(chunk)
  )

  const dependencies = __dependencies__generator(
    [...originDependencies, ...chunksDependencies],
    lib
  )

  // __query__dependencies({ __cache })

  // debugger

  return dependencies
}

module.exports = {
  set: {
    __is__lib(value) {
      __is__lib = value
    },
    __is__dll(value) {
      __is__dll = value
    },
    __lib__mapper(value) {
      __lib__mapper = value
    }
  },

  get: {
    __cache() {
      return __cache
    }
  },

  dllCache,

  parseEntries,

  collect,
  recursiveCollect,
  queryChunkDependencies
}
