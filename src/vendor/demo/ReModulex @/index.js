import ReModulex from './core/ReModulex'

export const createModule = (...args) => new ReModulex(...args)
export { ModuleProvider, connectModules } from './core/context'
export { mapModules } from './helpers/modules'
export { applyStore } from './helpers/store'
