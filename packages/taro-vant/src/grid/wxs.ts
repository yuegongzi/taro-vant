import { addUnit, computedStyle } from '../utils'

function rootStyle(data: any) {
  return computedStyle({
    'padding-left': addUnit(data.gutter),
  })
}

function wrapperStyle(data: any) {
  if (!data.columnNum) {
    return {}
  }
  const width = 100 / data.columnNum + '%'
  return computedStyle({
    // width: width,
    'flex-basis': width,
    'padding-top': data.square ? width : null,
    'padding-right': addUnit(data.gutter),
    'margin-top':
      data.index >= data.columnNum && !data.square
        ? addUnit(data.gutter)
        : null,
  })
}

function contentStyle(data: any) {
  return data.square
    ? computedStyle({
      right: addUnit(data.gutter),
      bottom: addUnit(data.gutter),
    })
    : ''
}

export { wrapperStyle, contentStyle, rootStyle }

