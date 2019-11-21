import React from 'react'

import './style.m.scss'

function ResizableContent({ children, width }) {
  return (
    <div
      className="content"
      style={{
        flex: width
      }}
    >
      {children}
    </div>
  )
}

export default ResizableContent
