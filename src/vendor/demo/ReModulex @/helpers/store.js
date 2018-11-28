import { run } from './try'

let __store

const check = fn => (...args) => {
  if (!__store) {
    console.error(
      new Error(`
      [ReModulex Error] 
        Forgot to apply the store?
        Use 'ReModulex.applyStore' with your redux store!
    `)
    )
  }
  return run(fn, undefined, ...args)
}

export const applyStore = store => {
  __store = store
}

export const dispatch = check((...args) => run(__store, 'dispatch', ...args))
export const getState = check((...args) => run(__store, 'getState', ...args))
