import React from 'react'

import './style.m.scss'

function ResizableContent({ children, style }) {
  return (
    <div className="content" style={style}>
      {children}
    </div>
  )
}

export default ResizableContent
