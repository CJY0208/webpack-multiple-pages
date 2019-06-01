import React from 'react'

import { run } from '@helpers'
import PopupFrame from './components/Frame'
import Mask from './components/Mask'

const closeFns = []

export default function popup(
  render, // 渲染函数，形式为 close => <Component close={close} /> 其中 close 函数可关闭弹窗
  {
    onClose, // 弹窗关闭回调
    maskClassName, // 自定义浮层 className 方便添加自己的样式
    maskClosable, // 是否允许浮层点击后弹窗消失
    setable = false // 弹窗内组件是否可以改变，若为真，则 popup 返回值变为 { set, close }, 其中 set 函数接收新的 render 函数
  } = {}
) {
  const timeStamp = Date.now()
  const close = () => {
    PopupFrame.remove(timeStamp)
    run(onClose)
  }
  const getPopup = render => (
    <Mask className={maskClassName} {...{ maskClosable, close }}>
      {render(close)}
    </Mask>
  )

  closeFns.push(close)

  const set = PopupFrame.add(timeStamp, getPopup(render))

  if (setable) {
    return {
      close,
      set: render => render |> getPopup |> set
    }
  }

  return close
}

popup.closeAll = () => closeFns.forEach(fn => run(fn))
