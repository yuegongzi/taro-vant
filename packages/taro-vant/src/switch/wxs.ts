import { addUnit, computedStyle } from '../utils'

function rootStyle(data: any) {
  const currentColor =
    data.checked === data.activeValue ? data.activeColor : data.inactiveColor

  return computedStyle({
    'font-size': addUnit(data.size),
    'background-color': currentColor,
  })
}

const BLUE = '#1989fa'
const GRAY_DARK = '#969799'

function loadingColor(data: any) {
  return data.checked === data.activeValue
    ? data.activeColor || BLUE
    : data.inactiveColor || GRAY_DARK
}

export { rootStyle, loadingColor }
