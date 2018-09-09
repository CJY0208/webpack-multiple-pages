import React from 'react'
import { withRouter } from 'react-router-dom'

export default withRouter(({ history, location, to, children }) => (
  <a
    className={location.pathname.startsWith(to) ? 'active' : ''}
    onClick={() => {
      const to_path_arr = to.split('/')

      history.push(
        location.pathname
          .split('/')
          .map(path => to_path_arr.shift() || path)
          .join('/')
      )
    }}
  >
    {children}
  </a>
))
