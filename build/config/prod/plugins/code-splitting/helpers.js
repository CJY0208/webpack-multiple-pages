const path = require('path')
const { project, lib } = require('../../__entries')
const project_names = Object.keys(project)
const lib_entries = Object.entries(lib)

const cacheController = require('./cache')

const __rootName = path.resolve(__dirname, '../../../../../')

// 当前递归遍历的记录，用以监测循环引用情景
const __query__record = {}

const isDependentBy = (
  libName,
  {
    resource = '',
    sourceRequest = '',
    reasons = [],
    userRequest,
    ...module
  } = {}
) => {
  let cacheKey = `${sourceRequest}_${resource}:${libName}`
  let res = cacheController.find(cacheKey)

  if (typeof res !== 'undefined') {
    return res
  }

  if (userRequest) {
    if (userRequest in __query__record) {
      // 当检测到循环引用时，废除本次遍历
      return false
    }

    // 对当前递归抵达的模块做记录
    __query__record[userRequest] = true
  }

  res =
    !/dll-reference/.test(sourceRequest) &&
    ((new RegExp(libName).test(resource) &&
      /(node_modules|build\/utils|build\\utils)/.test(resource)) ||
      reasons.some(({ module }) => isDependentBy(libName, module)))

  cacheController.save(cacheKey, res)

  if (userRequest) {
    // 在当前模块递归任务结束时删除记录
    delete __query__record[userRequest]
  }

  return res
}

const checkIsDependentByMultipleProject = ({ reasons = [] }) =>
  reasons
    .map(({ module: { resource = '' } = {} }) =>
      project_names.some(projectName =>
        new RegExp(`${projectName} @`).test(resource)
      )
    )
    .filter(res => res).length >= 2

const getLibSplitter = (key, value) => module => {
  const {
    isDependentByMultipleLib: __isDependentByMultipleLib,
    isDependentByMultipleProject: __isDependentByMultipleProject,
    dependentLibrary = {},
    resource = '',
    rawRequest = ''
  } = module

  /**
   * 是否被当前 Lib 引用
   */
  let isDependentByCurrentLib

  /**
   * 是否被多个 Lib 引用
   */
  let isDependentByMultipleLib = __isDependentByMultipleLib

  switch (__isDependentByMultipleLib) {
    case true:
    case false:
      if (typeof dependentLibrary[key] === 'undefined') {
        isDependentByCurrentLib = value.some(libName =>
          isDependentBy(libName, module)
        )

        dependentLibrary[key] = isDependentByCurrentLib

        Object.assign(module, {
          dependentLibrary
        })
      } else {
        isDependentByCurrentLib = dependentLibrary[key] === true
      }
      break
    default:
      let dependentTimes = 0

      lib_entries.some(([__key, value]) => {
        const __isDependentByCurrentLib = value.some(libName =>
          isDependentBy(libName, module)
        )
        if (__key === key) isDependentByCurrentLib = __isDependentByCurrentLib

        if (__isDependentByCurrentLib) {
          dependentTimes += 1
        }

        dependentLibrary[__key] = __isDependentByCurrentLib

        return dependentTimes >= 2
      })

      isDependentByMultipleLib = dependentTimes >= 2

      if (
        !isDependentByMultipleLib &&
        typeof isDependentByCurrentLib === 'undefined'
      ) {
        isDependentByCurrentLib = value.some(libName =>
          isDependentBy(libName, module)
        )

        dependentLibrary[key] = isDependentByCurrentLib
      }

      // 缓存 “是否被多个 Lib 引用” 统计结果
      Object.assign(module, {
        isDependentByMultipleLib,
        isDependentByLib: dependentTimes >= 1,
        dependentLibrary
      })
  }

  /**
   * 是否被多个 Project 引用
   */
  let isDependentByMultipleProject

  switch (__isDependentByMultipleProject) {
    case true:
    case false:
      isDependentByMultipleProject = __isDependentByMultipleProject
    default:
      isDependentByMultipleProject = checkIsDependentByMultipleProject(module)
      Object.assign(module, {
        isDependentByMultipleProject
      })
  }

  /**
   * 是否当前的 Lib
   */
  const isCurrentLib = value.some(libName => {
    const __reg__check__isStartWith = new RegExp(
      JSON.stringify(`^${libName}${path.sep}`).replace(/"/g, '')
    )

    return (
      libName === rawRequest ||
      [
        rawRequest,
        resource.replace(`${__rootName}${path.sep}node_modules${path.sep}`, '')
      ].some(str => __reg__check__isStartWith.test(str))
    )
  })

  return (
    isCurrentLib ||
    (!isDependentByMultipleLib &&
    isDependentByCurrentLib &&
    !isDependentByMultipleProject &&
    !/node_modules\W+.*-loader/.test(resource) && // 不抽离-loader类型依赖
      !/node_modules\W+webpack\W+/.test(resource)) // 不抽离webpack目录下的依赖
  )
}

module.exports = {
  isDependentBy,
  checkIsDependentByMultipleProject,
  getLibSplitter
}
