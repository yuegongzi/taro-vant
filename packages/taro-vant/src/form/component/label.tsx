import { View, Text } from '@tarojs/components'
import clsx from 'clsx'
import { createNamespace } from '../../utils'

const [ bem ] = createNamespace('form-item')

type LabelProps = {
  label?: string
  required?: boolean
  className?: string;
  labelWidth?: string;
}

export default function Label(props: LabelProps) {
  const {
    label,
    required,
    className,
    labelWidth = '5.2em'
  } = props
  return (
    <View className={clsx(bem('label'),className)} style={{ width:labelWidth }}>
      <View className={clsx(bem('required-box'))}>
        {required && (
          <Text  className={clsx(bem('label-star'))}>
            *
          </Text>
        )}
      </View>
      <Text>{label}</Text>
    </View>
  )
}
