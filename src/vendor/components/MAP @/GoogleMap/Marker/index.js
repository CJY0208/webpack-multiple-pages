import React, { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import * as helpers from '@helpers'
import UI, { View, ScrollView } from '@UI'

import './style.m.scss'
import { withContext } from '../helpers/context'

const { get, run, getAvailableKeys } = helpers

@withContext
export default class Marker extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    img: PropTypes.string,
    size: PropTypes.number
  }
  static defaultProps = {
    size: 30,
    img: require('./img/marker.svg')
  }

  __node$ = document.createElement('div')
  constructor(props, ...args) {
    super(props, ...args)

    if (props.className) {
      this.__node$.className = props.className
    }

    this.initInfoWindow(props)
  }

  componentDidMount() {
    this.mark()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.lat !== this.props.lat ||
      prevProps.lng !== this.props.lng ||
      prevProps.img !== this.props.img
    ) {
      this.mark()
    }
  }

  componentWillUnmount() {
    run(this.props, 'onDestroy')
    this.marker.setMap(null)
  }

  __actived = false
  initInfoWindow = ({ google, infoWindows }) => {
    this.infoWindow = new google.maps.InfoWindow({
      content: this.__node$
    })

    this.infoWindow.addListener('closeclick', this.onClose)
    this.infoWindow.__orig__close = this.infoWindow.close
    this.infoWindow.close = (...args) => {
      if (this.__actived) {
        this.infoWindow.__orig__close(...args)
        this.onClose()
      }
    }

    infoWindows.push(this.infoWindow)
  }

  mark = () => {
    run(this.marker, 'setMap', null)
    const { map, google, mapEventBus, infoWindows, lat, lng, size } = this.props

    this.marker = new google.maps.Marker({
      map,
      position: { lat, lng },
      icon: getAvailableKeys({
        url: this.props.img,
        scaledSize: new google.maps.Size(size, size),
        optimized: false
      })
    })

    this.marker.addListener('click', e => {
      infoWindows.forEach(infoWindow => infoWindow.close())

      this.__actived = true
      if (this.props.children) {
        run(this.infoWindow, 'open', map, this.marker)
      }

      run(this.props, 'onClick', e)
      run(mapEventBus, 'emit', 'onMarkerClick', this.marker, e)
    })
  }

  onClose = () => {
    this.__actived = false
    run(this.props, 'onClose')
  }
  render = () => createPortal(this.props.children, this.__node$)
}
