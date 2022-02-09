import {
  createCanvasContext,
  createSelectorQuery,
  useReady,
} from '@tarojs/taro'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, CoverView, View } from '@tarojs/components'
import type { CircleProps } from './PropsType'
import { createNamespace, getSystemInfoSync, isObj, ENV, uuid } from '../utils'
import { adaptor } from './canvas'
import clsx from 'clsx'

const [ bem ] = createNamespace('circle')

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100)
}

const PERIMETER = 2 * Math.PI
const BEGIN_ANGLE = -Math.PI / 2
const STEP = 1

function Circle(props: CircleProps) {
  const canvasId = useMemo(() => uuid(32), [])
  const [ state, setState ] = useState({
    ready: false,
    hoverColor: '',
  })

  const ref: any = useRef({
    init: false,
    currentValue: undefined,
    interval: undefined,
  })

  const {
    text,
    lineCap = 'round',
    value = 0,
    speed = 50,
    size = 100,
    fill,
    layerColor = '#ffffff',
    color = '#1989fa',
    type = '',
    strokeWidth = 4,
    clockwise = true,
    style,
    className,
    children,
    ...others
  } = props

  useReady(() => {
    setState((state) => {
      return {
        ...state,
        ready: true,
      }
    })
  })

  useEffect(() => {
    setTimeout(() => {
      if (ENV.h5) {
        setState((state) => {
          return {
            ...state,
            ready: true,
          }
        })
      }
    }, 100)
  }, [])
  const getContext = useCallback(() => {
    if (type === '' || ENV.h5) {
      let ctx = null

      try {
        ctx = createCanvasContext(canvasId)
      } catch (error) {
        console.error(error)
      }

      return Promise.resolve(ctx)
    }
    const dpr = getSystemInfoSync().pixelRatio
    return new Promise((resolve: any) => {
      createSelectorQuery().
        select(`#${canvasId}`).
        node().
        exec((res: any) => {
          const canvas = res[0].node
          if (canvas) {
            const ctx = canvas.getContext(type)
            if (!ref.current.init) {
              ref.current.init = true
              canvas.width = size * dpr
              canvas.height = size * dpr
              ctx.scale(dpr, dpr)
            }
            resolve(adaptor(ctx))
          }
        })
    })
  }, [ size, type ])

  const setHoverColor = function () {
    if (isObj(color)) {
      const _color = color as Record<string, string>
      return getContext().then((context: any) => {
        if (context) {
          let LinearColor: any
          if (ENV.h5) {
            LinearColor = context.ctx.createLinearGradient(size, 0, 0, 0)
          } else {
            LinearColor = context.createLinearGradient(size, 0, 0, 0)
          }
          Object.keys(color).
            sort((a, b) => parseFloat(a) - parseFloat(b)).
            map((key: any) =>
              LinearColor.addColorStop(parseFloat(key) / 100, _color[key]),
            )
          setState((state) => {
            return {
              ...state,
              hoverColor: LinearColor,
            }
          })
        }
      })
    }
    setState((state: any) => {
      return {
        ...state,
        hoverColor: color,
      }
    })
    return Promise.resolve()
  }
  const presetCanvas = useCallback(
    (
      context: any,
      strokeStyle: any,
      beginAngle: any,
      endAngle: any,
      fill?: any,
    ) => {
      const position = size / 2
      const radius = position - strokeWidth / 2
      context.setStrokeStyle(strokeStyle)
      context.setLineWidth(strokeWidth)
      context.setLineCap(lineCap)
      context.beginPath()
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise)
      context.stroke()
      if (fill) {
        context.setFillStyle(fill)
        context.fill()
      }
    },
    [ clockwise, lineCap, size, strokeWidth ],
  )
  const renderLayerCircle = useCallback(
    (context: any) => {
      presetCanvas(context, layerColor, 0, PERIMETER, fill)
    },
    [ fill, layerColor, presetCanvas ],
  )
  const renderHoverCircle = useCallback(
    (context: any, formatValue: any) => {
      // 结束角度
      const progress = PERIMETER * (formatValue / 100)
      const endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress)
      presetCanvas(context, state.hoverColor, BEGIN_ANGLE, endAngle)
    },
    [ clockwise, presetCanvas, state.hoverColor ],
  )
  const drawCircle = useCallback(
    (currentValue: any) => {
      getContext().then((context: any) => {
        if (context) {
          console.log('执行....')
          context.clearRect(0, 0, size, size)
          renderLayerCircle(context)
          const formatValue = format(currentValue)
          if (formatValue !== 0) {
            renderHoverCircle(context, formatValue)
          }
          context.draw()
        }
      })
    },
    [ getContext, renderHoverCircle, renderLayerCircle, size ],
  )
  const clearMockInterval = function () {
    if (ref.current.interval) {
      clearTimeout(ref.current.interval)
      ref.current.interval = null
    }
  }
  const reRender = useCallback(() => {
    if (speed <= 0 || speed > 1000) {
      drawCircle(value)
      return
    }
    clearMockInterval()
    ref.current.currentValue = ref.current.currentValue || 0
    const run = () => {
      ref.current.interval = setTimeout(() => {
        if (ref.current.currentValue !== value) {
          if (Math.abs(ref.current.currentValue - value) < STEP) {
            ref.current.currentValue = value
          } else if (ref.current.currentValue < value) {
            ref.current.currentValue += STEP
          } else {
            ref.current.currentValue -= STEP
          }
          drawCircle(ref.current.currentValue)
          run()
        } else {
          clearMockInterval()
        }
      }, 1000 / speed)
    }
    run()
  }, [ drawCircle, speed, value ])

  useEffect(() => {
    if (state.ready) {
      reRender()
    }
  }, [ reRender, state.ready, value ])

  useEffect(() => {
    if (state.ready) {
      drawCircle(ref.current.currentValue)
    }
    // eslint-disable-next-line
  }, [state.ready, size])

  useEffect(() => {
    if (state.ready) {
      setHoverColor().then(() => {
        drawCircle(ref.current.currentValue)
      })
    }
    // eslint-disable-next-line
  }, [state.ready, color])

  useEffect(() => {
    return () => {
      clearMockInterval()
    }
    /* eslint-disable-next-line */
  }, [state.ready])

  return (
    <View className={clsx(bem(), className)} style={style} {...others}>
      <Canvas
        // eslint-disable-next-line
        // @ts-ignore
        width={size}
        height={size}
        nativeProps={{ width: size, height: size }}
        className={clsx(bem('canvas'))}
        type={type}
        style={'width: ' + `${size}px` + ';height:' + `${size}px`}
        id={canvasId}
        canvasId={canvasId}
      />
      {!text ? (
        <View className={clsx(bem('text'))}>{children}</View>
      ) : (
        <CoverView className={clsx(bem('text'))}>{text}</CoverView>
      )}
    </View>
  )
}

Circle.displayName = 'Circle'
export default Circle
