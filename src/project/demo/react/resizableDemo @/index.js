import React from 'react'
import { render } from 'react-dom'

import { ResizableX, ResizableY } from './Resizable'
import Content from './Content'

render(
  <div style={{ height: '100%' }}>
    <ResizableY min="30%" max="70%" barSize={20}>
      <ResizableX min="30%" max="70%" barSize={20}>
        <Content>Content 1</Content>
        <Content>Content 2</Content>
      </ResizableX>
      <ResizableX min="30%" max="70%" barSize={20}>
        <Content>Content 3</Content>
        <Content>Content 4</Content>
      </ResizableX>
    </ResizableY>
  </div>,
  document.getElementById('root')
)
