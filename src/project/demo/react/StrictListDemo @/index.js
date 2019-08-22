import React, { useState, useEffect, useRef, useCallback } from 'react'
import { render } from 'react-dom'
import ScrollListener from 'tiny-scroll-listener'

import { flatten, run, classnames, debounce } from '@helpers'
import styles from './style.m.scss'
import dataSource from './dataSource'

const groups = Object.keys(dataSource)
const getGroupItems = group => dataSource[group] || []

function StrictList() {
  const { current: headsMap } = useRef({})
  const scrollContainer = useRef()
  const scrollListener = useRef()
  const [headState, setHeadState] = useState({
    state: '',
    name: ''
  })
  const debouceSetHeadState = useCallback(debounce(setHeadState))

  useEffect(() => {
    const heads = Object.values(headsMap)
    const getPrevHead = idx => heads[idx - 1]
    const headHeight = heads[0].$node.offsetHeight

    scrollListener.current = new ScrollListener({
      element: scrollContainer.current,
      distanceEvents: flatten(
        heads.map((head, idx) => [
          {
            name: `pre:${head.name}`,
            distance: head.getScrollTop() - headHeight,
            onGoingIn: () => {
              const prevHead = getPrevHead(idx)
              if (prevHead) {
                debouceSetHeadState({
                  state: 'fixed',
                  name: prevHead.name
                })
              }
            },
            onGoingOut: () => {
              const prevHead = getPrevHead(idx)
              if (prevHead) {
                debouceSetHeadState({
                  state: 'bottomed',
                  name: prevHead.name
                })
              }
            }
          },
          {
            name: head.name,
            distance: head.getScrollTop(),
            onGoingIn: () => {
              const prevHead = getPrevHead(idx)
              if (prevHead) {
                debouceSetHeadState({
                  state: 'bottomed',
                  name: prevHead.name
                })
              }
            },
            onGoingOut: () => {
              debouceSetHeadState({
                state: 'fixed',
                name: head.name
              })
            }
          }
        ])
      )
    })
  }, [])

  return (
    <div className="list" ref={scrollContainer}>
      <ul className="groups">
        {groups.filter(group => getGroupItems(group).length > 0).map(group => (
          <li
            className={classnames('group', {
              [headState.state]: headState.name === group
            })}
            key={group}
          >
            <div
              className="group-head"
              ref={$node => {
                headsMap[group] = {
                  $node,
                  name: group,
                  getScrollTop: () => $node.parentNode.offsetTop
                }
              }}
            >
              {group}
            </div>
            <ul className="items">
              {getGroupItems(group).map(item => (
                <li
                  className="item"
                  key={`${item.areaId}:${item.cityId}:${item.countryId}`}
                >
                  {item.cityName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return <StrictList />
}

render(<App />, document.getElementById('root'))
