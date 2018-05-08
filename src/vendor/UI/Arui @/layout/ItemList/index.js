import React, { Component, PureComponent, Fragment } from 'react'
import { helpers } from '@common'
import styles from './style.m.css'
import Item from './Item'

const { get, __, value, run } = helpers
const className = helpers.classNames.react(styles)

const ItemList = ({
  list = [],
  currencyCode,
  onItemClick,
  renderItem,
  formatPrice,
  ...props
}) => (
  <div {...props} {...className('itemList', props.className)}>
    {list
      |> __(helpers.groupBy)((item, idx) => idx % 2 === 0, __)
      |> Object.values
      |> (list => (
        <Fragment>
          {list.map(
            value(renderItem, () => (groupedList, idx) => (
              <div {...className('col')} key={`groupedList_${idx}`}>
                {groupedList.map((item, idx) => (
                  <Item
                    {...{ item, currencyCode, formatPrice }}
                    key={idx + 1}
                    onClick={e => run(onItemClick, undefined, item, e)}
                  />
                ))}
              </div>
            ))
          )}
        </Fragment>
      ))}
  </div>
)

ItemList.Item = Item

export default ItemList
