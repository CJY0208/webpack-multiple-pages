import '__prefix__'
import 'css-loader/lib/css-base'
import 'style-loader/lib/addStyles'
import React from 'react'
import { render } from 'react-dom'

import Roll from './Roll'

document.getElementsByTagName('title')[0].innerHTML = 'Roll Demo'

render(<Roll />, document.getElementById('root'))
