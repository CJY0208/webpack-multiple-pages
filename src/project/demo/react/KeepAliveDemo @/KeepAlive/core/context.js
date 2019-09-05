import createContext from 'create-react-context'

// 整个 KeepAlive 功能的上下文，将 KeepAlive 的组件藏于其 Provider 中，保证其不会被卸载
export const aliveStoreContext = createContext()
export const {
  Provider: AliveStoreProvider,
  Consumer: AliveStoreConsumer
} = aliveStoreContext

// KeepAlive 组件的上下文，实现缓存生命周期功能
export const aliveNodeContext = createContext()
export const {
  Provider: AliveNodeProvider,
  Consumer: AliveNodeConsumer
} = aliveNodeContext
