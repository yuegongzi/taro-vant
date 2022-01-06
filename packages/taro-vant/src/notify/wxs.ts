import { addUnit,computedStyle } from '../utils'

function rootStyle(data: any) {
  return computedStyle({
    'z-index': data.zIndex,
    top: addUnit(data.top),
  })
}

function notifyStyle(data: any) {
  return computedStyle({
    background: data.background,
    color: data.color,
  })
}

export { rootStyle, notifyStyle }
