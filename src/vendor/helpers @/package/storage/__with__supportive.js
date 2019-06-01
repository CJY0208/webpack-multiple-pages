import { isExist } from '@helpers/base/is'

let __is__storage__supported = true

const __key = '__test__supportive__'
const storage = window.localStorage

if (!isExist(storage)) {
  __is__storage__supported = false
}

try {
  storage.setItem(__key, '__test__supportive__')
  storage.removeItem(__key)
} catch (err) {
  __is__storage__supported = false
}

export default function withSupportive(func) {
  if (!__is__storage__supported) {
    return () => console.warn('Storage unsupported')
  }

  return func
}
