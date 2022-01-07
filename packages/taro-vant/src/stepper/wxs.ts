import { addUnit,computedStyle } from '../utils'

function buttonStyle(data: any) {
  return computedStyle({
    width: addUnit(data.buttonSize),
    height: addUnit(data.buttonSize),
  })
}

function inputStyle(data: any) {
  return computedStyle({
    width: addUnit(data.inputWidth),
    height: addUnit(data.buttonSize),
  })
}

export { inputStyle, buttonStyle }
