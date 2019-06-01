import React, { useState, useRef, useEffect } from 'react'

import { View, ScrollView } from '@UI'
import { Tween, sample, clamp } from '@helpers'

import styles from './style.m.scss'
import EaseLine from './components/EaseLine'

export default function Easing() {
  return (
    <View className="container">
      <ScrollView>
        <ul>
          {Object.keys(Tween.easing).map(ease => (
            <li key={ease}>
              <EaseLine ease={ease} />
            </li>
          ))}
        </ul>
      </ScrollView>
    </View>
  )
}
