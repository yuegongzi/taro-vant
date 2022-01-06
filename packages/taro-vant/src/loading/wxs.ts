import { addUnit,computedStyle } from '../utils'

function spinnerStyle(data: any) {
  return computedStyle({
    color: data.color,
    width: addUnit(data.size),
    height: addUnit(data.size),
  })
}

function textStyle(data: any) {
  return computedStyle({
    'font-size': addUnit(data.textSize),
  })
}

export { spinnerStyle, textStyle }
