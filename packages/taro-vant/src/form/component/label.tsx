import { Text, View } from '@tarojs/components'
import clsx from 'clsx'
import { createNamespace } from '../../utils'

const [ bem ] = createNamespace('form-item')

type LabelProps = {
  label?: string
  required?: boolean
  className?: string;
  titleWidth?: string;
}

export default function Label(props: LabelProps) {
  const {
    label,
    required,
    className,
    titleWidth = '5.2em',
  } = props
  return (
    <View className={clsx(bem('label'), className)} style={{ width: titleWidth }}>
      <View className={clsx(bem('required-box'))}>
        {required && (
          <Text className={clsx(bem('label-star'))}>
            *
          </Text>
        )}
      </View>
      <Text>{label}</Text>
    </View>
  )
}
