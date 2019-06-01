import React, { Component } from 'react'

import './style.m.css'

const RefreshHolder = ({ children }) => (
  <div className="holder">
    <div className="wrapper">{children}</div>
  </div>
)

export default RefreshHolder
