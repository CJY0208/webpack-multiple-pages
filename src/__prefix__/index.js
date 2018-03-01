import './reset'
import 'babel-polyfill'

import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
viewportUnitsBuggyfill.init()

import FastClick from 'fastclick'
FastClick.attach(document.body)
