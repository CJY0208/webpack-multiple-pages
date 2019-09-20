import React from 'react'

import Counter from '../components/Counter'

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
    </div>
  )
}
