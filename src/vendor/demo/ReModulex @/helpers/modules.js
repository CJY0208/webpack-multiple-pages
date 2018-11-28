import { isArray } from './is'
import { value, run } from './try'

const __modules = {}

export const getModules = () => __modules
export const hasModule = name => !!__modules[name]
export const saveModule = (name, module) => {
  __modules[name] = module
}
export const mapModules = (modulesGetter, storeState) => {
  if (isArray(modulesGetter)) {
    let moduleNames = [...modulesGetter]
    modulesGetter = modules =>
      moduleNames.reduce(
        (res, name) =>
          modules[name]
            ? {
                ...res,
                [name]: modules[name]
              }
            : res,
        {}
      )
  }

  const modules = value(run(modulesGetter, undefined, getModules()), {})

  return Object.entries(modules).reduce(
    (res, [name, { dispatch, commit, compute, getState }]) => ({
      ...res,
      [name]: value(() => {
        const state = getState(storeState)

        return {
          getState,
          compute: () => getState() |> compute,
          dispatch,
          commit,
          state,
          getters: compute(state)
        }
      })
    }),
    {}
  )
}
