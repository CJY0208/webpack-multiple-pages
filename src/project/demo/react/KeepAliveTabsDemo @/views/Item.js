import React from 'react'
import { KeepAlive } from 'react-activation'

import Counter from '../components/Counter'

function Test() {
  return <Counter />
}

export default function Item(props) {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            props.history.goBack()
          }}
        >
          Go Back
        </button>
      </div>
      Item View id: {props.match.params.id}
      <Counter />
      <KeepAlive
        name={`Deep ${props.match.params.id}`}
        id={props.match.params.id}
      >
        <Test />
      </KeepAlive>
    </div>
  )
}
