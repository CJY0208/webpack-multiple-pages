import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { persistStore } from 'redux-persist'

import { isExist, run, globalThis as root } from '@helpers'

import reduxModule from './modules/main'

export const store = createStore(
  combineReducers({
    main: reduxModule.persistReducer
  }),
  compose(
    ...[
      process.env.NODE_ENV === 'development'
        ? run(root, '__REDUX_DEVTOOLS_EXTENSION__')
        : undefined
    ].filter(isExist)
  )
)

export const persistor = persistStore(store)
