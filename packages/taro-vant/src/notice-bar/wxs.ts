import { computedStyle } from '../utils'

function rootStyle(data: any) {
  return computedStyle({
    color: data.color,
    'background-color': data.backgroundColor,
    background: data.background,
  })
}

export { rootStyle }
