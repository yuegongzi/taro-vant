import { style } from '../wxs/style'
import { addUnit } from '../wxs/add-unit'

export function inputStyle(autosize: any) {
  if (autosize && autosize.constructor === 'Object') {
    return style({
      'min-height': addUnit(autosize.minHeight),
      'max-height': addUnit(autosize.maxHeight),
    })
  }

  return ''
}

