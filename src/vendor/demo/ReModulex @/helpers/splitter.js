const __splitter = 'Y(^_^)Y'

export const combine = (...actions) => actions.join(__splitter)
export const split = (types, reducer, name) =>
  types.split(__splitter).reduce(
    (actions, type) => ({
      ...actions,
      [`${name}::${type}`]: reducer
    }),
    {}
  )
