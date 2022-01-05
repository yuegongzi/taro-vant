import './style/index.less';
import { useCallback } from 'react'
import type { ITouchEvent } from '@tarojs/components';
import { View, Block } from '@tarojs/components'
import * as utils from '../wxs/utils'
import type { CellProps } from './PropsType'
import { createNamespace, jumpLink } from '../utils'
import Icon from '../icon'
import { computedTitleStyle } from './wxs'
import clsx from 'clsx'

const [ bem ]=createNamespace('cell')

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
    renderIcon,
    renderTitle,
    renderLabel,
    renderRightIcon,
    renderExtra,
    children,
    style,
    className,
    ...others
  } = props
  const _click: (event: ITouchEvent) => void = useCallback(
    function (event) {
      onClick?.(event)
      if (url && linkType) jumpLink(url, linkType)
    },
    [ linkType, onClick, url ],
  )
  return (
    <View
      className={clsx(bem([
        size,{
          center,
          required,
          borderless: !border,
          clickable: isLink || clickable,
        },
      ]),className)}
      hoverClass={clsx(bem('',[ 'hover' ],true))}
      hoverStayTime={70}
      style={utils.style([ style ])}
      onClick={_click}
      {...others}
    >
      {icon ? (
        <Icon name={icon}
          className={clsx(bem('left-icon-wrap'),bem('left-icon'))}
         />
      ) : (
        renderIcon
      )}
      <View
        style={computedTitleStyle({
          titleWidth,
          titleStyle,
        })}
        className={clsx(bem('title'))}
      >
        {title || title === 0 ? <Block>{title}</Block> : renderTitle}
        {(label || renderLabel) && (
          <View className={clsx(bem('label'))}>
            {renderLabel || (label && <Block>{label}</Block>)}
          </View>
        )}
      </View>
      <View className={clsx(bem('value'))}>
        {value || value === 0 ? <Block>{value}</Block> : children}
      </View>
      {isLink ? (
        <Icon
          name={arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'}
          className={clsx(bem('right-icon-wrap'),bem('right-icon'))}
         />
      ) : (
        renderRightIcon
      )}
      {renderExtra}
    </View>
  )
}

export default Cell
