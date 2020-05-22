import React from 'react'
import { withRouter } from 'react-router-dom'

import { useAliveController } from 'react-activation'

import './KeepingTabs.css'

export default withRouter(function KeepingTabs({ history }) {
  const {
    getCachingNodes = () => [],
    drop,
    dropScope,
    refresh
  } = useAliveController()
  const cachingNodes = getCachingNodes()

  return (
    <ul>
      {cachingNodes.map(node => (
        <li key={node.id} className="keeing-tab">
          {node.name}
          <button
            onClick={() => {
              // if (node.name.includes('Item')) {
              //   history.go(-1)
              // }
              drop(node.name)
            }}
          >
            X
          </button>
          <button
            onClick={() => {
              // if (node.name.includes('Item')) {
              //   history.go(-1)
              // }
              console.log('refresh')
              refresh(node.name)
            }}
          >
            R
          </button>
        </li>
      ))}
    </ul>
  )
})
