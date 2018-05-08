import React, { Component } from 'react'

import { helpers } from '@common'

import styles from './style.m.scss'
import defaultImg from './assets/img-default.png'
import failImg from './assets/img-fail.png'

const className = helpers.classNames.react(styles)

const real_Img_Host =
  window.location.host === 'mall.akulaku.com'
    ? '//akulaku.s3.amazonaws.com/'
    : '//com-silvrr-installment.s3.amazonaws.com/'

export default class Img extends Component {
  static defaultProps = {
    useDefault: false
  }

  render() {
    const { useDefault, autoAddHost, ...props } = this.props
    const { src, status, targetSrc, ...state } = this.state
    return (
      <img
        {...props}
        {...className(props.className, state.className)}
        {...{
          src,
          style: !useDefault && status === 'default' ? { opacity: 0 } : {},
          'data-target-src': targetSrc
        }}
      />
    )
  }

  constructor(props) {
    const { useDefault, autoAddHost = false } = props
    super(props)
    this.state = {
      src: useDefault ? defaultImg : '',
      targetSrc: `${autoAddHost ? real_Img_Host : ''}${props.src}`,
      className: useDefault ? 'arui-img-default' : '',
      status: 'default'
    }
  }

  componentDidMount() {
    this.autoStatus()
  }

  autoStatus = () => {
    const realImg = document.createElement('img')
    let realSrc = this.state.targetSrc

    if (!realSrc) {
      return this.setState({
        src: failImg,
        className: 'arui-img-fail',
        status: 'fail'
      })
    }
    let times = 2
    realImg.src = realSrc
    realImg.onload = () => {
      this.setState({
        src: realSrc,
        className: '',
        status: 'done'
      })
    }
    realImg.onerror = () => {
      times--
      if (times > 0) {
        realSrc = realSrc.replace(/\/\/[\w,.,:]{1,}\//, real_Img_Host)
        realImg.src = realSrc
      } else {
        this.setState({
          src: failImg,
          className: 'arui-img-fail',
          status: 'fail'
        })
      }
    }
  }

  rerender = () => {
    const { useDefault } = this.props
    this.setState({
      src: useDefault ? defaultImg : '',
      className: useDefault ? 'arui-img-default' : '',
      status: 'default'
    })
    this.autoStatus()
  }

  shouldComponentUpdate(nextProps, nextState) {
    switch (this.state.status) {
      case 'fail':
      case 'done':
        if (this.props.src !== nextProps.src) {
          setTimeout(this.rerender)
          return false
        }
      case 'default':
        return this.state !== nextState
    }
  }
}
