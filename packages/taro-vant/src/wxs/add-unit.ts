import Taro from '@tarojs/taro'

export function addUnit(value: any) {
  if (value == null) {
    return undefined
  }

  return /^-?\d+(\.\d+)?$/.test('' + value) ? Taro.pxTransform(value) : value
}

