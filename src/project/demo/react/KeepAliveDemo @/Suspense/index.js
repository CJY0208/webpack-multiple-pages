import React, { useState, useEffect, Suspense } from 'react'
import ReactDOM from 'react-dom'
import KeepAlive, { AliveScope } from '@KeepAlive'
// import Loadable from 'react-loadable'
import Test from './Test'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

function Loading() {
  return <div>Loading...</div>
}

const LoadableTest = React.lazy(async () => {
  await delay(3000)
  return import('./Test')
})

function LoadingFake() {
  console.log('test')

  return null
}

function Lala() {
  useEffect(() => {
    console.log('didmount')

    return () => {
      console.log('willUnmount')
    }
  }, [])

  return null
}

function App() {
  const [show, setShow] = useState(true)

  // useEffect(() => {
  //   delay(2000).then(() => setShow(false))
  // }, [])

  return (
    <AliveScope>
      <button onClick={() => setShow(show => !show)}>Toggle</button>
      <Suspense fallback={<Loading />}>
        <div>无 KeepAlive 功能</div>
        {show && <Test />}
        <div>有 KeepAlive 功能</div>
        <Lala />
        {show && (
          <KeepAlive>
            {/* <Suspense fallback={<Loading />}> */}
            <LoadableTest />
            {/* </Suspense> */}
          </KeepAlive>
        )}
      </Suspense>
    </AliveScope>
  )
}

export default App
