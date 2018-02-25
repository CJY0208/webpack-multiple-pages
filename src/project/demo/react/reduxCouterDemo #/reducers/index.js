import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import { add, reduce } from '../actions'

const count = handleActions(
  {
    [combineActions(add, reduce)]: (state, { payload: { count } }) =>
      state + count
  },
  0
)

export default combineReducers({ count })
