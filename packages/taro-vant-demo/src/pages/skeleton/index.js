import { Component } from 'react'
import { View } from '@tarojs/components'
import { Image, Skeleton, Switch } from 'taro-vant'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

export default class Index extends Component {
  state = {
    show: false,
  }
  onChange = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { show } = this.state
    return (
      <DemoPage title='Skeleton 骨架屏' className='demo-view'>
        <View>
          <DemoBlock title='基础用法'>
            <Skeleton title row='3' rowWidth={[ '100%', '100%', '80%' ]} />
          </DemoBlock>
          <DemoBlock title='显示头像'>
            <Skeleton title avatar row='3' />
          </DemoBlock>
          <DemoBlock title='展示子组件'>
            <Switch checked={show} size='24px' onChange={this.onChange} />
            <Skeleton title avatar row='3' loading={!show}>
              <View className='demo-preview'>
                <Image
                  className='demo-preview-img'
                  src='https://img.yzcdn.cn/vant/logo.png'
                />
                <View className='demo-content'>
                  <View className='demo-content-h3'>关于 taro-vant</View>
                  <View className='domo-content-p'>
                    一套基于 vant-weapp 开发的在 Taro 框架中使用的多端 UI
                    组件库，两者基于相同的视觉规范，提供一致的 API
                    接口，助力开发者快速搭建小程序应用。
                  </View>
                </View>
              </View>
            </Skeleton>
          </DemoBlock>
        </View>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Skeleton 骨架屏',
  enableShareAppMessage: true,
})
