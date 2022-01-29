import { View } from '@tarojs/components'
import './index.less'

export default (props) => {
  const { padding, title, card } = props
  return (
    <View
      className={
        'custom-class demo-block van-clearfix ' +
        (padding ? 'demo-block--padding' : '')
      }
    >
      {title && <View className='demo-block__title'>{title}</View>}
      {card ? (
        <View className='demo-block__card'>{props.children}</View>
      ) : (
        props.children
      )}
    </View>
  )
}
