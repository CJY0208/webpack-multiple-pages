import { get, run, isExist, globalThis as root } from '@helpers'

const getCurrentPosition = async options =>
  new Promise((resolve, reject) => {
    if (!isExist(get(root, 'navigator.geolocation.getCurrentPosition'))) {
      console.warn('浏览器不支持！')
      return reject(new Error('浏览器不支持'))
    }

    let timeout = setTimeout(() => {
      console.warn('定位超时！')
      reject(new Error('定位超时'))
    }, 10000)

    run(
      root,
      'navigator.geolocation.getCurrentPosition',
      pos => {
        clearTimeout(timeout)
        console.log(
          `地理数据来源：浏览器api，值为latitude: ${get(
            pos,
            'coords.latitude'
          )}, longitude: ${get(pos, 'coords.longitude')}`
        )
        get(pos, 'coords') |> resolve
      },
      err => {
        clearTimeout(timeout)
        console.warn('获取地理位置失败，原因：', err)
        reject(err)
      },
      options
    )
  })

export default getCurrentPosition
