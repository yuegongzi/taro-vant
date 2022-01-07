import './style/index.less'
import type { BadgeProps } from './PropsType'
import { addUnit, createNamespace, isDef, isNumeric } from '../utils'
import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { View } from '@tarojs/components'

const [ bem ] = createNamespace('badge')

export function Badge(props: BadgeProps) {
  const { content, max, dot, showZero = true } = props

  const hasContent = () => {
    if (props.content) {
      return true
    }
    // @ts-ignore
    return isDef(content) && content !== '' && (showZero || +content !== 0)
  }

  const renderContent = () => {
    if (!dot && hasContent()) {
      // @ts-ignore
      if (isDef(max) && isNumeric(content?.toString()) && +content > max) {
        return `${max}+`
      }

      return content
    }
    return null
  }

  const renderBadge = () => {
    if (hasContent() || props.dot) {
      let style: CSSProperties = {
        background: props.color,
      }

      if (props.offset) {
        const [ x, y ] = props.offset

        if (props.children) {
          style.top = addUnit(y)
          style.right = addUnit(x)
        } else {
          style.marginTop = addUnit(y)
          style.marginLeft = addUnit(x)
        }
      }

      if (!props.children) {
        style = { ...props.style, ...style }
      }
      return (
        <View
          className={clsx(
            {
              [`${props.className}`]: props.className && !props.children,
            },
            bem({ dot: props.dot, fixed: !!props.children }),
          )}
          style={style}
        >
          {renderContent()}
        </View>
      )
    }
    return null
  }

  if (props.children) {
    return (
      <View
        className={clsx(bem('wrapper'), props.className)}
        style={props.style}
        onClick={props.onClick}
        onTouchStart={props.onTouchStart}
      >
        {props.children}
        {renderBadge()}
      </View>
    )
  }

  return renderBadge()
}

export default Badge
