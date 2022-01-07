import { computedStyle } from '../utils'

function rootStyle(data: any) {
  return computedStyle([
    {
      '-webkit-transition-duration': data.currentDuration + 'ms',
      'transition-duration': data.currentDuration + 'ms',
    },
    data.display ? null : 'display: none',
    data.style,
  ])
}

export { rootStyle }
