import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Icon } from 'taro-vant'
import './index.less'

export default (props) => {
  const onClick = (event) => {
    const { url } = event.target.dataset
    if (Taro.getCurrentPages().length > 9) {
      Taro.redirectTo({ url })
    } else {
      Taro.navigateTo({ url })
    }
  }
  const { group } = props
  return (
    <View className='demo-home-nav'>
      <View className='demo-home-nav__title'>{group.groupName}</View>
      <View className='demo-home-nav__group'>
        {group.list.map((item) => {
          return (
            <View
              key={item.title}
              className='demo-home-nav__block'
              data-url={'/pages' + item.path + '/index'}
              onClick={onClick}
            >
              {item.title}
              <Icon name='arrow' className='demo-home-nav__icon' />
            </View>
          )
        })}
      </View>
    </View>
  )
}
