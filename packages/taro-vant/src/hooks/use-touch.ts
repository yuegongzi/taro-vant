import { useRef } from 'react'
import type { ITouchEvent } from '@tarojs/components'

const MIN_DISTANCE = 10

type Direction = '' | 'vertical' | 'horizontal'

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }
  return ''
}

export const useTouch = () => {
  const startX = useRef(0)
  const startY = useRef(0)
  const deltaX = useRef(0)
  const deltaY = useRef(0)
  const offsetX = useRef(0)
  const offsetY = useRef(0)
  const direction = useRef<Direction>('')

  const isVertical = () => direction.current === 'vertical'
  const isHorizontal = () => direction.current === 'horizontal'

  const reset = () => {
    deltaX.current = 0
    deltaY.current = 0
    offsetX.current = 0
    offsetY.current = 0
    direction.current = ''
  }

  const start = (event: ITouchEvent) => {
    reset()
    startX.current = event.touches[0]!.clientX
    startY.current = event.touches[0]!.clientY
  }

  const move = (event: ITouchEvent) => {
    const touch = event.touches[0]
    // Fix: Safari back will set clientX to negative number
    deltaX.current = touch!.clientX < 0 ? 0 : touch!.clientX - startX.current
    deltaY.current = touch!.clientY - startY.current
    offsetX.current = Math.abs(deltaX.current)
    offsetY.current = Math.abs(deltaY.current)

    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current)
    }
  }

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  }
}
