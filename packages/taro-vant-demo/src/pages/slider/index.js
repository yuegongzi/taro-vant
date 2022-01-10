import { Component } from 'react'
import { showToast } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Slider } from 'taro-vant'
import DemoPage from '../../components/demo-page/index'

import DemoBlock from '../../components/demo-block/index'
import './index.scss'

export default class Index extends Component {
  state = {
    currentValue: 50,
  }

  constructor() {
    super()
  }

  onChange = (event) => {
    showToast({
      icon: 'none',
      title: `当前值：${event.detail}`,
    })
  }

  onDrag = (event) => {
    this.setState({
      currentValue: event.detail.value,
    })
  }

  render() {
    const { currentValue } = this.state
    return (
      <DemoPage title='Slider 滑块'>
        <>
          <DemoBlock title='基础用法'>
            <Slider
              value='50'
              className='slider'
              onChange={this.onChange}
            />
          </DemoBlock>
          <DemoBlock title='双滑块'>
            <Slider
              range
              value={[ 20, 60 ]}
              className='slider'
              onChange={this.onChange}
            />
          </DemoBlock>
          <DemoBlock title='指定选择范围'>
            <Slider
              className='slider'
              min={-50}
              max={50}
              onChange={this.onChange}
            />
          </DemoBlock>
          <DemoBlock title='禁用'>
            <Slider className='slider' value='50' disabled />
          </DemoBlock>
          <DemoBlock title='指定步长'>
            <Slider
              className='slider'
              value='50'
              step='10'
              onChange={this.onChange}
            />
          </DemoBlock>
          <DemoBlock title='自定义样式'>
            <Slider
              value='50'
              className='slider'
              barHeight='4px'
              activeColor='#ee0a24'
            />
          </DemoBlock>
          <DemoBlock title='自定义按钮'>
            <Slider
              value={currentValue}
              className='slider'
              activeColor='#ee0a24'
              onDrag={this.onDrag}
              button={() => <View className='custom-button'>{currentValue}</View>}
            />
          </DemoBlock>
        </>
      </DemoPage>
    )
  }
}
