import { Component } from 'react'
import { showToast } from '@tarojs/taro'
import { Icon, NavBar } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'
import DemoBlock from '../../components/demo-block/index'
import './index.scss'
import { View } from '@tarojs/components'

export default class Index extends Component {
  constructor() {
    super()
  }

  onClickLeft = () => {
    showToast({ title: '点击返回', icon: 'none' })
  }

  onClickRight = () => {
    showToast({ title: '点击按钮', icon: 'none' })
  }

  render() {
    return (
      <DemoPage title='NavBar 导航栏'>
        <>
          <DemoBlock title='基础用法'>
            <NavBar
              title='标题'
              rightText='按钮'
              leftArrow
              leftText={<View>商户号</View>}
              onClickLeft={this.onClickLeft}
              onClickRight={this.onClickRight}
            />
          </DemoBlock>
          <DemoBlock title='高级用法'>
            <NavBar
              title='标题'
              leftText='返回'
              leftArrow
              rightText={
                <>
                  <Icon name='search' className='icon' size='36' />
                </>
              }
            />
          </DemoBlock>
        </>
      </DemoPage>
    )
  }
}
