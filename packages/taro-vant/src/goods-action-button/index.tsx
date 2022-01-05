import { useCallback } from 'react'
import type { ITouchEvent } from '@tarojs/components'
import VanButton from '../button'
import * as utils from '../wxs/utils'
import { jumpLink } from '../common/jumpLink'
import type { GoodsActionIconProps } from '../goods-action-icon/PropsType'

export function GoodsActionButton(
  props: GoodsActionIconProps & {
    isFirst?: boolean
    isLast?: boolean
  },
) {
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
    function (event) {
      onClick?.(event)
      if (url && linkType) jumpLink(url, linkType)
    },
    [ linkType, onClick, url ],
  )
  return (
    <VanButton
      type={type}
      plain={plain}
      className={
        utils.bem('goods-action-button', [
          type,
          {
            first: isFirst,
            last: isLast,
            plain: plain,
          },
        ]) + ` van-goods-action-button__inner ${className || ''}`
      }
      style={style}
      onClick={_click}
      {...others}
    >
      {text}
      {children}
    </VanButton>
  )
}

GoodsActionButton.displayName = 'GoodsActionButton'
export default GoodsActionButton
