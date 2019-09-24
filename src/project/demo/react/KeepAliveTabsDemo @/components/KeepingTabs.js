import React from 'react'
import { useAliveController } from 'react-activation'

import './KeepingTabs.css'

export default function KeepingTabs() {
  const { getCachingNodes, drop } = useAliveController()
  const cachingNodes = getCachingNodes()

  return (
    <ul>
      {cachingNodes.map(node => (
        <li key={node.id} className="keeing-tab">
          {node.name}
          <button onClick={() => drop(node.name)}>X</button>
        </li>
      ))}
    </ul>
  )
}
