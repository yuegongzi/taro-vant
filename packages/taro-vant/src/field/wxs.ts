import { addUnit, computedStyle } from '../utils'

export function inputStyle(autosize: any) {
  if (autosize && autosize.constructor === 'Object') {
    return computedStyle({
      'min-height': addUnit(autosize.minHeight),
      'max-height': addUnit(autosize.maxHeight),
    })
  }

  return ''
}

