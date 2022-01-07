import { addUnit,style } from '../utils'

function sizeStyle(data: any) {
  return style({
    width: addUnit(data.previewSize),
    height: addUnit(data.previewSize),
  })
}

export { sizeStyle }
