import { computedStyle } from '../utils'

export function barStyle(data: any) {
  return computedStyle({
    'z-index': data.zIndex,
    'padding-top': data.safeAreaInsetTop
      ? data.statusBarHeight + 'px'
      : data.fromTop + 'px',
  })
}
