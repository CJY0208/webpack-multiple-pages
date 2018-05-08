import React from 'react'
import { helpers } from '@common'

import Img from '../../../components/Img'
import styles from './style.m.scss'

const { get, isNumber, run } = helpers
const className = helpers.classNames.react(styles)

const Item = ({ item, currencyCode, formatPrice = _ => _, ...props }) => (
  <div {...props} {...className('item', props.className)}>
    <div {...className('img')}>
      <Img src={item.image} alt="item" />
    </div>
    <div {...className('content')}>
      <h2>{item.name}</h2>
      <p>
        <span>
          {currencyCode} {formatPrice(item.price)}
        </span>
        {isNumber(item.origPrice) &&
          item.origPrice > item.price && (
            <span {...className('orig')}>
              {currencyCode} {formatPrice(item.origPrice)}
            </span>
          )}
      </p>
    </div>
  </div>
)

export default Item
