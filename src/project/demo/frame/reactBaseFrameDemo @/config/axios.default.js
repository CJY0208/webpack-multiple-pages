import axios from 'axios'

import { helpers } from '@common'

const { isExist, isIOS, value } = helpers

axios.defaults.transformRequest = [
  (param, headers) => {
    switch (headers['Content-Type']) {
      case 'application/x-www-form-urlencoded':
        return isExist(param)
          ? Object.entries(param)
              .filter(([key, val]) => isExist(val))
              .map(
                ([key, val]) =>
                  `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
              )
              .join('&')
          : param
      case 'application/json':
        return JSON.stringify(param)
      default:
        return param
    }
  }
]

axios.defaults.headers = Object.entries({
  // dt: value(() => {
  //   switch (isIOS()) {
  //     case true:
  //       return 5 // !process.env.TEST ? 2 : 3
  //     case false:
  //       return !process.env.TEST ? 1 : 4
  //   }
  // }),
  // vc: value(() => {
  //   switch (isIOS()) {
  //     case true:
  //       return !process.env.TEST ? 31 : 27
  //     case false:
  //       return !process.env.TEST ? undefined : 130
  //   }
  // }),
  'Content-Type': 'application/x-www-form-urlencoded'
})
  // 过滤掉无效的 header
  .filter(([key, value]) => isExist(value))
  .reduce(
    (res, [key, value]) =>
      Object.assign(res, {
        [key]: value
      }),
    {}
  )
