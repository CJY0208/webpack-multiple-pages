import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'
import app from '../reducers'

export default createStore(app, applyMiddleware(promiseMiddleware))
