import { View } from '@tarojs/components'
import { Swiper } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
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
            <View className='content cyan'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content blue'>3</View>
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
      <DemoBlock title='前后边距'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#fff'
          circular
          indicatorDots
          inset
          autoplay
          previousMargin='50px'
          nextMargin='50px'
        >
          <SwiperItem>
            <View className='content'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content blue'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content cyan'>3</View>
          </SwiperItem>
        </Swiper>
      </DemoBlock>
      <DemoBlock title='多个显示'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#fff'
          circular
          indicatorDots
          inset
          autoplay
          displayMultipleItems={2}
        >
          <SwiperItem>
            <View className='content'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content blue'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content cyan'>3</View>
          </SwiperItem>
          <SwiperItem>
            <View className='content' style='background-color:yellow'>
              4
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='content' style='background-color:red'>
              5
            </View>
          </SwiperItem>
        </Swiper>
      </DemoBlock>
      <View className='padding' />
    </DemoPage>
  )
}
