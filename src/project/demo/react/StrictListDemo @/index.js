import React, { useState, useEffect, useRef, useCallback } from 'react'
import { render } from 'react-dom'
import ScrollListener from 'tiny-scroll-listener'
// import ScrollListener from './ScrollListener'

import { flatten, run, classnames, debounce } from '@helpers'
import styles from './style.m.scss'
import dataSource from './dataSource'

const groups = Object.keys(dataSource)
const getGroupItems = group => dataSource[group] || []

function StrictList() {
  const { current: headsMap } = useRef({})
  const scrollContainer = useRef()
  const scrollListener = useRef()
  // const [headState, setHeadState] = useState({
  //   state: '',
  //   name: ''
  // })
  // const debouceSetHeadState = useCallback(debounce(setHeadState))

  useEffect(() => {
    const heads = Object.values(headsMap)
    const getPrevHead = idx => heads[idx - 1]
    const headHeight = heads[0].$node.offsetHeight
    const addHeadClassName = (head, className) => {
      run(head, '$node.parentNode.classList.add', styles[className])
    }
    const removeHeadClassName = (head, className) => {
      run(head, '$node.parentNode.classList.remove', styles[className])
    }

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
                removeHeadClassName(prevHead, 'bottomed')
                addHeadClassName(prevHead, 'fixed')
              }
            },
            onGoingOut: () => {
              const prevHead = getPrevHead(idx)
              if (prevHead) {
                removeHeadClassName(prevHead, 'fixed')
                addHeadClassName(prevHead, 'bottomed')
              }
            }
          },
          {
            name: head.name,
            distance: head.getScrollTop(),
            onGoingIn: () => {
              const prevHead = getPrevHead(idx)
              if (prevHead) {
                removeHeadClassName(head, 'fixed')
                addHeadClassName(prevHead, 'bottomed')
              }
            },
            onGoingOut: () => {
              const prevHead = getPrevHead(idx)
              if (prevHead) {
                removeHeadClassName(prevHead, 'bottomed')
              }
              addHeadClassName(head, 'fixed')
            }
          }
        ])
      ),
      distanceToReachEnd: 10,
      onEndReached(done) {
        console.log('reach end!')
        setTimeout(done, 500)
      }
    })
  }, [])

  return (
    <div className="list" ref={scrollContainer}>
      <ul className="groups">
        {groups.filter(group => getGroupItems(group).length > 0).map(group => (
          <li className="group" key={group}>
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
                <li className="item" key={item}>
                  {item}
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
