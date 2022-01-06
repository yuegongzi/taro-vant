import { addUnit, computedStyle, style } from '../utils'

function rootStyle(data: any) {
  return computedStyle({
    'padding-left': addUnit(data.gutter),
  })
}

function wrapperStyle(data: any) {
  const width = 100 / data.columnNum + '%'

  return computedStyle({
    width: width,
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
    ? style({
      right: addUnit(data.gutter),
      bottom: addUnit(data.gutter),
      height: 'auto',
    })
    : ''
}

export { wrapperStyle, contentStyle, rootStyle }

