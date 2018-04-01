import * as common from '@common'
import lodash from 'lodash'

window.common = common

console.log(common)

window._ = lodash

// console.log(1)

// new Promise(resolve => {
//   console.log(2)

//   setTimeout(() => {
//     resolve()
//     // console.log(3)
//     process.nextTick(() => {
//       console.log(3)
//     })
//   })
// }).then(() => {
//   console.log(4)
// })
// console.log(5)
// setTimeout(() => {
//   console.log(6)
// })

// console.log(process.nextTick)
