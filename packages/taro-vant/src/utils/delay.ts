import type { SelectorQuery } from '@tarojs/taro'
import { createSelectorQuery } from '@tarojs/taro'

export function delay(delayTime = 25): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, delayTime)
  })
}

export function delayQuerySelector(
  selectorStr: string,
  delayTime = 500,
): Promise<any[]> {
  return new Promise((resolve) => {
    const selector: SelectorQuery = createSelectorQuery()
    delay(delayTime).then(() => {
      selector.select(selectorStr).boundingClientRect().exec((res: any[]) => {
        resolve(res)
      })
    })
  })
}
