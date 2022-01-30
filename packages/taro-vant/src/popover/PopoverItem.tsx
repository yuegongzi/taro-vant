import type { FC } from 'react'
import type { PopoverItemProps } from './PropsType'
import { createNamespace, ele } from '../utils'
import './style/index.less'
import Icon from '../icon'
import classNames from 'clsx'
import { View } from '@tarojs/components'

const [ bem ] = createNamespace('popover-item')

const PopoverItem: FC<PopoverItemProps> = (props) => {
  const { className, icon, text, color, disabled, ...other } = props

  return (
    <View
      {...other}
      className={classNames(className, bem({ disabled }))}
      hoverStartTime={20}
      hoverStayTime={20}
      hoverClass={classNames(bem('', [ 'hover' ], true))}
    >
      <View className={classNames(bem('wrapper'))}>
        <View className={classNames(bem('icon'))}>
          {/*@ts-ignore*/}
          {ele(icon, <Icon name={icon} color={color} />)}
        </View>
        <View className={classNames(bem('text'))} style={{ color }}>
          {text}
        </View>
      </View>
    </View>
  )
}

PopoverItem.defaultProps = {}

export default PopoverItem
