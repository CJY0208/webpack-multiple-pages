import React from 'react'

import { get, run, value, isString, classnames } from '@helpers'

import popup from '../../func/Popup'
import ActivityIndicator from '../ActivityIndicator'

import styles from './style.m.scss'

let showing = false
let controller = {
  close: undefined,
  set: undefined
}

export const show = content => {
  const withContent =
    (isString(content) && content.length > 0) || React.isValidElement(content)
  const popupRender = close => (
    <div className={classnames('loading', { withContent })}>
      <ActivityIndicator subColor="#DDD" />
      {withContent &&
        (isString(content) ? <p className="text">{content}</p> : content)}
    </div>
  )

  /**
   * 若 Loading 已处于展示状态中，则不再重新创建弹窗，而是直接修改当前弹窗的内容
   * 为什么？一般的处理方法有以下两种
   * 1、重复创建弹窗：但多个弹窗叠加会产生不好的视觉效果
   * 2、先关掉上一个弹窗再重新创建：创建弹窗有一个 0.3s 的渐入动画，如果使用此法会有些鬼畜（为什么不能搞定这个渐入动画？因为懒...）
   */
  if (showing) {
    if (withContent) {
      run(controller, 'set', popupRender)
    }

    return get(controller, 'close')
  }

  showing = true
  const { close, set } = popup(popupRender, {
    setable: true,
    maskClassName: styles['mask'],
    onClose() {
      showing = false
    }
  })

  controller = { close, set }

  return close
}

export const hide = () => run(controller, 'close')
