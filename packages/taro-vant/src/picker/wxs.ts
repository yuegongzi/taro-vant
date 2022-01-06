import { isArray, computedStyle, addUnit,isObj } from '../utils'

function columnsStyle(data: any) {
  return computedStyle({
    height: data.itemHeight * data.visibleItemCount,
  })
}

function maskStyle(data: any) {
  return computedStyle({
    'background-size':
      '100% ' + ((data.itemHeight * (data.visibleItemCount - 1)) / 2 + 'px'),
  })
}

function frameStyle(data: any) {
  return computedStyle({
    height: data.itemHeight + 'px',
  })
}

function columns(columns: any) {
  if (!isArray(columns)) {
    return []
  }

  if (columns.length && !columns[0].values) {
    return [ { values: columns } ]
  }

  return columns
}

function optionText(option: any, valueKey: any) {
  return isObj(option) && option[valueKey] != null ? option[valueKey] : option
}

function rootStyle(data: any) {
  return computedStyle({
    height: data.itemHeight * data.visibleItemCount + 'px',
  })
}

function wrapperStyle(data: any) {
  const offset =
    data.offset + (data.itemHeight * (data.visibleItemCount - 1)) / 2

  return computedStyle({
    transition: 'transform ' + data.duration + 'ms',
    'line-height': data.itemHeight + 'px',
    transform: 'translate3d(0, ' + offset + 'px' + ', 0)',
  })
}

function styleTran(data: any) {
  const res: any = {}
  Object.keys(data).map((key) => {
    res[key] = addUnit(data[key])
  })
  return computedStyle(res)
}


export { columnsStyle, frameStyle, maskStyle, columns,optionText, rootStyle, wrapperStyle, styleTran  }
