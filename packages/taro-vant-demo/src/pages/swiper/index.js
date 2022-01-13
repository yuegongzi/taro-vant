import { View } from '@tarojs/components'
import { Swiper } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import './index.scss'

const SwiperItem = Swiper.Item
export default () => {
  return (
    <DemoPage title='Swiper 轮播'>
      <DemoBlock title='基础用法'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#fff'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className='content'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content'>3</View>
          </SwiperItem>
        </Swiper>
      </DemoBlock>

      <DemoBlock title='垂直滚动'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#fff'
          circular
          vertical
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className='content'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content'>3</View>
          </SwiperItem>
        </Swiper>
      </DemoBlock>

      <DemoBlock title='圆角风格'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#fff'
          circular
          inset
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View className='content'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content'>3</View>
          </SwiperItem>
        </Swiper>
      </DemoBlock>
      <View className='padding' />
    </DemoPage>
  )
}
