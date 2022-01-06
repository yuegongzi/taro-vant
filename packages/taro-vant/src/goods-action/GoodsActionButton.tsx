import './style/index.less'
import { useCallback } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import Button from '../button'
import type { GoodsActionIconProps } from './PropsType'
import { createNamespace, jumpLink } from '../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('goods-action-button')

function GoodsActionButton(props: GoodsActionIconProps & { isFirst?: boolean, isLast?: boolean }) {
  const {
    text,
    url,
    linkType,
    plain,
    type = 'danger',
    style,
    isFirst,
    isLast,
    onClick,
    children,
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
      type={type}
      plain={plain}
      className={clsx(bem([
        type,
        {
          first: isFirst,
          last: isLast,
          plain: plain,
        },
      ]), bem('inner'), className)}
      style={style}
      onClick={_click}
      {...others}
    >
      {text}
      {children}
    </Button>
  )
}

GoodsActionButton.displayName = 'GoodsActionButton'
export default GoodsActionButton
