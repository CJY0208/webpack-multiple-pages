import { get } from '../try'
import { isUndefined, isObject } from '../is'

/**
 * [template 简易字符串模板函数]
 * e.g: template('hello ${name}', { name: 'CJY' }) ==> 'hello CJY'
 * @param  {[字符串]} str  [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function template(str = '', data) {
  const exp = /\$\{\w*\}/g,
    keys = str.match(exp) || {}
  Object.keys(keys).forEach(_k => {
    const key = keys[_k].replace('${', '').replace('}', '')
    str = str.replace(new RegExp(`\\$\{${key}\}`, 'g'), get(data, key))
  })
  return str
}

export function i18n(locale) {
  return (keys, data) => {
    let text = get(locale, keys)

    if (isUndefined(text)) {
      return keys
    }

    if (isObject(data)) {
      text = template(text, data)
    }

    return text
  }
}
