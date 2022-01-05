import { Text, View } from '@tarojs/components'
import { createNamespace, isAnyBlank } from '../../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('form-item')

type MessageProps = {
  message?: string
}

export default function Message(props: MessageProps) {
  const { message } = props

  if (!isAnyBlank(message)) {
    return <View className={clsx(bem('message'))}>
      <Text>{message}</Text>
    </View>
  }
  return null
}
