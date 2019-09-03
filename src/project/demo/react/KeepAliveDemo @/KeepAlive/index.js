import { KeepAliveProvider } from './core/storeContext'
import { injectKeepAliveLifecycles } from './core/createAliveContext'
import KeepAlive from './core/KeepAlive'
import fixContext from './helpers/fixContext'

export default KeepAlive
export { KeepAliveProvider, injectKeepAliveLifecycles, fixContext }
