import { addUnit, computedStyle } from '../utils'

function pivotText(pivotText: any, percentage: any) {
  return pivotText || percentage + '%'
}

function rootStyle(data: any) {
  return computedStyle({
    height: data.strokeWidth ? addUnit(data.strokeWidth) : '',
    background: data.trackColor,
  })
}

function portionStyle(data: any) {
  return computedStyle({
    background: data.inactive ? '#cacaca' : data.color,
    width: data.percentage ? data.percentage + '%' : '',
  })
}

function pivotStyle(data: any) {
  return computedStyle({
    color: data.textColor,
    visibility: data.right === 0 ? 'hidden' : 'visible',
    right: data.right + 'px',
    background: data.pivotColor
      ? data.pivotColor
      : data.inactive
        ? '#cacaca'
        : data.color,
  })
}

export { pivotText, rootStyle, portionStyle, pivotStyle }
