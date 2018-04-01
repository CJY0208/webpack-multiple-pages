import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import app from '../reducers'
import { persistStore } from 'redux-persist'

export const store = createStore(app, applyMiddleware(promiseMiddleware))
export const persistor = persistStore(store)
