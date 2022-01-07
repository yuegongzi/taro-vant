import './style/index.less'
import { useCallback } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import { Text } from '@tarojs/components'
import Button from '../button'
import Icon from '../icon'
import type { GoodsActionIconProps } from './PropsType'
import clsx from 'clsx'
import { createNamespace, jumpLink } from '../utils'
import { Badge } from '../badge'

const [ bem ] = createNamespace('goods-action-icon')

function GoodsActionIcon(props: GoodsActionIconProps) {
  const {
    text,
    url,
    linkType,
    dot,
    badge,
    icon,
    style,
    onClick,
    renderIcon,
    className,
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
    <Button
      square
      size='large'
      className={clsx(bem(), className)}
      style={style}
      onClick={_click}
      {...others}
    >
      <Badge dot={dot} content={badge}>
      {icon ? (
        <Icon
          name={icon}
          className={clsx(bem('icon'))}
        />
      ) : (
        renderIcon
      )}

      <Text>{text}</Text>
      </Badge>
    </Button>
  )
}

GoodsActionIcon.displayName = 'GoodsActionIcon'
export default GoodsActionIcon
