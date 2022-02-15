import {
  createCanvasContext,
  createSelectorQuery,
  useReady,
} from '@tarojs/taro'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, CoverView, View } from '@tarojs/components'
import type { CircleProps } from './PropsType'
import { createNamespace, ENV, getSystemInfoSync, isObj, uuid } from '../utils'
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
  const [ ready, setReady ] = useState(false)
  const dpr = getSystemInfoSync().pixelRatio
  const {
    text,
    lineCap = 'round',
    value = 0,
    speed = 50,
    size = 100,
    fill,
    layerColor = '#ffffff',
    color = '#1989fa',
    strokeWidth = 4,
    clockwise = true,
    style,
    className,
    children,
    ...others
  } = props

  const ref: any = useRef({
    init: false,
    currentValue: value,
    interval: undefined,
    color: undefined,
  })

  const getContext = (): Promise<any> => {
    if (ENV.h5) {
      let ctx = null
      try {
        ctx = createCanvasContext(canvasId)
        // @ts-ignore
        ctx.canvas.width = size * dpr
        // @ts-ignore
        ctx.canvas.height = size * dpr
        // @ts-ignore
        ctx.ctx.scale(dpr, dpr)
      } catch (error) {
        console.error(error)
      }

      return Promise.resolve(ctx)
    }
    return new Promise((resolve: any) => {
      createSelectorQuery().
        select(`#${canvasId}`).
        node().
        exec((res: any) => {
          const canvas = res[0].node
          if (canvas) {
            const ctx = canvas.getContext('2d')
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
  }

  const createStrokeStyle = (context: any, color: any) => {
    //创建样式
    let strokeStyle: any
    const _color = isObj(color) ? color : { '0%': color, '100%': color }
    if (ENV.h5) {
      strokeStyle = context.ctx.createLinearGradient(size, 0, 0, 0)
    } else {
      strokeStyle = context.createLinearGradient(size, 0, 0, 0)
    }
    Object.keys(_color).
      sort((a, b) => parseFloat(a) - parseFloat(b)).
      map((key: any) =>
        strokeStyle.addColorStop(parseFloat(key) / 100, _color[key]),
      )
    return strokeStyle
  }
  const presetCanvas = (
    context: any,
    strokeStyle: any,
    beginAngle: any,
    endAngle: any,
    fill?: any,
  ) => {
    const position = size / 2
    const radius = position - strokeWidth / 2
    if (ENV.h5) {
      //Taro API有问题 直接通过ctx调用原生进行画
      context.ctx.lineWidth = strokeWidth
      context.ctx.lineCap = lineCap
      context.ctx.strokeStyle = strokeStyle
      context.ctx.beginPath()
      context.ctx.arc(
        position,
        position,
        radius,
        beginAngle,
        endAngle,
        !clockwise,
      )
      context.ctx.stroke()
      if (fill) {
        context.ctx.fillStyle = fill
        context.ctx.fill()
      }
      context.ctx.closePath()
    } else {
      context.setLineWidth(strokeWidth)
      context.setLineCap(lineCap)
      context.setStrokeStyle(strokeStyle)
      context.beginPath()
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise)
      context.stroke()
      if (fill) {
        context.setFillStyle(fill)
        context.fill()
      }
    }
  }

  const renderLayerCircle = (context: any) => {
    presetCanvas(
      context,
      createStrokeStyle(context, layerColor),
      0,
      PERIMETER,
      fill,
    )
  }
  const renderHoverCircle = async (context: any, formatValue: any) => {
    // 结束角度
    const progress = PERIMETER * (formatValue / 100)
    const endAngle = clockwise
      ? BEGIN_ANGLE + progress
      : 3 * Math.PI - (BEGIN_ANGLE + progress)
    if (!ref.current.color) {
      ref.current.color = createStrokeStyle(context, color)
    }
    presetCanvas(context, ref.current.color, BEGIN_ANGLE, endAngle)
    setReady(true)
  }

  const drawCircle = (currentValue: any) => {
    getContext().then((context: any) => {
      if (context) {
        context.clearRect(0, 0, size, size)
        renderLayerCircle(context)
        const formatValue = format(currentValue)
        if (formatValue !== 0) {
          renderHoverCircle(context, formatValue)
        }
      }
    })
  }

  const clearMockInterval = function () {
    if (ref.current.interval) {
      clearTimeout(ref.current.interval)
      ref.current.interval = null
    }
  }
  const draw = () => {
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
  }

  useReady(() => {
    drawCircle(value) //画出第一次的值
  })

  useEffect(() => {
    if (ready) {
      draw()
    }
    // eslint-disable-next-line
  }, [props.size, props.value])

  useEffect(() => {
    ref.current.color = undefined
  }, [ props.color ])
  useEffect(() => {
    return () => {
      clearMockInterval()
    }
    /* eslint-disable-next-line */
  }, [])
  const st = { height: `${size}px`, width: `${size}px` }
  return (
    <View className={clsx(bem(), className)} style={style} {...others}>
      <Canvas
        // eslint-disable-next-line
        // @ts-ignore
        width={size}
        height={size}
        nativeProps={{ width: size, height: size, style: st }}
        className={clsx(bem('canvas'))}
        type='2d'
        style={st}
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
