import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import {
  source,
  get,
  getAvailableKeys,
  isUndefined,
  run,
  isFunction,
  classnames,
  EventBus
} from '@helpers'
import UI, { View, ScrollView } from '@UI'

import getCurrentPosition from '../helpers/getCurrentPosition'
import { Provider } from '../helpers/context'
import Marker from '../Marker'
import getDistance from '../helpers/getDistance'

import './style.m.scss'

export default class GoogleMap extends Component {
  static Marker = Marker
  static helpers = {
    getDistance,
    getCurrentPosition
  }

  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    sdk: PropTypes.string,
    languageKey: PropTypes.string,
    config: PropTypes.shape({
      zoom: PropTypes.number,
      center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      }).isRequired,
      disableDefaultUI: PropTypes.bool
    })
  }

  static defaultProps = {
    sdk: 'https://maps.googleapis.com/maps/api/js',
    languageKey: 'en',
    config: {
      zoom: 4,
      disableDefaultUI: true,
      center: {
        lat: 12.863792264342496,
        lng: 113.17948152717304
      }
    }
  }

  render() {
    return (
      <Provider
        value={{
          google: this.google,
          map: this.map,
          mapEventBus: this.mapEventBus,
          infoWindows: this.infoWindows
        }}
      >
        <div
          className={classnames('map', this.props.className)}
          ref={dom$ => {
            this.container$ = dom$
          }}
        >
          {this.state.ready && this.props.children}
        </div>
      </Provider>
    )
  }

  state = {
    ready: false
  }

  mapEventBus = new EventBus()
  addListener = (...args) => run(this.mapEventBus, 'on', ...args)

  async componentDidMount() {
    this.addListener(
      'ready',
      () => {
        this.__init__right__click__simulator()
        this.locate()

        Object.keys(this.props)
          .filter(key => key.startsWith('on'))
          .map(event => {
            this.addListener(event, (...args) =>
              run(this.props, event, ...args)
            )
          })
      },
      true
    )

    // Google SDK
    this.google = await source.js(
      `${this.props.sdk}?libraries=places&key=${this.props.apiKey}&language=${
        this.props.languageKey
      }`,
      'google'
    )

    this.init()
  }

  infoWindows = []
  init = () => {
    const { google } = this

    const styledMapType = new google.maps.StyledMapType([
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ])

    this.map = new google.maps.Map(
      this.container$,
      getAvailableKeys(this.props.config, [
        'center',
        'zoom',
        'disableDefaultUI'
      ])
    )

    this.map.mapTypes.set('styled_map', styledMapType)
    this.map.setMapTypeId('styled_map')

    // 导航服务 https://developers.google.com/maps/documentation/javascript/examples/directions-simple
    this.directionService = new google.maps.DirectionsService()
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      // map: this.map,
      suppressMarkers: true // 禁止渲染标志 https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions.suppressMarkers
    })
    this.autocompleteService = new google.maps.places.AutocompleteService()
    this.placesService = new google.maps.places.PlacesService(this.map)

    this.map.addListener('click', e => {
      console.log(`${e.latLng.lat()}, ${e.latLng.lng()}`)
      run(this.mapEventBus, 'emit', 'onClick', e)

      // 关闭所有 infoWindow
      this.infoWindows.forEach(infoWindow => infoWindow.close())
    })

    this.map.addListener('rightclick', e => {
      // console.log(`${e.latLng.lat()}, ${e.latLng.lng()}`)

      const eLat = e.latLng.lat()
      const eLng = e.latLng.lng()
      run(this.mapEventBus, 'emit', '__fake__right__click', eLng, eLat)
      run(this.mapEventBus, 'emit', 'onRightClick', e)
    })

    this.map.addListener('tilesloaded', () => {
      this.setState({ ready: true }, () => {
        run(this.mapEventBus, 'emit', 'ready')
      })
    })

    this.map.addListener('center_changed', e => {
      run(this.mapEventBus, 'emit', 'onCenterChanged', e)
    })
  }

  /**
   * 定位
   */
  currentPosition
  locate = async () => {
    if (!this.state.ready) {
      return console.error('GoogleMap 还未加载')
    }

    const { google } = this

    try {
      const { latitude, longitude } = await getCurrentPosition()
      this.currentPosition = new google.maps.LatLng(latitude, longitude)

      run(this.mapEventBus, 'emit', 'locate', { latitude, longitude })

      this.map.setCenter(this.currentPosition)
      this.map.setZoom(14)

      run(this.mapEventBus, 'emit', 'onLocateSuccessful', {
        latitude,
        longitude
      })

      return { latitude, longitude }
    } catch (error) {
      run(this.mapEventBus, 'emit', 'onLocateFailed', error)
      console.error('定位失败, 原因：', error)
    }
  }

  /**
   * 导航
   */
  navigate = ({
    from: origin = this.__location,
    to: destination,
    method: travelMode = 'DRIVING'
  }) =>
    new Promise((resolve, reject) => {
      if (!this.state.ready) {
        reject(new Error('GoogleMap 还未加载'))
        return console.error('GoogleMap 还未加载')
      }

      const { google } = this

      this.directionService.route(
        {
          origin,
          destination,
          travelMode
        },
        (result, status) => {
          // console.log(result, status)

          if (status === google.maps.DirectionsStatus.OK) {
            resolve(result)
            this.directionsDisplay.setMap(this.map)
            this.directionsDisplay.setDirections(result)
          } else {
            reject(status)
          }
        }
      )
    })

  __trigger__right__click
  __init__right__click__simulator = () => {
    const { container$ } = this
    const fakeRightClickEvent = new MouseEvent('click', {
      clientX: 1,
      clientY: 1,
      button: 2
    })

    const map$ = container$.querySelector(
      '.gm-style > div:nth-child(1) > div:nth-child(3)'
    )

    this.__trigger__right__click = () => {
      map$.dispatchEvent(fakeRightClickEvent)
    }
  }

  getScreenInfo = () =>
    new Promise(resolve => {
      this.addListener(
        '__fake__right__click',
        (leftLng, topLat) => {
          const center = this.map.getCenter()
          const centerLng = center.lng()
          const middleLat = center.lat()

          const lat = {
            top: topLat,
            middle: middleLat,
            bottom: middleLat * 2 - topLat
          }
          Object.assign(lat, {
            min: lat.bottom,
            max: lat.top
          })

          const lng = {
            left: leftLng,
            center: centerLng,
            right: centerLng * 2 - leftLng
          }
          Object.assign(lng, {
            min: lng.left,
            max: lng.right
          })

          resolve({
            lat,
            lng,
            top: {
              left: [lng.left, lat.top],
              center: [lng.center, lat.top],
              right: [lng.right, lat.top]
            },
            middle: {
              left: [lng.left, lat.middle],
              center: [lng.center, lat.middle],
              right: [lng.right, lat.middle]
            },
            bottom: {
              left: [lng.left, lat.bottom],
              center: [lng.center, lat.bottom],
              right: [lng.right, lat.bottom]
            }
          })
        },
        true
      )

      run(this, '__trigger__right__click')
    })
}
