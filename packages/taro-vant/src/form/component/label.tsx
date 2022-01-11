import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import { createNamespace, GRAY } from '../../utils'
import Icon from '../../icon'

const [ bem ] = createNamespace('form-item')

type LabelProps = {
  label?: string
  tooltip?: string
}

export default function Label(props: LabelProps) {
  const { label, tooltip } = props
  const onClick = () => {
    Taro.showModal({
      content: tooltip,
      title: '输入提示',
      showCancel: false,
      confirmColor: GRAY,
    })
  }
  return (
    <View className={clsx(bem('label'))}>
      {label}
      {tooltip && <Icon name='question-o' onClick={onClick} />}
    </View>
  )
}
