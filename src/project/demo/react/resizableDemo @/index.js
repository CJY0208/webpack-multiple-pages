import React from 'react'
import { render } from 'react-dom'

import { ResizableX, ResizableContent } from './Resizable'
import Content from './Content'

render(
  <div>
    <ResizableX initialValue={20} min={30} max={60}>
      <ResizableContent>
        <Content>Content 1</Content>
      </ResizableContent>
      <ResizableContent>
        <Content>Content 2</Content>
      </ResizableContent>
    </ResizableX>
  </div>,
  document.getElementById('root')
)
