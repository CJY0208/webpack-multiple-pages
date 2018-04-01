const { project, lib } = require('../../../../entries')
const project_names = Object.keys(project)
const lib_entries = Object.entries(lib)

const isDependentBy = (
  libName,
  { resource = '', sourceRequest = '', reasons = [] } = {}
) =>
  ((new RegExp(libName).test(resource) &&
    /(node_modules|build\/utils|build\\utils)/.test(resource)) ||
    reasons.some(({ module }) => isDependentBy(libName, module))) &&
  !/dll-reference/.test(sourceRequest)

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
  let isDependentByMultipleLib

  switch (__isDependentByMultipleLib) {
    case true:
    case false:
      isDependentByCurrentLib = value.some(libName =>
        isDependentBy(libName, module)
      )
      isDependentByMultipleLib = __isDependentByMultipleLib
      break
    default:
      isDependentByCurrentLib = false
      const dependentTimes = lib_entries
        .map(([__key, value]) => {
          const __isDependentByCurrentLib = value.some(libName =>
            isDependentBy(libName, module)
          )
          if (__key === key) isDependentByCurrentLib = __isDependentByCurrentLib
          return __isDependentByCurrentLib
        })
        .filter(res => res).length

      isDependentByMultipleLib = dependentTimes >= 2

      // 缓存 “是否被多个 Lib 引用” 统计结果
      Object.assign(module, {
        isDependentByMultipleLib,
        isDependentByLib: dependentTimes >= 1
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
  const isCurrentLib = value.some(
    libName =>
      libName === rawRequest || new RegExp(`^${libName}\/`).test(rawRequest)
  )

  return (
    isCurrentLib ||
    (isDependentByCurrentLib &&
    !/node_modules\W+.*-loader/.test(resource) && // 不抽离-loader类型依赖
    !/node_modules\W+webpack\W+/.test(resource) && // 不抽离webpack目录下的依赖
      !isDependentByMultipleLib &&
      !isDependentByMultipleProject)
  )
}

module.exports = {
  isDependentBy,
  checkIsDependentByMultipleProject,
  getLibSplitter
}
