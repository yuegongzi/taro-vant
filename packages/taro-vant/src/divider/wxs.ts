import { addUnit,computedStyle } from '../utils'

export function rootStyle(data: any) {
  return computedStyle([
    {
      'border-color': data.borderColor,
      color: data.textColor,
      'font-size': addUnit(data.fontSize),
    },
  ])
}
