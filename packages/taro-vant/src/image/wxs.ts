import { addUnit, computedStyle } from '../utils'


function rootStyle(data: any) {
  return computedStyle([
    {
      width: addUnit(data.width),
      height: addUnit(data.height),
      'border-radius': addUnit(data.radius),
    },
    data.radius ? 'overflow: hidden' : null,
  ])
}

const FIT_MODE_MAP = {
  none: 'scaleToFill',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix',
  scaleDown: 'aspectFit',
}

export type FitType =
  | 'none'
  | 'fill'
  | 'cover'
  | 'contain'
  | 'widthFix'
  | 'heightFix'
  | 'scaleDown'

function mode(fit: FitType) {
  return FIT_MODE_MAP[fit]
}

export { rootStyle, mode }
