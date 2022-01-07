import { createAnimation } from '@tarojs/taro'
import { getRect } from '../utils'

function useAnimation(expanded: any, mounted: any, height: any, setState: any) {
  const animation = createAnimation({
    duration: 0,
    timingFunction: 'ease-in-out',
  })
  if (expanded) {
    if (height === 0) {
      animation.height('auto').top(1).step()
    } else {
      animation.height(height).top(1).step({
        duration: mounted ? 300 : 1,
      }).height('auto').step()
    }
    const animationclass = animation.export()
    setState?.((state: any) => {
      return {
        ...state,
        animation: animationclass,
      }
    })
  } else {
    animation.height(height).top(0).step({ duration: 1 }).height(0).step({
      duration: 300,
    })
    const animationclass = animation.export()
    setState?.((state: any) => {
      return {
        ...state,
        animation:
          process.env.TARO_ENV === 'h5'
            ? `${animationclass}--1`
            : animationclass,
      }
    })
  }
}

export function setContentAnimate(
  context: any,
  expanded: any,
  mounted: any,
  setState: any,
  ref?: any,
) {
  getRect(context, '.van-collapse-item__content').then((rect: any) => {
    return process.env.TARO_ENV === 'h5'
      ? ref.current.clientHeight
      : rect?.height
  }).then((height) => {
    useAnimation(expanded, mounted, height, setState)
  })
}
