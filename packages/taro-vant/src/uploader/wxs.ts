import { addUnit,computedStyle } from '../utils'

function sizeStyle(data: any) {
  return computedStyle({
    width: addUnit(data.previewSize),
    height: addUnit(data.previewSize),
  })
}

export { sizeStyle }
