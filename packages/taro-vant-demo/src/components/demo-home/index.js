import { Image, View } from '@tarojs/components'
import list from '../../config'
import DemoHomeNav from '../demo-home-nav'
import './index.less'

export default () => {
  return (
    <View className='demo-home'>
      <View className='demo-home__title'>
        <Image
          mode='aspectFit'
          className='demo-home__image'
          src='https://img.yzcdn.cn/vant/logo.png'
        />
        <View className='demo-home__text'>taro-vant</View>
      </View>
      <View className='demo-home__desc'>轻量、可靠的小程序UI组件库</View>
      {list.map((group, index) => {
        return (
          <View key={index}>
            <DemoHomeNav group={group} />
          </View>
        )
      })}
    </View>
  )
}
