import React from 'react'
import { Link } from 'react-router-dom'
import { useAliveController } from 'react-activation'

import Counter from '../components/Counter'

import './List.css'

const count = 200

export default function List(props) {
  const { getCachingNodes } = useAliveController()
  const cachingNodes = getCachingNodes()
  const cachingNodesName = cachingNodes.map(node => node.name)

  return (
    <div className="list">
      <Counter />
      <ul>
        {Array(count)
          .fill('')
          .map((value, idx) => (
            <li key={idx}>
              <Link to={`/item/${idx}`}>To Item {idx}</Link>
              {cachingNodesName.find(name => name === `Item${idx}`) && (
                <span className="cached-tag">Cached</span>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}
