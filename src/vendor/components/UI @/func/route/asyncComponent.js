import React, { lazy, Suspense } from 'react'

import Loading from './components/Loading'

const asyncComponent = importComponent => {
  const Component = lazy(importComponent)

  return function LazyComponent(props) {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    )
  }
}

export default asyncComponent
