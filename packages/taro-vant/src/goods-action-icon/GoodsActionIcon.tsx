import './style/index.less';
import { useCallback } from 'react'
import type { ITouchEvent } from '@tarojs/components';
import { Text } from '@tarojs/components'
import VanButton from '../button'
import VanIcon from '../icon'
import { jumpLink } from '../common/jumpLink'
import type { GoodsActionIconProps } from './PropsType'

export function GoodsActionIcon(props: GoodsActionIconProps) {
  const {
    text,
    url,
    linkType,
    dot,
    info,
    icon,
    style,
    onClick,
    renderIcon,
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
      square
      size='large'
      className={`van-goods-action-icon ${className}`}
      style={style}
      onClick={_click}
      {...others}
    >
      {icon ? (
        <VanIcon
          name={icon}
          dot={dot}
          info={info}
          className='van-goods-action-icon__icon icon-class'
         />
      ) : (
        renderIcon
      )}
      <Text className='text-class'>{text}</Text>
    </VanButton>
  )
}
export default GoodsActionIcon
