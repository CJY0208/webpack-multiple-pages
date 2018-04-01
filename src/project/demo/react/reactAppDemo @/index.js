import '__prefix__'
import React from 'react'
import ReactDOM from 'react-dom'
import { helpers } from '@common'

import App from './app'
import locale from './i18n/zh_CN'

const translate = helpers.i18n(locale)

document.getElementsByTagName('title')[0].innerHTML = translate('标题')

ReactDOM.render(<App />, document.getElementById('app'))
