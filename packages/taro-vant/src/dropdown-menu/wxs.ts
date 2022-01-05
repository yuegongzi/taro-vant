import { addUnit,computedStyle } from '../utils'

export function displayTitle(item: any) {
  const match = (item.options || []).filter(function (option: any) {
    return option.value === item.value
  })
  const displayTitle = match.length ? match[0].text : ''
  if (
    displayTitle === null ||
    displayTitle === undefined ||
    displayTitle === ''
  ) {
    return item.title || ''
  }
  return displayTitle
}


export function wrapperStyle(data: any) {
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

export function contentStyle(data: any) {
  return data.square
    ? computedStyle({
      right: addUnit(data.gutter),
      bottom: addUnit(data.gutter),
      height: 'auto',
    })
    : ''
}

