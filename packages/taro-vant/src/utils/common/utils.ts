import Taro, {
  createSelectorQuery,
  getSystemInfoSync as TaroGetSystemInfoSync,
} from '@tarojs/taro'
import { isPlainObject, isPromise } from '../type'
import { canIUseNextTick } from './version'

export function range(num: any, min: any, max: any) {
  return Math.min(Math.max(num, min), max)
}

export function nextTick(cb: any) {
  if (canIUseNextTick()) {
    Taro.nextTick(cb)
  } else {
    setTimeout(() => {
      cb()
    }, 33.333333333333336)
  }
}

let systemInfo: any

export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = TaroGetSystemInfoSync()
  }
  return systemInfo
}

let menuInfo: any

export function getMenuButtonBoundingClientRect() {
  if (menuInfo == null) {
    menuInfo = Taro.getMenuButtonBoundingClientRect()
  }
  return menuInfo
}

export function requestAnimationFrame(cb: any) {
  const systemInfo = getSystemInfoSync()
  if (systemInfo.platform === 'devtools') {
    return setTimeout(() => {
      cb()
    }, 33.333333333333336)
  }
  return createSelectorQuery().
    selectViewport().
    boundingClientRect().
    exec(() => {
      cb()
    })
}

export function pickExclude(obj: any, keys: any) {
  if (!isPlainObject(obj)) {
    return {}
  }
  return Object.keys(obj).reduce((prev: any, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key]
    }
    return prev
  }, {})
}

export function getRect(context: any, selector: any) {
  return new Promise((resolve) => {
    let query = createSelectorQuery()
    if (context) {
      query = query.in(context)
    }
    query.
      select(selector).
      boundingClientRect().
      exec((rect: any = []) => {
        return resolve(rect[0])
      })
  })
}

export function getAllRect(context: any, selector: any) {
  return new Promise((resolve) => {
    let query = createSelectorQuery()
    if (context) {
      query = query.in(context)
    }
    query.
      selectAll(selector).
      boundingClientRect().
      exec((rect = []) => resolve(rect[0]))
  })
}

export function toPromise(promiseLike: any) {
  if (isPromise(promiseLike)) {
    return promiseLike
  }
  return Promise.resolve(promiseLike)
}

export function noop() {}

export function toDecimal2(x: string) {
  let f = parseFloat(x)
  if (isNaN(f)) {
    return ''
  }
  f = Math.round(f * 100) / 100
  let s = f.toString()
  let rs = s.indexOf('.')
  if (rs < 0) {
    rs = s.length
    s += '.'
  }
  while (s.length <= rs + 2) {
    s += '0'
  }
  return s
}

/**
 * @desc 分转化为元 - 正则解决精度
 * @param { Number } fen
 * @return { String }
 */
export function fenToYuan(fen: number) {
  const num = fen * 0.01
  let numStr = num + ''
  const reg =
    numStr.indexOf('.') > -1
      ? /(\d{1,3})(?=(?:\d{3})+\.)/g
      : /(\d{1,3})(?=(?:\d{3})+$)/g
  numStr = numStr.replace(reg, '$1')
  numStr = toDecimal2(numStr)
  return numStr
}
