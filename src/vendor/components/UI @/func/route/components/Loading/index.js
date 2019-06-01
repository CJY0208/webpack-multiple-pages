import React from 'react'

import Portal from '../../../../layout/Portal'
import ActivityIndicator from '../../../../components/ActivityIndicator'

import './style.m.css'

const Loading = () => (
  <Portal className="loading">
    <ActivityIndicator subColor="#ddd" className="activity-indicator" />
  </Portal>
)

export default Loading
