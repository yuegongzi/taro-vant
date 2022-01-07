import { computedStyle } from '../utils'

function wrapStyle(data: any) {
  return computedStyle({
    transform: data.transform
      ? 'translate3d(0, ' + data.transform + 'px, 0)'
      : '',
    top: data.fixed ? data.offsetTop + 'px' : '',
    'z-index': data.zIndex,
  })
}

function containerStyle(data: any) {
  return computedStyle({
    height: data.fixed ? data.height + 'px' : '',
    'z-index': data.zIndex,
  })
}

export { wrapStyle, containerStyle }
