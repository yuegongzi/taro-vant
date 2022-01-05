import { computedStyle,addUnit } from '../utils'

export function computedTitleStyle(data: any) {
  return computedStyle([
    {
      'max-width': addUnit(data.titleWidth),
      'min-width': addUnit(data.titleWidth),
    },
    data.titleStyle,
  ])
}

