import { createAction } from 'redux-actions'

export const add = createAction('ADD', count => ({ count }))

export const reduce = createAction('REDUCE', count => ({ count: -count }))
