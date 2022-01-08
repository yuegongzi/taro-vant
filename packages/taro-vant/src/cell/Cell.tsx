import './style/index.less'
import { useCallback } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { View } from '@tarojs/components'
import type { CellProps } from './PropsType'
import { computedStyle, createNamespace, ele, jumpLink } from '../utils'
import Icon from '../icon'
import { computedTitleStyle } from './wxs'
import clsx from 'clsx'

const [ bem ] = createNamespace('cell')

function Cell(props: CellProps) {
  const {
    url,
    linkType,
    size,
    center,
    required,
    border = true,
    isLink,
    clickable,
    icon,
    titleWidth,
    titleStyle,
    title,
    label,
    value,
    arrowDirection,
    onClick,
    rightIcon,
    extra,
    children,
    style,
    className,
    valueClass,
    ...others
  } = props
  const _click: (event: ITouchEvent) => void = useCallback(
    function(event) {
      onClick?.(event)
      if (url && linkType) jumpLink(url, linkType)
    },
    [ linkType, onClick, url ],
  )

  return (
    <View
      className={clsx(bem([
        size, {
          center,
          required,
          borderless: !border,
          clickable: isLink || clickable,
        },
      ]), className)}
      hoverClass={clsx(bem('', [ 'hover' ], true))}
      hoverStayTime={70}
      style={computedStyle([ style ])}
      onClick={_click}
      {...others}
    >
      {/*@ts-ignore*/}
      {ele(icon, <Icon name={icon}
                       className={clsx(bem('left-icon-wrap'), bem('left-icon'))}
      />)}
      <View
        style={computedTitleStyle({
          titleWidth,
          titleStyle,
        })}
        className={clsx(bem('title'))}
      >
        {title}
        <View className={clsx(bem('label'))}>
          {label}
        </View>
      </View>
      <View className={clsx(bem('value'), valueClass)}>
        {value ? value : children}
      </View>
      {isLink ? (
        <Icon
          name={arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'}
          className={clsx(bem('right-icon-wrap'), bem('right-icon'))}
        />
      ) : (
        rightIcon
      )}
      {extra}
    </View>
  )
}

Cell.displayName = 'Cell'
export default Cell
