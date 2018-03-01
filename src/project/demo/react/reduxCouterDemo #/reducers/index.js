import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import { add, reduce, delayChangeWord } from '../actions'

const count = handleActions(
  {
    [combineActions(add, reduce)]: (state, { payload: { count } }) =>
      state + count
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

export default combineReducers({ count, word })
