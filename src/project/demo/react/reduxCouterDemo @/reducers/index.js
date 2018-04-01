import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import { add, reduce, delayChangeWord } from '../actions'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const count = handleActions(
  {
    [combineActions(add, reduce)]: (state, { payload: { count } }) =>
      state + count * 2
  },
  0
)

const word = handleActions(
  {
    [combineActions(delayChangeWord)]: (state, { payload: word }) =>
      typeof word !== undefined ? word : state
  },
  'hello'
)

export default persistReducer(
  {
    key: 'count',
    storage
  },
  combineReducers({ count, word })
)
