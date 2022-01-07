import { computedStyle } from '../utils'
function rootStyle(data: any) {
  return computedStyle({
    'background-color': data.plain ? '' : data.color,
    color: data.textColor || data.plain ? data.textColor || data.color : '',
  })
}

export { rootStyle }
