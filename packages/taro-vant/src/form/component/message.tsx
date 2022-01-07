import { Text, View } from '@tarojs/components'
import { createNamespace, isAnyBlank } from '../../utils'
import clsx from 'clsx'

const [ bem ] = createNamespace('form-item')

type MessageProps = {
  errorMessage?: string
}

export default function Message(props: MessageProps) {
  const { errorMessage } = props

  if (!isAnyBlank(errorMessage)) {
    return <View className={clsx(bem('message'))}>
      <Text>{errorMessage}</Text>
    </View>
  }
  return null
}
