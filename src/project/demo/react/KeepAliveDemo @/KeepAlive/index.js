import KeepAliveProvider from './core/Provider'
import { withLifecycles, useActivate, useUnactivate } from './core/lifecycles'
import KeepAlive from './core/KeepAlive'
import { fixContext, createContext } from './core/ContextBridge'
import withAliveStore, { useAliveStore } from './core/withAliveStore'

export default KeepAlive
export {
  KeepAliveProvider,
  withLifecycles,
  fixContext,
  useActivate,
  useUnactivate,
  createContext,
  withAliveStore,
  useAliveStore
}
