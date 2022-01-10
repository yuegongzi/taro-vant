
import { Text, View } from '@tarojs/components'
import { useCallback, useEffect, useState } from 'react'
import type { GridItemProps } from './PropsType'
import Icon from '../icon'
import { computedStyle, createNamespace, jumpLink } from '../utils'
import clsx from 'clsx'
import { contentStyle, wrapperStyle } from './wxs'

const [ bem ] = createNamespace('grid-item')

export function GridItem(
  props: GridItemProps & {
    setChildrenInstance?: any
    index?: number
    parentInstance?: any
  },
) {
  const {
    icon,
    iconColor,
    iconPrefix = 'van-icon',
    dot,
    badge,
    text,
    setChildrenInstance,
    parentInstance,
    index,
    url,
    linkType,
    style,
    className,
    ...others
  } = props

  const [ parentState, setParentState ] = useState<any>({})

  const updateStyle = useCallback(
    function() {
      const {
        columnNum,
        border,
        square,
        gutter,
        clickable,
        center,
        direction,
        reverse,
        iconSize,
      } = parentInstance

      setParentState({
        center,
        border,
        square,
        gutter,
        clickable,
        direction,
        reverse,
        iconSize,
        index,
        columnNum,
      })
    },
    [ parentInstance, index ],
  )

  useEffect(
    function() {
      setChildrenInstance(index, {
        updateStyle,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ index, setChildrenInstance ],
  )

  useEffect(function() {
    updateStyle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <View
      className={clsx(bem({ square: parentState?.square }), className)}
      style={computedStyle([ wrapperStyle({
        square: parentState?.square,
        gutter: parentState?.gutter,
        columnNum: parentState?.columnNum,
        index: parentState?.index,
      }),
        style,
      ])}
      onClick={(e) => {
        if (url) {
          jumpLink(url, linkType)
        }
        others?.onClick?.(e)
      }}
    >
      <View className={clsx(bem('content', [
        parentState?.direction, {
          center: parentState?.center,
          square: parentState?.square,
          reverse: parentState?.reverse,
          clickable: parentState?.clickable,
          surround: parentState?.border && parentState?.gutter,
        },
      ]), { ['van-hairline--surround']: parentState?.border })}

            style={contentStyle({
              square: parentState?.square,
              gutter: parentState?.gutter,
            })}
      >
        {others.children || (
          <>
            <View className={clsx(bem('icon'))}>
              {icon ? (
                <Icon
                  name={icon}
                  color={iconColor}
                  classPrefix={iconPrefix}
                  dot={dot}
                  badge={badge}
                  size={parentState?.iconSize}
                />
              ) : (
                parentState.renderIcon
              )}
            </View>
            <View className={clsx(bem('text'))}>
              {text ? <Text>{text}</Text> : parentState.renderText}
            </View>
          </>
        )}
      </View>
    </View>
  )
}
GridItem.displayName= 'GridItem'
export default GridItem
