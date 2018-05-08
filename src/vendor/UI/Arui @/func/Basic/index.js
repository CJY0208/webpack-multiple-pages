import React, { Component } from 'react'
import { akulaku, helpers } from '@common'

const { get, value, run } = helpers

const { Provider, Consumer } = React.createContext()

export default class Basic extends Component {
  componentDidMount() {
    this.init()
  }

  init = async () => {
    const {
      countryCode,
      currencyCode,
      areaId,
      ...basicInfo
    } = await akulaku.getBasicInfo({
      fromNative: true
    })

    const languageCode = run(
      value(this.props.languageCode, basicInfo.languageCode),
      'toUpperCase'
    )

    const localeMap = value(get(this.props, 'locale'), () => {
      console.warn('[App] 需要locale属性')
      return {}
    })

    let locale = await run(
      {
        EN: localeMap.en,
        IN: localeMap.in,
        ID: localeMap.in,
        VN: localeMap.vi,
        VI: localeMap.vi,
        MS: localeMap.ms
      }[languageCode]
    )

    const formatPrice =
      run(currencyCode, 'toUpperCase') === 'RP'
        ? helpers.getFormatter({
            separator: '.'
          })
        : _ => _

    const translate = helpers.i18n(locale)

    this.setState({
      areaId: Number(areaId) === 0 ? 1 : areaId,
      languageCode,
      countryCode,
      currencyCode,
      translate,
      formatPrice
    })
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.state && this.props.children}
      </Provider>
    )
  }
}

export const withBasic = Component => {
  const C = props => (
    <Consumer>{context => <Component {...context} {...props} />}</Consumer>
  )

  C.displayName = `withBasic(${helpers.value(
    Component.displayName,
    Component.name
  )})`

  return C
}
