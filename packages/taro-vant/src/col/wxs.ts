import { computedStyle,addUnit } from '../utils'

function rootStyle(data: any) {
  if (!data.gutter) {
    return ''
  }

  return computedStyle({
    'padding-right': addUnit(data.gutter / 2),
    'padding-left': addUnit(data.gutter / 2),
  })
}

export { rootStyle }
