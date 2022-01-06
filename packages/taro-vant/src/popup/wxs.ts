import { computedStyle } from '../utils'

function popupStyle(data: any) {
  return computedStyle([
    {
      'z-index': data.zIndex,
      '-webkit-transition-duration': data.currentDuration + 'ms',
      'transition-duration': data.currentDuration + 'ms',
    },
    data.display ? null : 'display: none',
  ])
}
export { popupStyle }
