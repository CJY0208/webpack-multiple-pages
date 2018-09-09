import { persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { createModule } from 're-modulex'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const reduxModule = createModule({
  name: 'main',
  state: {
    counter: 0,
    text: ''
  },
  actions: ({
    commit, // commit 为原 redux 的 dispatch
    dispatch, // dispatch 只触发到动作层
    getState, // 获取当前 module 的 state
    getStoreState, // 获取整个 redux store 的 state
    getModules // 获取其他 module 以进行模块间通信
  }) => ({
    counter: {
      add: (amount = 1) => commit('add', amount),
      reduce: (amount = 1) => commit('reduce', -1 * amount)
    },
    // 将异步控制从 redux 中拆离，异步操作不依赖其他中间件
    text: async text => {
      await delay(1000)
      commit('text', text)
      await delay(2000)
      commit('add', 1) // 同一个 action 可以 commit 多次
      dispatch.counter.reduce(1)
    }
  }),
  mutations: ({ combine }) => ({
    // 变化响应可以合并，类似 redux-actions 的 combineActions
    [combine('add', 'reduce')]: ({ counter }, amount) => ({
      counter: counter + amount
    }),
    text: (state, text) => ({ text })
  }),
  // 允许衍生状态
  getters: {
    text: state => `computed::${state.text}`
  }
})
export default reduxModule
reduxModule.persistReducer = persistReducer(
  // 配合持久化插件工作
  {
    key: reduxModule.name,
    storage: storageSession
  },
  reduxModule.reducer
)
