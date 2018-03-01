import { createAction } from 'redux-actions'

export const add = createAction('ADD', count => ({ count }))

export const reduce = createAction('REDUCE', count => ({ count: -count }))

const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const delayChangeWord = createAction(
  'DELAY_CHANGE_WORD',
  async (word, time = 1000) => {
    await delay(time)
    return word
  }
)
