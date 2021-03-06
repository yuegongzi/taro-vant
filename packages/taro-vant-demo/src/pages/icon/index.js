import { Component } from 'react'
import { View } from '@tarojs/components'
import { Col, Icon, Tabs } from 'taro-vant'
import icons from '@vant/icons'
import { DemoBlock, DemoPage } from 'components'
import './index.scss'

const Tab = Tabs.Tab
export default class Index extends Component {
  state = {
    icons,
    active: 0,
    demoIcon: 'chat-o',
    demoImage: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  }
  onSwitch = (event) => {
    this.setState({
      active: event.detail.index,
    })
  }

  render() {
    const { active, demoIcon, demoImage, icons } = this.state
    return (
      <DemoPage title='Icon 图标'>
        <Tabs active={active} color='#1989fa' onChange={this.onSwitch}>
          <Tab title='用法示例' className='demo-tab-pane'>
            <DemoBlock title='基础用法'>
              <Col className='col' span='6'>
                <Icon name={demoIcon} size='32px' className='icon' />
              </Col>
              <Col className='col' span='6'>
                <Icon name={demoImage} size='32px' className='icon' />
              </Col>
            </DemoBlock>
            <DemoBlock title='提示信息'>
              <Col className='col' span='6'>
                <Icon name={demoIcon} size='32px' dot />
              </Col>
              <Col className='col' span='6'>
                <Icon name={demoIcon} size='32px' badge='9' />
              </Col>
              <Col className='col' span='6'>
                <Icon name={demoIcon} size='32px' badge='99+' />
              </Col>
            </DemoBlock>
            <DemoBlock title='图标颜色'>
              <Col className='col' span='6'>
                <Icon
                  name={demoIcon}
                  size='32px'
                  className='icon'
                  color='#1989fa'
                />
              </Col>
              <Col className='col' span='6'>
                <Icon
                  name={demoIcon}
                  size='32px'
                  className='icon'
                  color='#07c160'
                />
              </Col>
            </DemoBlock>
            <DemoBlock title='图标大小'>
              <Col className='col' span='6'>
                <Icon name={demoIcon} size='40' className='icon' />
              </Col>
              <Col className='col' span='6'>
                <Icon name={demoIcon} size='3rem' className='icon' />
              </Col>
            </DemoBlock>
            <DemoBlock title='图标旋转'>
              <Col className='col' span='6'>
                <Icon name='music' size='40' spin className='icon' />
              </Col>
              <Col className='col' span='6'>
                <Icon name='star' size='40' spin className='icon' />
              </Col>
            </DemoBlock>
            <DemoBlock title='自定义图标'>
              <Col className='col' span='6'>
                <Icon
                  classPrefix='cuIcon'
                  name='photo'
                  size='40'
                  className='icon'
                />
              </Col>
              <Col className='col' span='6'>
                <Icon
                  classPrefix='cuIcon'
                  name='photo-error'
                  size='40'
                  className='icon'
                />
              </Col>
            </DemoBlock>
          </Tab>
          <Tab title='基础图标' className='demo-tab-pane'>
            {icons.basic.map((item, index) => {
              return (
                <Col key={index} className='col' span='6'>
                  <Icon name={item} size='32px' className='icon' />
                  <View className='text'>{item}</View>
                </Col>
              )
            })}
          </Tab>
          <Tab title='线框风格' className='demo-tab-pane'>
            {icons.outline.map((item, index) => {
              return (
                <Col key={index} className='col' span='6'>
                  <Icon name={item} size='32px' className='icon' />
                  <View className='text'>{item}</View>
                </Col>
              )
            })}
          </Tab>
          <Tab title='实底风格' className='demo-tab-pane'>
            {icons.filled.map((item, index) => {
              return (
                <Col key={index} className='col' span='6'>
                  <Icon name={item} size='32px' className='icon' />
                  <View className='text'>{item}</View>
                </Col>
              )
            })}
          </Tab>
        </Tabs>
      </DemoPage>
    )
  }
}

definePageConfig({
  navigationBarTitleText: 'Icon 图标',
  enableShareAppMessage: true,
})
